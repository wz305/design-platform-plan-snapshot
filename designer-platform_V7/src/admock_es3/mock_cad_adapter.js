/**
 * mock_cad_adapter.js
 * --------------------------------------------------------------------
 * Browser mock adapter implementing the unified Adapter contract:
 * - getBoard()
 * - createObject(type,args)
 * - updateObject(objectId,patch)
 * - deleteObject(objectId)
 * - queryObjects(filter)
 * - runProcess(server,process,params)
 *
 * Note: all coord/size fields are TCoord integers.
 * --------------------------------------------------------------------
 */

var Mock_CadAdapter = (function () {
    /**
     * Factory function.
     * @param {Object} store Result of Mock_BoardStore.createDefaultStore()
     * @param {Object} pcbServer Result of Mock_PCBServerFactory.PCBServer()
     * @param {Object} logger Util_Logger (optional)
     * @returns {Object} adapter
     */
    function create(store, pcbServer, logger) {
        var _store = store;
        var _pcb = pcbServer;

        function _log(msg) { if (logger && logger.log) { logger.log(msg); } }

        function _makeObjectId(nativeId) {
            return "mock:" + String(nativeId);
        }

        function getBoard() {
            return _store;
        }

        function createObject(type, args) {
            var t = String(type || "");
            var a = args || {};

            _pcb.PreProcess();
            try {
                var obj = _pcb.PCBObjectFactory(t, null, null);
                var id = Mock_BoardStore.newId();

                obj.__type = t;
                obj.nativeId = id;
                obj.objectId = _makeObjectId(id);

                if (t === "Track") {
                    obj.X1 = a.from && a.from.x;
                    obj.Y1 = a.from && a.from.y;
                    obj.X2 = a.to && a.to.x;
                    obj.Y2 = a.to && a.to.y;
                    obj.Width = (typeof a.width === "number") ? a.width : 10000;
                    obj.Layer = a.layer || "Top";
                    obj.NetName = a.net || "";
                } else if (t === "Via") {
                    obj.X = a.position && a.position.x;
                    obj.Y = a.position && a.position.y;
                    obj.Size = a.size || 200000;
                    obj.Hole = a.hole || 100000;
                    obj.FromLayer = a.fromLayer || "Top";
                    obj.ToLayer = a.toLayer || "Bottom";
                    obj.Layer = "Multi";
                    obj.NetName = a.net || "";
                } else if (t === "Pad") {
                    obj.Name = a.name || "";
                    obj.X = a.position && a.position.x;
                    obj.Y = a.position && a.position.y;
                    obj.SizeX = a.size && a.size.x;
                    obj.SizeY = a.size && a.size.y;
                    obj.Hole = a.hole || 0;
                    obj.Layer = a.layer || "Top";
                } else if (t === "Arc") {
                    obj.CX = a.center && a.center.x;
                    obj.CY = a.center && a.center.y;
                    obj.Radius = a.radius || 0;
                    obj.StartAngle = a.startAngle || 0;
                    obj.EndAngle = a.endAngle || 0;
                    obj.Width = a.width || 10000;
                    obj.Layer = a.layer || "Top";
                }

                _store.objects.push(obj);

                _log("Mock createObject: " + t + " => " + obj.objectId);

                return {
                    objectId: obj.objectId,
                    type: t,
                    nativeId: id
                };
            } finally {
                _pcb.PostProcess();
            }
        }

        function updateObject(objectId, patch) {
            var obj = Mock_BoardStore.findByObjectId(_store, objectId);
            if (!obj) {
                return { success: false, error: { code: "E_NOT_FOUND", message: "Object not found: " + objectId } };
            }

            _pcb.PreProcess();
            try {
                var k;
                for (k in patch) {
                    if (patch.hasOwnProperty(k)) {
                        obj[k] = patch[k];
                    }
                }
                return { objectId: objectId };
            } finally {
                _pcb.PostProcess();
            }
        }

        function deleteObject(objectId) {
            var i, obj;
            _pcb.PreProcess();
            try {
                for (i = 0; i < _store.objects.length; i++) {
                    obj = _store.objects[i];
                    if (obj && obj.objectId === objectId) {
                        _store.objects.splice(i, 1);
                        return { objectId: objectId };
                    }
                }
                return { success: false, error: { code: "E_NOT_FOUND", message: "Object not found: " + objectId } };
            } finally {
                _pcb.PostProcess();
            }
        }

        function queryObjects(filter) {
            var f = filter || {};
            var it = Mock_Iterator.createBoardIterator(_store);

            if (f.type) {
                var tt = String(f.type);
                tt = (tt === "track") ? "Track" : tt;
                tt = (tt === "via") ? "Via" : tt;
                tt = (tt === "pad") ? "Pad" : tt;
                tt = (tt === "arc") ? "Arc" : tt;
                it.AddFilter_ObjectSet([tt]);
            }

            if (f.layer) {
                it.AddFilter_LayerSet([String(f.layer)]);
            }

            if (f.area) {
                it.AddFilter_Area(f.area.x1, f.area.y1, f.area.x2, f.area.y2);
            }

            var out = [];
            var obj = it.FirstPCBObject();
            while (obj) {
                if (f.net) {
                    if (String(obj.NetName) !== String(f.net)) {
                        obj = it.NextPCBObject();
                        continue;
                    }
                }

                out.push({
                    objectId: obj.objectId,
                    type: obj.__type,
                    layer: obj.Layer,
                    net: obj.NetName,
                    X1: obj.X1, Y1: obj.Y1, X2: obj.X2, Y2: obj.Y2,
                    X: obj.X, Y: obj.Y,
                    Width: obj.Width
                });

                obj = it.NextPCBObject();
            }

            return { objects: out };
        }

        function runProcess(server, process, params) {
            _store.logs.push({
                type: "RunProcess",
                server: server,
                process: process,
                params: params,
                at: new Date().getTime()
            });
            return { ok: true };
        }

        return {
            getBoard: getBoard,
            createObject: createObject,
            updateObject: updateObject,
            deleteObject: deleteObject,
            queryObjects: queryObjects,
            runProcess: runProcess
        };
    }

    return {
        create: create
    };
})();

if (typeof window !== "undefined") {
    window["Mock_CadAdapter"] = Mock_CadAdapter;
} else if (typeof global !== "undefined") {
    global["Mock_CadAdapter"] = Mock_CadAdapter;
}
