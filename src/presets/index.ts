import type { StylePreset, LiveFxPreset } from './types';
export type { StylePreset, LiveFxPreset, LiveFxKind } from './types';

// 动态加载所有 JSON 文件
const styleModules = import.meta.glob<StylePreset>(
  './styles/*.json',
  { eager: true, import: 'default' }
);

const fxModules = import.meta.glob<LiveFxPreset>(
  './live-fx/*.json',
  { eager: true, import: 'default' }
);

// 初始化预设数组
const initializeStylePresets = (): StylePreset[] => {
  return Object.values(styleModules) as StylePreset[];
};

const initializeFxPresets = (): LiveFxPreset[] => {
  return Object.values(fxModules) as LiveFxPreset[];
};

export const STYLE_PRESETS: StylePreset[] = initializeStylePresets();
export const LIVE_FX_PRESETS: LiveFxPreset[] = initializeFxPresets();

/**
 * 根据ID获取样式预设
 */
export const getStylePresetById = (id: string): StylePreset | undefined => {
  return STYLE_PRESETS.find(preset => preset.id === id);
};

/**
 * 根据ID获取Live FX预设
 */
export const getLiveFxPresetById = (id: string): LiveFxPreset | undefined => {
  return LIVE_FX_PRESETS.find(preset => preset.id === id);
};

/**
 * 根据名称获取样式预设
 */
export const getStylePresetByName = (name: string): StylePreset | undefined => {
  return STYLE_PRESETS.find(preset => preset.name === name);
};

/**
 * 根据名称获取Live FX预设
 */
export const getLiveFxPresetByName = (name: string): LiveFxPreset | undefined => {
  return LIVE_FX_PRESETS.find(preset => preset.name === name);
};
