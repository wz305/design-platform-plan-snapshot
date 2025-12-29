模块定位

一句话：提供唯一的 PCB 对象池（byHandle/byAddress）与轻量引用校验，作为 Wrapper 的权威缓存入口。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectPool.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
PCBObjectPool	Object	-	-	Both	注册到window/module.exports/global/IIFE导出	支持 exportModule
attachBoard	Function	boardKey:string	string	Both	可能触发reset	切板/清池用
register	Function	wrapper:Object	boolean	Both	写入 byHandle/byAddress/byType	要求wrapper含handle/address或可读取I_ObjectAddress
getByHandle	Function	handle:number|string	Object|null	Both	更新命中统计	-
getByAddress	Function	address:number|string	Object|null	Both	更新命中统计	-
invalidate	Function	key|wrapper	boolean	Both	从池中移除	支持handle/address/wrapper
reset	Function	reason?:string	boolean	Both	清空全部池	-
stats	Function	-	Object	Both	无	统计汇总
validateRef	Function	wrapper:Object	Object	Both	可能invalidate	轻量校验 directRef/nativeObject
initialize	Function	-	boolean	Both	reset别名	兼容旧接口
addToPool/getFromPool/removeFromPool/clearAllPools/getAllPoolObjects/getPoolStatistics	Function	-	Any	Both	兼容旧接口	仅为旧代码保留

最小使用示例：3~10 行，能跑

```js
var PCBObjectPool = require("./src/modules/pcb-interfaces/core/PCBObjectPool.js");
PCBObjectPool.reset("demo");
var wrapper = { handle: 1001, address: 1001, objectType: "Track" };
PCBObjectPool.register(wrapper);
console.log(PCBObjectPool.getByHandle(1001) === wrapper);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式模块依赖（可选使用 UILoggerModule/memLog/ShowMessage）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- UILoggerModule/memLog/ShowMessage（可选）：用于日志输出
- Date：统计字段时间戳

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在池里直接创建/销毁真实AD对象；本模块只管理引用与缓存

运行行为

初始化时做什么

- reset(): 清空 byHandle/byAddress/byType，并重置统计

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 若存在 UILoggerModule：输出到 UI
- 否则尝试 memLog；再降级 ShowMessage

副作用：创建对象、修改全局、注册事件、写文件等

- register/invalidate/reset 会修改内部缓存与统计

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
byHandle	Object	{ [handle]: wrapper }
byAddress	Object	{ [address]: wrapper }
byType	Object	{ [type]: [wrapper] }
handle/address	number|string	来自 wrapper.handle/address 或 I_ObjectAddress（未确认）

关键常量/枚举

- 无

错误码/异常策略

- 参数缺失时返回 false 或 {ok:false,...}，不抛异常（仅日志）

与其他模块的协作

上游谁调用我

- 各 Wrapper.initFromNative / 构造时 register
- PCBInterfaces.getStatistics

我调用谁

- 无

调用链路图（文字即可）

- register → 读取handle/address → byHandle/byAddress/byType写入 → stats更新
- validateRef → 检查directRef/nativeObject → 失败则invalidate

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/pcb-object-pool-test.js

如何在 Node 跑

- `node tests/pcb-object-pool-test.js`

如何在 AD 验证

- 在AD中加载构建产物后，调用 `PCBObjectPool.register/getByHandle` 观察

产出报告在哪里（reports/logs）

- `reports/pcb-object-pool-test-report.json`

已知问题与 TODO

已知坑点（必须可复现）

- handle/address 的来源依赖 wrapper 是否提供（I_ObjectAddress/ObjectAddress 未确认）

TODO（按优先级）

- P1：统一 handle/address 的来源与类型约定

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-29 统一对象池API为 byHandle/byAddress
