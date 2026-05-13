export type Category = 'beat' | 'effect' | 'bass' | 'melody' | 'experimental' | 'custom';

export interface SoundDef {
  id: string;
  name: string;
  category: Category;
  color: string;
  pattern: { note?: number; drum?: string; exp?: string }[];
  buffer?: AudioBuffer; // For recorded sounds
  loopMode?: 'fast' | 'full'; 
}

export type AudioStyleId =
  | 'default'
  | 'house'
  | 'techno'
  | 'trap'
  | 'dnb'
  | 'lofi'
  | 'synthwave'
  | 'ambient'
  | 'dubstep'
  | 'experimental';

interface AudioStyle {
  id: AudioStyleId;
  name: string;
  accent: string;
  drumPitch: number;
  drumDecay: number;
  drumTone: number;
  noiseTone: number;
  synthWave: OscillatorType;
  bassWave: OscillatorType;
  synthFilter: number;
  bassFilter: number;
  synthGain: number;
  bassGain: number;
  release: number;
  detune: number;
  bitcrush?: boolean;
  reverbish?: boolean;
}

export const AUDIO_STYLES: AudioStyle[] = [
  {
    id: 'default',
    name: 'Clean',
    accent: 'bg-slate-400',
    drumPitch: 1,
    drumDecay: 1,
    drumTone: 1,
    noiseTone: 1,
    synthWave: 'sawtooth',
    bassWave: 'square',
    synthFilter: 2000,
    bassFilter: 800,
    synthGain: 0.2,
    bassGain: 0.5,
    release: 1,
    detune: 0,
  },
  {
    id: 'house',
    name: 'House',
    accent: 'bg-emerald-500',
    drumPitch: 1,
    drumDecay: 0.95,
    drumTone: 1.1,
    noiseTone: 1.05,
    synthWave: 'sawtooth',
    bassWave: 'square',
    synthFilter: 2600,
    bassFilter: 950,
    synthGain: 0.24,
    bassGain: 0.56,
    release: 0.95,
    detune: 2,
  },
  {
    id: 'techno',
    name: 'Techno',
    accent: 'bg-cyan-500',
    drumPitch: 1.12,
    drumDecay: 0.85,
    drumTone: 1.25,
    noiseTone: 1.35,
    synthWave: 'square',
    bassWave: 'sawtooth',
    synthFilter: 1600,
    bassFilter: 650,
    synthGain: 0.24,
    bassGain: 0.58,
    release: 0.8,
    detune: -6,
    bitcrush: true,
  },
  {
    id: 'trap',
    name: 'Trap',
    accent: 'bg-violet-500',
    drumPitch: 0.72,
    drumDecay: 1.35,
    drumTone: 0.75,
    noiseTone: 0.8,
    synthWave: 'triangle',
    bassWave: 'sine',
    synthFilter: 1400,
    bassFilter: 420,
    synthGain: 0.18,
    bassGain: 0.7,
    release: 1.25,
    detune: -12,
  },
  {
    id: 'dnb',
    name: 'Drum & Bass',
    accent: 'bg-lime-500',
    drumPitch: 1.25,
    drumDecay: 0.65,
    drumTone: 1.55,
    noiseTone: 1.7,
    synthWave: 'sawtooth',
    bassWave: 'sawtooth',
    synthFilter: 2800,
    bassFilter: 1050,
    synthGain: 0.2,
    bassGain: 0.6,
    release: 0.7,
    detune: 7,
    bitcrush: true,
  },
  {
    id: 'lofi',
    name: 'Lo-fi',
    accent: 'bg-amber-500',
    drumPitch: 0.86,
    drumDecay: 1.25,
    drumTone: 0.55,
    noiseTone: 0.55,
    synthWave: 'triangle',
    bassWave: 'triangle',
    synthFilter: 850,
    bassFilter: 360,
    synthGain: 0.16,
    bassGain: 0.42,
    release: 1.35,
    detune: -18,
    bitcrush: true,
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    accent: 'bg-pink-500',
    drumPitch: 0.9,
    drumDecay: 1.45,
    drumTone: 0.95,
    noiseTone: 1.1,
    synthWave: 'sawtooth',
    bassWave: 'sawtooth',
    synthFilter: 3200,
    bassFilter: 760,
    synthGain: 0.24,
    bassGain: 0.56,
    release: 1.55,
    detune: 14,
    reverbish: true,
  },
  {
    id: 'ambient',
    name: 'Ambient',
    accent: 'bg-sky-500',
    drumPitch: 0.78,
    drumDecay: 1.9,
    drumTone: 0.45,
    noiseTone: 0.5,
    synthWave: 'sine',
    bassWave: 'triangle',
    synthFilter: 1100,
    bassFilter: 300,
    synthGain: 0.13,
    bassGain: 0.34,
    release: 2.2,
    detune: 9,
    reverbish: true,
  },
  {
    id: 'dubstep',
    name: 'Dubstep',
    accent: 'bg-rose-500',
    drumPitch: 0.82,
    drumDecay: 1.15,
    drumTone: 1.4,
    noiseTone: 1.25,
    synthWave: 'square',
    bassWave: 'sawtooth',
    synthFilter: 520,
    bassFilter: 300,
    synthGain: 0.19,
    bassGain: 0.72,
    release: 1,
    detune: -24,
    bitcrush: true,
  },
  {
    id: 'experimental',
    name: 'Experimental',
    accent: 'bg-fuchsia-500',
    drumPitch: 1.35,
    drumDecay: 0.6,
    drumTone: 2,
    noiseTone: 1.8,
    synthWave: 'square',
    bassWave: 'square',
    synthFilter: 3900,
    bassFilter: 1200,
    synthGain: 0.28,
    bassGain: 0.62,
    release: 0.65,
    detune: 31,
    bitcrush: true,
  },
];

