/**
 * mock_pcbserver_factory.js
 * --------------------------------------------------------------------
 * Simulate AD PCBServer entry and object factory.
 * Goal: keep shape close to AD, behavior simple and predictable.
 * --------------------------------------------------------------------
 */

var Mock_PCBServerFactory = (function () {
    var _store = null;
    var _preCount = 0;
    var _postCount = 0;

    /**
     * Bind store (must bind before use).
     * @param {Object} store Result of Mock_BoardStore.createDefaultStore()
     */
    function bindStore(store) {
        _store = store;
    }

    /**
     * Get current store.
     * @returns {Object}
     */
    function getStore() {
        return _store;
    }

    /**
     * Simulate PCBServer().PreProcess()
     */
    function PreProcess() {
        _preCount += 1;
        if (_store && _store.logs) {
            _store.logs.push({ type: "PreProcess", at: new Date().getTime() });
        }
    }

    /**
     * Simulate PCBServer().PostProcess()
     */
    function PostProcess() {
        _postCount += 1;
        if (_store && _store.logs) {
            _store.logs.push({ type: "PostProcess", at: new Date().getTime() });
        }
    }

    /**
     * Simulate PCBObjectFactory: return an empty object template.
     * @param {String} type Track/Via/Pad/Arc
     * @param {*} dimension Unused in mock
     * @param {*} createMode Unused in mock
     * @returns {Object} pcbObject
     */
    function PCBObjectFactory(type, dimension, createMode) {
        return {
            __type: String(type || ""),
            Layer: "Top",
            NetName: ""
        };
    }

    /**
     * Simulate PCBServer singleton.
     * @returns {Object}
     */
    function PCBServer() {
        return {
            PreProcess: PreProcess,
            PostProcess: PostProcess,
            PCBObjectFactory: PCBObjectFactory,
            GetCurrentPCBBoard: function () {
                return _store;
            },
            __debug: function () {
                return { pre: _preCount, post: _postCount };
            }
        };
    }

    return {
        bindStore: bindStore,
        getStore: getStore,
        PCBServer: PCBServer
    };
})();

if (typeof window !== "undefined") {
    window["Mock_PCBServerFactory"] = Mock_PCBServerFactory;
} else if (typeof global !== "undefined") {
    global["Mock_PCBServerFactory"] = Mock_PCBServerFactory;
}
