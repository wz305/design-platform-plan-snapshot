/**
 * GeometryWrapper - 几何计算封装器
 * 
 * 提供PCB对象的几何计算功能，包括距离、角度、面积等计算
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * @author AD21 Object Module
 * @version 1.0.0
 */

var GeometryWrapper = (function(){
    "use strict";
    
    // -------------------------------------------------------------
    // 私有变量
    // -------------------------------------------------------------
    
    var _config = {
        precision: 6,              // 计算精度
        unit: "mil",              // 默认单位
        enableCache: true,        // 启用结果缓存
        cacheTimeout: 10000       // 缓存超时（毫秒）
    };
    
    var _cache = {};
    var _statistics = {
        calculationsPerformed: 0,
        cacheHits: 0,
        cacheMisses: 0,
        byType: {}
    };
    
    // -------------------------------------------------------------
    // 私有函数
    // -------------------------------------------------------------
    
    /**
     * 简化的日志系统
     */
    var _logger = {
        debug: function(msg) {
            if (typeof console !== "undefined" && console.log) {
                console.log("[DEBUG] " + msg);
            }
        },
        info: function(msg) {
            if (typeof console !== "undefined" && console.log) {
                console.log("[INFO] " + msg);
            }
        },
        warn: function(msg) {
            if (typeof console !== "undefined" && console.log) {
                console.log("[WARN] " + msg);
            }
        },
        error: function(msg) {
            if (typeof console !== "undefined" && console.log) {
                console.log("[ERROR] " + msg);
            }
        }
    };
    
    /**
     * 生成缓存键
     * @param {string} method 方法名
     * @param {Array} args 参数数组
     * @returns {string} 缓存键
     */
    function _generateCacheKey(method, args) {
        var key = method + "_";
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (typeof arg === "object") {
                key += JSON.stringify(arg);
            } else {
                key += String(arg);
            }
            key += "_";
        }
        return key;
    }
    
    /**
     * 检查缓存
     * @param {string} cacheKey 缓存键
     * @returns {*} 缓存值或null
     */
    function _checkCache(cacheKey) {
        if (!_config.enableCache || !_cache[cacheKey]) {
            _statistics.cacheMisses++;
            return null;
        }
        
        var cached = _cache[cacheKey];
        var now = new Date().getTime();
        
        if ((now - cached.timestamp) > _config.cacheTimeout) {
            delete _cache[cacheKey];
            _statistics.cacheMisses++;
            return null;
        }
        
        _statistics.cacheHits++;
        return cached.value;
    }
    
    /**
     * 设置缓存
     * @param {string} cacheKey 缓存键
     * @param {*} value 缓存值
     */
    function _setCache(cacheKey, value) {
        if (!_config.enableCache) {
            return;
        }
        
        _cache[cacheKey] = {
            value: value,
            timestamp: new Date().getTime()
        };
    }
    
    /**
     * 更新统计信息
     * @param {string} calculationType 计算类型
     */
    function _updateStatistics(calculationType) {
        _statistics.calculationsPerformed++;
        
        if (!_statistics.byType[calculationType]) {
            _statistics.byType[calculationType] = 0;
        }
        _statistics.byType[calculationType]++;
    }
    
    /**
     * 数值精度处理
     * @param {number} value 数值
     * @returns {number} 处理后的数值
     */
    function _round(value) {
        if (typeof value !== "number") {
            return value;
        }
        
        var factor = Math.pow(10, _config.precision);
        return Math.round(value * factor) / factor;
    }
    
    /**
     * 验证点对象
     * @param {Object} point 点对象
     * @returns {boolean} 是否有效
     */
    function _isValidPoint(point) {
        return point && 
               typeof point.x === "number" && 
               typeof point.y === "number" &&
               !isNaN(point.x) && 
               !isNaN(point.y);
    }
    
    /**
     * 验证PCB对象封装器
     * @param {Object} wrapper PCB对象封装器
     * @returns {boolean} 是否有效
     */
    function _isValidWrapper(wrapper) {
        return wrapper && 
               typeof wrapper.getObjectType === "function" &&
               typeof wrapper.getPosition === "function" &&
               typeof wrapper.getBoundingBox === "function";
    }
    
    // -------------------------------------------------------------
    // 几何计算核心函数
    // -------------------------------------------------------------
    
    /**
     * 计算两点间距离
     * @param {Object} point1 点1 {x, y}
     * @param {Object} point2 点2 {x, y}
     * @returns {number} 距离
     */
    function _calculateDistance(point1, point2) {
        if (!_isValidPoint(point1) || !_isValidPoint(point2)) {
            throw new Error("GeometryWrapper._calculateDistance: Invalid points");
        }
        
        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return _round(Math.sqrt(dx * dx + dy * dy));
    }
    
    /**
     * 计算点到直线的距离
     * @param {Object} point 点 {x, y}
     * @param {Object} lineStart 直线起点 {x, y}
     * @param {Object} lineEnd 直线终点 {x, y}
     * @returns {number} 距离
     */
    function _calculatePointToLineDistance(point, lineStart, lineEnd) {
        if (!_isValidPoint(point) || !_isValidPoint(lineStart) || !_isValidPoint(lineEnd)) {
            throw new Error("GeometryWrapper._calculatePointToLineDistance: Invalid points");
        }
        
        var A = point.x - lineStart.x;
        var B = point.y - lineStart.y;
        var C = lineEnd.x - lineStart.x;
        var D = lineEnd.y - lineStart.y;
        
        var dot = A * C + B * D;
        var lenSq = C * C + D * D;
        
        if (lenSq === 0) {
            return _calculateDistance(point, lineStart);
        }
        
        var param = dot / lenSq;
        
        var xx, yy;
        
        if (param < 0) {
            xx = lineStart.x;
            yy = lineStart.y;
        } else if (param > 1) {
            xx = lineEnd.x;
            yy = lineEnd.y;
        } else {
            xx = lineStart.x + param * C;
            yy = lineStart.y + param * D;
        }
        
        var closestPoint = {x: xx, y: yy};
        return _calculateDistance(point, closestPoint);
    }
    
    /**
     * 计算两直线交点
     * @param {Object} line1 直线1 {start, end}
     * @param {Object} line2 直线2 {start, end}
     * @returns {Object|null} 交点或null
     */
    function _calculateLineIntersection(line1, line2) {
        if (!line1 || !line2 || 
            !_isValidPoint(line1.start) || !_isValidPoint(line1.end) ||
            !_isValidPoint(line2.start) || !_isValidPoint(line2.end)) {
            throw new Error("GeometryWrapper._calculateLineIntersection: Invalid lines");
        }
        
        var x1 = line1.start.x, y1 = line1.start.y;
        var x2 = line1.end.x, y2 = line1.end.y;
        var x3 = line2.start.x, y3 = line2.start.y;
        var x4 = line2.end.x, y4 = line2.end.y;
        
        var denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        
        if (Math.abs(denom) < 0.0001) {
            return null; // 平行或重合
        }
        
        var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
        
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: _round(x1 + t * (x2 - x1)),
                y: _round(y1 + t * (y2 - y1))
            };
        }
        
        return null; // 不在线段范围内
    }
    
    /**
     * 计算圆弧长度
     * @param {Object} arc 圆弧对象
     * @returns {number} 圆弧长度
     */
    function _calculateArcLength(arc) {
        if (!arc || typeof arc.Radius !== "number" || arc.Radius <= 0) {
            throw new Error("GeometryWrapper._calculateArcLength: Invalid arc");
        }
        
        var startAngle = arc.StartAngle || 0;
        var endAngle = arc.EndAngle || 0;
        var radius = arc.Radius;
        
        // 标准化角度
        while (startAngle < 0) startAngle += 360;
        while (startAngle >= 360) startAngle -= 360;
        while (endAngle < 0) endAngle += 360;
        while (endAngle >= 360) endAngle -= 360;
        
        var angleDiff = endAngle - startAngle;
        if (angleDiff < 0) angleDiff += 360;
        
        var angleRad = angleDiff * Math.PI / 180;
        return _round(radius * angleRad);
    }
    
    /**
     * 计算多边形面积
     * @param {Array} points 点数组
     * @returns {number} 面积
     */
    function _calculatePolygonArea(points) {
        if (!points || points.length < 3) {
            return 0;
        }
        
        var area = 0;
        for (var i = 0; i < points.length; i++) {
            var j = (i + 1) % points.length;
            var p1 = points[i];
            var p2 = points[j];
            
            if (_isValidPoint(p1) && _isValidPoint(p2)) {
                area += p1.x * p2.y;
                area -= p2.x * p1.y;
            }
        }
        
        return _round(Math.abs(area / 2));
    }
    
    /**
     * 检查点是否在多边形内
     * @param {Object} point 点 {x, y}
     * @param {Array} polygon 多边形点数组
     * @returns {boolean} 是否在内部
     */
    function _isPointInPolygon(point, polygon) {
        if (!_isValidPoint(point) || !polygon || polygon.length < 3) {
            return false;
        }
        
        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i].x, yi = polygon[i].y;
            var xj = polygon[j].x, yj = polygon[j].y;
            
            if (_isValidPoint(polygon[i]) && _isValidPoint(polygon[j])) {
                var intersect = ((yi > point.y) !== (yj > point.y))
                    && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        }
        
        return inside;
    }
    
    // -------------------------------------------------------------
    // GeometryWrapper构造函数
    // -------------------------------------------------------------
    
    /**
     * GeometryWrapper构造函数
     * @param {Object} wrapper PCB对象封装器
     */
    function GeometryWrapper(wrapper) {
        if (!_isValidWrapper(wrapper)) {
            throw new Error("GeometryWrapper: Invalid PCB object wrapper");
        }
        
        this._wrapper = wrapper;
        this._objectType = wrapper.getObjectType();
        this._cache = {};
        
        _logger.debug("GeometryWrapper.constructor: Created geometry wrapper for " + this._objectType);
    }
    
    // -------------------------------------------------------------
    // GeometryWrapper原型方法
    // -------------------------------------------------------------
    
    /**
     * 获取对象中心点
     * @returns {Object} 中心点 {x, y}
     */
    GeometryWrapper.prototype.getCenter = function() {
        var cacheKey = "getCenter";
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var center;
        var bbox = this._wrapper.getBoundingBox();
        
        center = {
            x: _round((bbox.left + bbox.right) / 2),
            y: _round((bbox.top + bbox.bottom) / 2)
        };
        
        _setCache(cacheKey, center);
        _updateStatistics("getCenter");
        return center;
    };
    
    /**
     * 计算到另一个对象的距离
     * @param {Object} otherWrapper 另一个对象封装器
     * @returns {number} 距离
     */
    GeometryWrapper.prototype.getDistanceTo = function(otherWrapper) {
        if (!_isValidWrapper(otherWrapper)) {
            throw new Error("GeometryWrapper.getDistanceTo: Invalid wrapper");
        }
        
        var cacheKey = "getDistanceTo_" + otherWrapper.getObjectId();
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var center1 = this.getCenter();
        var center2 = new GeometryWrapper(otherWrapper).getCenter();
        
        var distance = _calculateDistance(center1, center2);
        
        _setCache(cacheKey, distance);
        _updateStatistics("getDistanceTo");
        return distance;
    };
    
    /**
     * 计算对象的长度（适用于Track、Arc等）
     * @returns {number} 长度
     */
    GeometryWrapper.prototype.getLength = function() {
        var cacheKey = "getLength";
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var length = 0;
        var properties = this._wrapper.getAllProperties();
        
        switch (this._objectType) {
            case "Track":
                var x1 = properties.X1 || 0;
                var y1 = properties.Y1 || 0;
                var x2 = properties.X2 || 0;
                var y2 = properties.Y2 || 0;
                length = _calculateDistance({x: x1, y: y1}, {x: x2, y: y2});
                break;
                
            case "Arc":
                length = _calculateArcLength(properties);
                break;
                
            default:
                // 对于其他对象，返回边界框的对角线长度
                var bbox = this._wrapper.getBoundingBox();
                length = _calculateDistance(
                    {x: bbox.left, y: bbox.top},
                    {x: bbox.right, y: bbox.bottom}
                );
                break;
        }
        
        _setCache(cacheKey, length);
        _updateStatistics("getLength");
        return length;
    };
    
    /**
     * 计算对象的面积（适用于Pad、Region等）
     * @returns {number} 面积
     */
    GeometryWrapper.prototype.getArea = function() {
        var cacheKey = "getArea";
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var area = 0;
        var properties = this._wrapper.getAllProperties();
        
        switch (this._objectType) {
            case "Pad":
            case "Via":
                var diameter = properties.Diameter || properties.TopX || 0;
                area = _round(Math.PI * diameter * diameter / 4);
                break;
                
            case "Arc":
                var radius = properties.Radius || 0;
                var startAngle = properties.StartAngle || 0;
                var endAngle = properties.EndAngle || 0;
                var angleDiff = endAngle - startAngle;
                if (angleDiff < 0) angleDiff += 360;
                area = _round(Math.PI * radius * radius * angleDiff / 360);
                break;
                
            default:
                // 对于其他对象，返回边界框面积
                var bbox = this._wrapper.getBoundingBox();
                area = _round((bbox.right - bbox.left) * (bbox.bottom - bbox.top));
                break;
        }
        
        _setCache(cacheKey, area);
        _updateStatistics("getArea");
        return area;
    };
    
    /**
     * 检查是否与另一个对象相交
     * @param {Object} otherWrapper 另一个对象封装器
     * @returns {boolean} 是否相交
     */
    GeometryWrapper.prototype.intersects = function(otherWrapper) {
        if (!_isValidWrapper(otherWrapper)) {
            throw new Error("GeometryWrapper.intersects: Invalid wrapper");
        }
        
        var cacheKey = "intersects_" + otherWrapper.getObjectId();
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var bbox1 = this._wrapper.getBoundingBox();
        var bbox2 = otherWrapper.getBoundingBox();
        
        var intersects = !(bbox1.right < bbox2.left || 
                           bbox1.left > bbox2.right || 
                           bbox1.bottom < bbox2.top || 
                           bbox1.top > bbox2.bottom);
        
        _setCache(cacheKey, intersects);
        _updateStatistics("intersects");
        return intersects;
    };
    
    /**
     * 检查点是否在对象内部
     * @param {Object} point 点 {x, y}
     * @returns {boolean} 是否在内部
     */
    GeometryWrapper.prototype.containsPoint = function(point) {
        if (!_isValidPoint(point)) {
            throw new Error("GeometryWrapper.containsPoint: Invalid point");
        }
        
        var cacheKey = "containsPoint_" + point.x + "_" + point.y;
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var bbox = this._wrapper.getBoundingBox();
        var contains = point.x >= bbox.left && 
                      point.x <= bbox.right && 
                      point.y >= bbox.top && 
                      point.y <= bbox.bottom;
        
        _setCache(cacheKey, contains);
        _updateStatistics("containsPoint");
        return contains;
    };
    
    /**
     * 获取几何统计信息
     * @returns {Object} 统计信息
     */
    GeometryWrapper.prototype.getGeometryStatistics = function() {
        return {
            objectType: this._objectType,
            center: this.getCenter(),
            length: this.getLength(),
            area: this.getArea(),
            boundingBox: this._wrapper.getBoundingBox(),
            position: this._wrapper.getPosition()
        };
    };
    
    // -------------------------------------------------------------
    // 静态方法
    // -------------------------------------------------------------
    
    /**
     * 计算两点间距离
     * @param {Object} point1 点1 {x, y}
     * @param {Object} point2 点2 {x, y}
     * @returns {number} 距离
     */
    GeometryWrapper.calculateDistance = function(point1, point2) {
        var cacheKey = "static_calculateDistance_" + _generateCacheKey("", [point1, point2]);
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var result = _calculateDistance(point1, point2);
        _setCache(cacheKey, result);
        _updateStatistics("calculateDistance");
        return result;
    };
    
    /**
     * 计算点到直线距离
     * @param {Object} point 点 {x, y}
     * @param {Object} lineStart 直线起点 {x, y}
     * @param {Object} lineEnd 直线终点 {x, y}
     * @returns {number} 距离
     */
    GeometryWrapper.calculatePointToLineDistance = function(point, lineStart, lineEnd) {
        var cacheKey = "static_pointToLine_" + _generateCacheKey("", [point, lineStart, lineEnd]);
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var result = _calculatePointToLineDistance(point, lineStart, lineEnd);
        _setCache(cacheKey, result);
        _updateStatistics("calculatePointToLineDistance");
        return result;
    };
    
    /**
     * 计算两直线交点
     * @param {Object} line1 直线1 {start, end}
     * @param {Object} line2 直线2 {start, end}
     * @returns {Object|null} 交点或null
     */
    GeometryWrapper.calculateLineIntersection = function(line1, line2) {
        var cacheKey = "static_lineIntersection_" + _generateCacheKey("", [line1, line2]);
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var result = _calculateLineIntersection(line1, line2);
        _setCache(cacheKey, result);
        _updateStatistics("calculateLineIntersection");
        return result;
    };
    
    /**
     * 计算多边形面积
     * @param {Array} points 点数组
     * @returns {number} 面积
     */
    GeometryWrapper.calculatePolygonArea = function(points) {
        var cacheKey = "static_polygonArea_" + _generateCacheKey("", [points]);
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var result = _calculatePolygonArea(points);
        _setCache(cacheKey, result);
        _updateStatistics("calculatePolygonArea");
        return result;
    };
    
    /**
     * 检查点是否在多边形内
     * @param {Object} point 点 {x, y}
     * @param {Array} polygon 多边形点数组
     * @returns {boolean} 是否在内部
     */
    GeometryWrapper.isPointInPolygon = function(point, polygon) {
        var cacheKey = "static_pointInPolygon_" + _generateCacheKey("", [point, polygon]);
        var cached = _checkCache(cacheKey);
        if (cached !== null) {
            return cached;
        }
        
        var result = _isPointInPolygon(point, polygon);
        _setCache(cacheKey, result);
        _updateStatistics("isPointInPolygon");
        return result;
    };
    
    /**
     * 配置几何计算器
     * @param {Object} config 配置选项
     */
    GeometryWrapper.configure = function(config) {
        if (!config) {
            return;
        }
        
        for (var key in config) {
            if (config.hasOwnProperty(key) && _config.hasOwnProperty(key)) {
                _config[key] = config[key];
            }
        }
    };
    
    /**
     * 获取配置
     * @returns {Object} 当前配置
     */
    GeometryWrapper.getConfiguration = function() {
        var result = {};
        for (var key in _config) {
            if (_config.hasOwnProperty(key)) {
                result[key] = _config[key];
            }
        }
        return result;
    };
    
    /**
     * 获取统计信息
     * @returns {Object} 统计信息
     */
    GeometryWrapper.getStatistics = function() {
        return {
            calculationsPerformed: _statistics.calculationsPerformed,
            cacheHits: _statistics.cacheHits,
            cacheMisses: _statistics.cacheMisses,
            cacheHitRate: _statistics.cacheHits / (_statistics.cacheHits + _statistics.cacheMisses) || 0,
            byType: _statistics.byType,
            cacheSize: Object.keys(_cache).length,
            configuration: GeometryWrapper.getConfiguration()
        };
    };
    
    /**
     * 清理缓存
     */
    GeometryWrapper.clearCache = function() {
        _cache = {};
    };
    
    /**
     * 重置统计信息
     */
    GeometryWrapper.resetStatistics = function() {
        _statistics = {
            calculationsPerformed: 0,
            cacheHits: 0,
            cacheMisses: 0,
            byType: {}
        };
    };
    
    // -------------------------------------------------------------
    // 导出
    // -------------------------------------------------------------
    
    return GeometryWrapper;
    
})();
