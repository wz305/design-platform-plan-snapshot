/**
 * util_logger.js
 * --------------------------------------------------------------------
 * Unified logging: use console in Browser, fallback to AD memLog if present.
 * --------------------------------------------------------------------
 */

var Util_Logger = (function () {
    /**
     * Attempt to write to AD memLog (if available).
     * @param {String} text Log text
     */
    function _writeMemLog(text) {
        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) {
                memLog.Lines.Add(String(text));
            }
        } catch (e) {
            // Ignore: avoid impacting main flow
        }
    }

    /**
     * Output log: prefer console, fallback to memLog.
     * @param {String} level log level: log/warn/error
     * @param {String} msg Log message
     */
    function _output(level, msg) {
        var text = "[ADMockES3][" + level + "] " + String(msg);

        // Browser environment
        try {
            if (typeof console !== "undefined" && console) {
                if (level === "error" && console.error) { console.error(text); return; }
                if (level === "warn" && console.warn) { console.warn(text); return; }
                if (console.log) { console.log(text); return; }
            }
        } catch (e1) { /* ignore */ }

        // AD memLog
        _writeMemLog(text);
    }

    function log(msg) { _output("log", msg); }
    function warn(msg) { _output("warn", msg); }
    function error(msg) { _output("error", msg); }

    return {
        log: log,
        warn: warn,
        error: error
    };
})();

if (typeof window !== "undefined") {
    window["Util_Logger"] = Util_Logger;
} else if (typeof global !== "undefined") {
    global["Util_Logger"] = Util_Logger;
}
