# Presets 模块重构说明

## 概述
已将 `STYLE_PRESETS` 和 `LIVE_FX_PRESETS` 从 `App.tsx` 拆离成独立的模块化结构。

## 目录结构

```
src/presets/
├── index.ts              # 导出入口，统一的 API 接口
├── types.ts              # 类型定义
├── styles/               # 样式预设 JSON 文件（16个）
│   ├── neon.json
│   ├── warehouse.json
│   ├── dream.json
│   ├── breaks.json
│   ├── indie.json
│   ├── rnb.json
│   ├── cinematic.json
│   ├── latin.json
│   ├── neo-soul.json
│   ├── edm.json
│   ├── hiphop.json
│   ├── drill.json
│   ├── dub-bass.json
│   └── afro-rnb.json
└── live-fx/              # 实时音效预设 JSON 文件（8个）
    ├── heartbeat.json
    ├── atmosphere.json
    ├── riser.json
    ├── impact.json
    ├── stutter.json
    ├── air.json
    ├── alarm.json
    └── spark.json
```

## 统一导入导出格式

### 在 App.tsx 中的使用

```typescript
import { 
  STYLE_PRESETS, 
  LIVE_FX_PRESETS, 
  type StylePreset, 
  type LiveFxPreset, 
  type LiveFxKind 
} from './presets';
```

### 可用的导出 API

#### 常量
- `STYLE_PRESETS: StylePreset[]` - 所有样式预设的数组
- `LIVE_FX_PRESETS: LiveFxPreset[]` - 所有实时音效预设的数组

#### 类型
- `StylePreset` - 样式预设的类型定义
- `LiveFxPreset` - 实时音效预设的类型定义
- `LiveFxKind` - 实时音效类型的枚举字符串

#### 辅助函数
```typescript
// 根据 ID 获取预设
getStylePresetById(id: string): StylePreset | undefined
getLiveFxPresetById(id: string): LiveFxPreset | undefined

// 根据名称获取预设
getStylePresetByName(name: string): StylePreset | undefined
getLiveFxPresetByName(name: string): LiveFxPreset | undefined
```

## 预设数据格式

### StylePreset (样式预设) - 16 个

```json
{
  "id": "neon",
  "name": "Neon Loop",
  "slotIds": ["b1", "e5", "s3", "t6", "t3", "m5", "x1"],
  "accent": "#34d399",
  "glow": "rgba(52, 211, 153, 0.32)",
  "panel": "rgba(16, 185, 129, 0.08)",
  "energy": [1, 0.36, 0.7, 0.42, ...],
  "fxSlots": [
    {"lpf": 100, "hpf": 0, "volume": 92, "sidechain": 0, ...},
    ...
  ],
  "masterFx": {"lpf": 100, "hpf": 0, "volume": 88, ...}
}
```

### LiveFxPreset (实时音效) - 8 个

```json
{
  "id": "heartbeat",
  "name": "Heartbeat",
  "key": "1",
  "label": "Pulse tension",
  "color": "bg-red-500",
  "duration": 4.2
}
```

## 优势

1. **模块化** - 预设逻辑与 UI 逻辑分离
2. **可维护性** - 每个预设独立存储，易于编辑和添加
3. **可扩展性** - 新增预设只需添加新 JSON 文件
4. **统一接口** - 提供一致的导入导出 API
5. **类型安全** - 完整的 TypeScript 类型支持

## 后续扩展

要添加新的预设：

1. **添加样式预设**
   - 在 `src/presets/styles/` 中创建 `new-style.json`
   - 在 `src/presets/index.ts` 中导入并添加到 `STYLE_PRESETS`

2. **添加实时音效**
   - 在 `src/presets/live-fx/` 中创建 `new-fx.json`
   - 更新 `types.ts` 中的 `LiveFxKind` 类型
   - 在 `src/presets/index.ts` 中导入并添加到 `LIVE_FX_PRESETS`

## 文件大小统计

- 16 个样式预设 JSON 文件
- 8 个实时音效预设 JSON 文件
- 2 个 TypeScript 文件 (types.ts, index.ts)
- 总计：24 个预设配置文件 + 2 个模块文件
