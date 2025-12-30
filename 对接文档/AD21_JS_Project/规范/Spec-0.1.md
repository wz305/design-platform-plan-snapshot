# Spec v0.1

> 当前主版本：`Spec-0.1all`（AD 侧传输协议完成）。本文件作为基础/兼容说明。

## 1. 设计目标
- 单一结构：统一 layerTable
- sparse 表示：只写需要的层；缺省层不出现
- 浏览器侧负责推导/变换/压缩；AD wrapper 负责最小映射与写入
- 协议安全：动作+spec（白名单），禁止任意 methodName 调用

## 2. 通用 Envelope
- schema: "spec/0.1"
- type: "pad"|"via"|"track"|"arc"|"board.outline"|"polygon"|"ad.object.index"|"ad.decl.summary"|"ad.decl"|"ad.decl.request"|"ad.layer.stack"|"ad.string.bank"|"board.summary"|...
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

### 2.3 Decl/Compact 传输（必须）
目标：对象属性**全部通过 decl 定义字段顺序**，数据包只传数组（数字/索引），避免字段名与重复结构开销。

#### 2.3.1 Decl 协商
- `ad.decl.summary`：连接建立/会话开始时发送，携带 `declId/declHash/format/stackSig`。
- `ad.decl.request`：接收端不认识 `declId` 或 `declHash` 不一致时发送，要求对方补发完整 decl/字符串表/层叠表。
- `ad.decl`：完整声明包，包含**所有对象的表结构与字段顺序**。

示例（摘要）：
```json
{
  "schema": "spec/0.1",
  "type": "ad.decl.summary",
  "payload": {
    "format": "compact-v1",
    "declId": "decl-2025-12-29",
    "declHash": "h:9f1b...",
    "stackSig": "stack:ab12..."
  }
}
```

#### 2.3.2 Decl 定义（compact-v1）
```json
{
  "schema": "spec/0.1",
  "type": "ad.decl",
  "payload": {
    "format": "compact-v1",
    "declId": "decl-2025-12-29",
    "declHash": "h:9f1b...",
    "rowIdMode": "implicit-1",
    "tables": [
      { "tableId": 1, "name": "track", "objectId": 4,
        "fields": ["x1","y1","x2","y2","width","layerId","netId"],
        "fieldTypes": ["n","n","n","n","n","layerId","netId"]
      }
    ],
    "stringBanks": [
      { "bankId": "4", "objectId": 4, "note": "track strings (rare)" }
    ]
  }
}
```
说明：
- `rowIdMode: implicit-1`：rows 的**行号从 1 开始**作为 rowId（0 代表空/无）。
- `objectId` 使用 `TObjectId` 枚举值（见 2.3.6）。
- `fieldTypes` 仅用于解释类型，不影响数值传输；常用：`n`/`layerId`/`netId`/`s`(stringId)/`b`(0/1)/`e`(enum)。

#### 2.3.2.1 Spec-0.1all（全量扩展）
- 使用 `format: "spec-0.1all"` 的扩展规范，追加“全量属性表/字符串规则/读取策略”等内容。
- 详见 `对接文档/AD21_JS_Project/规范/Spec-0.1all.md`。

#### 2.3.3 Layer Stack 同步（必须）
- 层是**特殊对象**，不是 `TObjectId`；使用 `TLayer` 数值表示层。
- 每次发送 `ad.object.index` 必须携带 `stackSig`。若接收端检测 `stackSig` 变化，必须请求 `ad.layer.stack` 重新同步。

`ad.layer.stack` 示例：
```json
{
  "schema": "spec/0.1",
  "type": "ad.layer.stack",
  "payload": {
    "stackSig": "stack:ab12...",
    "layers": [
      [1, 1, 0, 0], 
      [2, 2, 1, 0]
    ],
    "fields": ["layerId","nameId","stackIndex","flags"]
  }
}
```
说明：
- `nameId` 来自层专用字符串表（见 2.3.4）。
- `flags` 建议位：`1=signal`，`2=plane`，`4=mechanical`，`8=overlay`。

