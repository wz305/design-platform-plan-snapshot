/**
 * ViaWrapper - 过孔对象封装 (v2.0.0)
 * 
 * 基于双向绑定架构的IPCB_Via接口封装，提供过孔对象的属性访问、计算和Mock支持
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var ViaWrapper = (function(){
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * ViaWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Via对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     * @param {string} options.syncMode 同步模式 (realtime/auto/manual)
     */
    function ViaWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数
    var baseInst = BasePCBWrapper.create({
        objectType: "Via",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        mockData: options.mockData || ViaWrapper.getDefaultMockData(),
        syncMode: options.syncMode || "auto"
    });
    
    /**
     * 重写：提取过孔特有属性
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
            
            // 提取过孔特有属性
            baseInst.cachedProperties.X = nativeObj.X;
            baseInst.cachedProperties.Y = nativeObj.Y;
            baseInst.cachedProperties.HoleSize = nativeObj.HoleSize;
            baseInst.cachedProperties.Size = nativeObj.Size;
            baseInst.cachedProperties.StartLayer = nativeObj.StartLayer;
            baseInst.cachedProperties.EndLayer = nativeObj.EndLayer;
            baseInst.cachedProperties.ViaType = nativeObj.ViaType;
            baseInst.cachedProperties.Plated = nativeObj.Plated;
            
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
            
            // 同步过孔特有属性
            nativeObj.X = baseInst.getNativeProperty("X");
            nativeObj.Y = baseInst.getNativeProperty("Y");
            nativeObj.HoleSize = baseInst.getNativeProperty("HoleSize");
            nativeObj.Size = baseInst.getNativeProperty("Size");
            nativeObj.StartLayer = baseInst.getNativeProperty("StartLayer");
            nativeObj.EndLayer = baseInst.getNativeProperty("EndLayer");
            nativeObj.ViaType = baseInst.getNativeProperty("ViaType");
            nativeObj.Plated = baseInst.getNativeProperty("Plated");
            
        } catch (error) {
            baseInst.handleError("_syncPropertiesToNative", error);
        }
    }
    
    // 重写基类的属性提取和同步方法
    baseInst._extractSpecificProperties = _extractSpecificProperties;
    baseInst._syncPropertiesToNative = _syncPropertiesToNative;

    function _ui(level, message, context, fnName) {
        var text = String(message || "");
        var payload = context || null;
        try {
            if (typeof UILoggerModule !== "undefined" && UILoggerModule) {
                if (level === "error" && UILoggerModule.uiError) {
                    UILoggerModule.uiError(text, payload, "ViaWrapper", fnName || "");
                    return;
                }
                if (level === "warn" && UILoggerModule.uiWarn) {
                    UILoggerModule.uiWarn(text, payload, "ViaWrapper", fnName || "");
                    return;
                }
                if (UILoggerModule.uiInfo) {
                    UILoggerModule.uiInfo(text, payload, "ViaWrapper", fnName || "");
                    return;
                }
            }
        } catch (e1) {}

        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) {
                var line = "[" + String(level).toUpperCase() + "] " + text;
                if (payload) {
                    try { line += " " + JSON.stringify(payload); } catch (e2) {}
                }
                memLog.Lines.Add(line);
                return;
            }
        } catch (e3) {}

        try { if (typeof ShowMessage !== "undefined") { ShowMessage(text); } } catch (e4) {}
    }

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

    function _resolveLayerId(layerName) {
        if (typeof StackMap !== "undefined" && StackMap && StackMap.getLayerId) {
            return StackMap.getLayerId(layerName);
        }
        if (layerName === "TopLayer" && typeof eTopLayer !== "undefined") return eTopLayer;
        if (layerName === "BottomLayer" && typeof eBottomLayer !== "undefined") return eBottomLayer;
        if (layerName === "MultiLayer" && typeof eMultiLayer !== "undefined") return eMultiLayer;
        return null;
    }
    
    // 初始化时提取属性
    _extractSpecificProperties();

    if (options.nativeObject) {
        _setIdentityFromNative(options.nativeObject);
    }

    if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
        try { PCBObjectPool.register(baseInst); } catch (eReg) {}
    }
    
    /**
     * 获取过孔中心点X坐标
     * @returns {number} X坐标
     */
    function getX() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().x || 0;
        }
        return baseInst.getNativeProperty("X");
    }
    
    /**
     * 设置过孔中心点X坐标
     * @param {number} value X坐标
     */
    function setX(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().x = value;
        }
        baseInst.setNativeProperty("X", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔中心点Y坐标
     * @returns {number} Y坐标
     */
    function getY() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().y || 0;
        }
        return baseInst.getNativeProperty("Y");
    }
    
    /**
     * 设置过孔中心点Y坐标
     * @param {number} value Y坐标
     */
    function setY(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().y = value;
        }
        baseInst.setNativeProperty("Y", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔孔径
     * @returns {number} 孔径
     */
    function getHoleSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().holeSize || 0.2;
        }
        return baseInst.getNativeProperty("HoleSize");
    }
    
    /**
     * 设置过孔孔径
     * @param {number} value 孔径
     */
    function setHoleSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().holeSize = value;
        }
        baseInst.setNativeProperty("HoleSize", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔直径
     * @returns {number} 直径
     */
    function getSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().size || 0.5;
        }
        return baseInst.getNativeProperty("Size");
    }
    
    /**
     * 设置过孔直径
     * @param {number} value 直径
     */
    function setSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().size = value;
        }
        baseInst.setNativeProperty("Size", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取起始层
     * @returns {Object} 起始层对象
     */
    function getStartLayer() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().startLayer || { "Name": "Top Layer" };
        }
        return baseInst.getNativeProperty("StartLayer");
    }
    
    /**
     * 设置起始层
     * @param {Object} value 起始层对象
     */
    function setStartLayer(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().startLayer = value;
        }
        baseInst.setNativeProperty("StartLayer", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取结束层
     * @returns {Object} 结束层对象
     */
    function getEndLayer() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().endLayer || { "Name": "Bottom Layer" };
        }
        return baseInst.getNativeProperty("EndLayer");
    }
    
    /**
     * 设置结束层
     * @param {Object} value 结束层对象
     */
    function setEndLayer(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().endLayer = value;
        }
        baseInst.setNativeProperty("EndLayer", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔类型
     * @returns {string} 过孔类型（Through, Blind, Buried）
     */
    function getViaType() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().viaType || "Through";
        }
        return baseInst.getNativeProperty("ViaType");
    }
    
    /**
     * 设置过孔类型
     * @param {string} value 过孔类型
     */
    function setViaType(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().viaType = value;
        }
        baseInst.setNativeProperty("ViaType", value);
        baseInst._markDirty();
    }
    
    /**
     * 检查过孔是否被电镀
     * @returns {boolean} 是否被电镀
     */
    function isPlated() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().plated !== false;
        }
        return baseInst.getNativeProperty("Plated");
    }
    
    /**
     * 设置过孔电镀状态
     * @param {boolean} value 是否电镀
     */
    function setPlated(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().plated = value;
        }
        baseInst.setNativeProperty("Plated", value);
        baseInst._markDirty();
    }
    
    // ========== 高优先级API实现 ==========
    
    /**
     * 绕指定点旋转过孔 (高优先级API)
     * @param {number} centerX 旋转中心X坐标
     * @param {number} centerY 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     */
    function rotateAroundXY(centerX, centerY, angle) {
        if (baseInst.isMockMode()) {
            // Mock模式下简单更新位置
            var currentX = getX();
            var currentY = getY();
            var rad = angle * Math.PI / 180;
            var newX = centerX + (currentX - centerX) * Math.cos(rad) - (currentY - centerY) * Math.sin(rad);
            var newY = centerY + (currentX - centerX) * Math.sin(rad) + (currentY - centerY) * Math.cos(rad);
            setX(newX);
            setY(newY);
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
                var currentX = getX();
                var currentY = getY();
                var rad = angle * Math.PI / 180;
                var newX = centerX + (currentX - centerX) * Math.cos(rad) - (currentY - centerY) * Math.sin(rad);
                var newY = centerY + (currentX - centerX) * Math.sin(rad) + (currentY - centerY) * Math.cos(rad);
                setX(newX);
                setY(newY);
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
            // Mock模式下使用简单的圆形检测
            return isPointInside(x, y);
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.GetState_StrictHitTest === "function") {
                return nativeObj.GetState_StrictHitTest(x, y);
            }
            // 降级处理：使用几何计算
            return isPointInside(x, y);
        } catch (error) {
            baseInst.handleError("getState_StrictHitTest", error);
            return false;
        }
    }
    
    // ========== 几何计算方法 ==========
    
    /**
     * 获取网络名称
     * @returns {string} 网络名称
     */
    function getNetName() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().netName || "";
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && nativeObj.Net && nativeObj.Net.Name) {
                return nativeObj.Net.Name;
            }
            return "";
        } catch (error) {
            baseInst.handleError("getNetName", error);
            return "";
        }
    }
    
    /**
     * 获取过孔的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var x = getX();
        var y = getY();
        var size = getSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleBoundingBox(x, y, size / 2);
        }
        
        // 降级处理：手动计算
        var radius = size / 2;
        return {
            x1: x - radius,
            y1: y - radius,
            x2: x + radius,
            y2: y + radius
        };
    }
    
    /**
     * 获取过孔面积
     * @returns {number} 过孔面积
     */
    function getArea() {
        var size = getSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleArea(size / 2);
        }
        
        // 降级处理：手动计算
        var radius = size / 2;
        return Math.PI * radius * radius;
    }
    
    /**
     * 获取过孔孔面积
     * @returns {number} 孔面积
     */
    function getHoleArea() {
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleArea(holeSize / 2);
        }
        
        // 降级处理：手动计算
        var radius = holeSize / 2;
        return Math.PI * radius * radius;
    }
    
    /**
     * 获取过孔环面积
     * @returns {number} 环面积
     */
    function getRingArea() {
        return getArea() - getHoleArea();
    }
    
    /**
     * 检查点是否在过孔内
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否在过孔内
     */
    function isPointInside(x, y) {
        var viaX = getX();
        var viaY = getY();
        var size = getSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointInCircle(x, y, viaX, viaY, size / 2);
        }
        
        // 降级处理：手动计算
        var radius = size / 2;
        var distance = Math.sqrt(Math.pow(x - viaX, 2) + Math.pow(y - viaY, 2));
        return distance <= radius;
    }
    
    /**
     * 检查点是否在过孔孔内
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否在过孔孔内
     */
    function isPointInHole(x, y) {
        var viaX = getX();
        var viaY = getY();
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointInCircle(x, y, viaX, viaY, holeSize / 2);
        }
        
        // 降级处理：手动计算
        var radius = holeSize / 2;
        var distance = Math.sqrt(Math.pow(x - viaX, 2) + Math.pow(y - viaY, 2));
        return distance <= radius;
    }
    
    /**
     * 获取过孔的电气特性
     * @returns {Object} 电气特性对象
     */
    function getElectricalProperties() {
        return {
            netName: getNetName(),
            resistance: calculateResistance(),
            capacitance: calculateCapacitance(),
            inductance: calculateInductance(),
            impedance: calculateImpedance()
        };
    }
    
    /**
     * 计算过孔电阻
     * @returns {number} 电阻值（欧姆）
     */
    function calculateResistance() {
        var size = getSize();
        var holeSize = getHoleSize();
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaResistance(size, holeSize, startLayer, endLayer);
        }
        
        // 降级处理：简单估算
        return 0.001; // 1mΩ 典型值
    }
    
    /**
     * 计算过孔电容
     * @returns {number} 电容值（pF）
     */
    function calculateCapacitance() {
        var size = getSize();
        var holeSize = getHoleSize();
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaCapacitance(size, holeSize, startLayer, endLayer);
        }
        
        // 降级处理：简单估算
        return 0.1; // 0.1pF 典型值
    }
    
    /**
     * 计算过孔电感
     * @returns {number} 电感值（nH）
     */
    function calculateInductance() {
        var size = getSize();
        var holeSize = getHoleSize();
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaInductance(size, holeSize, startLayer, endLayer);
        }
        
        // 降级处理：简单估算
        return 1.0; // 1nH 典型值
    }
    
    /**
     * 计算过孔阻抗
     * @returns {number} 阻抗值（欧姆）
     */
    function calculateImpedance() {
        var size = getSize();
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaImpedance(size, holeSize);
        }
        
        // 降级处理：简单估算
        return 50; // 50Ω 典型值
    }
    
    /**
     * 获取过孔的机械特性
     * @returns {Object} 机械特性对象
     */
    function getMechanicalProperties() {
        return {
            plated: isPlated(),
            viaType: getViaType(),
            aspectRatio: calculateAspectRatio(),
            drillTolerance: getDrillTolerance(),
            minAnnularRing: getMinAnnularRing()
        };
    }
    
    /**
     * 计算纵横比
     * @returns {number} 纵横比
     */
    function calculateAspectRatio() {
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaAspectRatio(startLayer, endLayer, holeSize);
        }
        
        // 降级处理：简单估算
        return 8.0; // 8:1 典型值
    }
    
    /**
     * 获取钻孔公差
     * @returns {number} 钻孔公差
     */
    function getDrillTolerance() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().drillTolerance || 0.05;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.DrillTolerance !== "undefined") {
                return nativeObj.DrillTolerance;
            }
        } catch (error) {
            baseInst.handleError("getDrillTolerance", error);
        }
        
        return 0.05; // 默认值
    }
    
    /**
     * 获取最小环宽
     * @returns {number} 最小环宽
     */
    function getMinAnnularRing() {
        var size = getSize();
        var holeSize = getHoleSize();
        var drillTolerance = getDrillTolerance();
        
        return (size - holeSize) / 2 - drillTolerance;
    }
    
    /**
     * 检查过孔是否满足制造约束
     * @returns {Object} 约束检查结果
     */
    function checkManufacturingConstraints() {
        var aspectRatio = calculateAspectRatio();
        var minAnnularRing = getMinAnnularRing();
        var viaType = getViaType();
        
        return {
            aspectRatioOK: aspectRatio <= 10, // 通常最大纵横比为10:1
            minAnnularRingOK: minAnnularRing >= 0.05, // 最小环宽0.05mm
            drillSizeOK: getHoleSize() >= 0.1, // 最小钻孔0.1mm
            viaTypeOK: viaType === "Through" || viaType === "Blind" || viaType === "Buried"
        };
    }
    
    /**
     * 获取过孔的完整信息
     * @returns {Object} 过孔信息对象
     */
    function getViaInfo() {
        return {
            x: getX(),
            y: getY(),
            holeSize: getHoleSize(),
            size: getSize(),
            startLayer: getStartLayer(),
            endLayer: getEndLayer(),
            viaType: getViaType(),
            netName: getNetName(),
            plated: isPlated(),
            boundingBox: getBoundingBox(),
            area: getArea(),
            holeArea: getHoleArea(),
            ringArea: getRingArea(),
            electrical: getElectricalProperties(),
            mechanical: getMechanicalProperties(),
            constraints: checkManufacturingConstraints()
        };
    }

    function initFromNative(nativeRef) {
        if (!nativeRef) {
            _ui("warn", "initFromNative: nativeRef is null", null, "initFromNative");
            return false;
        }
        _setIdentityFromNative(nativeRef);
        try { _extractSpecificProperties(); } catch (e1) {}
        if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
            try { PCBObjectPool.register(baseInst); } catch (eReg) {}
        }
        return true;
    }

    function toSpec() {
        var nativeObj = baseInst.nativeObject || null;
        var x = null, y = null, hole = null, size = null;
        var startLayerId = null, endLayerId = null;
        try { x = nativeObj.X; } catch (e1) {}
        try { y = nativeObj.Y; } catch (e2) {}
        try { hole = nativeObj.HoleSize; } catch (e3) {}
        try { size = nativeObj.Size; } catch (e4) {}

        try { if (nativeObj.LowLayer !== undefined) startLayerId = nativeObj.LowLayer; } catch (e5) {}
        try { if (nativeObj.HighLayer !== undefined) endLayerId = nativeObj.HighLayer; } catch (e6) {}
        try {
            if (startLayerId === null && nativeObj.StartLayer !== undefined) {
                if (typeof nativeObj.StartLayer === "number") startLayerId = nativeObj.StartLayer;
                else if (nativeObj.StartLayer && nativeObj.StartLayer.LayerID !== undefined) startLayerId = nativeObj.StartLayer.LayerID;
            }
        } catch (e7) {}
        try {
            if (endLayerId === null && nativeObj.EndLayer !== undefined) {
                if (typeof nativeObj.EndLayer === "number") endLayerId = nativeObj.EndLayer;
                else if (nativeObj.EndLayer && nativeObj.EndLayer.LayerID !== undefined) endLayerId = nativeObj.EndLayer.LayerID;
            }
        } catch (e8) {}

        var fromName = _resolveLayerName(startLayerId);
        var toName = _resolveLayerName(endLayerId);
        var layerMode = "multilayer";
        if (fromName && toName) {
            if (fromName === "TopLayer" && toName === "BottomLayer") {
                layerMode = "multilayer";
            } else if (fromName === "TopLayer" || toName === "BottomLayer") {
                layerMode = "top-mid-bot";
            } else {
                layerMode = "full-stack";
            }
        }

        return {
            schema: "spec/0.1",
            type: "via",
            handle: baseInst.handle || null,
            address: baseInst.address || null,
            payload: {
                common: {
                    x: x,
                    y: y,
                    net: getNetName(),
                    hole: { diameter: hole },
                    size: { xSize: size, ySize: size },
                    isPlated: isPlated()
                },
                layerMode: layerMode,
                layerSpan: (fromName && toName) ? { from: fromName, to: toName } : null
            }
        };
    }

    function applySpec(specPayload) {
        if (!specPayload || !specPayload.common) {
            return { ok: false, error: { code: "BAD_SPEC", message: "payload.common is required" } };
        }

        var nativeObj = baseInst.nativeObject || null;
        if (!nativeObj) {
            return { ok: false, error: { code: "NO_NATIVE", message: "native object not available" } };
        }

        var c = specPayload.common;
        try { if (c.x !== undefined) nativeObj.X = c.x; } catch (e1) {}
        try { if (c.y !== undefined) nativeObj.Y = c.y; } catch (e2) {}
        try { if (c.hole && c.hole.diameter !== undefined) nativeObj.HoleSize = c.hole.diameter; } catch (e3) {}
        try { if (c.size && c.size.xSize !== undefined) nativeObj.Size = c.size.xSize; } catch (e4) {}
        try { if (c.isPlated !== undefined) nativeObj.Plated = c.isPlated; } catch (e5) {}

        if (specPayload.layerSpan && specPayload.layerSpan.from && specPayload.layerSpan.to) {
            var fromId = _resolveLayerId(specPayload.layerSpan.from);
            var toId = _resolveLayerId(specPayload.layerSpan.to);
            if (fromId !== null && toId !== null) {
                // 未确认：StartLayer/EndLayer 或 LowLayer/HighLayer，使用 feature-detect
                try { if (nativeObj.LowLayer !== undefined) nativeObj.LowLayer = fromId; } catch (e6) {}
                try { if (nativeObj.HighLayer !== undefined) nativeObj.HighLayer = toId; } catch (e7) {}
                try { if (nativeObj.StartLayer !== undefined) nativeObj.StartLayer = fromId; } catch (e8) {}
                try { if (nativeObj.EndLayer !== undefined) nativeObj.EndLayer = toId; } catch (e9) {}
            } else {
                _ui("warn", "applySpec: unsupported layerSpan", specPayload.layerSpan, "applySpec");
            }
        }

        return { ok: true };
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
            x: 0,
            y: 0,
            holeSize: 0.2,
            size: 0.5,
            startLayer: { "Name": "Top Layer" },
            endLayer: { "Name": "Bottom Layer" },
            viaType: "Through",
            netName: "",
            plated: true,
            drillTolerance: 0.05
        };
    }
    
    // 扩展基类实例
    baseInst.getX = getX;
    baseInst.setX = setX;
    baseInst.getY = getY;
    baseInst.setY = setY;
    baseInst.getHoleSize = getHoleSize;
    baseInst.setHoleSize = setHoleSize;
    baseInst.getSize = getSize;
    baseInst.setSize = setSize;
    baseInst.getStartLayer = getStartLayer;
    baseInst.setStartLayer = setStartLayer;
    baseInst.getEndLayer = getEndLayer;
    baseInst.setEndLayer = setEndLayer;
    baseInst.getViaType = getViaType;
    baseInst.setViaType = setViaType;
    baseInst.getNetName = getNetName;
    baseInst.isPlated = isPlated;
    baseInst.setPlated = setPlated;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.getArea = getArea;
    baseInst.getHoleArea = getHoleArea;
    baseInst.getRingArea = getRingArea;
    baseInst.isPointInside = isPointInside;
    baseInst.isPointInHole = isPointInHole;
    baseInst.getElectricalProperties = getElectricalProperties;
    baseInst.calculateResistance = calculateResistance;
    baseInst.calculateCapacitance = calculateCapacitance;
    baseInst.calculateInductance = calculateInductance;
    baseInst.calculateImpedance = calculateImpedance;
    baseInst.getMechanicalProperties = getMechanicalProperties;
    baseInst.calculateAspectRatio = calculateAspectRatio;
    baseInst.getDrillTolerance = getDrillTolerance;
    baseInst.getMinAnnularRing = getMinAnnularRing;
    baseInst.checkManufacturingConstraints = checkManufacturingConstraints;
    baseInst.getViaInfo = getViaInfo;
    baseInst.syncToNative = syncToNative;
    baseInst.syncFromNative = syncFromNative;
    
    // 高优先级API
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;

    baseInst.initFromNative = initFromNative;
    baseInst.toSpec = toSpec;
    baseInst.applySpec = applySpec;
    
    return baseInst;
}

/**
 * 创建ViaWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} ViaWrapper实例
 */
ViaWrapper.create = function(options) {
    return ViaWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
ViaWrapper.getDefaultMockData = function() {
    return {
        x: 0,
        y: 0,
        holeSize: 0.2,
        size: 0.5,
        startLayer: { "Name": "Top Layer" },
        endLayer: { "Name": "Bottom Layer" },
        viaType: "Through",
        netName: "",
        plated: true,
        drillTolerance: 0.05
    };
};

    // 返回ViaWrapper构造函数
    return ViaWrapper;
    
})();


// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.ViaWrapper = ViaWrapper;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ViaWrapper;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.ViaWrapper = ViaWrapper;
    }
})();
