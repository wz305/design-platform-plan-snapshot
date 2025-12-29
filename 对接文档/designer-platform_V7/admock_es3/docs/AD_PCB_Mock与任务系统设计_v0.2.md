# AD PCB Mock 与任务系统设计 v0.2（TCoord-only）

> 目标：一套 Task DSL / Runtime，在 **浏览器 Mock（ADMock）** 与 **AD 脚本（JScript 5.8 ES3）** 双端一致运行。  
> v0.2 变更：**Task 坐标规范改为纯 TCoord 整数**；mil/mm 仅作为 UI 输入糖（UI 阶段完成转换）。

---

## 1. 设计目标（Goals）

- 单一 Task DSL：同一份 Task JSON 可在  
  - 浏览器 ADMock（快速验证逻辑、迭代 UI）  
  - AD 脚本（真实 PCB API 执行）
- PCB 聚焦：tracks / pads / vias / arcs / layers / iterators / process calls
- Mock 与 AD Adapter **调用面最小**，保证可维护与可替换

## 2. 非目标（Non-goals）

- 不追求全量 AD API 对齐
- 不追求 DRC/几何高精度一致
- 不替换已有 wrapper 模块：尽量复用现存 pcb-interfaces 与 ad-mock 资产

## 3. 硬约束（Constraints）

- AD 侧：JScript 5.8 / ES3  
  - 禁止 ES5+（如 Object.defineProperty / Array.map / class 等）  
  - 模块必须 IIFE “模块即接口”，不得依赖全局 this 导出  
  - 打包进 main.js，顶层扁平化
- 双端协议：  
  - Task 中**所有坐标/尺寸字段均为 TCoord（internal units）整数**  
  - UI 输入默认 mil，必要时 mm；UI 阶段统一转 TCoord 后再生成 Task

---

## 4. 单位体系（TCoord-only）

### 4.1 Task 规范单位：TCoord（internal units）
- Task JSON 中坐标/尺寸字段（x/y/width/size/hole/radius/...）一律为整数 TCoord。
- UI/任务生成器负责把 mil/mm 输入转换为 TCoord。

### 4.2 UI 输入转换规则（仅 UI 阶段）
> 说明：AD 文档给出 internal units 与 inch/mm/mil 的关系：  
> - 1 mil = 10000 internal units  
> - 1 inch = 1000 mil  
> - 1 inch = 25.4 mm

因此：  
- mil -> tcoord：`tcoord = mil * 10000`  
- mm -> tcoord：`tcoord = round(mm * 1000 / 25.4 * 10000)`

> 建议：统一 round（四舍五入）到 int，避免跨端差异。

---

## 5. Task Schema（协议）

### 5.1 Task JSON
```json
{
  "id": "task-id",
  "version": "0.2",
  "coordUnit": "tcoord",
  "steps": [
    {
      "id": "create-track-1",
      "op": "CreateTrack",
      "args": {
        "net": "GND",
        "layer": "Top",
        "from": { "x": 100000, "y": 200000 },
        "to":   { "x": 500000, "y": 200000 },
        "width": 10000
      },
      "saveAs": "track1"
    }
  ]
}
```

### 5.2 Step 字段

- `id: string`：步骤 ID（用于引用）
- `op: string`：操作名（Canonical：CreateTrack/CreateVia/...）
- `args: object`：参数对象（坐标/尺寸均为 tcoord 整数）
- `saveAs?: string`：若存在，将 result 存入 `context.vars[saveAs]`

### 5.3 引用（Reference）

> v0.2：Task 坐标不含输入糖，ref 只用于引用对象/步骤结果。

支持字符串形式（最省事）：

- `"$ref:vars.track1.objectId"`
- `"$ref:steps.create-track-1.objectId"`
- `"$ref:last.objectId"`

运行时解析优先级建议：

1. vars
2. steps
3. last

---

## 6. Step Catalog（初始）

### 6.1 Create / Modify / Delete

- CreateTrack { net, layer, from, to, width? }
- CreateVia   { net, position, fromLayer, toLayer, size?, hole? }
- CreatePad   { name, position, size, hole?, layer }
- CreateArc   { center, radius, startAngle, endAngle, width, layer }
- ModifyTrack { id, from?, to?, width?, layer?, net? }
- ModifyVia   { id, position?, fromLayer?, toLayer?, size?, hole? }
- ModifyPad   { id, position?, size?, hole?, layer?, name? }
- DeleteObject { id }

### 6.2 Query

- GetObjects { type?, layer?, net?, area? }
  - area: { x1, y1, x2, y2 }（均为 tcoord）

### 6.3 Command / View

- RunProcess { server, process, params? }
  - 例：{ "server":"PCB", "process":"PCB:Zoom", "params":"Action=Redraw" }

---

## 7. 运行时（TaskRuntime）规范

### 7.1 状态机

- Step：pending -> running -> done | error
- Task：idle -> running -> completed | error

### 7.2 Result 格式（共享）