#### 2.3.4 字符串表（必须）
- **每种对象单独一个排序空间**，字符串表按对象类型分 bank。
- 传输 `stringId`（数字）而非原始字符串；`stringId=0` 表示空。

`ad.string.bank` 示例：
```json
{
  "schema": "spec/0.1",
  "type": "ad.string.bank",
  "payload": {
    "bankId": "9",
    "offset": 1,
    "strings": ["GND","VCC","Net-1"]
  }
}
```
说明：
- `bankId` 默认等于对象的 `objectId`（如 net 使用 `bankId="9"`）。
- `offset` 允许分批补齐字符串表（字符串索引 = offset + i）。

#### 2.3.5 Object Upload（compact-v1）
上传 `/api/upload-objects` 时，必须传递 Envelope，结构如下：
```json
{
  "schema": "spec/0.1",
  "type": "ad.object.index",
  "payload": {
    "format": "compact-v1",
    "declId": "decl-2025-12-29",
    "declHash": "h:9f1b...",
    "stackSig": "stack:ab12...",
    "boardName": "xxx.PcbDoc",
    "offset": 0,
    "count": 5000,
    "batchIndex": 1,
    "batchCount": 0,
    "isFinal": false,
    "tables": [
      { "tableId": 1, "rows": [ [1,1,2,2,10,1,3], [3,3,4,4,8,1,3] ] }
    ]
  }
}
```
说明：
- `batchCount` 流式上传时可为 0，仅最后一批填最终值。
- `total` 可省略，仅最后一批提供。
- `tables` 里的 row 顺序决定 rowId（implicit-1）。

#### 2.3.6 TObjectId（对象范围）
`TObjectId` 枚举为 PCB 设计对象全量范围（简表）：
- eNoObject
- eArcObject
- ePadObject
- eViaObject
- eTrackObject
- eTextObject
- eFillObject
- eConnectionObject
- eNetObject
- eComponentObject
- ePolyObject
- eRegionObject
- eComponentBodyObject
- eDimensionObject
- eCoordinateObject
- eClassObject
- eRuleObject
- eFromToObject
- eDifferentialPairObject
- eViolationObject
- eEmbeddedObject
- eEmbeddedBoardObject
- eTraceObject（内部）
- eSpareViaObject（内部）
- eBoardObject
- eBoardOutlineObject

#### 2.3.7 Object Tables（compact-v1）
以下为 **推荐字段顺序**（可在 decl 中扩展；仅允许追加字段，避免破坏兼容）。

基础规则：
- 所有坐标为 `TCoord` 整数，角度为 `TAngle` 原始整数。
- `netId` 引用 **net 表 rowId**；`layerId` 为 `TLayer`。
- 任何字符串字段使用 `stringId`（来自本对象 string bank）。

