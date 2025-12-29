/**
 * BoardOutlineWrapper - 板框对象封装
 * 100% 兼容 JScript 5.8 (ES3)
 */

var BoardOutlineWrapper = (function(){

    function BoardOutlineWrapper(options) {
        options = options || {};

        var baseInst = BasePCBWrapper.create({
            objectType: "BoardOutline",
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

        function _segmentFromPrimitive(obj) {
            if (!obj) return null;
            var oid = null;
            var oidStr = "";
            try { oid = obj.ObjectId; } catch (e0) {}
            try { if (obj.ObjectIDString !== undefined) oidStr = String(obj.ObjectIDString); } catch (e1) {}
            if (!oidStr) {
                try { if (obj.ObjectIdString !== undefined) oidStr = String(obj.ObjectIdString); } catch (e2) {}
            }

            if ((typeof eTrackObject !== "undefined" && oid === eTrackObject) || oidStr === "Track") {
                var x1 = null, y1 = null, x2 = null, y2 = null, width = null, layerId = null;
                try { x1 = obj.X1; } catch (e3) {}
                try { y1 = obj.Y1; } catch (e4) {}
                try { x2 = obj.X2; } catch (e5) {}
                try { y2 = obj.Y2; } catch (e6) {}
                try { width = obj.Width; } catch (e7) {}
                try { layerId = obj.Layer; } catch (e8) {}
                return {
                    type: "track",
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    width: width,
                    layer: _resolveLayerName(layerId)
                };
            }

            if ((typeof eArcObject !== "undefined" && oid === eArcObject) || oidStr === "Arc") {
                var cx = null, cy = null, radius = null, sa = null, ea = null, lineWidth = null, layerId2 = null;
                try { cx = obj.XCenter; } catch (e9) {}
                try { cy = obj.YCenter; } catch (e10) {}
                try { radius = obj.Radius; } catch (e11) {}
                try { sa = obj.StartAngle; } catch (e12) {}
                try { ea = obj.EndAngle; } catch (e13) {}
                try { lineWidth = obj.LineWidth; } catch (e14) {}
                try { layerId2 = obj.Layer; } catch (e15) {}
                return {
                    type: "arc",
                    centerX: cx,
                    centerY: cy,
                    radius: radius,
                    startAngle: sa,
                    endAngle: ea,
                    width: lineWidth,
                    layer: _resolveLayerName(layerId2)
                };
            }

            return null;
        }

        function _collectSegments(nativeObj) {
            var segments = [];
            if (!nativeObj) return segments;

            var it = null;
            try {
                if (typeof nativeObj.GroupIterator_Create !== "undefined") {
                    it = nativeObj.GroupIterator_Create();
                }
            } catch (e1) { it = null; }

            function _iterFirst(iterator) {
                var p = null;
                try {
                    if (typeof iterator.FirstPCBObject !== "undefined") {
                        p = iterator.FirstPCBObject();
                    } else if (typeof iterator.First !== "undefined") {
                        p = (typeof iterator.First === "function") ? iterator.First() : iterator.First;
                    }
                } catch (e2) { p = null; }
                return p || null;
            }

            function _iterNext(iterator) {
                var p = null;
                try {
                    if (typeof iterator.NextPCBObject !== "undefined") {
                        p = iterator.NextPCBObject();
                    } else if (typeof iterator.Next !== "undefined") {
                        p = (typeof iterator.Next === "function") ? iterator.Next() : iterator.Next;
                    }
                } catch (e3) { p = null; }
                return p || null;
            }

            if (it) {
                try {
                    if (typeof it.AddFilter_ObjectSet !== "undefined" && typeof MkSet === "function") {
                        var args = [];
                        if (typeof eTrackObject !== "undefined") args.push(eTrackObject);
                        if (typeof eArcObject !== "undefined") args.push(eArcObject);
                        if (args.length > 0) {
                            it.AddFilter_ObjectSet(MkSet.apply(null, args));
                        }
                    }
                } catch (e4) {}

                var cur = _iterFirst(it);
                while (cur) {
                    var seg = _segmentFromPrimitive(cur);
                    if (seg) segments.push(seg);
                    cur = _iterNext(it);
                }

                try {
                    if (typeof nativeObj.GroupIterator_Destroy !== "undefined") {
                        nativeObj.GroupIterator_Destroy(it);
                    }
                } catch (e5) {}

                return segments;
            }

            try {
                if (typeof nativeObj.GetPrimitiveCount === "function" && typeof nativeObj.GetPrimitiveAt === "function") {
                    var total = nativeObj.GetPrimitiveCount();
                    var i;
                    for (i = 0; i < total; i++) {
                        var obj = nativeObj.GetPrimitiveAt(i);
                        var seg2 = _segmentFromPrimitive(obj);
                        if (seg2) segments.push(seg2);
                    }
                }
            } catch (e6) {}

            return segments;
        }

        function toSpec() {
            var nativeObj = baseInst.nativeObject || null;
            var bounds = _readBounds(nativeObj);
            var segments = _collectSegments(nativeObj);
            return {
                schema: "spec/0.1",
                type: "board.outline",
                handle: baseInst.handle || null,
                address: baseInst.address || null,
                payload: {
                    bounds: bounds,
                    segmentCount: segments.length,
                    segments: segments
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

    BoardOutlineWrapper.create = function(options) {
        return BoardOutlineWrapper(options);
    };

    return BoardOutlineWrapper;
})();

(function() {
    if (typeof window !== "undefined") {
        window.BoardOutlineWrapper = BoardOutlineWrapper;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = BoardOutlineWrapper;
    }
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.BoardOutlineWrapper = BoardOutlineWrapper;
    }
})();
