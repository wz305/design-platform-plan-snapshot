/**
 * task_runtime_core.js
 * --------------------------------------------------------------------
 * ES3 task runtime (minimal loop)
 * - run steps sequentially
 * - resolve $ref references (deepResolve)
 * - saveAs -> context.vars
 * - results -> context.steps[stepId] and context.last
 * --------------------------------------------------------------------
 */

var Task_RuntimeCore = (function () {
    /**
     * Create a standard error object.
     * @param {String} code Error code
     * @param {String} message Error message
     * @param {*} detail Optional detail
     * @returns {Object}
     */
    function _makeError(code, message, detail) {
        return {
            success: false,
            error: {
                code: code,
                message: message,
                detail: detail || null
            }
        };
    }

    /**
     * Normalize step result.
     * @param {Object} raw Handler return value
     * @returns {Object}
     */
    function _normalizeResult(raw) {
        if (!raw) { return { success: true }; }
        if (typeof raw.success === "boolean") { return raw; }
        raw.success = true;
        return raw;
    }

    /**
     * Run a single step.
     * @param {Object} step Step definition
     * @param {Object} ctx Context
     * @param {Object} adapter Adapter
     * @param {Object} registry Step registry
     * @param {Object} clock Timestamp tool
     * @returns {Object} result
     */
    function _runStep(step, ctx, adapter, registry, clock) {
        if (!step || !step.op) {
            return _makeError("E_STEP_INVALID", "Step missing op", step);
        }

        var handler = registry.getHandler(step.op);
        if (!handler) {
            return _makeError("E_OP_NOT_FOUND", "No handler for op: " + step.op, step);
        }

        var resolvedStep = {
            id: step.id,
            op: registry.normalizeOp(step.op),
            args: Ref_Resolver.deepResolve(step.args || {}, ctx),
            saveAs: step.saveAs
        };

        var raw;
        try {
            raw = handler(resolvedStep, ctx, adapter);
        } catch (e) {
            return _makeError("E_HANDLER_THROW", "Handler throw: " + step.op, String(e));
        }

        var result = _normalizeResult(raw);
        result.timestamp = (clock && clock.nowISO) ? clock.nowISO() : String(new Date().getTime());

        return result;
    }

    /**
     * Run a task (sequential).
     * @param {Object} task Task JSON (tcoord-only)
     * @param {Object} adapter Adapter implementation
     * @param {Object} options Options { logger }
     * @returns {Object} taskRunResult
     */
    function runTask(task, adapter, options) {
        var logger = options && options.logger ? options.logger : null;

        if (!task || !task.steps || !(task.steps instanceof Array)) {
            return _makeError("E_TASK_INVALID", "Task missing steps[]", task);
        }
        if (!adapter) {
            return _makeError("E_ADAPTER_MISSING", "Adapter is required", null);
        }

        var ctx = {
            vars: {},
            steps: {},
            last: null
        };

        if (Step_Registry.getHandler("CreateTrack") == null) {
            Step_Registry.installDefaults(logger);
        }

        var results = [];
        var i, step, res;

        for (i = 0; i < task.steps.length; i++) {
            step = task.steps[i];

            if (logger && logger.log) { logger.log("Run step: " + step.id + " / " + step.op); }

            res = _runStep(step, ctx, adapter, Step_Registry, Util_Timestamp);

            ctx.steps[step.id] = res;
            ctx.last = res;
            results.push({ id: step.id, op: step.op, result: res });

            if (step.saveAs) {
                ctx.vars[step.saveAs] = res;
            }

            if (res && res.success === false) {
                return {
                    success: false,
                    taskId: task.id || "",
                    context: ctx,
                    results: results
                };
            }
        }

        return {
            success: true,
            taskId: task.id || "",
            context: ctx,
            results: results
        };
    }

    return {
        runTask: runTask
    };
})();

if (typeof window !== "undefined") {
    window["Task_RuntimeCore"] = Task_RuntimeCore;
} else if (typeof global !== "undefined") {
    global["Task_RuntimeCore"] = Task_RuntimeCore;
}
