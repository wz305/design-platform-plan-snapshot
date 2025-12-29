# Capability Query 验证报告

## 📊 验证概览

- **生成时间**: 2025-12-17T15:34:49.346Z
- **版本**: 1.0.0
- **总测试数**: 12
- **通过测试**: 12
- **失败测试**: 0
- **成功率**: 100.00%

## 🧪 详细测试结果

### Module 1 - ✅ 通过

**期望**: true

**实际**: true

### Module 2 - ✅ 通过

**期望**: false

**实际**: false

### Callable 1 - ✅ 通过

**期望**: true

**实际**: true

### Methods 1 - ✅ 通过

**期望**: array

**实际**: array with 9 items

### Methods 2 - ✅ 通过

**期望**: empty array

**实际**: array with 0 items

### Access 1 - ✅ 通过

**期望**: both exist and reachable

**实际**: {"fromExists":true,"toExists":true,"staticallyReachable":{"name":"ObjectModule","type":"module","access":"global","location":{"file":"dist/main_utf8.js","line":9756},"methods":{"create":{"name":"create","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":["options"],"returns":"object"}},"destroy":{"name":"destroy","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":[],"returns":"boolean"}},"init":{"name":"init","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":[],"returns":"unknown"}},"get":{"name":"get","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":["id"],"returns":"object"}},"set":{"name":"set","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":["id","value"],"returns":"boolean"}},"createObject":{"name":"createObject","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":["type","properties"],"returns":"object"}},"getObject":{"name":"getObject","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":[],"returns":"unknown"}},"deleteObject":{"name":"deleteObject","type":"method","callable":true,"access":"instance","location":9756,"signature":{"params":[],"returns":"unknown"}}},"properties":{},"callable":true,"category":"object","dependencies":["LoggerModule"],"interface":{"methods":[{"name":"create","line":9756},{"name":"destroy","line":9756},{"name":"init","line":9756},{"name":"get","line":9756},{"name":"set","line":9756},{"name":"createObject","line":9756},{"name":"getObject","line":9756},{"name":"deleteObject","line":9756}]}}}

### Access 2 - ✅ 通过

**期望**: from not exist

**实际**: {"fromExists":false,"toExists":true}

### Globals 1 - ✅ 通过

**期望**: object with modules, callables, globals

**实际**: {"hasModules":true,"hasCallables":true,"hasGlobals":true,"moduleCount":32,"callableCount":51,"globalCount":83}

### Signature 1 - ✅ 通过

**期望**: signature object

**实际**: {"params":["options"],"returns":"object"}

### Signature 2 - ✅ 通过

**期望**: null

**实际**: null

### Dependencies 1 - ✅ 通过

**期望**: array

**实际**: array with 1 items

### Boundary 1 - ✅ 通过

**期望**: static facts only

**实际**: static structure validated

## 🎯 验证结论

### ⚠️ Capability Index 存在功能问题，需要进一步修复

