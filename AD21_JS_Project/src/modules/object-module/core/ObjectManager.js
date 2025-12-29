/**
 * ObjectManager - 对象管理器核心模块
 * 
 * 提供对象生命周期管理、位置管理和资源清理功能
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * @author AD21 Object Module
 * @version 1.0.0
 */

var ObjectManager = (function(){
    "use strict";
    
    // -------------------------------------------------------------
    // 私有变量
    // -------------------------------------------------------------
    
    var _objects = {};              // 存储所有对象
    var _positions = {};            // 位置索引
    var _types = {};                // 类型索引
    var _config = {
        enablePositionIndex: true,
        enableTypeIndex: true,
        autoCleanup: true,
        maxObjects: 10000,
        conflictThreshold: 10       // 位置冲突阈值（mil）
    };
    
    var _statistics = {
        totalObjects: 0,
        byType: {},
        positionConflicts: 0,
        cleanupOperations: 0,
        memoryUsage: 0
    };
    
    // -------------------------------------------------------------
    // 私有函数
    // -------------------------------------------------------------
    
    /**
     * 生成位置键
     * @param {Object} position 位置对象 {x, y, layer}
     * @returns {string} 位置键
     */
    function _generatePositionKey(position) {
        if (!position) {
            return null;
        }
        
        var x = Math.round(position.x || 0);
        var y = Math.round(position.y || 0);
        var layer = position.layer || "default";
        
        return layer + "_" + x + "_" + y;
    }
    
    /**
     * 检查位置冲突
     * @param {Object} position 位置对象
     * @param {string} excludeObjectId 排除的对象ID
     * @returns {Object} 冲突检测结果
     */
    function _checkPositionConflict(position, excludeObjectId) {
        if (!_config.enablePositionIndex || !position) {
            return {hasConflict: false, conflicts: []};
        }
        
        var positionKey = _generatePositionKey(position);
        var conflicts = [];
        
        // 检查精确位置冲突
        if (_positions[positionKey]) {
            var objectsAtPosition = _positions[positionKey];
            for (var i = 0; i < objectsAtPosition.length; i++) {
                var objId = objectsAtPosition[i];
                if (objId !== excludeObjectId && _objects[objId]) {
                    conflicts.push({
                        objectId: objId,
                        objectType: _objects[objId].objectType,
                        position: _objects[objId].position
                    });
                }
            }
        }
        
        // 检查邻近位置冲突
        if (conflicts.length === 0 && _config.conflictThreshold > 0) {
            var nearbyConflicts = _findNearbyObjects(position, excludeObjectId);
            conflicts = conflicts.concat(nearbyConflicts);
        }
        
        return {
            hasConflict: conflicts.length > 0,
            conflicts: conflicts
        };
    }
    
    /**
     * 查找邻近对象
     * @param {Object} position 位置对象
     * @param {string} excludeObjectId 排除的对象ID
     * @returns {Array} 邻近对象列表
     */
    function _findNearbyObjects(position, excludeObjectId) {
        var nearby = [];
        var threshold = _config.conflictThreshold;
        
        for (var objId in _objects) {
            if (_objects.hasOwnProperty(objId) && objId !== excludeObjectId) {
                var obj = _objects[objId];
                if (obj.position) {
                    var distance = _calculateDistance(position, obj.position);
                    if (distance <= threshold) {
                        nearby.push({
                            objectId: objId,
                            objectType: obj.objectType,
                            position: obj.position,
                            distance: distance
                        });
                    }
                }
            }
        }
        
        return nearby;
    }
    
    /**
     * 计算两点间距离
     * @param {Object} pos1 位置1
     * @param {Object} pos2 位置2
     * @returns {number} 距离
     */
    function _calculateDistance(pos1, pos2) {
        var dx = (pos1.x || 0) - (pos2.x || 0);
        var dy = (pos1.y || 0) - (pos2.y || 0);
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * 更新索引
     * @param {string} objectId 对象ID
     * @param {Object} objectData 对象数据
     */
    function _updateIndexes(objectId, objectData) {
        // 更新类型索引
        if (_config.enableTypeIndex && objectData.objectType) {
            if (!_types[objectData.objectType]) {
                _types[objectData.objectType] = [];
            }
            _types[objectData.objectType].push(objectId);
        }
        
        // 更新位置索引
        if (_config.enablePositionIndex && objectData.position) {
            var positionKey = _generatePositionKey(objectData.position);
            if (positionKey) {
                if (!_positions[positionKey]) {
                    _positions[positionKey] = [];
                }
                _positions[positionKey].push(objectId);
            }
        }
    }
    
    /**
     * 从索引中移除对象
     * @param {string} objectId 对象ID
     * @param {Object} objectData 对象数据
     */
    function _removeFromIndexes(objectId, objectData) {
        // 从类型索引移除
        if (_config.enableTypeIndex && objectData.objectType && _types[objectData.objectType]) {
            var typeArray = _types[objectData.objectType];
            for (var i = 0; i < typeArray.length; i++) {
                if (typeArray[i] === objectId) {
                    typeArray.splice(i, 1);
                    break;
                }
            }
        }
        
        // 从位置索引移除
        if (_config.enablePositionIndex && objectData.position) {
            var positionKey = _generatePositionKey(objectData.position);
            if (positionKey && _positions[positionKey]) {
                var positionArray = _positions[positionKey];
                for (var i = 0; i < positionArray.length; i++) {
                    if (positionArray[i] === objectId) {
                        positionArray.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    
    /**
     * 更新统计信息
     * @param {string} operation 操作类型
     * @param {Object} data 相关数据
     */
    function _updateStatistics(operation, data) {
        switch (operation) {
            case "add":
                _statistics.totalObjects++;
                if (!_statistics.byType[data.objectType]) {
                    _statistics.byType[data.objectType] = 0;
                }
                _statistics.byType[data.objectType]++;
                break;
                
            case "remove":
                _statistics.totalObjects--;
                if (_statistics.byType[data.objectType]) {
                    _statistics.byType[data.objectType]--;
                }
                break;
                
            case "conflict":
                _statistics.positionConflicts++;
                break;
                
            case "cleanup":
                _statistics.cleanupOperations++;
                break;
        }
    }
    
    /**
     * 自动清理
     */
    function _autoCleanup() {
        if (!_config.autoCleanup) {
            return;
        }
        
        var now = new Date().getTime();
        var maxAge = 30 * 60 * 1000; // 30分钟
        var toRemove = [];
        
        for (var objectId in _objects) {
            if (_objects.hasOwnProperty(objectId)) {
                var obj = _objects[objectId];
                if (obj.createdAt && (now - obj.createdAt) > maxAge) {
                    toRemove.push(objectId);
                }
            }
        }
        
        for (var i = 0; i < toRemove.length; i++) {
            removeObject(toRemove[i]);
        }
        
        if (toRemove.length > 0) {
            _updateStatistics("cleanup", {removedCount: toRemove.length});
        }
    }
    
    // -------------------------------------------------------------
    // 公共接口
    // -------------------------------------------------------------
    
    /**
     * 注册对象
     * @param {string} objectId 对象ID
     * @param {Object} objectData 对象数据
     * @returns {boolean} 是否成功
     */
    function registerObject(objectId, objectData) {
        if (!objectId || !objectData) {
            return false;
        }
        
        // 检查对象数量限制
        if (_statistics.totalObjects >= _config.maxObjects) {
            _autoCleanup();
        }
        
        if (_statistics.totalObjects >= _config.maxObjects) {
            throw new Error("ObjectManager.registerObject: Maximum object limit reached");
        }
        
        // 检查位置冲突
        if (objectData.position) {
            var conflictResult = _checkPositionConflict(objectData.position, objectId);
            if (conflictResult.hasConflict) {
                _updateStatistics("conflict", {conflicts: conflictResult.conflicts});
                // 可以选择抛出错误或记录警告
                // 这里我们记录但继续注册
            }
        }
        
        // 注册对象
        _objects[objectId] = {
            objectId: objectId,
            objectType: objectData.objectType,
            wrapper: objectData.wrapper,
            position: objectData.position,
            properties: objectData.properties || {},
            createdAt: objectData.createdAt || new Date().getTime(),
            lastAccessed: new Date().getTime()
        };
        
        // 更新索引
        _updateIndexes(objectId, _objects[objectId]);
        
        // 更新统计
        _updateStatistics("add", _objects[objectId]);
        
        return true;
    }
    
    /**
     * 获取对象
     * @param {string} objectId 对象ID
     * @returns {Object} 对象数据
     */
    function getObject(objectId) {
        if (!objectId || !_objects[objectId]) {
            return null;
        }
        
        // 更新访问时间
        _objects[objectId].lastAccessed = new Date().getTime();
        
        return _objects[objectId];
    }
    
    /**
     * 移除对象
     * @param {string} objectId 对象ID
     * @returns {boolean} 是否成功
     */
    function removeObject(objectId) {
        if (!objectId || !_objects[objectId]) {
            return false;
        }
        
        var objectData = _objects[objectId];
        
        // 从索引移除
        _removeFromIndexes(objectId, objectData);
        
        // 删除对象
        delete _objects[objectId];
        
        // 更新统计
        _updateStatistics("remove", objectData);
        
        return true;
    }
    
    /**
     * 更新对象位置
     * @param {string} objectId 对象ID
     * @param {Object} newPosition 新位置
     * @returns {boolean} 是否成功
     */
    function updateObjectPosition(objectId, newPosition) {
        if (!objectId || !_objects[objectId]) {
            return false;
        }
        
        var objectData = _objects[objectId];
        var oldPosition = objectData.position;
        
        // 从旧位置索引移除
        if (oldPosition) {
            _removeFromIndexes(objectId, objectData);
        }
        
        // 更新位置
        objectData.position = newPosition;
        objectData.lastAccessed = new Date().getTime();
        
        // 添加到新位置索引
        _updateIndexes(objectId, objectData);
        
        return true;
    }
    
    /**
     * 按类型获取对象
     * @param {string} objectType 对象类型
     * @returns {Array} 对象列表
     */
    function getObjectsByType(objectType) {
        if (!objectType || !_types[objectType]) {
            return [];
        }
        
        var result = [];
        var objectIds = _types[objectType];
        
        for (var i = 0; i < objectIds.length; i++) {
            var objectId = objectIds[i];
            if (_objects[objectId]) {
                result.push(_objects[objectId]);
            }
        }
        
        return result;
    }
    
    /**
     * 按位置获取对象
     * @param {Object} position 位置对象
     * @param {number} radius 搜索半径
     * @returns {Array} 对象列表
     */
    function getObjectsByPosition(position, radius) {
        if (!position) {
            return [];
        }
        
        var result = [];
        radius = radius || 0;
        
        if (radius === 0) {
            // 精确匹配
            var positionKey = _generatePositionKey(position);
            if (_positions[positionKey]) {
                var objectIds = _positions[positionKey];
                for (var i = 0; i < objectIds.length; i++) {
                    var objectId = objectIds[i];
                    if (_objects[objectId]) {
                        result.push(_objects[objectId]);
                    }
                }
            }
        } else {
            // 范围搜索
            for (var objectId in _objects) {
                if (_objects.hasOwnProperty(objectId)) {
                    var obj = _objects[objectId];
                    if (obj.position) {
                        var distance = _calculateDistance(position, obj.position);
                        if (distance <= radius) {
                            result.push(obj);
                        }
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * 检查位置冲突
     * @param {Object} position 位置对象
     * @param {string} excludeObjectId 排除的对象ID
     * @returns {Object} 冲突检测结果
     */
    function checkPositionConflict(position, excludeObjectId) {
        return _checkPositionConflict(position, excludeObjectId);
    }
    
    /**
     * 获取所有对象
     * @returns {Array} 所有对象列表
     */
    function getAllObjects() {
        var result = [];
        for (var objectId in _objects) {
            if (_objects.hasOwnProperty(objectId)) {
                result.push(_objects[objectId]);
            }
        }
        return result;
    }
    
    /**
     * 获取对象数量
     * @returns {number} 对象数量
     */
    function getObjectCount() {
        return _statistics.totalObjects;
    }
    
    /**
     * 配置管理器
     * @param {Object} config 配置选项
     */
    function configure(config) {
        if (!config) {
            return;
        }
        
        for (var key in config) {
            if (config.hasOwnProperty(key) && _config.hasOwnProperty(key)) {
                _config[key] = config[key];
            }
        }
    }
    
    /**
     * 获取配置
     * @returns {Object} 当前配置
     */
    function getConfiguration() {
        var result = {};
        for (var key in _config) {
            if (_config.hasOwnProperty(key)) {
                result[key] = _config[key];
            }
        }
        return result;
    }
    
    /**
     * 获取统计信息
     * @returns {Object} 统计信息
     */
    function getStatistics() {
        return {
            totalObjects: _statistics.totalObjects,
            byType: _statistics.byType,
            positionConflicts: _statistics.positionConflicts,
            cleanupOperations: _statistics.cleanupOperations,
            memoryUsage: _statistics.memoryUsage,
            configuration: getConfiguration()
        };
    }
    
    /**
     * 清理所有对象
     */
    function clearAllObjects() {
        _objects = {};
        _positions = {};
        _types = {};
        
        _statistics = {
            totalObjects: 0,
            byType: {},
            positionConflicts: 0,
            cleanupOperations: 0,
            memoryUsage: 0
        };
    }
    
    /**
     * 执行自动清理
     */
    function performAutoCleanup() {
        _autoCleanup();
    }
    
    /**
     * 清理管理器资源
     */
    function cleanup() {
        clearAllObjects();
    }
    
    // -------------------------------------------------------------
    // 导出接口
    // -------------------------------------------------------------
    
    return {
        // 对象管理
        registerObject: registerObject,
        getObject: getObject,
        removeObject: removeObject,
        updateObjectPosition: updateObjectPosition,
        
        // 查询方法
        getObjectsByType: getObjectsByType,
        getObjectsByPosition: getObjectsByPosition,
        getAllObjects: getAllObjects,
        getObjectCount: getObjectCount,
        
        // 位置管理
        checkPositionConflict: checkPositionConflict,
        
        // 配置和统计
        configure: configure,
        getConfiguration: getConfiguration,
        getStatistics: getStatistics,
        
        // 维护操作
        clearAllObjects: clearAllObjects,
        performAutoCleanup: performAutoCleanup,
        cleanup: cleanup
    };
    
})();
