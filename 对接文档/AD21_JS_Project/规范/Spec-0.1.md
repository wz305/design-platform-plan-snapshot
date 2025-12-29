# Spec v0.1
## 1. 设计目标
- 单一结构：统一 layerTable
- sparse 表示：只写需要的层；缺省层不出现
- 浏览器侧负责推导/变换/压缩；AD wrapper 负责最小映射与写入
- 协议安全：动作+spec（白名单），禁止任意 methodName 调用

## 2. 通用 Envelope
- schema: "spec/0.1"
- type: "pad"|"via"|"track"|"arc"|"board.outline"|"polygon"|"ad.object.index"|"board.summary"|...
- id: string（可选，贯穿链路）
- handle/address: number（可选，会话内短期 key）
- boardKey: string（可选，用于切板/清池）
- payload: object（具体内容）
- meta: { ts, source, rev }（可选）

### 2.1 Envelope 示例
```json
{
  "schema": "spec/0.1",
  "type": "ad.board.summary",
  "id": "ad.board.summary-<ts>",
  "payload": { "name": "...", "unitsRaw": 1, "units": "mil" },
  "meta": { "ts": 1730000000000, "source": "AD", "rev": 0.1 }
}
```

### 2.2 Report Upload（必须使用 Envelope）
上传 `/api/upload-report` 时，必须传递 Envelope，结构如下：
```json
{
  "schema": "spec/0.1",
  "type": "ad.board.summary",
  "id": "string",
  "meta": { "ts": 1730000000000, "source": "AD", "rev": 0.1 },
  "payload": { "...board summary..." }
}
```

### 2.3 Object Index Upload（必须使用 Envelope）
上传 `/api/upload-objects` 时，必须传递 Envelope，结构如下：
```json
{
  "schema": "spec/0.1",
  "type": "ad.object.index",
  "id": "string",
  "meta": { "ts": 1730000000000, "source": "AD", "rev": 0.1 },
  "payload": {
    "boardName": "xxx.PcbDoc",
    "count": 100,
    "total": 300,
    "truncated": false,
    "offset": 0,
    "batchIndex": 1,
    "batchCount": 3,
    "isFinal": true,
    "items": [
      {
        "objectId": 1,
        "objectIdString": "Arc",
        "layerId": 1,
        "layerName": "TopLayer",
        "handle": 12345,
        "bounds": { "x1": 0, "y1": 0, "x2": 10, "y2": 5 }
      }
    ]
  }
}
```
说明：
- `batchCount` 在流式上传时可为 0（未知），仅在最后一批（`isFinal=true`）填写最终值。
- `total` 在流式上传时只保证最后一批提供；非最后一批可缺省。
- `bounds` 可选（关闭 bounds 可显著提升扫描/上传速度）。

## 3. LayerStackMap（层叠对照表）
- 规范层名：TopLayer, BottomLayer, MidLayer1..MidLayerN, MultiLayer
- Spec 内 layerTable 的 key 必须来自规范层名
- AD 侧必须实现 StackMap 模块：规范层名 <-> AD LayerId/层序
- 缺省策略：若 stackMap 不可获取，AD 侧仅保证 TopLayer/BottomLayer/MultiLayer，其它层返回未支持

## 4. Pad Spec（spec/0.1）
payload:
- common: { x, y, net, rotation?, isPlated?, hole?:{diameter}, note? }
- layerMode: "multilayer" | "top-mid-bot" | "full-stack"
- layerTable: { "<LayerName>": { shape, xSize, ySize, offsetX?, offsetY?, cornerRadius?, pasteMask?, solderMask? } }
规则（必须写清）：
- multilayer：layerTable 可仅提供一个模板层（MultiLayer 或 TopLayer）
- top-mid-bot：仅允许 TopLayer/BottomLayer/MidLayer1（MidLayer1 作为内层模板）
- full-stack：允许任意层（按 stackMap）
- sparse：未出现层表示留空；AD wrapper 只在“AD 必填字段”场景做最小补齐（例如复制 MidLayer1），不做业务推导

## 5. Via Spec（spec/0.1）
payload:
- common: { x, y, net, hole:{diameter}, size:{xSize,ySize}, isPlated? }
- layerMode: "multilayer" | "top-mid-bot" | "full-stack"
- layerSpan?: { from:"TopLayer", to:"BottomLayer" }

## 6. Track Spec（spec/0.1）
payload:
- common: { x1,y1,x2,y2,width,layer:"TopLayer|...|BottomLayer", net }

## 6.1 Arc Spec（spec/0.1）
payload:
- common: { centerX, centerY, radius, startAngle, endAngle, width, layer:"TopLayer|...|BottomLayer", net }

## 6.2 Board Outline Spec（spec/0.1）
payload:
- bounds: { x1,y1,x2,y2 }
- segmentCount: number
- segments: [{ type:"track|arc", ... }]

## 6.3 Polygon Spec（spec/0.1）
payload:
- layer: "TopLayer|...|BottomLayer"
- net: string
- polygonType: number|null
- pourOver: number|boolean|null
- bounds: { x1,y1,x2,y2 }

## 7. Patch/Update（白名单）
- update 只允许 wrapper 白名单字段
- 禁止任意属性路径写入

## 8. 错误返回约定
- { ok:false, error:{code,message,detail?} }
