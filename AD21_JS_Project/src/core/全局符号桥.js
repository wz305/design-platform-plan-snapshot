/**
 * 全局符号桥
 *
 * 用途：
 * - 提供“安全访问 AD 宿主全局符号”的统一入口
 * - 默认不使用 eval；仅当直接不可达时走 __adGetHostGlobal
 */
var 全局符号桥 = (function () {
    var _enableHostBridge = true;
    var _allow = {
        "PCBServer": 1,
        "Client": 1,
        "SchServer": 1,
        "GetWorkspace": 1,
        "Workspace": 1
    };

    function _isAllowed(name) {
        return !!_allow[String(name)];
    }

    function get(name) {
        name = String(name);
        if (!_isAllowed(name)) return undefined;

        try {
            if (name === "PCBServer" && typeof PCBServer !== "undefined") return PCBServer;
            if (name === "Client" && typeof Client !== "undefined") return Client;
            if (name === "SchServer" && typeof SchServer !== "undefined") return SchServer;
            if (name === "GetWorkspace" && typeof GetWorkspace !== "undefined") return GetWorkspace;
            if (name === "Workspace" && typeof Workspace !== "undefined") return Workspace;
        } catch (e1) {}

        if (_enableHostBridge && typeof __adGetHostGlobal === "function") {
            return __adGetHostGlobal(name);
        }

        return undefined;
    }

    function mustGet(name, logFn) {
        var v = get(name);
        if (!v) {
            try {
                if (logFn) {
                    logFn("HOST_GLOBAL_MISSING: " + name, { name: name });
                }
            } catch (e) {}
            return null;
        }
        return v;
    }

    function allow(name) {
        _allow[String(name)] = 1;
    }

    return {
        get: get,
        mustGet: mustGet,
        allow: allow
    };
})();

// 统一导出
(function () {
    if (typeof exportModule !== "undefined" && exportModule) {
        try { exportModule("全局符号桥", 全局符号桥); } catch (e0) {}
    }
    if (typeof window !== "undefined") {
        window["全局符号桥"] = 全局符号桥;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = 全局符号桥;
    }
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global["全局符号桥"] = 全局符号桥;
    }
})();