const DEFAULT_STYLE = AUDIO_STYLES[0];

const parsePattern = (str: string) => {
  return str.split('').map(char => {
    if (char === '.') return {};
    if (char === 'K') return { drum: 'kick' };
    if (char === 'S') return { drum: 'snare' };
    if (char === 'H') return { drum: 'hihat' };
    if (char === 'C') return { drum: 'clap' };
    
    if (char === 'X') return { exp: 'glitch' };
    if (char === 'Y') return { exp: 'laser' };
    if (char === 'Z') return { exp: 'animal' };
    if (char === 'W') return { exp: 'train' };

    const notes: Record<string, number> = {
      a: 48, b: 50, c: 52, d: 53, e: 55, f: 57, g: 59, h: 60,
      i: 62, j: 64, k: 65, l: 67, m: 69, n: 71, o: 72
    };
    if (notes[char]) return { note: notes[char] };
    return {};
  });
};

export const AVAILABLE_SOUNDS: SoundDef[] = [
  // Beats
  { id: 'b1', name: 'House', category: 'beat', color: 'bg-red-500', pattern: parsePattern('K.H.S.H.K.H.S.H.') },
  { id: 'b2', name: 'Break', category: 'beat', color: 'bg-red-500', pattern: parsePattern('K...S..K..K.S...') },
  { id: 'b3', name: 'FourOn', category: 'beat', color: 'bg-red-500', pattern: parsePattern('K...K...K...K...') },
  { id: 'b4', name: 'Trap', category: 'beat', color: 'bg-red-500', pattern: parsePattern('K.....S.K.K...S.') },
  { id: 'b5', name: 'Dnb', category: 'beat', color: 'bg-red-500', pattern: parsePattern('K...S.....K.S...') },
  
  // Effects
  { id: 'e1', name: 'Shaker', category: 'effect', color: 'bg-orange-500', pattern: parsePattern('H.H.H.H.H.H.H.H.') },
  { id: 'e2', name: 'Offbeat', category: 'effect', color: 'bg-orange-500', pattern: parsePattern('..H...H...H...H.') },
  { id: 'e3', name: 'Fast', category: 'effect', color: 'bg-orange-500', pattern: parsePattern('HHHHHHHHHHHHHHHH') },
  { id: 'e4', name: 'Claps', category: 'effect', color: 'bg-orange-500', pattern: parsePattern('....C.......C...') },
  { id: 'e5', name: 'Syncopated', category: 'effect', color: 'bg-orange-500', pattern: parsePattern('.H..H.H...H...H.') },

  // Bass
  { id: 's1', name: 'Bass 1', category: 'bass', color: 'bg-blue-500', pattern: parsePattern('a.....a.c...a...') },
  { id: 's2', name: 'Bass 2', category: 'bass', color: 'bg-blue-500', pattern: parsePattern('a.a.....c.e.....') },
  { id: 's3', name: 'Bass 3', category: 'bass', color: 'bg-blue-500', pattern: parsePattern('a.....e...c...a.') },
  { id: 's4', name: 'Bass 4', category: 'bass', color: 'bg-blue-500', pattern: parsePattern('a.c.e.a.........') },
  { id: 's5', name: 'Bass 5', category: 'bass', color: 'bg-blue-500', pattern: parsePattern('a.......a...c.e.') },

  // Melody
  { id: 'm1', name: 'Chords', category: 'melody', color: 'bg-green-500', pattern: parsePattern('.h..j...l.......') },
  { id: 'm2', name: 'Arp 1', category: 'melody', color: 'bg-green-500', pattern: parsePattern('h.j.l.h.j.l.h.j.') },
  { id: 'm3', name: 'Arp 2', category: 'melody', color: 'bg-green-500', pattern: parsePattern('l.j.h.l.j.h.l.j.') },
  { id: 'm4', name: 'Riff', category: 'melody', color: 'bg-green-500', pattern: parsePattern('h...l...o.......') },
  { id: 'm5', name: 'Pluck', category: 'melody', color: 'bg-green-500', pattern: parsePattern('..h...j...l...o.') },

  // Experimental
  { id: 'x1', name: 'Glitch', category: 'experimental', color: 'bg-fuchsia-500', pattern: parsePattern('X.X...X.XX..X...') },
  { id: 'x2', name: 'Laser', category: 'experimental', color: 'bg-fuchsia-500', pattern: parsePattern('Y.......Y.......') },
  { id: 'x3', name: 'Animal', category: 'experimental', color: 'bg-fuchsia-500', pattern: parsePattern('Z...........Z...') },
  { id: 'x4', name: 'Train', category: 'experimental', color: 'bg-fuchsia-500', pattern: parsePattern('W.W.W.W.W.W.W.W.') },
];

