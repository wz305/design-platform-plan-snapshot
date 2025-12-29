/**
 * mock_board_store.js
 * --------------------------------------------------------------------
 * Mock board store: holds objects, layers, logs, etc.
 * All coord/size fields are TCoord integers.
 * --------------------------------------------------------------------
 */

var Mock_BoardStore = (function () {
    var _nextId = 1000;

    /**
     * Generate a new native id (mock only).
     * @returns {Number}
     */
    function newId() {
        _nextId += 1;
        return _nextId;
    }

    /**
     * Create default board store.
     * @returns {Object} store
     */
    function createDefaultStore() {
        return {
            fileName: "MockBoard.PcbDoc",
            layers: [
                { id: "Top", name: "Top Layer", isUsed: true },
                { id: "Bottom", name: "Bottom Layer", isUsed: true }
            ],
            objects: [],
            logs: [],
            meta: {
                createdAt: new Date().getTime()
            }
        };
    }

    /**
     * Find object by objectId.
     * @param {Object} store Store
     * @param {String} objectId Example: mock:1001
     * @returns {Object|null}
     */
    function findByObjectId(store, objectId) {
        var i, obj;
        if (!store || !store.objects) { return null; }
        for (i = 0; i < store.objects.length; i++) {
            obj = store.objects[i];
            if (obj && obj.objectId === objectId) { return obj; }
        }
        return null;
    }

    return {
        newId: newId,
        createDefaultStore: createDefaultStore,
        findByObjectId: findByObjectId
    };
})();

if (typeof window !== "undefined") {
    window["Mock_BoardStore"] = Mock_BoardStore;
} else if (typeof global !== "undefined") {
    global["Mock_BoardStore"] = Mock_BoardStore;
}