主要对象表：
- eTrackObject / `track`: `[x1,y1,x2,y2,width,layerId,netId]`
- eArcObject / `arc`: `[centerX,centerY,radius,startAngle,endAngle,lineWidth,layerId,netId]`
- eViaObject / `via`: `[x,y,lowLayerId,highLayerId,holeSize,netId]`
- eViaObject / `via.layer`: `[viaId,layerId,shape,size]`
- ePadObject / `pad`: `[x,y,rotation,mode,plated,holeSize,drillType,holeType,holeWidth,holeRotation,netId,ownerPartId,nameId]`
- ePadObject / `pad.layer`: `[padId,layerId,shape,xSize,ySize,offsetX,offsetY,cornerRadiusPct]`
- ePolyObject / `polygon`: `[layerId,netId,polygonType,pourOver,grid,trackSize,minTrack,borderWidth,removeDead,removeIslandsByArea,islandAreaThreshold,removeNarrowNecks,neckWidthThreshold,arcApprox]`
- ePolyObject / `polygon.seg.track`: `[polyId,x1,y1,x2,y2,width]`
- ePolyObject / `polygon.seg.arc`: `[polyId,centerX,centerY,radius,startAngle,endAngle,lineWidth]`
- eBoardOutlineObject / `board.outline`: `[outlineId]`
- eBoardOutlineObject / `board.outline.seg.track`: `[outlineId,x1,y1,x2,y2,width]`
- eBoardOutlineObject / `board.outline.seg.arc`: `[outlineId,centerX,centerY,radius,startAngle,endAngle,lineWidth]`
- eFillObject / `fill`: `[x1,y1,x2,y2,rotation,layerId,netId]`
- eRegionObject / `region`: `[layerId,netId]`
- eRegionObject / `region.seg.track`: `[regionId,x1,y1,x2,y2,width]`
- eRegionObject / `region.seg.arc`: `[regionId,centerX,centerY,radius,startAngle,endAngle,lineWidth]`
- eTextObject / `text`: `[x,y,layerId,rotation,height,width,strokeWidth,textId,fontId,inverted,mirrored]`
- eComponentObject / `component`: `[x,y,layerId,rotation,designatorId,commentId,patternId,sourceLibId,locked]`
- eComponentBodyObject / `component.body`: `[componentId,layerId,x1,y1,x2,y2,bodyType]`
- eNetObject / `net`: `[nameId]`
- eClassObject / `class`: `[classKind,nameId]`
- eRuleObject / `rule`: `[ruleKind,nameId,enabled]`
- eDifferentialPairObject / `diffpair`: `[nameId,netPId,netNId]`
- eFromToObject / `fromto`: `[netId,fromPadId,toPadId]`
- eCoordinateObject / `coordinate`: `[x,y,layerId]`
- eDimensionObject / `dimension`: `[dimType,x1,y1,x2,y2,textId]`
- eViolationObject / `violation`: `[ruleId,objAId,objBId,x,y]`
- eConnectionObject / `connection`: `[x1,y1,x2,y2,layerId,netId]`
- eEmbeddedObject / `embedded`: `[nameId,x,y,rotation,scaleX,scaleY]`
- eEmbeddedBoardObject / `embedded.board`: `[nameId,x,y,rotation,scaleX,scaleY]`
- eBoardObject / `board`: `[nameId,originX,originY]`
- eTraceObject / `trace`: `[x1,y1,x2,y2,width,layerId,netId]`
- eSpareViaObject / `sparevia`: `[x,y,lowLayerId,highLayerId,holeSize,netId]`

Pad 层叠规则：
- **Simple + Top/Bot**：SMD，仅 1 条 `pad.layer`（Top 或 Bottom）。
- **Simple + MultiLayer**：所有层相同，仅 1 条 `pad.layer`（layerId=MultiLayer）。
- **Top-Mid-Bot**：固定 3 条 `pad.layer`（Top/MidLayer1/Bottom）。
- **Full Stack**：所有信号层均需一条 `pad.layer`。
- `cornerRadiusPct` 来自 `IPCB_Pad2`（0-100），用于圆角矩形。

Polygon/BoardOutline 说明：
- Polygon/BoardOutline 由 track/arc 组成，使用 `GroupIterator` 获取子对象。
- 若无法可靠取得段数据，可只发送 `polygon`/`board.outline` 基础表并标记缺失，后续补传。

## 3. LayerStackMap（层叠对照表）
- 规范层名：TopLayer, BottomLayer, MidLayer1..MidLayerN, MultiLayer
- Spec 内 layerTable 的 key 必须来自规范层名
- AD 侧必须实现 StackMap 模块：规范层名 <-> AD LayerId/层序
- 缺省策略：若 stackMap 不可获取，AD 侧仅保证 TopLayer/BottomLayer/MultiLayer，其它层返回未支持
- compact-v1 使用 **layerId 数字**，但仍需 StackMap 用于 layerId <-> 层名/层序的互转与 `stackSig` 生成

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