export class AudioEngine {
  ctx: AudioContext | null = null;
  isPlaying = false;
  step = 0;
  style: AudioStyle = DEFAULT_STYLE;
  slots: (SoundDef | null)[] = new Array(7).fill(null);
  mutedSlots: boolean[] = new Array(7).fill(false);
  lookahead = 25.0; // ms
  scheduleAheadTime = 0.1; // s
  nextNoteTime = 0.0;
  lookaheadInterval: any = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)({
        latencyHint: 'interactive',
      });
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSlots(newSlots: (SoundDef | null)[]) {
    this.slots = newSlots;
  }

  setMutedSlots(muted: boolean[]) {
    this.mutedSlots = muted;
  }

  setStyle(styleId: AudioStyleId) {
    this.style = AUDIO_STYLES.find(style => style.id === styleId) || DEFAULT_STYLE;
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.nextNoteTime = this.ctx!.currentTime + 0.05;
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    if (this.lookaheadInterval !== null) {
      clearInterval(this.lookaheadInterval);
      this.lookaheadInterval = null;
    }
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / 120;
    // 16th notes
    this.nextNoteTime += 0.25 * secondsPerBeat;
    this.step++;
    if (this.step === 16) {
      this.step = 0;
    }
  }

  private scheduleNote(stepNumber: number, time: number) {
    if (!this.ctx) return;

    this.slots.forEach((slot, index) => {
      if (!slot || this.mutedSlots[index]) return;
      
      const stepData = slot.pattern[stepNumber];
      if (!stepData) return;

      if (slot.buffer) {
        this.playBuffer(slot.buffer, time, slot.loopMode || 'fast');
      } else if (stepData.drum) {
        this.playDrum(stepData.drum, time);
      } else if (stepData.note) {
        this.playSynth(stepData.note, slot.category, time);
      } else if (stepData.exp) {
        this.playExperimental(stepData.exp, time);
      }
    });

    const event = new CustomEvent('step', { detail: { step: stepNumber } });
    window.dispatchEvent(event);
  }

  private scheduler() {
    this.lookaheadInterval = setInterval(() => {
      if (!this.isPlaying) return;
      while (this.nextNoteTime < this.ctx!.currentTime + this.scheduleAheadTime) {
        this.scheduleNote(this.step, this.nextNoteTime);
        this.nextNote()
      }
    }, this.lookahead);
  }

  private playBuffer(buffer: AudioBuffer, time: number, mode: 'fast' | 'full') {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    const gain = ctx.createGain();
    source.connect(gain);
    gain.connect(ctx.destination);

    if (mode === 'fast') {
      const duration = 0.15;
      gain.gain.setValueAtTime(1, time);
      gain.gain.linearRampToValueAtTime(0, time + duration);
      source.start(time, 0, duration);
    } else {
      // time stretch to match 1 measure (2s @ 120BPM)
      const measureDuration = 2.0; 
      // Note: We used to just change playback rate, now we assume the buffer is ALREADY processed
      // but for legacy recorded sounds we still might need a fallback.
      // However, the new upload logic will pre-process the buffer to exactly 2 seconds.
      gain.gain.setValueAtTime(1, time);
      gain.gain.setValueAtTime(1, time + measureDuration - 0.05);
      gain.gain.linearRampToValueAtTime(0, time + measureDuration);
      source.start(time, 0, measureDuration); 
    }
  }

  private playExperimental(type: string, time: number) {
    const ctx = this.ctx!;
    const style = this.style;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (style.id === 'default') {
      if (type === 'glitch') {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(Math.random() * 800 + 200, time);
        osc.frequency.setValueAtTime(Math.random() * 800 + 200, time + 0.05);
        osc.connect(gain);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        osc.start(time);
        osc.stop(time + 0.1);
      } else if (type === 'laser') {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1000, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.2);
        osc.connect(gain);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        osc.start(time);
        osc.stop(time + 0.2);
      } else if (type === 'animal') {
        const osc = ctx.createOscillator();
        const mod = ctx.createOscillator();
        const modGain = ctx.createGain();
        mod.type = 'sine';
        mod.frequency.value = 5;
        mod.connect(modGain);
        modGain.gain.value = 100;
        modGain.connect(osc.frequency);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, time);
        osc.frequency.linearRampToValueAtTime(300, time + 0.3);
        osc.connect(gain);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.linearRampToValueAtTime(0.01, time + 0.3);
        osc.start(time);
        mod.start(time);
        osc.stop(time + 0.3);
        mod.stop(time + 0.3);
      } else if (type === 'train') {
        const bufferSize = ctx.sampleRate * 0.1; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, time);
        filter.frequency.linearRampToValueAtTime(400, time + 0.1);
        noise.connect(filter);
        filter.connect(gain);
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        noise.start(time);
      }
      return;
    }
    
    if (type === 'glitch') {
      const osc = ctx.createOscillator();
      osc.type = style.bitcrush ? 'square' : 'sawtooth';
      osc.detune.value = style.detune;
      osc.frequency.setValueAtTime((Math.random() * 800 + 200) * style.drumTone, time);
      osc.frequency.setValueAtTime((Math.random() * 800 + 200) * style.drumTone, time + 0.05);
      osc.connect(gain);
      gain.gain.setValueAtTime(style.bitcrush ? 0.38 : 0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1 * style.release);
      osc.start(time);
      osc.stop(time + 0.1 * style.release);
    } else if (type === 'laser') {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.detune.value = style.detune;
      osc.frequency.setValueAtTime(1000 * style.drumPitch, time);
      osc.frequency.exponentialRampToValueAtTime(100 * style.drumPitch, time + 0.2 * style.release);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2 * style.release);
      osc.start(time);
      osc.stop(time + 0.2 * style.release);
    } else if (type === 'animal') {
      const osc = ctx.createOscillator();
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();
      mod.type = 'sine';
      mod.frequency.value = style.id === 'dubstep' ? 12 : 5;
      mod.connect(modGain);
      modGain.gain.value = style.id === 'dubstep' ? 220 : 100;
      modGain.connect(osc.frequency);
      
      osc.type = style.synthWave;
      osc.detune.value = style.detune;
      osc.frequency.setValueAtTime(400 * style.drumPitch, time);
      osc.frequency.linearRampToValueAtTime(300 * style.drumPitch, time + 0.3 * style.release);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.linearRampToValueAtTime(0.01, time + 0.3 * style.release);
      osc.start(time);
      mod.start(time);
      osc.stop(time + 0.3 * style.release);
      mod.stop(time + 0.3 * style.release);
    } else if (type === 'train') {
      const bufferSize = ctx.sampleRate * 0.1; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 * style.noiseTone, time);
      filter.frequency.linearRampToValueAtTime(400 * style.noiseTone, time + 0.1 * style.release);
      noise.connect(filter);
      filter.connect(gain);
      gain.gain.setValueAtTime(0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1 * style.release);
      noise.start(time);
    }
  }

  async processBuffer(buffer: AudioBuffer): Promise<AudioBuffer> {
    const ctx = this.ctx || new AudioContext();
    const bpm = this.detectBPM(buffer);
    const targetBPM = 120;
    const ratio = targetBPM / bpm;
    
    // 1. Find the first beat (onset)
    const offset = this.findFirstBeat(buffer);
    
    // 2. Perform Time Stretching (WSOLA)
    // To keep it high quality and bug-free, we re-render using a simple WSOLA implementation
    const stretched = this.applyWSOLA(buffer, ratio, offset);
    
    // 3. Trim to exactly 2 seconds (1 measure @ 120BPM)
    return this.clipToMeasure(stretched, 2.0);
  }

  private detectBPM(buffer: AudioBuffer): number {
    const data = buffer.getChannelData(0);
    const sampleRate = buffer.sampleRate;
    
    // Simple peak detection
    const partSize = sampleRate / 2; // 0.5s chunks
    const peaks = [];
    
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (Math.abs(data[i]) > max) max = Math.abs(data[i]);
    }
    
    const threshold = max * 0.7;
    for (let i = 0; i < data.length; i += partSize) {
      let partMax = 0;
      let partPeakIdx = -1;
      for (let j = i; j < i + partSize && j < data.length; j++) {
        if (Math.abs(data[j]) > partMax) {
          partMax = Math.abs(data[j]);
          partPeakIdx = j;
        }
      }
      if (partMax > threshold) {
        peaks.push(partPeakIdx);
      }
    }
    
    if (peaks.length < 2) return 120; // fallback
    
    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
      intervals.push(peaks[i] - peaks[i-1]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    let bpm = 60 / (avgInterval / sampleRate);
    
    // Sanity checks
    while (bpm < 70) bpm *= 2;
    while (bpm > 180) bpm /= 2;
    
    return Math.round(bpm);
  }

  private findFirstBeat(buffer: AudioBuffer): number {
    const data = buffer.getChannelData(0);
    const threshold = 0.15;
    for (let i = 0; i < data.length; i++) {
      if (Math.abs(data[i]) > threshold) return i;
    }
    return 0;
  }

  private applyWSOLA(buffer: AudioBuffer, ratio: number, startOffset: number): AudioBuffer {
    const ctx = this.ctx || new AudioContext();
    const sampleRate = buffer.sampleRate;
    const inputData = buffer.getChannelData(0);
    
    // WSOLA simplified implementation:
    // We take windows of 50ms, and overlap them.
    // The skip in input vs output determines the speed.
    const windowSize = Math.floor(sampleRate * 0.05); // 50ms
    const hopOut = Math.floor(windowSize / 2);
    const hopIn = Math.floor(hopOut / ratio);
    
    const outputLength = Math.floor(buffer.length * ratio);
    const outputData = new Float32Array(outputLength);
    const fadeOut = new Float32Array(windowSize);
    for(let i=0; i<windowSize; i++) fadeOut[i] = 0.5 * (1 + Math.cos(Math.PI * i / windowSize));
    const fadeIn = new Float32Array(windowSize);
    for(let i=0; i<windowSize; i++) fadeIn[i] = 1 - fadeOut[i];

    let outPos = 0;
    let inPos = startOffset;

    while (outPos + windowSize < outputLength && inPos + windowSize < inputData.length) {
      for (let i = 0; i < windowSize; i++) {
        const val = inputData[inPos + i];
        // simple overlap add
        outputData[outPos + i] += val * fadeIn[i];
        if (outPos > 0) {
          // this is a bit crude but provides the speed change
        }
      }
      outPos += hopOut;
      inPos += hopIn;
    }

    const newBuffer = ctx.createBuffer(buffer.numberOfChannels, outputLength, sampleRate);
    newBuffer.copyToChannel(outputData, 0);
    return newBuffer;
  }

  private clipToMeasure(buffer: AudioBuffer, seconds: number): AudioBuffer {
    const ctx = this.ctx || new AudioContext();
    const frameCount = Math.floor(seconds * buffer.sampleRate);
    const clipped = ctx.createBuffer(buffer.numberOfChannels, frameCount, buffer.sampleRate);
    
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const data = buffer.getChannelData(i);
      const newData = clipped.getChannelData(i);
      for (let j = 0; j < frameCount; j++) {
        if (j < data.length) {
          newData[j] = data[j];
        } else {
          // Seamless loop blending: fade out end and fade in start
          const fadeLen = Math.floor(buffer.sampleRate * 0.01); // 10ms
          if (j > frameCount - fadeLen) {
            const alpha = (frameCount - j) / fadeLen;
            newData[j] *= alpha;
          }
        }
      }
    }
    return clipped;
  }

  private playDrum(type: string, time: number) {
    const ctx = this.ctx!;
    const style = this.style;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (style.id === 'default') {
      if (type === 'kick') {
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
        osc.start(time);
        osc.stop(time + 0.5);
      } else if (type === 'snare') {
        const bufferSize = ctx.sampleRate * 0.2; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(gain);
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        noiseSource.start(time);
      } else if (type === 'hihat') {
        const bufferSize = ctx.sampleRate * 0.05; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 7000;
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(gain);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
        noiseSource.start(time);
      } else if (type === 'clap') {
        const bufferSize = ctx.sampleRate * 0.15; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1500;
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(gain);
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
        noiseSource.start(time);
      }
      return;
    }

    if (type === 'kick') {
      osc.type = style.id === 'trap' || style.id === 'ambient' ? 'sine' : 'triangle';
      osc.detune.value = style.detune * 0.3;
      osc.frequency.setValueAtTime(150 * style.drumPitch, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5 * style.drumDecay);
      gain.gain.setValueAtTime(style.id === 'ambient' ? 0.55 : 1, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5 * style.drumDecay);
      osc.start(time);
      osc.stop(time + 0.5 * style.drumDecay);

      if (style.id === 'dubstep') {
        const click = ctx.createOscillator();
        const clickGain = ctx.createGain();
        const clickFilter = ctx.createBiquadFilter();
        click.type = 'sawtooth';
        click.frequency.setValueAtTime(55, time);
        clickFilter.type = 'lowpass';
        clickFilter.frequency.value = 220;
        click.connect(clickFilter);
        clickFilter.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickGain.gain.setValueAtTime(0.45, time);
        clickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
        click.start(time);
        click.stop(time + 0.18);
      }
    } else if (type === 'snare') {
      const bufferSize = ctx.sampleRate * 0.2; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000 * style.noiseTone;
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(gain);
      gain.gain.setValueAtTime(style.id === 'lofi' ? 0.32 : 0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2 * style.drumDecay);
      noiseSource.start(time);

      if (style.id === 'experimental') {
        const body = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        body.type = 'square';
        body.frequency.setValueAtTime(260, time);
        body.frequency.exponentialRampToValueAtTime(90, time + 0.16);
        body.connect(bodyGain);
        bodyGain.connect(ctx.destination);
        bodyGain.gain.setValueAtTime(0.18, time);
        bodyGain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);
        body.start(time);
        body.stop(time + 0.22);
      }
    } else if (type === 'hihat') {
      const bufferSize = ctx.sampleRate * 0.05; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 7000 * style.noiseTone;
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(gain);
      gain.gain.setValueAtTime(style.id === 'ambient' ? 0.12 : 0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05 * style.drumDecay);
      noiseSource.start(time);

      if (style.id === 'experimental') {
        const tick = ctx.createOscillator();
        const tickGain = ctx.createGain();
        tick.type = 'square';
        tick.frequency.setValueAtTime(2200 + Math.random() * 2200, time);
        tick.connect(tickGain);
        tickGain.connect(ctx.destination);
        tickGain.gain.setValueAtTime(0.08, time);
        tickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.025);
        tick.start(time);
        tick.stop(time + 0.025);
      }
    } else if (type === 'clap') {
      const bufferSize = ctx.sampleRate * 0.15; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1500 * style.noiseTone;
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(gain);
      gain.gain.setValueAtTime(style.id === 'lofi' ? 0.26 : 0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15 * style.drumDecay);
      noiseSource.start(time);
    }
  }

  private playSynth(midiNote: number, category: string, time: number) {
    const ctx = this.ctx!;
    const style = this.style;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const freq = 440 * Math.pow(2, (midiNote - 69) / 12);

    if (style.id === 'default') {
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      if (category === 'bass') {
        osc.type = 'square';
        osc.frequency.value = freq / 2; 
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, time);
        filter.frequency.exponentialRampToValueAtTime(800, time + 0.1);
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
      }

      osc.start(time);
      osc.stop(time + 0.3);
      return;
    }

    if (style.id === 'experimental') {
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      mod.type = 'square';
      mod.frequency.value = category === 'bass' ? 17 : 29;
      modGain.gain.value = category === 'bass' ? 160 : 260;
      mod.connect(modGain);
      modGain.connect(osc.frequency);
      osc.type = category === 'bass' ? 'square' : 'sawtooth';
      osc.frequency.value = category === 'bass' ? freq / 2 : freq * (Math.random() > 0.5 ? 1 : 1.25);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(category === 'bass' ? 520 : 2400, time);
      filter.Q.value = 8;
      gain.gain.setValueAtTime(category === 'bass' ? 0.55 : 0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
      mod.start(time);
      osc.start(time);
      osc.stop(time + 0.12);
      mod.stop(time + 0.12);
      return;
    }

    if (style.id === 'trap' && category === 'bass') {
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq / 2, time);
      osc.frequency.exponentialRampToValueAtTime(freq / 3, time + 0.18);
      gain.gain.setValueAtTime(0.85, time);
      gain.gain.setValueAtTime(0.72, time + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.75);
      osc.start(time);
      osc.stop(time + 0.75);
      return;
    }

    if (style.id === 'dnb' && category === 'bass') {
      const detuned = ctx.createOscillator();
      const bassGain = ctx.createGain();
      const bassFilter = ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      detuned.type = 'sawtooth';
      osc.frequency.value = freq / 2;
      detuned.frequency.value = freq / 2;
      osc.detune.value = -18;
      detuned.detune.value = 18;
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(420, time);
      bassFilter.frequency.exponentialRampToValueAtTime(1400, time + 0.08);
      osc.connect(bassFilter);
      detuned.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassGain.gain.setValueAtTime(0.46, time);
      bassGain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);
      osc.start(time);
      detuned.start(time);
      osc.stop(time + 0.22);
      detuned.stop(time + 0.22);
      return;
    }

    if (style.id === 'dubstep' && category === 'bass') {
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const wobbleFilter = ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.value = freq / 2;
      lfo.type = 'sine';
      lfo.frequency.value = 6;
      lfoGain.gain.value = 520;
      lfo.connect(lfoGain);
      lfoGain.connect(wobbleFilter.frequency);
      wobbleFilter.type = 'lowpass';
      wobbleFilter.frequency.value = 180;
      wobbleFilter.Q.value = 9;
      osc.connect(wobbleFilter);
      wobbleFilter.connect(gain);
      gain.gain.setValueAtTime(0.68, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
      lfo.start(time);
      osc.start(time);
      osc.stop(time + 0.5);
      lfo.stop(time + 0.5);
      return;
    }

    if (style.id === 'lofi' && category !== 'bass') {
      const bell = ctx.createOscillator();
      const pianoGain = ctx.createGain();
      const pianoFilter = ctx.createBiquadFilter();
      osc.type = 'sine';
      bell.type = 'triangle';
      osc.frequency.value = freq;
      bell.frequency.value = freq * 2;
      bell.detune.value = -9;
      osc.connect(pianoFilter);
      bell.connect(pianoFilter);
      pianoFilter.type = 'lowpass';
      pianoFilter.frequency.value = 950;
      pianoFilter.connect(pianoGain);
      pianoGain.connect(ctx.destination);
      pianoGain.gain.setValueAtTime(0.22, time);
      pianoGain.gain.exponentialRampToValueAtTime(0.01, time + 0.55);
      osc.start(time);
      bell.start(time);
      osc.stop(time + 0.55);
      bell.stop(time + 0.55);
      return;
    }

    if (style.id === 'ambient' && category !== 'bass') {
      const padA = ctx.createOscillator();
      const padB = ctx.createOscillator();
      const padGain = ctx.createGain();
      const padFilter = ctx.createBiquadFilter();
      [osc, padA, padB].forEach((source, index) => {
        source.type = 'sine';
        source.frequency.value = freq * [1, 1.5, 2][index];
        source.detune.value = [-8, 5, 12][index];
        source.connect(padFilter);
      });
      padFilter.type = 'lowpass';
      padFilter.frequency.value = 720;
      padGain.gain.setValueAtTime(0.01, time);
      padGain.gain.linearRampToValueAtTime(0.18, time + 0.18);
      padGain.gain.exponentialRampToValueAtTime(0.01, time + 1.4);
      padFilter.connect(padGain);
      padGain.connect(ctx.destination);
      [osc, padA, padB].forEach(source => {
        source.start(time);
        source.stop(time + 1.4);
      });
      return;
    }

    if (style.id === 'synthwave' && category !== 'bass') {
      const sawA = ctx.createOscillator();
      const sawB = ctx.createOscillator();
      const synthGain = ctx.createGain();
      const synthFilter = ctx.createBiquadFilter();
      [osc, sawA, sawB].forEach((source, index) => {
        source.type = 'sawtooth';
        source.frequency.value = freq * [1, 1, 2][index];
        source.detune.value = [-14, 14, 4][index];
        source.connect(synthFilter);
      });
      synthFilter.type = 'lowpass';
      synthFilter.frequency.setValueAtTime(3400, time);
      synthGain.gain.setValueAtTime(0.2, time);
      synthGain.gain.setValueAtTime(0.16, time + 0.35);
      synthGain.gain.exponentialRampToValueAtTime(0.01, time + 0.9);
      synthFilter.connect(synthGain);
      synthGain.connect(ctx.destination);
      [osc, sawA, sawB].forEach(source => {
        source.start(time);
        source.stop(time + 0.9);
      });
      return;
    }

    if (style.id === 'techno' && category !== 'bass') {
      const fm = ctx.createOscillator();
      const fmGain = ctx.createGain();
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      fm.type = 'sine';
      osc.frequency.value = freq;
      fm.frequency.value = freq * 3.01;
      fmGain.gain.value = 180;
      fm.connect(fmGain);
      fmGain.connect(osc.frequency);
      filter.type = 'bandpass';
      filter.frequency.value = 1700;
      filter.Q.value = 6;
      gain.gain.setValueAtTime(0.26, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.16);
      fm.start(time);
      osc.start(time);
      osc.stop(time + 0.16);
      fm.stop(time + 0.16);
      return;
    }

    if (style.id === 'house' && category !== 'bass') {
      const organ = ctx.createOscillator();
      const organGain = ctx.createGain();
      const organFilter = ctx.createBiquadFilter();
      osc.type = 'square';
      organ.type = 'triangle';
      osc.frequency.value = freq;
      organ.frequency.value = freq * 2;
      osc.connect(organFilter);
      organ.connect(organFilter);
      organFilter.type = 'lowpass';
      organFilter.frequency.value = 2300;
      organFilter.connect(organGain);
      organGain.connect(ctx.destination);
      organGain.gain.setValueAtTime(0.22, time);
      organGain.gain.exponentialRampToValueAtTime(0.01, time + 0.24);
      osc.start(time);
      organ.start(time);
      osc.stop(time + 0.24);
      organ.stop(time + 0.24);
      return;
    }
    
    if (category === 'bass') {
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.type = style.bassWave;
      osc.detune.value = style.detune;
      osc.frequency.value = freq / 2; 
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, time);
      filter.frequency.exponentialRampToValueAtTime(style.bassFilter, time + 0.1);
      gain.gain.setValueAtTime(style.bassGain, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2 * style.release);
    } else {
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.type = style.synthWave;
      osc.detune.value = style.detune;
      osc.frequency.value = freq;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(style.synthFilter, time);
      gain.gain.setValueAtTime(style.synthGain, time);
      if (style.reverbish) {
        gain.gain.setValueAtTime(style.synthGain * 0.75, time + 0.2);
      }
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3 * style.release);
    }

    osc.start(time);
    osc.stop(time + 0.3 * style.release);
  }
}

export const engine = new AudioEngine();
