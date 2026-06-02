import { AVAILABLE_SOUNDS, engineManager, type AudioStyleId, type FxParams, type SoundDef } from '../audio';
import type { TimelineClip, ViewMode } from './model';

export interface SerializableSoundDef extends Omit<SoundDef, 'buffer'> {
  bufferBase64?: string;
  sampleRate?: number;
  numberOfChannels?: number;
  audioAssetId?: string;
}

export interface MusicArrAudioAsset {
  id: string;
  format: 'pcm8-mono';
  sampleRate: number;
  duration: number;
  dataBase64: string;
  sourceSampleRate: number;
  sourceChannels: number;
}

export interface SerializedTabData {
  id: string;
  name: string;
  slots: (SerializableSoundDef | null)[];
  mutedSlots: boolean[];
  moduleFx: FxParams[];
  masterFx: FxParams;
  styleId: AudioStyleId;
  activeStep: number;
  isPlaying: boolean;
  fxSlots?: FxParams[];
}

export interface MusicArrFile {
  version: '1.0' | '1.1';
  bpm?: number;
  tabs: SerializedTabData[];
  recordedSounds: SerializableSoundDef[];
  audioAssets?: MusicArrAudioAsset[];
  exportCompression?: {
    format: 'split-audio-assets';
    targetBytes: number;
    audioSampleRate: number;
    audioBitDepth: number;
    audioChannels: number;
    assetCount: number;
  };
  timeline?: {
    duration: number;
    playhead: number;
    loopRange: {
      start: number;
      end: number;
    };
    clips: TimelineClip[];
    selectedClipId?: string | null;
  };
  userSettings: {
    activeTabId: string;
    keyboardInstrumentMode: string;
    keyboardSustainEnabled?: boolean;
    isKeyboardVisible?: boolean;
  };
}

const EXPORT_TARGET_BYTES = 10 * 1024 * 1024;
const EXPORT_AUDIO_BUDGET_BYTES = Math.floor(EXPORT_TARGET_BYTES * 0.68);
const EXPORT_MAX_AUDIO_SAMPLE_RATE = 16000;
const EXPORT_MIN_AUDIO_SAMPLE_RATE = 4000;

export interface PersistedMainEditorState {
  selectedStyleId: string;
  activeTabId: string;
  viewMode: ViewMode;
  bpm: number;
  tabs: SerializedTabData[];
  recordedSounds: SerializableSoundDef[];
  timeline: {
    duration: number;
    playhead: number;
    loopRange: {
      start: number;
      end: number;
    };
    clips: TimelineClip[];
    selectedClipId?: string | null;
  };
  keyboard: {
    instrumentMode: string;
    isVisible: boolean;
    sustain: boolean;
  };
  library: {
    isExtraOpen: boolean;
    openExtraCategories: Record<string, boolean>;
  };
}

export const encodeAudioBufferToWavBase64 = (buffer: AudioBuffer): string => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteLength = 44 + buffer.length * blockAlign;
  const wav = new ArrayBuffer(byteLength);
  const view = new DataView(wav);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + buffer.length * blockAlign, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, buffer.length * blockAlign, true);

  const offset = 44;
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    let idx = offset + channel * 2;
    for (let i = 0; i < buffer.length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(idx, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      idx += blockAlign;
    }
  }

  const bytes = new Uint8Array(wav);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
};

export const decodeBase64ToAudioBuffer = async (base64: string): Promise<AudioBuffer> => {
  engineManager.init();
  if (!engineManager.ctx) throw new Error('Unable to initialize audio context for import');

  const binaryString = atob(base64);
  const buffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }
  return await engineManager.ctx.decodeAudioData(buffer);
};

