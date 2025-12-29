/**
 * ref_resolver.js
 * --------------------------------------------------------------------
 * Resolve "$ref:..." references.
 *
 * Supports:
 * - $ref:vars.xxx.yyy
 * - $ref:steps.stepId.objectId
 * - $ref:last.objectId
 * --------------------------------------------------------------------
 */

var Ref_Resolver = (function () {
    /**
     * Safe path getter.
     * @param {*} root Root object
     * @param {Array} parts Path parts
     * @returns {*} Value or null
     */
    function _getPath(root, parts) {
        var cur = root;
        var i;
        for (i = 0; i < parts.length; i++) {
            if (cur == null) { return null; }
            cur = cur[parts[i]];
        }
        return (typeof cur === "undefined") ? null : cur;
    }

    /**
     * Check whether value is a ref string.
     * @param {*} v Value
     * @returns {Boolean}
     */
    function isRefString(v) {
        return (typeof v === "string" && v.indexOf("$ref:") === 0);
    }

    /**
     * Resolve ref string into actual value.
     * @param {String} ref Ref string
     * @param {Object} context Runtime context {vars, steps, last}
     * @returns {*} Resolved value (possibly null)
     */
    function resolveRefString(ref, context) {
        var expr = ref.substr(5); // remove "$ref:"
        var parts = expr.split(".");
        var scope = parts[0];
        var path = parts.slice(1);

        if (!context) { return null; }

        if (scope === "vars") {
            return _getPath(context.vars, path);
        }
        if (scope === "steps") {
            if (path.length < 1) { return null; }
            var stepId = path[0];
            var remain = path.slice(1);
            return _getPath(context.steps, [stepId].concat(remain));
        }
        if (scope === "last") {
            return _getPath(context.last, path);
        }
        return null;
    }

    /**
     * Deep resolve: replace any ref strings in object/array.
     * Note: minimal version only processes objects/arrays.
     * @param {*} value Any value
     * @param {Object} context Runtime context
     * @returns {*} Resolved value (shallow clone)
     */
    function deepResolve(value, context) {
        var i, k, out;

        if (isRefString(value)) {
            return resolveRefString(value, context);
        }

        // Array
        if (value && (value instanceof Array)) {
            out = [];
            for (i = 0; i < value.length; i++) {
                out[i] = deepResolve(value[i], context);
            }
            return out;
        }

        // Object
        if (value && typeof value === "object") {
            out = {};
            for (k in value) {
                if (value.hasOwnProperty(k)) {
                    out[k] = deepResolve(value[k], context);
                }
            }
            return out;
        }

        return value;
    }

    return {
        isRefString: isRefString,
        resolveRefString: resolveRefString,
        deepResolve: deepResolve
    };
})();

if (typeof window !== "undefined") {
    window["Ref_Resolver"] = Ref_Resolver;
} else if (typeof global !== "undefined") {
    global["Ref_Resolver"] = Ref_Resolver;
}
