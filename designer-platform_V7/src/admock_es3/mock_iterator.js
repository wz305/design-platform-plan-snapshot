/**
 * mock_iterator.js
 * --------------------------------------------------------------------
 * Simulate AD BoardIterator / SpatialIterator minimal behavior:
 * - AddFilter_ObjectSet(types)
 * - AddFilter_LayerSet(layers)
 * - AddFilter_Area(x1,y1,x2,y2)
 * - FirstPCBObject / NextPCBObject
 * --------------------------------------------------------------------
 */

var Mock_Iterator = (function () {
    /**
     * Create an iterator object.
     * @param {Object} store Mock store
     * @returns {Object} iterator
     */
    function createBoardIterator(store) {
        var _types = null;   // Array of strings
        var _layers = null;  // Array of strings
        var _area = null;    // {x1,y1,x2,y2}
        var _list = null;
        var _idx = -1;

        function _matchType(obj) {
            if (!_types) { return true; }
            var i;
            for (i = 0; i < _types.length; i++) {
                if (String(obj.__type) === String(_types[i])) { return true; }
            }
            return false;
        }

        function _matchLayer(obj) {
            if (!_layers) { return true; }
            var i;
            for (i = 0; i < _layers.length; i++) {
                if (String(obj.Layer) === String(_layers[i])) { return true; }
            }
            return false;
        }

        function _matchArea(obj) {
            if (!_area) { return true; }

            // Minimal implementation: use object's bounding box to test intersection
            // Track: X1/Y1/X2/Y2; Via/Pad: X/Y
            var minX, maxX, minY, maxY;

            if (obj.__type === "Track") {
                minX = (obj.X1 < obj.X2) ? obj.X1 : obj.X2;
                maxX = (obj.X1 > obj.X2) ? obj.X1 : obj.X2;
                minY = (obj.Y1 < obj.Y2) ? obj.Y1 : obj.Y2;
                maxY = (obj.Y1 > obj.Y2) ? obj.Y1 : obj.Y2;
            } else {
                minX = obj.X;
                maxX = obj.X;
                minY = obj.Y;
                maxY = obj.Y;
            }

            // area normalized: x1<=x2, y1<=y2
            var ax1 = _area.x1, ay1 = _area.y1, ax2 = _area.x2, ay2 = _area.y2;

            // intersection test
            if (maxX < ax1) { return false; }
            if (minX > ax2) { return false; }
            if (maxY < ay1) { return false; }
            if (minY > ay2) { return false; }

            return true;
        }

        function _buildList() {
            var i, obj;
            _list = [];
            if (!store || !store.objects) { return; }
            for (i = 0; i < store.objects.length; i++) {
                obj = store.objects[i];
                if (!obj) { continue; }
                if (!_matchType(obj)) { continue; }
                if (!_matchLayer(obj)) { continue; }
                if (!_matchArea(obj)) { continue; }
                _list.push(obj);
            }
        }

        return {
            AddFilter_ObjectSet: function (types) {
                _types = (types && (types instanceof Array)) ? types : null;
            },
            AddFilter_LayerSet: function (layers) {
                _layers = (layers && (layers instanceof Array)) ? layers : null;
            },
            AddFilter_Area: function (x1, y1, x2, y2) {
                _area = { x1: x1, y1: y1, x2: x2, y2: y2 };
            },
            FirstPCBObject: function () {
                _buildList();
                _idx = 0;
                if (!_list || _list.length === 0) { return null; }
                return _list[0];
            },
            NextPCBObject: function () {
                if (!_list) { return null; }
                _idx += 1;
                if (_idx >= _list.length) { return null; }
                return _list[_idx];
            }
        };
    }

    return {
        createBoardIterator: createBoardIterator
    };
})();

if (typeof window !== "undefined") {
    window["Mock_Iterator"] = Mock_Iterator;
} else if (typeof global !== "undefined") {
    global["Mock_Iterator"] = Mock_Iterator;
}
