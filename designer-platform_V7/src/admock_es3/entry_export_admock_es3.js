/**
 * entry_export_admock_es3.js
 * --------------------------------------------------------------------
 * Aggregate modules into a single global object: window.ADMockES3
 * for direct use in TS/React side.
 * --------------------------------------------------------------------
 */

var Entry_ExportADMockES3 = (function () {
    function install() {
        var api = {
            log: Util_Logger,
            clock: Util_Timestamp,
            registry: Step_Registry,
            ref: Ref_Resolver,
            mock: {
                store: Mock_BoardStore,
                pcb: Mock_PCBServerFactory,
                iter: Mock_Iterator,
                adapter: Mock_CadAdapter
            },
            runtime: Task_RuntimeCore
        };

        if (typeof window !== "undefined") {
            window["ADMockES3"] = api;
            window["Entry_ExportADMockES3"] = Entry_ExportADMockES3;
        } else if (typeof global !== "undefined") {
            global["ADMockES3"] = api;
            global["Entry_ExportADMockES3"] = Entry_ExportADMockES3;
        }
        return api;
    }

    return {
        install: install
    };
})();

if (typeof window !== "undefined") {
    window["Entry_ExportADMockES3"] = Entry_ExportADMockES3;
} else if (typeof global !== "undefined") {
    global["Entry_ExportADMockES3"] = Entry_ExportADMockES3;
}
