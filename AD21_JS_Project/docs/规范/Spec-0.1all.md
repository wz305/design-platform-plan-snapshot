# Spec v0.1all

## 状态
- 主版本：`spec-0.1all`（AD 侧传输协议完成）。

## 1. 目标
- 基于 `spec/0.1` 的全量扩展（format 使用 `spec-0.1all`）。
- 目标：全对象、全可读属性收集，包含需按层叠读取的属性。
- 仍沿用 compact 数组结构与 decl 协商机制。

## 2. Decl/Compact 扩展
- `format: "spec-0.1all"`。
- 在原有对象表基础上追加 **prop 表** 与对应字符串表。

### 2.1 prop 表（全量属性）
```
name: "prop"
fields: ["objectId","rowId","propId","valueType","valueNum","valueStrId","layerId"]
fieldTypes: ["e","ref","s","e","n","s","layerId"]
```
说明：
- `objectId`: TObjectId。
- `rowId`: 对应对象表的行号（implicit-1）。
- `propId`: 来自 `prop.name` string bank。
- `valueType`: 属性值类型枚举（见 2.2）。
- `valueNum`: 数值/布尔/枚举/引用值。
- `valueStrId`: 来自 `prop.value` string bank。
- `layerId`: 若为按层属性，填对应 `TLayer`；非按层属性填 0。

### 2.2 valueType 枚举（prop.value）
- `1` = number
- `2` = boolean
- `3` = string
- `4` = layerId
- `5` = netId

### 2.3 属性读取规则（全量）
- 以文档树 IPCB_* 接口 property 列表为基础，按对象继承关系合并。
- 对 `*OnLayer` / `*OnPlane` 属性：使用 `GetState_*` 按层读取；不可读则跳过。
- 内电层/特殊层可能不可读，必须 try/catch 防御（失败不计为错误）。
- 对象引用类型优先转换：
  - Layer 对象 -> `layerId`（valueType=4）
  - Net 对象/NetName -> `netId`（valueType=5）
- 其余对象值若无法可靠转换则跳过（避免无意义输出）。

## 3. String Bank 规则（spec-0.1all）
- 仍保持“按对象一个 bank”的原则。
- 低复用字符串可省略；若不确定可统一入 bank。
- 新增：
  - `prop.name`：属性名（propId）
  - `prop.value`：属性值为字符串时的 stringId

## 4. 进度日志
- `collect` 阶段每 5000 对象输出一次：
  - `COMPACT_PROGRESS` { count, elapsedMs, ratePerSec, batchRatePerSec, batchMs }
- 目的：避免脚本长时间无输出造成“假死”判断。
