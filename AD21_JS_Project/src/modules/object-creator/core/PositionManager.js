/**
 * PositionManager - 位置管理器
 * 
 * 提供PCB对象位置管理功能，包括坐标系统、位置验证和冲突检测
 * ES3/JScript 5.8 兼容
 */

var PositionManager = (function() {
    
    // -------------------------------------------------------------
    // 1. 简化的日志系统（用于测试）
    // -------------------------------------------------------------
    
    var SimpleLogger = {
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
    
    var logger = SimpleLogger;
    
    // -------------------------------------------------------------
    // 2. 私有变量
    // -------------------------------------------------------------
    
    var _coordinateSystem = {
        unit: "mil",        // AD默认单位
        origin: {x: 0, y: 0}, // 原点位置
        gridSize: 5,        // 网格大小
        enableGridSnap: true // 是否启用网格对齐
    };
    
    var _positionCache = {};   // 位置缓存
    var _conflictThreshold = 10; // 冲突检测阈值
    
    // -------------------------------------------------------------
    // 3. 私有函数
    // -------------------------------------------------------------
    
    /**
     * 验证坐标值
     * @param {number} value 坐标值
     * @returns {boolean} 是否有效
     */
    function _isValidCoordinate(value) {
        return typeof value === "number" && !isNaN(value) && isFinite(value);
    }
    
    /**
     * 对齐到网格
     * @param {number} value 坐标值
     * @param {number} gridSize 网格大小
     * @returns {number} 对齐后的坐标值
     */
    function _snapToGrid(value, gridSize) {
        if (!_isValidCoordinate(value) || !_isValidCoordinate(gridSize) || gridSize <= 0) {
            return value;
        }
        
        return Math.round(value / gridSize) * gridSize;
    }
    
    /**
     * 计算两点间距离
     * @param {Object} point1 点1 {x, y}
     * @param {Object} point2 点2 {x, y}
     * @returns {number} 距离
     */
    function _calculateDistance(point1, point2) {
        if (!_isValidCoordinate(point1.x) || !_isValidCoordinate(point1.y) ||
            !_isValidCoordinate(point2.x) || !_isValidCoordinate(point2.y)) {
            return Infinity;
        }
        
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * 检查位置是否在缓存中
     * @param {Object} position 位置 {x, y}
     * @returns {boolean} 是否存在
     */
    function _isPositionInCache(position) {
        var key = _positionToKey(position);
        return _positionCache.hasOwnProperty(key);
    }
    
    /**
     * 将位置转换为缓存键
     * @param {Object} position 位置 {x, y}
     * @returns {string} 缓存键
     */
    function _positionToKey(position) {
        if (!position || typeof position !== "object") {
            return "";
        }
        return Math.round(position.x) + "," + Math.round(position.y);
    }
    
    /**
     * 添加位置到缓存
     * @param {Object} position 位置 {x, y}
     * @param {Object} objectInfo 对象信息
     */
    function _addPositionToCache(position, objectInfo) {
        var key = _positionToKey(position);
        if (!_positionCache[key]) {
            _positionCache[key] = [];
        }
        _positionCache[key].push(objectInfo);
    }
    
    /**
     * 从缓存中移除位置
     * @param {Object} position 位置 {x, y}
     * @param {string} objectId 对象ID
     */
    function _removePositionFromCache(position, objectId) {
        var key = _positionToKey(position);
        if (_positionCache[key]) {
            var objects = _positionCache[key];
            for (var i = objects.length - 1; i >= 0; i--) {
                if (objects[i].id === objectId) {
                    objects.splice(i, 1);
                    break;
                }
            }
            
            // 如果该位置没有对象了，删除缓存项
            if (objects.length === 0) {
                delete _positionCache[key];
            }
        }
    }
    
    // -------------------------------------------------------------
    // 4. 公共API - 位置验证
    // -------------------------------------------------------------
    
    /**
     * 验证位置
     * @param {Object} position 位置 {x, y}
     * @returns {Object} 验证结果
     */
    function validatePosition(position) {
        logger.debug("[PositionManager][validatePosition] START - params: " + JSON.stringify(position));
        
        var result = {
            valid: true,
            errors: [],
            normalizedPosition: null
        };
        
        try {
            if (!position || typeof position !== "object") {
                result.valid = false;
                result.errors.push("Invalid position: must be an object");
                return result;
            }
            
            if (!_isValidCoordinate(position.x)) {
                result.valid = false;
                result.errors.push("Invalid X coordinate: must be a valid number");
            }
            
            if (!_isValidCoordinate(position.y)) {
                result.valid = false;
                result.errors.push("Invalid Y coordinate: must be a valid number");
            }
            
            // 如果位置有效，进行标准化处理
            if (result.valid) {
                result.normalizedPosition = normalizePosition(position);
            }
            
        } catch (e) {
            result.valid = false;
            result.errors.push("Validation error: " + e.message);
        }
        
        logger.debug("[PositionManager][validatePosition] SUCCESS - result: " + JSON.stringify(result));
        return result;
    }
    
    /**
     * 标准化位置
     * @param {Object} position 位置 {x, y}
     * @returns {Object} 标准化后的位置
     */
    function normalizePosition(position) {
        logger.debug("[PositionManager][normalizePosition] START - params: " + JSON.stringify(position));
        
        try {
            var normalized = {
                x: position.x,
                y: position.y
            };
            
            // 网格对齐
            if (_coordinateSystem.enableGridSnap) {
                normalized.x = _snapToGrid(normalized.x, _coordinateSystem.gridSize);
                normalized.y = _snapToGrid(normalized.y, _coordinateSystem.gridSize);
            }
            
            logger.debug("[PositionManager][normalizePosition] SUCCESS - normalized: " + JSON.stringify(normalized));
            return normalized;
            
        } catch (error) {
            logger.error("[PositionManager][normalizePosition] ERROR - " + error.message);
            return position; // 返回原始位置
        }
    }
    
    /**
     * 检查位置冲突
     * @param {Object} position 位置 {x, y}
     * @param {Object} objectInfo 对象信息
     * @returns {Object} 冲突检测结果
     */
    function checkPositionConflict(position, objectInfo) {
        logger.debug("[PositionManager][checkPositionConflict] START - params: " + JSON.stringify({
            position: position,
            objectInfo: objectInfo
        }));
        
        var result = {
            hasConflict: false,
            conflicts: [],
            suggestions: []
        };
        
        try {
            // 检查缓存中的位置
            var key = _positionToKey(position);
            if (_positionCache[key]) {
                var objects = _positionCache[key];
                for (var i = 0; i < objects.length; i++) {
                    var cachedObject = objects[i];
                    
                    // 检查是否是同一个对象
                    if (objectInfo && cachedObject.id === objectInfo.id) {
                        continue;
                    }
                    
                    // 计算距离
                    var distance = _calculateDistance(position, cachedObject.position);
                    
                    // 如果距离小于阈值，认为有冲突
                    if (distance < _conflictThreshold) {
                        result.hasConflict = true;
                        result.conflicts.push({
                            object: cachedObject,
                            distance: distance
                        });
                    }
                }
            }
            
            // 如果有冲突，生成建议位置
            if (result.hasConflict) {
                result.suggestions = generateAlternativePositions(position, 5);
            }
            
        } catch (error) {
            logger.error("[PositionManager][checkPositionConflict] ERROR - " + error.message);
        }
        
        logger.debug("[PositionManager][checkPositionConflict] SUCCESS - result: " + JSON.stringify(result));
        return result;
    }
    
    /**
     * 生成替代位置
     * @param {Object} originalPosition 原始位置 {x, y}
     * @param {number} count 生成数量
     * @returns {Array} 替代位置数组
     */
    function generateAlternativePositions(originalPosition, count) {
        logger.debug("[PositionManager][generateAlternativePositions] START - params: " + JSON.stringify({
            originalPosition: originalPosition,
            count: count
        }));
        
        var alternatives = [];
        var step = _coordinateSystem.gridSize * 2; // 使用网格大小的2倍作为步长
        
        try {
            // 生成周围的替代位置
            var directions = [
                {dx: step, dy: 0},     // 右
                {dx: -step, dy: 0},    // 左
                {dx: 0, dy: step},     // 上
                {dx: 0, dy: -step},    // 下
                {dx: step, dy: step},  // 右上
                {dx: -step, dy: step}, // 左上
                {dx: step, dy: -step}, // 右下
                {dx: -step, dy: -step} // 左下
            ];
            
            for (var i = 0; i < Math.min(count, directions.length); i++) {
                var direction = directions[i];
                var newPosition = {
                    x: originalPosition.x + direction.dx,
                    y: originalPosition.y + direction.dy
                };
                
                // 标准化位置
                newPosition = normalizePosition(newPosition);
                
                // 检查新位置是否有冲突
                var conflictResult = checkPositionConflict(newPosition);
                if (!conflictResult.hasConflict) {
                    alternatives.push(newPosition);
                }
            }
            
        } catch (error) {
            logger.error("[PositionManager][generateAlternativePositions] ERROR - " + error.message);
        }
        
        logger.debug("[PositionManager][generateAlternativePositions] SUCCESS - alternatives: " + JSON.stringify(alternatives));
        return alternatives;
    }
    
    // -------------------------------------------------------------
    // 5. 公共API - 位置管理
    // -------------------------------------------------------------
    
    /**
     * 注册对象位置
     * @param {Object} position 位置 {x, y}
     * @param {Object} objectInfo 对象信息
     */
    function registerPosition(position, objectInfo) {
        logger.debug("[PositionManager][registerPosition] START - params: " + JSON.stringify({
            position: position,
            objectInfo: objectInfo
        }));
        
        try {
            if (!objectInfo || !objectInfo.id) {
                throw new Error("Object info must contain id");
            }
            
            // 标准化位置
            var normalizedPosition = normalizePosition(position);
            
            // 添加到缓存
            _addPositionToCache(normalizedPosition, {
                id: objectInfo.id,
                type: objectInfo.type || "unknown",
                position: normalizedPosition,
                timestamp: new Date().getTime()
            });
            
            logger.info("[PositionManager][registerPosition] SUCCESS - position registered: " + JSON.stringify(normalizedPosition));
            
        } catch (error) {
            logger.error("[PositionManager][registerPosition] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 注销对象位置
     * @param {Object} position 位置 {x, y}
     * @param {string} objectId 对象ID
     */
    function unregisterPosition(position, objectId) {
        logger.debug("[PositionManager][unregisterPosition] START - params: " + JSON.stringify({
            position: position,
            objectId: objectId
        }));
        
        try {
            if (!objectId) {
                throw new Error("Object ID is required");
            }
            
            // 标准化位置
            var normalizedPosition = normalizePosition(position);
            
            // 从缓存中移除
            _removePositionFromCache(normalizedPosition, objectId);
            
            logger.info("[PositionManager][unregisterPosition] SUCCESS - position unregistered: " + JSON.stringify(normalizedPosition));
            
        } catch (error) {
            logger.error("[PositionManager][unregisterPosition] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 获取原点位置
     * @returns {Object} 原点位置 {x, y}
     */
    function getOrigin() {
        return {
            x: _coordinateSystem.origin.x,
            y: _coordinateSystem.origin.y
        };
    }
    
    /**
     * 设置原点位置
     * @param {Object} origin 原点位置 {x, y}
     */
    function setOrigin(origin) {
        logger.debug("[PositionManager][setOrigin] START - params: " + JSON.stringify(origin));
        
        try {
            if (!origin || typeof origin !== "object") {
                throw new Error("Invalid origin: must be an object");
            }
            
            if (!_isValidCoordinate(origin.x) || !_isValidCoordinate(origin.y)) {
                throw new Error("Invalid origin coordinates");
            }
            
            _coordinateSystem.origin = {
                x: origin.x,
                y: origin.y
            };
            
            logger.info("[PositionManager][setOrigin] SUCCESS - origin set: " + JSON.stringify(_coordinateSystem.origin));
            
        } catch (error) {
            logger.error("[PositionManager][setOrigin] ERROR - " + error.message);
            throw error;
        }
    }
    
    // -------------------------------------------------------------
    // 6. 公共API - 配置管理
    // -------------------------------------------------------------
    
    /**
     * 配置坐标系统
     * @param {Object} config 配置选项
     */
    function configureCoordinateSystem(config) {
        logger.debug("[PositionManager][configureCoordinateSystem] START - params: " + JSON.stringify(config));
        
        try {
            if (config && typeof config === "object") {
                if (config.unit && typeof config.unit === "string") {
                    _coordinateSystem.unit = config.unit;
                }
                
                if (config.gridSize && _isValidCoordinate(config.gridSize) && config.gridSize > 0) {
                    _coordinateSystem.gridSize = config.gridSize;
                }
                
                if (typeof config.enableGridSnap === "boolean") {
                    _coordinateSystem.enableGridSnap = config.enableGridSnap;
                }
                
                if (config.conflictThreshold && _isValidCoordinate(config.conflictThreshold) && config.conflictThreshold > 0) {
                    _conflictThreshold = config.conflictThreshold;
                }
            }
            
            logger.info("[PositionManager][configureCoordinateSystem] SUCCESS - coordinate system configured");
            
        } catch (error) {
            logger.error("[PositionManager][configureCoordinateSystem] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 获取坐标系统配置
     * @returns {Object} 配置信息
     */
    function getCoordinateSystemConfig() {
        return {
            unit: _coordinateSystem.unit,
            origin: {
                x: _coordinateSystem.origin.x,
                y: _coordinateSystem.origin.y
            },
            gridSize: _coordinateSystem.gridSize,
            enableGridSnap: _coordinateSystem.enableGridSnap,
            conflictThreshold: _conflictThreshold
        };
    }
    
    /**
     * 清空位置缓存
     */
    function clearPositionCache() {
        logger.debug("[PositionManager][clearPositionCache] START");
        
        try {
            _positionCache = {};
            logger.info("[PositionManager][clearPositionCache] SUCCESS - position cache cleared");
            
        } catch (error) {
            logger.error("[PositionManager][clearPositionCache] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 获取位置统计信息
     * @returns {Object} 统计信息
     */
    function getPositionStatistics() {
        var cacheSize = 0;
        for (var key in _positionCache) {
            if (_positionCache.hasOwnProperty(key)) {
                cacheSize += _positionCache[key].length;
            }
        }
        
        return {
            cacheSize: cacheSize,
            uniquePositions: Object.keys(_positionCache).length,
            coordinateSystem: getCoordinateSystemConfig()
        };
    }
    
    // -------------------------------------------------------------
    // 7. 返回模块接口
    // -------------------------------------------------------------
    
    return {
        // 位置验证
        validatePosition: validatePosition,
        normalizePosition: normalizePosition,
        checkPositionConflict: checkPositionConflict,
        generateAlternativePositions: generateAlternativePositions,
        
        // 位置管理
        registerPosition: registerPosition,
        unregisterPosition: unregisterPosition,
        getOrigin: getOrigin,
        setOrigin: setOrigin,
        
        // 配置管理
        configureCoordinateSystem: configureCoordinateSystem,
        getCoordinateSystemConfig: getCoordinateSystemConfig,
        clearPositionCache: clearPositionCache,
        getPositionStatistics: getPositionStatistics
    };
    
})();
