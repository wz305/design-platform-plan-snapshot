/**
 * StackMap - 规范层名 <-> AD 层 ID/层序映射
 * 100% 兼容 JScript 5.8 (ES3)
 */

var StackMap = (function(){
    var _normalizedToLayerId = {};
    var _layerIdToNormalized = {};
    var _ordered = [];
    var _initOk = false;
    var _lastError = "";

    function _ui(level, message, context, fnName) {
        var text = String(message || "");
        var payload = context || null;
        var moduleName = "StackMap";
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

    function _reset() {
        _normalizedToLayerId = {};
        _layerIdToNormalized = {};
        _ordered = [];
        _initOk = false;
        _lastError = "";
    }

    function _addMapping(name, layerId) {
        if (!name || layerId === undefined || layerId === null) return;
        _normalizedToLayerId[name] = layerId;
        _layerIdToNormalized[String(layerId)] = name;
        var exists = false;
        var i;
        for (i = 0; i < _ordered.length; i++) {
            if (_ordered[i] === name) { exists = true; break; }
        }
        if (!exists) _ordered.push(name);
    }

    function _fallbackMinimal() {
        if (typeof eTopLayer !== "undefined") {
            _addMapping("TopLayer", eTopLayer);
        }
        if (typeof eBottomLayer !== "undefined") {
            _addMapping("BottomLayer", eBottomLayer);
        }
        if (typeof eMultiLayer !== "undefined") {
            _addMapping("MultiLayer", eMultiLayer);
        }
    }

    function initFromBoard(boardRef) {
        _reset();

        if (!boardRef || !boardRef.LayerStack) {
            _lastError = "LayerStack not available";
            _fallbackMinimal();
            _ui("warn", "StackMap fallback: LayerStack not available", { hasBoard: !!boardRef }, "initFromBoard");
            return { ok: false, error: _lastError, layers: _ordered.slice(0) };
        }

        var stack = boardRef.LayerStack;
        if (!stack || !stack.FirstLayer || !stack.NextLayer) {
            _lastError = "LayerStack methods not available";
            _fallbackMinimal();
            _ui("warn", "StackMap fallback: LayerStack methods not available", null, "initFromBoard");
            return { ok: false, error: _lastError, layers: _ordered.slice(0) };
        }

        var layerObj = null;
        var midIndex = 1;
        try {
            layerObj = stack.FirstLayer();
        } catch (e1) {}

        while (layerObj) {
            var layerId = null;
            var layerName = null;
            var isUsed = true;
            try { layerId = layerObj.LayerID; } catch (e2) {}
            try { layerName = layerObj.Name; } catch (e3) {}
            try { if (layerObj.IsUsed === false) isUsed = false; } catch (e4) {}

            if (isUsed && layerId !== null && layerId !== undefined) {
                if (typeof eTopLayer !== "undefined" && layerId === eTopLayer) {
                    _addMapping("TopLayer", layerId);
                } else if (typeof eBottomLayer !== "undefined" && layerId === eBottomLayer) {
                    _addMapping("BottomLayer", layerId);
                } else if (typeof eMultiLayer !== "undefined" && layerId === eMultiLayer) {
                    _addMapping("MultiLayer", layerId);
                } else {
                    _addMapping("MidLayer" + midIndex, layerId);
                    midIndex++;
                }
            }

            try {
                layerObj = stack.NextLayer(layerObj);
            } catch (e5) {
                layerObj = null;
            }
        }

        _fallbackMinimal();
        _initOk = true;
        return { ok: true, error: null, layers: _ordered.slice(0) };
    }

    function getLayerId(name) {
        if (_normalizedToLayerId.hasOwnProperty(name)) {
            return _normalizedToLayerId[name];
        }
        _ui("warn", "Unsupported layer name", { name: name }, "getLayerId");
        return null;
    }

    function getNormalizedLayerName(adLayerId) {
        var key = String(adLayerId || "");
        if (_layerIdToNormalized.hasOwnProperty(key)) {
            return _layerIdToNormalized[key];
        }
        return null;
    }

    function getAllNormalizedLayers() {
        return _ordered.slice(0);
    }

    function isSupportedLayerName(name) {
        return _normalizedToLayerId.hasOwnProperty(name);
    }

    return {
        initFromBoard: initFromBoard,
        getLayerId: getLayerId,
        getNormalizedLayerName: getNormalizedLayerName,
        getAllNormalizedLayers: getAllNormalizedLayers,
        isSupportedLayerName: isSupportedLayerName
    };
})();

// 统一的环境检测和导出
(function() {
    if (typeof exportModule !== "undefined" && exportModule) {
        try { exportModule("StackMap", StackMap); } catch (e0) {}
    }

    if (typeof window !== "undefined") {
        window.StackMap = StackMap;
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = StackMap;
    }

    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.StackMap = StackMap;
    }
})();