const uint8ToBase64 = (bytes: Uint8Array) => {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const base64ToUint8 = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const computeExportAudioSampleRate = (buffers: AudioBuffer[]) => {
  const totalDuration = buffers.reduce((sum, buffer) => sum + buffer.duration, 0);
  if (totalDuration <= 0) return EXPORT_MAX_AUDIO_SAMPLE_RATE;
  const budgetedRate = Math.floor(EXPORT_AUDIO_BUDGET_BYTES / Math.max(1, totalDuration));
  return Math.max(EXPORT_MIN_AUDIO_SAMPLE_RATE, Math.min(EXPORT_MAX_AUDIO_SAMPLE_RATE, budgetedRate));
};

export const encodeCompressedAudioAsset = (
  id: string,
  buffer: AudioBuffer,
  targetSampleRate: number,
): MusicArrAudioAsset => {
  const sampleRate = Math.max(EXPORT_MIN_AUDIO_SAMPLE_RATE, Math.min(EXPORT_MAX_AUDIO_SAMPLE_RATE, Math.round(targetSampleRate)));
  const frameCount = Math.max(1, Math.ceil(buffer.duration * sampleRate));
  const bytes = new Uint8Array(frameCount);
  const channelData = Array.from({ length: buffer.numberOfChannels }, (_, channel) => buffer.getChannelData(channel));
  const ratio = buffer.sampleRate / sampleRate;

  for (let i = 0; i < frameCount; i++) {
    const sourceIndex = Math.min(buffer.length - 1, Math.floor(i * ratio));
    const mixedSample = channelData.reduce((sum, channel) => sum + channel[sourceIndex], 0) / Math.max(1, channelData.length);
    const clamped = Math.max(-1, Math.min(1, mixedSample));
    bytes[i] = Math.max(0, Math.min(255, Math.round((clamped + 1) * 127.5)));
  }

  return {
    id,
    format: 'pcm8-mono',
    sampleRate,
    duration: buffer.duration,
    dataBase64: uint8ToBase64(bytes),
    sourceSampleRate: buffer.sampleRate,
    sourceChannels: buffer.numberOfChannels,
  };
};

const decodeCompressedAudioAsset = async (asset: MusicArrAudioAsset): Promise<AudioBuffer> => {
  engineManager.init();
  if (!engineManager.ctx) throw new Error('Unable to initialize audio context for import');

  const bytes = base64ToUint8(asset.dataBase64);
  const sampleRate = Math.max(EXPORT_MIN_AUDIO_SAMPLE_RATE, Math.min(EXPORT_MAX_AUDIO_SAMPLE_RATE, Number(asset.sampleRate) || EXPORT_MAX_AUDIO_SAMPLE_RATE));
  const buffer = engineManager.ctx.createBuffer(1, Math.max(1, bytes.length), sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bytes.length; i++) {
    data[i] = (bytes[i] / 127.5) - 1;
  }
  return buffer;
};

export const serializeSoundDef = async (sound: SoundDef): Promise<SerializableSoundDef> => {
  const serialized: SerializableSoundDef = {
    id: sound.id,
    name: sound.name,
    category: sound.category,
    color: sound.color,
    pattern: sound.pattern,
    loopMode: sound.loopMode,
    playMode: sound.playMode,
  };

  if (sound.buffer) {
    serialized.bufferBase64 = encodeAudioBufferToWavBase64(sound.buffer);
    serialized.sampleRate = sound.buffer.sampleRate;
    serialized.numberOfChannels = sound.buffer.numberOfChannels;
  }

  return serialized;
};

export const serializeSoundDefForPersistence = async (sound: SoundDef, includeAudio: boolean): Promise<SerializableSoundDef> => {
  if (includeAudio) return serializeSoundDef(sound);
  const { buffer: _buffer, ...rest } = sound;
  return rest;
};

export const collectExportAudioSources = (sounds: Array<SoundDef | null>) => {
  const sources = new Map<string, AudioBuffer>();
  sounds.forEach((sound) => {
    if (!sound?.buffer) return;
    sources.set(sound.id, sound.buffer);
  });
  return sources;
};

export const serializeSoundDefForExport = (sound: SoundDef, audioAssetIds: Set<string>): SerializableSoundDef => {
  const serialized: SerializableSoundDef = {
    id: sound.id,
    name: sound.name,
    category: sound.category,
    color: sound.color,
    pattern: sound.pattern,
    loopMode: sound.loopMode,
    playMode: sound.playMode,
  };

  if (sound.buffer && audioAssetIds.has(sound.id)) {
    serialized.audioAssetId = sound.id;
    serialized.sampleRate = sound.buffer.sampleRate;
    serialized.numberOfChannels = sound.buffer.numberOfChannels;
  }

  return serialized;
};

export const deserializeSoundDef = async (
  raw: SerializableSoundDef,
  audioAssets?: Map<string, MusicArrAudioAsset>,
  audioAssetCache?: Map<string, Promise<AudioBuffer>>,
): Promise<SoundDef> => {
  const builtIn = AVAILABLE_SOUNDS.find((item) => item.id === raw.id && !raw.bufferBase64 && !raw.audioAssetId);
  if (builtIn) {
    return builtIn;
  }

  const result: SoundDef = {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    color: raw.color,
    pattern: raw.pattern,
    loopMode: raw.loopMode,
    playMode: raw.playMode,
  };

  if (raw.bufferBase64) {
    result.buffer = await decodeBase64ToAudioBuffer(raw.bufferBase64);
  } else if (raw.audioAssetId) {
    const asset = audioAssets?.get(raw.audioAssetId);
    if (asset) {
      const cached = audioAssetCache?.get(asset.id);
      const bufferPromise = cached ?? decodeCompressedAudioAsset(asset);
      if (!cached) audioAssetCache?.set(asset.id, bufferPromise);
      result.buffer = await bufferPromise;
    }
  }

  return result;
};

export const EXPORT_MUSICARR_TARGET_BYTES = EXPORT_TARGET_BYTES;
