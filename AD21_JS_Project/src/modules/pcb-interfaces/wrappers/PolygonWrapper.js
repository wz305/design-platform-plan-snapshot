/**
 * PolygonWrapper - 覆铜对象封装
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PolygonWrapper = (function(){

    function PolygonWrapper(options) {
        options = options || {};

        var baseInst = BasePCBWrapper.create({
            objectType: "Polygon",
            nativeObject: options.nativeObject,
            isMock: options.isMock || options.enableMock,
            enableMock: options.enableMock,
            mockData: options.mockData || {},
            syncMode: options.syncMode || "auto"
        });

        function _setIdentityFromNative(nativeRef) {
            if (!nativeRef) return;
            baseInst.nativeObject = nativeRef;
            baseInst.directRef = nativeRef;
            baseInst.isMock = false;
            try {
                if (nativeRef.I_ObjectAddress !== undefined && nativeRef.I_ObjectAddress !== null) {
                    var t = typeof nativeRef.I_ObjectAddress;
                    var addr = null;
                    try { addr = nativeRef.I_ObjectAddress; } catch (eAddr1) {}
                    if (typeof addr === "function") {
                        try { addr = addr(); } catch (eAddr2) {}
                    }
                    if (addr === null || addr === undefined || addr === 0) {
                        if (t === "function" || t === "unknown") {
                            addr = nativeRef.I_ObjectAddress();
                        }
                    }
                    baseInst.handle = addr;
                    baseInst.address = addr;
                } else if (nativeRef.ObjectAddress !== undefined && nativeRef.ObjectAddress !== null) {
                    baseInst.address = nativeRef.ObjectAddress;
                    baseInst.handle = nativeRef.ObjectAddress;
                }
            } catch (e1) {}
            if (!baseInst.handle && nativeRef) {
                baseInst.handle = nativeRef;
                baseInst.address = nativeRef;
            }
        }

        function _resolveLayerName(layerId) {
            if (typeof StackMap !== "undefined" && StackMap && StackMap.getNormalizedLayerName) {
                var name = StackMap.getNormalizedLayerName(layerId);
                if (name) return name;
            }
            if (typeof eTopLayer !== "undefined" && layerId === eTopLayer) return "TopLayer";
            if (typeof eBottomLayer !== "undefined" && layerId === eBottomLayer) return "BottomLayer";
            if (typeof eMultiLayer !== "undefined" && layerId === eMultiLayer) return "MultiLayer";
            return null;
        }

        function _readBounds(nativeObj) {
            if (!nativeObj) return null;
            var br = null;
            try {
                if (nativeObj.BoundingRectangle !== undefined && nativeObj.BoundingRectangle !== null) {
                    if (typeof nativeObj.BoundingRectangle === "function" || typeof nativeObj.BoundingRectangle === "unknown") {
                        br = nativeObj.BoundingRectangle();
                    } else {
                        br = nativeObj.BoundingRectangle;
                    }
                }
            } catch (e1) {}
            if (!br) return null;
            return {
                x1: br.Left,
                y1: br.Bottom,
                x2: br.Right,
                y2: br.Top
            };
        }

        function _readPropOrCall(obj, propName) {
            if (!obj) return null;
            try {
                var v = obj[propName];
                if (typeof v === "function" || typeof v === "unknown") {
                    return v();
                }
                return v;
            } catch (e1) {}
            return null;
        }

        function toSpec() {
            var nativeObj = baseInst.nativeObject || null;
            var layerId = null;
            try { layerId = nativeObj.Layer; } catch (e1) {}
            var layerName = _resolveLayerName(layerId);

            var netName = "";
            try { if (nativeObj.Net && nativeObj.Net.Name) netName = nativeObj.Net.Name; } catch (e2) {}

            var polyType = _readPropOrCall(nativeObj, "PolygonType");
            if (polyType === null) {
                polyType = _readPropOrCall(nativeObj, "GetState_PolygonType");
            }

            var pourOver = _readPropOrCall(nativeObj, "PourOver");
            if (pourOver === null) {
                pourOver = _readPropOrCall(nativeObj, "GetState_PourOver");
            }

            return {
                schema: "spec/0.1",
                type: "polygon",
                handle: baseInst.handle || null,
                address: baseInst.address || null,
                payload: {
                    layer: layerName,
                    net: netName,
                    polygonType: polyType,
                    pourOver: pourOver,
                    bounds: _readBounds(nativeObj)
                }
            };
        }

        function initFromNative(nativeRef) {
            if (!nativeRef) return false;
            _setIdentityFromNative(nativeRef);
            try { baseInst._extractSpecificProperties(); } catch (e1) {}
            if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
                try { PCBObjectPool.register(baseInst); } catch (eReg) {}
            }
            return true;
        }

        baseInst.initFromNative = initFromNative;
        baseInst.toSpec = toSpec;

        if (options.nativeObject) {
            _setIdentityFromNative(options.nativeObject);
        }

        return baseInst;
    }

    PolygonWrapper.create = function(options) {
        return PolygonWrapper(options);
    };

    return PolygonWrapper;
})();

(function() {
    if (typeof window !== "undefined") {
        window.PolygonWrapper = PolygonWrapper;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = PolygonWrapper;
    }
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PolygonWrapper = PolygonWrapper;
    }
})();
