/**
 * module_exporter.js
 * --------------------------------------------------------------------
 * Minimal "module as interface" exporter for ES3 environments.
 *
 * Goals:
 * - no dependency on `this`
 * - usable in Browser / AD (JScript 5.8)
 * - allow export to global by name
 * --------------------------------------------------------------------
 */

var Module_Exporter = (function () {
    /**
     * Get a reference to the global object (Browser: window; AD may also have window).
     * @returns {*} Global object reference
     */
    function getGlobal() {
        if (typeof window !== "undefined") { return window; }
        if (typeof global !== "undefined") { return global; }
        return {};
    }

    /**
     * Export a module to the global object.
     * @param {String} name Module name
     * @param {*} api Module interface
     */
    function exportModule(name, api) {
        var g = getGlobal();
        g[name] = api;
    }

    /**
     * Import a module from the global object.
     * @param {String} name Module name
     * @returns {*} Module interface or null
     */
    function importModule(name) {
        var g = getGlobal();
        return g[name] || null;
    }

    return {
        getGlobal: getGlobal,
        exportModule: exportModule,
        importModule: importModule
    };
})();

if (typeof window !== "undefined") {
    window["Module_Exporter"] = Module_Exporter;
} else if (typeof global !== "undefined") {
    global["Module_Exporter"] = Module_Exporter;
}