```json
{
  "success": true,
  "objectId": "ad:12345678",
  "data": { "type":"Track" },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### 7.3 objectId 规范（跨端唯一）

- AD：`"ad:" + String(I_ObjectAddress)`
- Mock：`"mock:" + String(id)`
- Runtime 永远以 `objectId` 为主键；必要时可在 data 中带 `nativeId`

---

## 8. Adapter Contract（共享接口）

> 注意：Adapter 入参坐标均已是 tcoord，无需再做单位转换。

- getBoard() -> boardRef
- createObject(type, args) -> { objectId, type, nativeId? }
- updateObject(objectId, patch) -> { objectId }
- deleteObject(objectId) -> { objectId }
- queryObjects(filter) -> { objects: [] }
- runProcess(server, process, params) -> { ok: true }

---

## 9. AD 侧实现映射（AdPcbAdapter）

### 9.1 核心生命周期：PreProcess/PostProcess 必须成对（try/finally）

- 修改/创建/删除 PCB 对象时，必须：
  - `PCBServer.PreProcess()`
  - 执行对象修改 + 必要的 SendMessageToRobots
  - `PCBServer.PostProcess()`（finally 确保一定执行）

> 官方建议：务必用 Try/Finally 保证 PreProcess 与 PostProcess 总能执行，确保 PCB Editor 状态正确。

### 9.2 CreateTrack（示意）

- `obj = PCBServer.PCBObjectFactory(eTrackObject, eNoDimension, eCreate_Default)`
- `obj.X1 = args.from.x`（tcoord）
- `obj.Y1 = args.from.y`
- `obj.X2 = args.to.x`
- `obj.Y2 = args.to.y`
- `obj.Width = args.width || defaultWidth`
- `obj.Layer = layerEnum`
- `obj.Net = board.Nets.ByName(args.net)`（若可用；否则 JS 侧只存 netName）
- `board.AddPCBObject(obj)`
- return `obj.I_ObjectAddress`

> 示例中 Via/Track 都是设置坐标、AddPCBObject，再刷新视图（RunProcess/Client.SendMessage）。

### 9.3 GetObjects（Iterator）

- `it = board.BoardIterator_Create()`
- `it.AddFilter_ObjectSet(...)`
- `it.AddFilter_LayerSet(...)`
- `it.AddFilter_Method(eProcessAll)`
- 遍历：FirstPCBObject/NextPCBObject
- `board.BoardIterator_Destroy(it)`

---

## 10. ES3 Mock System（可复制核心）

### 10.1 MockBoardStore（内部一律 tcoord）

```js
{
  fileName: "MockBoard.PcbDoc",
  objects: [
    { type:"track", id:1001, X1:0, Y1:0, X2:100000, Y2:0, Width:10000, Layer:"Top", NetName:"GND" }
  ],
  layers: [
    { layerID:"Top", name:"Top Layer", isUsed:true }
  ]
}
```

### 10.2 Mock API Surface（形状贴近 AD）

- PCBServer()
  - GetCurrentPCBBoard()
  - PCBObjectFactory(type,...)
  - PreProcess()
  - PostProcess()
  - SendMessageToRobots(...)（可 no-op 但要记录调用）
- IPCB_Board
  - BoardIterator_Create()/Destroy()
  - SpatialIterator_Create()/Destroy()
  - AddPCBObject()/RemovePCBObject()
- Iterators
  - AddFilter_ObjectSet()
  - AddFilter_LayerSet()
  - AddFilter_Area()
  - FirstPCBObject()/NextPCBObject()

---

## 11. Browser ADMock（建议结构）

### 11.1 “ES3-only 小岛”目录（可直接拷贝到 AD）

```
designer-platform_V7/src/admock_es3/
  ├─ 任务运行时核心.js
  ├─ 步骤目录与分发.js
  ├─ MockBoardStore.js
  ├─ MockPCBServer.js
  ├─ MockIterators.js
  ├─ MockCadAdapter.js
  └─ docs/AD_PCB_Mock与任务系统设计_v0.2.md
```

### 11.2 React/TS 层仅负责

- 输入（mil/mm）-> tcoord 转换
- 生成 Task JSON
- 调用 admock_es3 的 TaskRuntime 执行
- UI 渲染与日志

---

## 12. 示例 Task（tcoord-only）

```json
{
  "id": "pcb-demo",
  "version": "0.2",
  "coordUnit": "tcoord",
  "steps": [
    { "id":"t1", "op":"CreateTrack", "args": { "net":"GND", "layer":"Top", "from":{ "x":0, "y":0 }, "to":{ "x":200000, "y":0 }, "width":10000 }, "saveAs":"track1" },
    { "id":"q1", "op":"GetObjects", "args": { "type":"Track", "net":"GND" }, "saveAs":"gndTracks" },
    { "id":"z1", "op":"RunProcess", "args": { "server":"PCB", "process":"PCB:Zoom", "params":"Action=Redraw" } }
  ]
}
```

---

## 13. Open Questions（v0.2）

- objectId 字符串格式是否统一用 `ad:` / `mock:` 前缀（建议保留）
- layer 字段用字符串（"Top"）还是用 layer enum（建议 Task 用字符串，Adapter 内映射）
- net 绑定：AD 侧是否强制查找 Net 对象，还是仅用 netName 赋值（视 API 可用性决定）

---

## 你这条路线为什么“能拷贝进 AD”

- **Task 只用 TCoord**：AD 与 Mock 的数据模型完全同构（对象字段直接赋值，不需要运行时单位判断）。
- **ES3-only 小岛**：Browser 里先按 ES3 写好 Runtime + Mock API，验证完“整目录复制”即可。
- **AD 侧只换 Adapter**：真正依赖 AD 的地方，集中在 `AdPcbAdapter`（PCBServer/Iterator/RunProcess），而且 `PreProcess/PostProcess` 的 try/finally 规则是官方硬建议，文档也已固化。
