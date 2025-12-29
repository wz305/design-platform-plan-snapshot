/**
 * PCBObjectPool - 唯一对象池（byHandle/byAddress）
 * 提供对象生命周期管理与引用校验
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBObjectPool = (function(){
    var _moduleVersion = "2.0.0";

    var _byHandle = {};
    var _byHandleRef = [];
    var _byAddress = {};
    var _byPoolId = {};
    var _poolSeq = 0;
    var _byType = {};
    var _activeBoardKey = "";

    var _stats = {
        total: 0,
        hits: 0,
        misses: 0,
        invalidations: 0,
        registered: 0,
        lastResetAt: 0,
        lastResetReason: ""
    };

    function _ui(level, message, context, fnName) {
        var text = String(message || "");
        var payload = context || null;
        var moduleName = "PCBObjectPool";
        var functionName = fnName || "";

        try {
            if (typeof UILoggerModule !== "undefined" && UILoggerModule) {
                if (level === "error" && UILoggerModule.uiError) {
                    UILoggerModule.uiError(text, payload, moduleName, functionName);
                    return;
                }
                if (level === "warn" && UILoggerModule.uiWarn) {
                    UILoggerModule.uiWarn(text, payload, moduleName, functionName);
                    return;
                }
                if (UILoggerModule.uiInfo) {
                    UILoggerModule.uiInfo(text, payload, moduleName, functionName);
                    return;
                }
            }
        } catch (e1) {}

        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) {
                var line = "[" + String(level).toUpperCase() + "] " + text;
                if (payload) {
                    try { line += " " + JSON.stringify(payload); } catch (e2) {}
                }
                memLog.Lines.Add(line);
                return;
            }
        } catch (e3) {}

        try {
            if (typeof ShowMessage !== "undefined") {
                ShowMessage(text);
            }
        } catch (e4) {}
    }

    function _resetStats(reason) {
        _stats = {
            total: 0,
            hits: 0,
            misses: 0,
            invalidations: 0,
            registered: 0,
            lastResetAt: new Date().getTime(),
            lastResetReason: reason || ""
        };
    }

    function _isRefHandle(value) {
        var t = typeof value;
        return (t === "object" || t === "function" || t === "unknown");
    }

    function _readHandle(wrapper) {
        if (!wrapper) return null;
        if (wrapper.handle !== undefined && wrapper.handle !== null) return wrapper.handle;
        if (wrapper.getHandle && typeof wrapper.getHandle === "function") {
            try { return wrapper.getHandle(); } catch (e1) {}
        }
        try {
            if (wrapper.I_ObjectAddress !== undefined && wrapper.I_ObjectAddress !== null) {
                if (typeof wrapper.I_ObjectAddress === "function" || typeof wrapper.I_ObjectAddress === "unknown") {
                    try { return wrapper.I_ObjectAddress(); } catch (e2a) {}
                }
                return wrapper.I_ObjectAddress;
            }
        } catch (e2) {}
        try {
            if (wrapper.nativeObject && wrapper.nativeObject.I_ObjectAddress !== undefined && wrapper.nativeObject.I_ObjectAddress !== null) {
                if (typeof wrapper.nativeObject.I_ObjectAddress === "function" || typeof wrapper.nativeObject.I_ObjectAddress === "unknown") {
                    try { return wrapper.nativeObject.I_ObjectAddress(); } catch (e3a) {}
                }
                return wrapper.nativeObject.I_ObjectAddress;
            }
        } catch (e3) {}
        return null;
    }

    function _readAddress(wrapper) {
        if (!wrapper) return null;
        if (wrapper.address !== undefined && wrapper.address !== null) return wrapper.address;
        if (wrapper.getAddress && typeof wrapper.getAddress === "function") {
            try { return wrapper.getAddress(); } catch (e1) {}
        }
        try {
            if (wrapper.ObjectAddress !== undefined && wrapper.ObjectAddress !== null) {
                return wrapper.ObjectAddress;
            }
        } catch (e2) {}
        try {
            if (wrapper.nativeObject && wrapper.nativeObject.ObjectAddress !== undefined) {
                return wrapper.nativeObject.ObjectAddress;
            }
        } catch (e3) {}
        return null;
    }

    function _toKey(value) {
        if (value === null || value === undefined) return null;
        if (typeof value === "unknown") return null;
        if (typeof value === "function") {
            try { value = value(); } catch (e0) {}
        }
        if (typeof value === "string" || typeof value === "number") return String(value);
        try { return String(value); } catch (e1) {}
        return null;
    }

    function _readType(wrapper) {
        if (!wrapper) return "unknown";
        if (wrapper.objectType) return String(wrapper.objectType);
        if (wrapper.getObjectType && typeof wrapper.getObjectType === "function") {
            try { return String(wrapper.getObjectType()); } catch (e1) {}
        }
        return "unknown";
    }

    function _removeFromType(wrapper) {
        var type = _readType(wrapper);
        if (!_byType[type] || !_byType[type].length) return;
        var next = [];
        var i;
        for (i = 0; i < _byType[type].length; i++) {
            if (_byType[type][i] !== wrapper) next.push(_byType[type][i]);
        }
        _byType[type] = next;
    }

    function attachBoard(boardKey) {
        var key = String(boardKey || "");
        if (_activeBoardKey && key && _activeBoardKey !== key) {
            reset("boardKey changed: " + _activeBoardKey + " -> " + key);
        }
        _activeBoardKey = key;
        return _activeBoardKey;
    }

    function register(wrapper) {
        if (!wrapper) {
            _ui("warn", "register: wrapper is null", null, "register");
            return false;
        }

        var handle = _readHandle(wrapper);
        var address = _readAddress(wrapper);
        var type = _readType(wrapper);

        if (wrapper.poolId === undefined || wrapper.poolId === null) {
            _poolSeq = _poolSeq + 1;
            wrapper.poolId = _poolSeq;
        }

        if (handle === null && address === null && (wrapper.poolId === null || wrapper.poolId === undefined)) {
            _ui("warn", "register: missing handle/address", { type: type }, "register");
            return false;
        }

        var handleKey = _toKey(handle);
        var addrKey = _toKey(address);

        if (handleKey !== null) {
            _byHandle[handleKey] = wrapper;
        } else if (_isRefHandle(handle)) {
            _byHandleRef.push({ handle: handle, wrapper: wrapper });
        }
        if (addrKey !== null) {
            _byAddress[addrKey] = wrapper;
        }
        if (wrapper.poolId !== undefined && wrapper.poolId !== null) {
            _byPoolId[String(wrapper.poolId)] = wrapper;
        }

        if (!_byType[type]) {
            _byType[type] = [];
        }
        _byType[type].push(wrapper);

        _stats.registered++;
        _stats.total = _countTotal();
        return true;
    }

    function _countTotal() {
        var key;
        var count = 0;
        var seen = [];
        function _mark(wrapper) {
            if (!wrapper) return;
            var i;
            for (i = 0; i < seen.length; i++) {
                if (seen[i] === wrapper) return;
            }
            seen.push(wrapper);
            count++;
        }
        for (key in _byHandle) {
            if (_byHandle.hasOwnProperty(key)) _mark(_byHandle[key]);
        }
        for (key in _byAddress) {
            if (_byAddress.hasOwnProperty(key)) _mark(_byAddress[key]);
        }
        for (key in _byPoolId) {
            if (_byPoolId.hasOwnProperty(key)) _mark(_byPoolId[key]);
        }
        if (_byHandleRef.length) {
            count += _byHandleRef.length;
        }
        return count;
    }

    function getByHandle(handle) {
        if (_isRefHandle(handle)) {
            var i;
            for (i = 0; i < _byHandleRef.length; i++) {
                if (_byHandleRef[i].handle === handle) {
                    _stats.hits++;
                    return _byHandleRef[i].wrapper;
                }
            }
            _stats.misses++;
            return null;
        }

        var key = String(handle || "");
        if (_byHandle.hasOwnProperty(key)) {
            _stats.hits++;
            return _byHandle[key];
        }
        _stats.misses++;
        return null;
    }

    function getByAddress(address) {
        var key = String(address || "");
        if (_byAddress.hasOwnProperty(key)) {
            _stats.hits++;
            return _byAddress[key];
        }
        _stats.misses++;
        return null;
    }

    function getByPoolId(poolId) {
        var key = String(poolId || "");
        if (_byPoolId.hasOwnProperty(key)) {
            _stats.hits++;
            return _byPoolId[key];
        }
        _stats.misses++;
        return null;
    }

    function invalidate(keyOrWrapper) {
        var wrapper = null;
        if (keyOrWrapper && typeof keyOrWrapper === "object") {
            wrapper = keyOrWrapper;
        } else {
            var k = String(keyOrWrapper || "");
            wrapper = _byHandle[k] || _byAddress[k] || _byPoolId[k] || null;
        }

        if (!wrapper) return false;

        var handle = _readHandle(wrapper);
        var address = _readAddress(wrapper);

        if (handle !== null && handle !== undefined) {
            if (_isRefHandle(handle)) {
                var next = [];
                var i;
                for (i = 0; i < _byHandleRef.length; i++) {
                    if (_byHandleRef[i].handle !== handle) next.push(_byHandleRef[i]);
                }
                _byHandleRef = next;
            } else {
                delete _byHandle[String(handle)];
            }
        }
        if (address !== null && address !== undefined) {
            delete _byAddress[String(address)];
        }
        if (wrapper.poolId !== undefined && wrapper.poolId !== null) {
            delete _byPoolId[String(wrapper.poolId)];
        }

        _removeFromType(wrapper);
        _stats.invalidations++;
        _stats.total = _countTotal();
        return true;
    }

    function reset(reason) {
        _byHandle = {};
        _byHandleRef = [];
        _byAddress = {};
        _byPoolId = {};
        _poolSeq = 0;
        _byType = {};
        _resetStats(reason || "reset");
        return true;
    }

    function stats() {
        var typeCounts = {};
        var key;
        for (key in _byType) {
            if (_byType.hasOwnProperty(key)) {
                typeCounts[key] = _byType[key].length;
            }
        }
        var handleCount = 0;
        var addressCount = 0;
        var poolCount = 0;
        for (key in _byHandle) {
            if (_byHandle.hasOwnProperty(key)) handleCount++;
        }
        for (key in _byAddress) {
            if (_byAddress.hasOwnProperty(key)) addressCount++;
        }
        for (key in _byPoolId) {
            if (_byPoolId.hasOwnProperty(key)) poolCount++;
        }
        return {
            total: _stats.total,
            hits: _stats.hits,
            misses: _stats.misses,
            invalidations: _stats.invalidations,
            registered: _stats.registered,
            lastResetAt: _stats.lastResetAt,
            lastResetReason: _stats.lastResetReason,
            boardKey: _activeBoardKey,
            byType: typeCounts,
            byHandleCount: handleCount,
            byAddressCount: addressCount,
            byPoolIdCount: poolCount
        };
    }

    function validateRef(wrapper) {
        if (!wrapper) {
            return { ok: false, error: "no-wrapper" };
        }

        var ref = null;
        try {
            if (wrapper.directRef) ref = wrapper.directRef;
        } catch (e1) {}

        try {
            if (!ref && wrapper.nativeObject) ref = wrapper.nativeObject;
        } catch (e2) {}

        try {
            if (!ref && wrapper.getNativeObject && typeof wrapper.getNativeObject === "function") {
                ref = wrapper.getNativeObject();
            }
        } catch (e3) {}

        if (!ref) {
            invalidate(wrapper);
            return { ok: false, error: "no-direct-ref" };
        }

        try {
            if (ref.I_ObjectAddress !== undefined || ref.ObjectAddress !== undefined) {
                return { ok: true };
            }
        } catch (e4) {}

        invalidate(wrapper);
        return { ok: false, error: "invalid-ref" };
    }

    // === 兼容旧接口 ===
    function initialize() {
        return reset("initialize");
    }

    function addToPool(poolType, key, object) {
        var obj = object || null;
        if (obj && typeof obj === "object") {
            if (key !== undefined && key !== null) {
                obj.handle = obj.handle !== undefined ? obj.handle : key;
                obj.address = obj.address !== undefined ? obj.address : key;
            }
            return register(obj);
        }
        if (key !== undefined && key !== null) {
            _byHandle[String(key)] = obj;
            _stats.total = _countTotal();
            return true;
        }
        return false;
    }

    function getFromPool(poolType, key) {
        return getByPoolId(key) || getByHandle(key) || getByAddress(key);
    }

    function removeFromPool(poolType, key) {
        return invalidate(key);
    }

    function clearPool(poolType) {
        return reset("clearPool:" + String(poolType || ""));
    }

    function clearAllPools() {
        return reset("clearAllPools");
    }

    function getPoolSize(poolType) {
        return _countTotal();
    }

    function getAllPoolObjects(poolType) {
        var list = [];
        var seen = {};
        var key;
        for (key in _byPoolId) {
            if (_byPoolId.hasOwnProperty(key)) {
                list.push({ poolId: key, handle: null, address: null, wrapper: _byPoolId[key], type: _readType(_byPoolId[key]) });
                seen[key] = true;
            }
        }
        for (key in _byHandle) {
            if (_byHandle.hasOwnProperty(key)) {
                list.push({ poolId: _byHandle[key] && _byHandle[key].poolId !== undefined ? _byHandle[key].poolId : null, handle: key, address: null, wrapper: _byHandle[key], type: _readType(_byHandle[key]) });
                seen[key] = true;
            }
        }
        for (key in _byAddress) {
            if (_byAddress.hasOwnProperty(key) && !seen[key]) {
                list.push({ poolId: _byAddress[key] && _byAddress[key].poolId !== undefined ? _byAddress[key].poolId : null, handle: null, address: key, wrapper: _byAddress[key], type: _readType(_byAddress[key]) });
            }
        }
        return list;
    }

    function getPoolStatistics() {
        return stats();
    }

    function configurePool(config) {
        // 兼容接口：当前实现不启用自动清理
        return true;
    }

    function performCleanup() {
        // 兼容接口：当前实现不执行自动清理
        return 0;
    }

    return {
        // 新API
        attachBoard: attachBoard,
        register: register,
        getByHandle: getByHandle,
        getByAddress: getByAddress,
        getByPoolId: getByPoolId,
        invalidate: invalidate,
        reset: reset,
        stats: stats,
        validateRef: validateRef,

        // 兼容旧接口
        initialize: initialize,
        addToPool: addToPool,
        getFromPool: getFromPool,
        removeFromPool: removeFromPool,
        clearPool: clearPool,
        clearAllPools: clearAllPools,
        getPoolSize: getPoolSize,
        getAllPoolObjects: getAllPoolObjects,
        getPoolStatistics: getPoolStatistics,
        configurePool: configurePool,
        performCleanup: performCleanup,

        version: _moduleVersion
    };
})();

// 统一的环境检测和导出
(function() {
    if (typeof exportModule !== "undefined" && exportModule) {
        try { exportModule("PCBObjectPool", PCBObjectPool); } catch (e0) {}
    }

    if (typeof window !== "undefined") {
        window.PCBObjectPool = PCBObjectPool;
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PCBObjectPool;
    }

    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PCBObjectPool = PCBObjectPool;
    }
})();
