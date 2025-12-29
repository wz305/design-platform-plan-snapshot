/**
 * ArcWrapper - 圆弧对象封装 (v2.0.0)
 * 
 * 基于双向绑定架构的IPCB_Arc接口封装，提供圆弧对象的属性访问、计算和Mock支持
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var ArcWrapper = (function(){
    // 引入依赖 - 使用全局变量
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * ArcWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Arc对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     * @param {string} options.syncMode 同步模式 (realtime/auto/manual)
     */
    function ArcWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数
    var baseInst = BasePCBWrapper.create({
        objectType: "Arc",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        enableMock: options.enableMock,
        mockData: options.mockData || ArcWrapper.getDefaultMockData(),
        syncMode: options.syncMode || "auto"
    });

    function _setIdentityFromNative(nativeRef) {
        if (!nativeRef) return;
        baseInst.nativeObject = nativeRef;
        baseInst.directRef = nativeRef;
        baseInst.isMock = false;
        try {
            if (nativeRef.I_ObjectAddress !== undefined && nativeRef.I_ObjectAddress !== null) {
                var t = typeof nativeRef.I_ObjectAddress;
                var addr = null;
                try { addr = nativeRef.I_ObjectAddress; } catch (eAddr1) {}
                if (typeof addr === "function") {
                    try { addr = addr(); } catch (eAddr2) {}
                }
                if (addr === null || addr === undefined || addr === 0) {
                    if (t === "function" || t === "unknown") {
                        addr = nativeRef.I_ObjectAddress();
                    }
                }
                baseInst.handle = addr;
                baseInst.address = addr;
            } else if (nativeRef.ObjectAddress !== undefined && nativeRef.ObjectAddress !== null) {
                baseInst.address = nativeRef.ObjectAddress;
                baseInst.handle = nativeRef.ObjectAddress;
            }
        } catch (e1) {}
        if (!baseInst.handle && nativeRef) {
            baseInst.handle = nativeRef;
            baseInst.address = nativeRef;
        }
    }

    function _resolveLayerName(layerId) {
        if (typeof StackMap !== "undefined" && StackMap && StackMap.getNormalizedLayerName) {
            var name = StackMap.getNormalizedLayerName(layerId);
            if (name) return name;
        }
        if (typeof eTopLayer !== "undefined" && layerId === eTopLayer) return "TopLayer";
        if (typeof eBottomLayer !== "undefined" && layerId === eBottomLayer) return "BottomLayer";
        if (typeof eMultiLayer !== "undefined" && layerId === eMultiLayer) return "MultiLayer";
        return null;
    }

    if (options.nativeObject) {
        _setIdentityFromNative(options.nativeObject);
    }
    
    /**
     * 重写：提取圆弧特有属性
     */
    function _extractSpecificProperties() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 提取圆弧特有属性
            baseInst.setNativeProperty("XCenter", nativeObj.XCenter);
            baseInst.setNativeProperty("YCenter", nativeObj.YCenter);
            baseInst.setNativeProperty("Radius", nativeObj.Radius);
            baseInst.setNativeProperty("StartAngle", nativeObj.StartAngle);
            baseInst.setNativeProperty("EndAngle", nativeObj.EndAngle);
            baseInst.setNativeProperty("LineWidth", nativeObj.LineWidth);
            baseInst.setNativeProperty("Layer", nativeObj.Layer);
            
        } catch (error) {
            baseInst.handleError("_extractSpecificProperties", error);
        }
    }
    
    /**
     * 重写：同步属性到原生对象
     */
    function _syncPropertiesToNative() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 同步圆弧特有属性
            nativeObj.XCenter = baseInst.getNativeProperty("XCenter");
            nativeObj.YCenter = baseInst.getNativeProperty("YCenter");
            nativeObj.Radius = baseInst.getNativeProperty("Radius");
            nativeObj.StartAngle = baseInst.getNativeProperty("StartAngle");
            nativeObj.EndAngle = baseInst.getNativeProperty("EndAngle");
            nativeObj.LineWidth = baseInst.getNativeProperty("LineWidth");
            nativeObj.Layer = baseInst.getNativeProperty("Layer");
            
        } catch (error) {
            baseInst.handleError("_syncPropertiesToNative", error);
        }
    }
    
    // 重写基类的属性提取和同步方法
    baseInst._extractSpecificProperties = _extractSpecificProperties;
    baseInst._syncPropertiesToNative = _syncPropertiesToNative;
    
    // 初始化时提取属性
    _extractSpecificProperties();
    
    /**
     * 获取圆弧中心点X坐标
     * @returns {number} X坐标
     */
    function getCenterX() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的centerX，否则使用X1，最后使用默认值
            return mockData.centerX !== undefined ? mockData.centerX : 
                   (mockData.X1 !== undefined ? mockData.X1 : 0);
        }
        return baseInst.getNativeProperty("XCenter");
    }
    
    /**
     * 设置圆弧中心点X坐标
     * @param {number} value X坐标
     */
    function setCenterX(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().centerX = value;
        }
        baseInst.setNativeProperty("XCenter", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取圆弧中心点Y坐标
     * @returns {number} Y坐标
     */
    function getCenterY() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的centerY，否则使用Y1，最后使用默认值
            return mockData.centerY !== undefined ? mockData.centerY : 
                   (mockData.Y1 !== undefined ? mockData.Y1 : 0);
        }
        return baseInst.getNativeProperty("YCenter");
    }
    
    /**
     * 设置圆弧中心点Y坐标
     * @param {number} value Y坐标
     */
    function setCenterY(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().centerY = value;
        }
        baseInst.setNativeProperty("YCenter", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取圆弧半径
     * @returns {number} 半径
     */
    function getRadius() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的radius，否则计算默认值
            return mockData.radius !== undefined ? mockData.radius : 1000;
        }
        return baseInst.getNativeProperty("Radius");
    }
    
    /**
     * 设置圆弧半径
     * @param {number} value 半径
     */
    function setRadius(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().radius = value;
        }
        baseInst.setNativeProperty("Radius", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取起始角度（度）
     * @returns {number} 起始角度
     */
    function getStartAngle() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的startAngle，否则使用默认值0
            return mockData.startAngle !== undefined ? mockData.startAngle : 0;
        }
        return baseInst.getNativeProperty("StartAngle");
    }
    
    /**
     * 设置起始角度（度）
     * @param {number} value 起始角度
     */
    function setStartAngle(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().startAngle = value;
        }
        baseInst.setNativeProperty("StartAngle", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取结束角度（度）
     * @returns {number} 结束角度
     */
    function getEndAngle() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的endAngle，否则使用默认值90
            return mockData.endAngle !== undefined ? mockData.endAngle : 90;
        }
        return baseInst.getNativeProperty("EndAngle");
    }
    
    /**
     * 设置结束角度（度）
     * @param {number} value 结束角度
     */
    function setEndAngle(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().endAngle = value;
        }
        baseInst.setNativeProperty("EndAngle", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取线宽
     * @returns {number} 线宽
     */
    function getLineWidth() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().lineWidth || 0.1;
        }
        return baseInst.getNativeProperty("LineWidth");
    }
    
    /**
     * 设置线宽
     * @param {number} value 线宽
     */
    function setLineWidth(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().lineWidth = value;
        }
        baseInst.setNativeProperty("LineWidth", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取所在层
     * @returns {Object} 层对象
     */
    function getLayer() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().layer || { "Name": "Top Layer" };
        }
        return baseInst.getNativeProperty("Layer");
    }
    
    /**
     * 设置所在层
     * @param {Object} value 层对象
     */
    function setLayer(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().layer = value;
        }
        baseInst.setNativeProperty("Layer", value);
        baseInst._markDirty();
    }
    
    // ========== 高优先级API实现 ==========
    
    /**
     * 绕指定点旋转圆弧 (高优先级API)
     * @param {number} centerX 旋转中心X坐标
     * @param {number} centerY 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     */
    function rotateAroundXY(centerX, centerY, angle) {
        if (baseInst.isMockMode()) {
            // Mock模式下简单更新中心点位置
            var currentCenterX = getCenterX();
            var currentCenterY = getCenterY();
            var rad = angle * Math.PI / 180;
            var newCenterX = centerX + (currentCenterX - centerX) * Math.cos(rad) - (currentCenterY - centerY) * Math.sin(rad);
            var newCenterY = centerY + (currentCenterX - centerX) * Math.sin(rad) + (currentCenterY - centerY) * Math.cos(rad);
            setCenterX(newCenterX);
            setCenterY(newCenterY);
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.RotateAroundXY === "function") {
                nativeObj.RotateAroundXY(centerX, centerY, angle);
                // 旋转后重新提取属性
                _extractSpecificProperties();
            } else {
                // 降级处理：手动计算旋转
                var currentCenterX = getCenterX();
                var currentCenterY = getCenterY();
                var rad = angle * Math.PI / 180;
                var newCenterX = centerX + (currentCenterX - centerX) * Math.cos(rad) - (currentCenterY - centerY) * Math.sin(rad);
                var newCenterY = centerY + (currentCenterX - centerX) * Math.sin(rad) + (currentCenterY - centerY) * Math.cos(rad);
                setCenterX(newCenterX);
                setCenterY(newCenterY);
                // 同时更新起始和结束角度
                setStartAngle(getStartAngle() + angle);
                setEndAngle(getEndAngle() + angle);
            }
        } catch (error) {
            baseInst.handleError("rotateAroundXY", error);
        }
    }
    
    /**
     * 精确点碰撞检测 (高优先级API)
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否碰撞
     */
    function getState_StrictHitTest(x, y) {
        if (baseInst.isMockMode()) {
            // Mock模式下使用简单的圆弧检测
            return isPointOnArc(x, y, getLineWidth());
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.GetState_StrictHitTest === "function") {
                return nativeObj.GetState_StrictHitTest(x, y);
            }
            // 降级处理：使用几何计算
            return isPointOnArc(x, y, getLineWidth());
        } catch (error) {
            baseInst.handleError("getState_StrictHitTest", error);
            return false;
        }
    }
    
    // ========== 几何计算方法 ==========
    
    /**
     * 获取圆弧的起点坐标
     * @returns {Object} {x, y} 坐标
     */
    function getStartPoint() {
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        var startAngle = getStartAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.polarToCartesian(centerX, centerY, radius, startAngle);
        }
        
        // 降级处理：手动计算
        var rad = startAngle * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad)
        };
    }
    
    /**
     * 获取圆弧的终点坐标
     * @returns {Object} {x, y} 坐标
     */
    function getEndPoint() {
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        var endAngle = getEndAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.polarToCartesian(centerX, centerY, radius, endAngle);
        }
        
        // 降级处理：手动计算
        var rad = endAngle * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad)
        };
    }
    
    /**
     * 获取圆弧长度
     * @returns {number} 圆弧长度
     */
    function getArcLength() {
        var radius = getRadius();
        var startAngle = getStartAngle();
        var endAngle = getEndAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateArcLength(radius, startAngle, endAngle);
        }
        
        // 降级处理：手动计算
        var angleDiff = endAngle - startAngle;
        // 标准化角度差到0-360度范围
        while (angleDiff < 0) {
            angleDiff += 360;
        }
        while (angleDiff > 360) {
            angleDiff -= 360;
        }
        return 2 * Math.PI * radius * (angleDiff / 360);
    }
    
    /**
     * 获取圆弧的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleBoundingBox(centerX, centerY, radius);
        }
        
        // 降级处理：简单的圆形包围盒
        return {
            x1: centerX - radius,
            y1: centerY - radius,
            x2: centerX + radius,
            y2: centerY + radius
        };
    }
    
    /**
     * 检查点是否在圆弧上
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @param {number} tolerance 容差
     * @returns {boolean} 是否在圆弧上
     */
    function isPointOnArc(x, y, tolerance) {
        tolerance = tolerance || 0.01;
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        var startAngle = getStartAngle();
        var endAngle = getEndAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointOnArc(x, y, centerX, centerY, radius, startAngle, endAngle, tolerance);
        }
        
        // 降级处理：手动计算
        // 1. 检查点到圆心的距离是否接近半径
        var distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        if (Math.abs(distance - radius) > tolerance) {
            return false;
        }
        
        // 2. 检查点是否在圆弧角度范围内
        var pointAngle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
        var normalizedStart = startAngle % 360;
        var normalizedEnd = endAngle % 360;
        var normalizedPoint = pointAngle % 360;
        
        // 处理角度范围跨越0度的情况
        if (normalizedStart <= normalizedEnd) {
            return normalizedPoint >= normalizedStart && normalizedPoint <= normalizedEnd;
        } else {
            return normalizedPoint >= normalizedStart || normalizedPoint <= normalizedEnd;
        }
    }
    
    /**
     * 反转圆弧方向
     */
    function reverse() {
        var startAngle = getStartAngle();
        var endAngle = getEndAngle();
        
        setStartAngle(endAngle);
        setEndAngle(startAngle);
    }
    
    /**
     * 获取圆弧的完整信息
     * @returns {Object} 圆弧信息对象
     */
    function getArcInfo() {
        return {
            centerX: getCenterX(),
            centerY: getCenterY(),
            radius: getRadius(),
            startAngle: getStartAngle(),
            endAngle: getEndAngle(),
            lineWidth: getLineWidth(),
            layer: getLayer(),
            startPoint: getStartPoint(),
            endPoint: getEndPoint(),
            arcLength: getArcLength(),
            boundingBox: getBoundingBox()
        };
    }

    function toSpec() {
        var nativeObj = baseInst.nativeObject || null;
        var cx = null, cy = null, radius = null, sa = null, ea = null, lineWidth = null, layerId = null;
        try { cx = nativeObj.XCenter; } catch (e1) {}
        try { cy = nativeObj.YCenter; } catch (e2) {}
        try { radius = nativeObj.Radius; } catch (e3) {}
        try { sa = nativeObj.StartAngle; } catch (e4) {}
        try { ea = nativeObj.EndAngle; } catch (e5) {}
        try { lineWidth = nativeObj.LineWidth; } catch (e6) {}
        try { layerId = nativeObj.Layer; } catch (e7) {}

        var netName = "";
        try { if (nativeObj.Net && nativeObj.Net.Name) netName = nativeObj.Net.Name; } catch (e8) {}

        return {
            schema: "spec/0.1",
            type: "arc",
            handle: baseInst.handle || null,
            address: baseInst.address || null,
            payload: {
                common: {
                    centerX: cx,
                    centerY: cy,
                    radius: radius,
                    startAngle: sa,
                    endAngle: ea,
                    width: lineWidth,
                    layer: _resolveLayerName(layerId),
                    net: netName
                }
            }
        };
    }

    function initFromNative(nativeRef) {
        if (!nativeRef) {
            return false;
        }
        _setIdentityFromNative(nativeRef);
        try { baseInst._extractSpecificProperties(); } catch (e1) {}
        if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
            try { PCBObjectPool.register(baseInst); } catch (eReg) {}
        }
        return true;
    }
    
    /**
     * 同步所有属性到原生对象
     */
    function syncToNative() {
        baseInst.syncToNative();
    }
    
    /**
     * 从原生对象同步所有属性
     */
    function syncFromNative() {
        _extractSpecificProperties();
    }
    
    /**
     * 获取默认Mock数据
     * @returns {Object} 默认Mock数据
     */
    function getDefaultMockData() {
        return {
            centerX: 0,
            centerY: 0,
            radius: 1,
            startAngle: 0,
            endAngle: 90,
            lineWidth: 0.1,
            layer: { "Name": "Top Layer" }
        };
    }
    
    // 扩展基类实例
    baseInst.getCenterX = getCenterX;
    baseInst.setCenterX = setCenterX;
    baseInst.getCenterY = getCenterY;
    baseInst.setCenterY = setCenterY;
    baseInst.getRadius = getRadius;
    baseInst.setRadius = setRadius;
    baseInst.getStartAngle = getStartAngle;
    baseInst.setStartAngle = setStartAngle;
    baseInst.getEndAngle = getEndAngle;
    baseInst.setEndAngle = setEndAngle;
    baseInst.getLineWidth = getLineWidth;
    baseInst.setLineWidth = setLineWidth;
    baseInst.getLayer = getLayer;
    baseInst.setLayer = setLayer;
    baseInst.getStartPoint = getStartPoint;
    baseInst.getEndPoint = getEndPoint;
    baseInst.getArcLength = getArcLength;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.isPointOnArc = isPointOnArc;
    baseInst.reverse = reverse;
    baseInst.getArcInfo = getArcInfo;
    baseInst.syncToNative = syncToNative;
    baseInst.syncFromNative = syncFromNative;
    baseInst.initFromNative = initFromNative;
    baseInst.toSpec = toSpec;
    
    // 高优先级API
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    return baseInst;
}

/**
 * 创建ArcWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} ArcWrapper实例
 */
ArcWrapper.create = function(options) {
    return ArcWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
ArcWrapper.getDefaultMockData = function() {
    return {
        centerX: 0,
        centerY: 0,
        radius: 1,
        startAngle: 0,
        endAngle: 90,
        lineWidth: 0.1,
        layer: { "Name": "Top Layer" }
    };
};

    // 返回ArcWrapper构造函数
    return ArcWrapper;
    
})();


// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.ArcWrapper = ArcWrapper;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ArcWrapper;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.ArcWrapper = ArcWrapper;
    }
})();
