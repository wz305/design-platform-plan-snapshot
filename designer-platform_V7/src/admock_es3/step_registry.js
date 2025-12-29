/**
 * step_registry.js
 * --------------------------------------------------------------------
 * Step Handler registry: op -> handler(step, ctx, adapter)
 * Supports alias (e.g. pcb.CreateTrack -> CreateTrack).
 * --------------------------------------------------------------------
 */

var Step_Registry = (function () {
    var _handlers = {};
    var _aliases = {};

    /**
     * Normalize op name (handle aliases).
     * @param {String} op Raw op
     * @returns {String} Normalized op
     */
    function normalizeOp(op) {
        if (!op) { return ""; }
        if (_aliases[op]) { return _aliases[op]; }
        return op;
    }

    /**
     * Register handler.
     * @param {String} op Canonical op
     * @param {Function} handler Handler function
     */
    function register(op, handler) {
        _handlers[op] = handler;
    }

    /**
     * Register alias.
     * @param {String} alias Alias (e.g. pcb.CreateTrack)
     * @param {String} canonical Canonical op (e.g. CreateTrack)
     */
    function registerAlias(alias, canonical) {
        _aliases[alias] = canonical;
    }

    /**
     * Get handler.
     * @param {String} op Op name (possibly alias)
     * @returns {Function|null}
     */
    function getHandler(op) {
        var k = normalizeOp(op);
        return _handlers[k] || null;
    }

    /**
     * Install default steps (minimal loop).
     * @param {Object} logger Logger module (optional)
     */
    function installDefaults(logger) {
        // CreateTrack
        register("CreateTrack", function (step, ctx, adapter) {
            return adapter.createObject("Track", step.args);
        });

        // GetObjects
        register("GetObjects", function (step, ctx, adapter) {
            return adapter.queryObjects(step.args);
        });

        // RunProcess
        register("RunProcess", function (step, ctx, adapter) {
            var a = step.args || {};
            return adapter.runProcess(a.server, a.process, a.params);
        });

        // DeleteObject
        register("DeleteObject", function (step, ctx, adapter) {
            return adapter.deleteObject(step.args && step.args.id);
        });

        // Common aliases
        registerAlias("pcb.CreateTrack", "CreateTrack");
        registerAlias("pcb.GetObjects", "GetObjects");
        registerAlias("pcb.RunProcess", "RunProcess");
        registerAlias("pcb.DeleteObject", "DeleteObject");

        if (logger && logger.log) {
            logger.log("Default steps installed: CreateTrack/GetObjects/RunProcess/DeleteObject");
        }
    }

    return {
        normalizeOp: normalizeOp,
        register: register,
        registerAlias: registerAlias,
        getHandler: getHandler,
        installDefaults: installDefaults
    };
})();

if (typeof window !== "undefined") {
    window["Step_Registry"] = Step_Registry;
} else if (typeof global !== "undefined") {
    global["Step_Registry"] = Step_Registry;
}
