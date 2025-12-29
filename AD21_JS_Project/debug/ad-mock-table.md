# AD API Mock 待实现表

基于 `modules/pcb-interfaces/module.blueprint.md` 和接口文档分析，以下是Debug Runtime需要Mock的核心AD API。

## 🎯 Mock优先级（MVP阶段）

### 🔴 高优先级（第一阶段实现）
这些是Debug基础设施运行必需的核心API。

#### 1. PCBServer 全局函数
```javascript
// 全局函数，返回IPCB_ServerInterface
PCBServer() : IPCB_ServerInterface
```

#### 2. IPCB_ServerInterface 核心方法
```javascript
// 获取当前PCB文档
GetCurrentPCBBoard() : IPCB_Board

// 获取当前PCB库文档  
GetCurrentPCBLibrary() : IPCB_Library

// 创建PCB对象
PCBObjectFactory(ObjectId, DimensionKind, CreationMode) : IPCB_Primitive

// 创建PCB库组件
CreatePCBLibComp() : IPCB_LibComponent

// 预处理和后处理（用于同步Undo系统）
PreProcess()
PostProcess()
SendMessageToRobots(Source, Destination, MessageID, MessageData)
```

#### 3. IPCB_Board 核心方法
```javascript
// 迭代器创建
BoardIterator_Create() : IPCB_BoardIterator
BoardIterator_Destroy(Iterator)

// 空间迭代器
SpatialIterator_Create() : IPCB_SpatialIterator  
SpatialIterator_Destroy(Iterator)

// 对象操作
AddPCBObject(PCBObject)
RemovePCBObject(PCBObject)

// 交互方法
GetObjectAtCursor(ObjectSet, LayerSet, StatusBarText) : IPCB_Primitive
ChooseLocation(Var X, Y, Prompt) : Boolean

// 属性访问
FileName : String
CurrentLayer : TLayer
LayerStack : IPCB_LayerStack
```

#### 4. 迭代器核心接口
```javascript
// IPCB_BoardIterator
AddFilter_ObjectSet(ObjectSet)
AddFilter_LayerSet(LayerSet)  
AddFilter_Method(Method)
FirstPCBObject() : IPCB_Primitive
NextPCBObject() : IPCB_Primitive

// IPCB_SpatialIterator
AddFilter_Area(X1, Y1, X2, Y2)
// 继承BoardIterator的所有方法
```

### 🟡 中优先级（第二阶段实现）

#### 5. PCB设计对象接口
```javascript
// IPCB_Primitive (基础接口)
I_ObjectAddress : Pointer

// IPCB_Track
X, Y, X1, Y1, X2, Y2 : TCoord
Width : TCoord
Layer : TLayer
Net : IPCB_Net

// IPCB_Pad  
X, Y : TCoord
TopXSize, TopYSize : TCoord
HoleSize : TCoord
Layer : TLayer
Name : String

// IPCB_Via
X, Y : TCoord
Size, HoleSize : TCoord
LowLayer, HighLayer : TLayer

// IPCB_Arc
X, Y, X1, Y1, X2, Y2 : TCoord
Radius : TCoord
StartAngle, EndAngle : TAngle
Layer : TLayer

// IPCB_Component
X, Y : TCoord
Rotation : TAngle
ReferenceDesignator : String
Comment : String
```

#### 6. 层栈系统
```javascript
// IPCB_LayerStack
LayerObject[LayerID] : IPCB_LayerObject
FirstLayer : IPCB_LayerObject
NextLayer(LayerObj) : IPCB_LayerObject

// IPCB_LayerObject  
LayerID : TLayer
Name : String
IsUsed : Boolean
```

### 🟢 低优先级（后续实现）

#### 7. 高级功能接口
```javascript
// IPCB_Net
Name : String

// IPCB_LibComponent
Name : String
AddPCBObject(PCBObject)

// IPCB_Library
RegisterComponent(LibComponent)
CurrentComponent : IPCB_LibComponent
LibraryIterator_Create() : IPCB_LibraryIterator
LibraryIterator_Destroy(Iterator)
```

## 📋 Mock数据结构

### PCB文档Mock数据
```javascript
{
  fileName: "MockBoard.PcbDoc",
  isLibrary: false,
  currentLayer: eTopLayer,
  objects: [
    { type: "track", x: 1000, y: 2000, width: 100, layer: eTopLayer },
    { type: "pad", x: 1500, y: 2500, size: 80, holeSize: 40, layer: eMultiLayer },
    { type: "via", x: 2000, y: 3000, size: 60, holeSize: 30, lowLayer: eTopLayer, highLayer: eBottomLayer }
  ],
  layerStack: {
    layers: [
      { layerID: eTopLayer, name: "Top Layer", isUsed: true },
      { layerID: eBottomLayer, name: "Bottom Layer", isUsed: true }
    ]
  }
}
```

### Mock常量定义
```javascript
// 对象类型
eTrackObject = 1;
ePadObject = 2;  
eViaObject = 3;
eArcObject = 4;
eComponentObject = 5;

// 层定义
eTopLayer = 0;
eBottomLayer = 1;
eMultiLayer = 32;

// 迭代方法
eProcessAll = 0;
eProcessFree = 1;
eProcessComponents = 2;
```

## 🔧 Mock实现策略

### 1. 状态管理
- 全局状态对象存储当前PCB文档状态
- Mock对象保持与真实AD相同的接口签名
- 支持状态重置和更新

### 2. 对象生命周期
- Factory方法创建新的Mock对象
- 自动分配唯一ObjectAddress
- 支持对象的添加/删除操作

### 3. 迭代器模拟
- Mock迭代器遍历内部对象集合
- 支持过滤条件（对象类型、层、区域）
- 正确模拟First/Next遍历顺序

### 4. 交互功能
- ChooseLocation返回预定义坐标
- GetObjectAtCursor返回指定位置对象
- 支持基本的用户交互模拟

## ✅ 验证标准

Mock实现成功的标准：
1. **语法兼容** - 所有接口签名与AD一致
2. **行为一致** - 返回值类型和范围正确
3. **状态同步** - 对象操作正确更新内部状态
4. **迭代正常** - 迭代器能正确遍历Mock数据
5. **错误处理** - 边界情况有合理默认值

---

**优先级说明：**
- 🔴 高优先级：MVP阶段必须实现，确保基本Debug流程能运行
- 🟡 中优先级：第二阶段实现，支持更复杂的Debug场景  
- 🟢 低优先级：后续完善，提供完整的Mock覆盖

这个Mock表将指导AD Runtime Mock的实现，确保Debug基础设施有可靠的AD环境模拟。
