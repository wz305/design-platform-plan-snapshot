// ==========================================================
// Value History Tracker - 值历史追踪器
// 追踪对象和变量的创建、修改、传递历史
// 严格遵循ES3语法规范
// ==========================================================

var ValueHistoryTracker = (function(){
    
    // ==========================================================
    // 私有变量
    // ==========================================================
    var _valueHistory = new Object(); // 使用Object替代WeakMap（ES3兼容）
    var _creationTime = new Object();
    var _modificationCount = new Object();
    var _objectIdCounter = 1000;
    
    // ==========================================================
    // 工具函数
    // ==========================================================
    
    /**
     * 生成唯一对象ID
     * @return {String} 对象ID
     */
    function _generateObjectId() {
        _objectIdCounter++;
        return "obj_" + _objectIdCounter;
    }
    
    /**
     * 获取对象的唯一标识
     * @param {*} obj - 对象
     * @return {String} 标识符
     */
    function _getObjectIdentity(obj) {
        if (obj === null || obj === undefined) {
            return "null_" + obj;
        }
        
        if (typeof obj === "object") {
            // 尝试使用I_ObjectAddress（AD对象）
            if (obj.I_ObjectAddress !== undefined) {
                return "pcb_" + obj.I_ObjectAddress;
            }
            
            // 使用对象ID
            if (!obj._historyId) {
                obj._historyId = _generateObjectId();
            }
            return obj._historyId;
        }
        
        // 基本类型直接返回值
        return typeof obj + "_" + String(obj);
    }
    
    /**
     * 记录值的变更
     * @param {*} val - 值
     * @param {Object} info - 信息
     */
    function _recordValueChange(val, info) {
        var identity = _getObjectIdentity(val);
        
        if (!_valueHistory[identity]) {
            _valueHistory[identity] = [];
            _creationTime[identity] = info.time;
            _modificationCount[identity] = 0;
        }
        
        _modificationCount[identity]++;
        
        var historyEntry = {
            type: info.type,
            time: info.time,
            iid: info.iid,
            location: info.location,
            newValue: _sanitizeValue(val),
            from: info.from || null,
            to: info.to || null,
            modificationNumber: _modificationCount[identity]
        };
        
        _valueHistory[identity].push(historyEntry);
        
        console.log("[ValueHistory] 记录值变更: " + identity + " - " + info.type + " @ " + info.location);
    }
    
    /**
     * 清理值（避免循环引用）
     * @param {*} val - 值
     * @return {*} 清理后的值
     */
    function _sanitizeValue(val) {
        if (val === null || val === undefined) {
            return val;
        }
        
        var type = typeof val;
        
        if (type === "string" || type === "number" || type === "boolean") {
            return val;
        }
        
        if (type === "function") {
            return "[Function: " + (val.name || "anonymous") + "]";
        }
        
        if (type === "object") {
            var result = {
                _type: _getObjectType(val),
                _identity: _getObjectIdentity(val)
            };
            
            // 添加关键AD属性
            if (val.I_ObjectAddress !== undefined) {
                result.I_ObjectAddress = val.I_ObjectAddress;
            }
            if (val.FileName !== undefined) {
                result.FileName = val.FileName;
            }
            if (val.Name !== undefined) {
                result.Name = val.Name;
            }
            if (val.X !== undefined) {
                result.X = val.X;
            }
            if (val.Y !== undefined) {
                result.Y = val.Y;
            }
            if (val.Width !== undefined) {
                result.Width = val.Width;
            }
            if (val.HoleSize !== undefined) {
                result.HoleSize = val.HoleSize;
            }
            
            return result;
        }
        
        return val;
    }
    
    /**
     * 获取对象类型
     * @param {Object} obj - 对象
     * @return {String} 类型
     */
    function _getObjectType(obj) {
        if (obj === null) {
            return "null";
        }
        
        // AD对象类型检测
        if (obj.I_ObjectAddress !== undefined) {
            if (obj.Width !== undefined && obj.HoleSize === undefined) {
                return "PCB_Track";
            } else if (obj.HoleSize !== undefined && obj.LowLayer !== undefined) {
                return "PCB_Via";
            } else if (obj.HoleSize !== undefined && obj.LowLayer === undefined) {
                return "PCB_Pad";
            }
            return "PCB_Object";
        }
        
        if (obj.constructor && obj.constructor.name) {
            return obj.constructor.name;
        }
        
        // 使用toString检测
        var str = Object.prototype.toString.call(obj);
        var match = str.match(/\[object\s+(\w+)\]/);
        if (match) {
            return match[1];
        }
        
        return "Object";
    }
    
    // ==========================================================
    // 公共接口
    // ==========================================================
    
    /**
     * 记录变量写入
     * @param {String} name - 变量名
     * @param {*} val - 值
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function recordVariableWrite(name, val, iid, location) {
        _recordValueChange(val, {
            type: "variable_write",
            variableName: name,
            time: new Date().getTime(),
            iid: iid,
            location: location
        });
    }
    
    /**
     * 记录函数调用返回
     * @param {String} functionName - 函数名
     * @param {*} result - 返回值
     * @param {Array} args - 参数
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function recordFunctionReturn(functionName, result, args, iid, location) {
        _recordValueChange(result, {
            type: "function_return",
            functionName: functionName,
            arguments: args,
            time: new Date().getTime(),
            iid: iid,
            location: location
        });
    }
    
    /**
     * 记录对象创建
     * @param {String} objectType - 对象类型
     * @param {*} obj - 创建的对象
     * @param {String} creator - 创建者
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function recordObjectCreation(objectType, obj, creator, iid, location) {
        _recordValueChange(obj, {
            type: "object_creation",
            objectType: objectType,
            creator: creator,
            time: new Date().getTime(),
            iid: iid,
            location: location
        });
    }
    
    /**
     * 记录属性写入
     * @param {*} obj - 对象
     * @param {String} property - 属性名
     * @param {*} value - 值
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function recordPropertyWrite(obj, property, value, iid, location) {
        _recordValueChange(obj, {
            type: "property_write",
            property: property,
            value: value,
            time: new Date().getTime(),
            iid: iid,
            location: location
        });
    }
    
    /**
     * 记录值传递
     * @param {*} val - 值
     * @param {String} from - 来源
     * @param {String} to - 目标
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function recordValueTransfer(val, from, to, iid, location) {
        _recordValueChange(val, {
            type: "value_transfer",
            from: from,
            to: to,
            time: new Date().getTime(),
            iid: iid,
            location: location
        });
    }
    
    /**
     * 获取值的历史
     * @param {*} val - 值
     * @return {Array} 历史记录
     */
    function getValueHistory(val) {
        var identity = _getObjectIdentity(val);
        return _valueHistory[identity] || [];
    }
    
    /**
     * 获取值的创建信息
     * @param {*} val - 值
     * @return {Object} 创建信息
     */
    function getCreationInfo(val) {
        var identity = _getObjectIdentity(val);
        var history = _valueHistory[identity] || [];
        
        if (history.length > 0) {
            return history[0]; // 第一个记录是创建
        }
        
        return null;
    }
    
    /**
     * 获取值的最后修改信息
     * @param {*} val - 值
     * @return {Object} 最后修改信息
     */
    function getLastModification(val) {
        var identity = _getObjectIdentity(val);
        var history = _valueHistory[identity] || [];
        
        if (history.length > 0) {
            return history[history.length - 1]; // 最后一个记录是修改
        }
        
        return null;
    }
    
    /**
     * 获取值的类型演化历史
     * @param {*} val - 值
     * @return {Array} 类型历史
     */
    function getTypeEvolution(val) {
        var identity = _getObjectIdentity(val);
        var history = _valueHistory[identity] || [];
        var typeHistory = [];
        
        for (var i = 0; i < history.length; i++) {
            var entry = history[i];
            if (entry.newValue && entry.newValue._type) {
                typeHistory.push({
                    time: entry.time,
                    type: entry.newValue._type,
                    event: entry.type
                });
            }
        }
        
        return typeHistory;
    }
    
    /**
     * 清空历史记录
     */
    function clearHistory() {
        _valueHistory = new Object();
        _creationTime = new Object();
        _modificationCount = new Object();
        _objectIdCounter = 1000;
        console.log("[ValueHistory] 历史记录已清空");
    }
    
    /**
     * 获取统计信息
     * @return {Object} 统计信息
     */
    function getStatistics() {
        var totalObjects = 0;
        var totalModifications = 0;
        var objectTypes = {};
        
        for (var identity in _valueHistory) {
            totalObjects++;
            totalModifications += _modificationCount[identity];
            
            var history = _valueHistory[identity];
            if (history.length > 0 && history[0].newValue) {
                var type = history[0].newValue._type || "unknown";
                objectTypes[type] = (objectTypes[type] || 0) + 1;
            }
        }
        
        return {
            totalObjects: totalObjects,
            totalModifications: totalModifications,
            objectTypes: objectTypes,
            averageModifications: totalObjects > 0 ? totalModifications / totalObjects : 0
        };
    }
    
    // ==========================================================
    // Jalangi2 Analysis接口
    // ==========================================================
    
    /**
     * Jalangi2 write事件处理
     * @param {Number} iid - 指令ID
     * @param {String} name - 变量名
     * @param {*} val - 新值
     * @param {*} lhs - 左值
     */
    function write(iid, name, val, lhs) {
        // 获取位置信息
        var location = "unknown";
        if (typeof J$ !== "undefined" && J$.iidToLocation) {
            location = J$.iidToLocation(iid);
        }
        
        recordVariableWrite(name, val, iid, location);
        
        // 记录值传递
        if (lhs) {
            recordValueTransfer(val, "write", name, iid, location);
        }
    }
    
    /**
     * Jalangi2 invokeFun事件处理
     * @param {Number} iid - 指令ID
     * @param {Function} f - 函数
     * @param {*} base - 基础对象
     * @param {Array} args - 参数
     * @param {*} result - 返回值
     */
    function invokeFun(iid, f, base, args, result) {
        var functionName = "";
        if (f && f.name) {
            functionName = f.name;
        } else if (f && f.toString) {
            var match = f.toString().match(/function\s+(\w+)/);
            if (match) {
                functionName = match[1];
            } else {
                functionName = "anonymous";
            }
        } else {
            functionName = "unknown";
        }
        
        // 获取位置信息
        var location = "unknown";
        if (typeof J$ !== "undefined" && J$.iidToLocation) {
            location = J$.iidToLocation(iid);
        }
        
        // 记录函数返回
        recordFunctionReturn(functionName, result, args, iid, location);
        
        // 记录值传递给调用者
        if (result !== undefined) {
            recordValueTransfer(result, functionName, "caller", iid, location);
        }
        
        return result;
    }
    
    /**
     * Jalangi2 literal事件处理
     * @param {Number} iid - 指令ID
     * @param {*} val - 字面量值
     */
    function literal(iid, val) {
        if (typeof val === "object" && val !== null) {
            // 获取位置信息
            var location = "unknown";
            if (typeof J$ !== "undefined" && J$.iidToLocation) {
                location = J$.iidToLocation(iid);
            }
            
            recordObjectCreation("literal", val, "literal", iid, location);
        }
    }
    
    /**
     * Jalangi2 putField事件处理
     * @param {Number} iid - 指令ID
     * @param {*} base - 基础对象
     * @param {String} offset - 属性名
     * @param {*} val - 新值
     */
    function putField(iid, base, offset, val) {
        // 获取位置信息
        var location = "unknown";
        if (typeof J$ !== "undefined" && J$.iidToLocation) {
            location = J$.iidToLocation(iid);
        }
        
        recordPropertyWrite(base, offset, val, iid, location);
    }
    
    // ==========================================================
    // 模块接口
    // ==========================================================
    
    return {
        // 核心记录方法
        recordVariableWrite: recordVariableWrite,
        recordFunctionReturn: recordFunctionReturn,
        recordObjectCreation: recordObjectCreation,
        recordPropertyWrite: recordPropertyWrite,
        recordValueTransfer: recordValueTransfer,
        
        // 查询方法
        getValueHistory: getValueHistory,
        getCreationInfo: getCreationInfo,
        getLastModification: getLastModification,
        getTypeEvolution: getTypeEvolution,
        
        // 工具方法
        clearHistory: clearHistory,
        getStatistics: getStatistics,
        getObjectId: _getObjectIdentity,
        
        // Jalangi2接口
        write: write,
        invokeFun: invokeFun,
        literal: literal,
        putField: putField
    };
    
})();

// 如果Jalangi可用，注册analysis
if (typeof J$ !== "undefined") {
    J$.analysis = ValueHistoryTracker;
    console.log("[ValueHistory] 已注册到Jalangi2");
} else {
    console.log("[ValueHistory] Jalangi2不可用，作为独立模块使用");
}

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.ValueHistoryTracker = ValueHistoryTracker;
} else {
    this.ValueHistoryTracker = ValueHistoryTracker;
}

console.log("[ValueHistory] value-history.js 加载完成");
