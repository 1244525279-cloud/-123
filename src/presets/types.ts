import type { FxParams } from '../audio';

export interface StylePreset {
  id: string;
  name: string;
  slotIds: string[];
  accent: string;
  glow: string;
  panel: string;
  energy: number[];
  fxSlots: FxParams[];
  masterFx: FxParams;
}

export type LiveFxKind = 'heartbeat' | 'atmosphere' | 'riser' | 'impact' | 'stutter' | 'air' | 'alarm' | 'spark';

export interface LiveFxPreset {
  id: LiveFxKind;
  name: string;
  key: string;
  label: string;
  color: string;
  duration: number;
}
