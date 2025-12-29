/**
 * PadWrapper - 焊盘对象封装 (v2.0.0)
 * 
 * 基于双向绑定架构的IPCB_Pad接口封装，提供焊盘对象的属性访问、计算和Mock支持
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var PadWrapper = (function(){
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * PadWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Pad对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     * @param {string} options.syncMode 同步模式 (realtime/auto/manual)
     */
    function PadWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数
    var baseInst = BasePCBWrapper.create({
        objectType: "Pad",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        enableMock: options.enableMock,
        mockData: options.mockData || PadWrapper.getDefaultMockData(),
        syncMode: options.syncMode || "auto"
    });
    
    /**
     * 重写：提取焊盘特有属性
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
            
            // 提取焊盘特有属性
            baseInst.cachedProperties.X = nativeObj.X;
            baseInst.cachedProperties.Y = nativeObj.Y;
            baseInst.cachedProperties.SizeX = nativeObj.SizeX;
            baseInst.cachedProperties.SizeY = nativeObj.SizeY;
            baseInst.cachedProperties.Shape = nativeObj.Shape;
            baseInst.cachedProperties.HoleSize = nativeObj.HoleSize;
            baseInst.cachedProperties.Layer = nativeObj.Layer;
            baseInst.cachedProperties.Name = nativeObj.Name;
            baseInst.cachedProperties.PadType = nativeObj.PadType;
            baseInst.cachedProperties.Rotation = nativeObj.Rotation;
            baseInst.cachedProperties.Plated = nativeObj.Plated;
            baseInst.cachedProperties.Connected = nativeObj.Connected;
            
            // 高优先级API：PadMode
            if (typeof nativeObj.PadMode !== "undefined") {
                baseInst.cachedProperties.PadMode = nativeObj.PadMode;
            }
            
            // 中优先级API
            if (typeof nativeObj.TopShape !== "undefined") {
                baseInst.cachedProperties.TopShape = nativeObj.TopShape;
            }
            if (typeof nativeObj.MidShape !== "undefined") {
                baseInst.cachedProperties.MidShape = nativeObj.MidShape;
            }
            if (typeof nativeObj.BotShape !== "undefined") {
                baseInst.cachedProperties.BotShape = nativeObj.BotShape;
            }
            if (typeof nativeObj.SlotSize !== "undefined") {
                baseInst.cachedProperties.SlotSize = nativeObj.SlotSize;
            }
            if (typeof nativeObj.SlotXSize !== "undefined") {
                baseInst.cachedProperties.SlotXSize = nativeObj.SlotXSize;
            }
            if (typeof nativeObj.SlotYSize !== "undefined") {
                baseInst.cachedProperties.SlotYSize = nativeObj.SlotYSize;
            }
            
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
            
            // 同步基础属性
            nativeObj.X = baseInst.getNativeProperty("X");
            nativeObj.Y = baseInst.getNativeProperty("Y");
            nativeObj.SizeX = baseInst.getNativeProperty("SizeX");
            nativeObj.SizeY = baseInst.getNativeProperty("SizeY");
            nativeObj.Shape = baseInst.getNativeProperty("Shape");
            nativeObj.HoleSize = baseInst.getNativeProperty("HoleSize");
            nativeObj.Layer = baseInst.getNativeProperty("Layer");
            nativeObj.Name = baseInst.getNativeProperty("Name");
            nativeObj.PadType = baseInst.getNativeProperty("PadType");
            nativeObj.Rotation = baseInst.getNativeProperty("Rotation");
            nativeObj.Plated = baseInst.getNativeProperty("Plated");
            nativeObj.Connected = baseInst.getNativeProperty("Connected");
            
            // 同步高优先级API
            if (typeof nativeObj.PadMode !== "undefined") {
                nativeObj.PadMode = baseInst.getNativeProperty("PadMode");
            }
            
            // 同步中优先级API
            if (typeof nativeObj.TopShape !== "undefined") {
                nativeObj.TopShape = baseInst.getNativeProperty("TopShape");
            }
            if (typeof nativeObj.MidShape !== "undefined") {
                nativeObj.MidShape = baseInst.getNativeProperty("MidShape");
            }
            if (typeof nativeObj.BotShape !== "undefined") {
                nativeObj.BotShape = baseInst.getNativeProperty("BotShape");
            }
            if (typeof nativeObj.SlotSize !== "undefined") {
                nativeObj.SlotSize = baseInst.getNativeProperty("SlotSize");
            }
            if (typeof nativeObj.SlotXSize !== "undefined") {
                nativeObj.SlotXSize = baseInst.getNativeProperty("SlotXSize");
            }
            if (typeof nativeObj.SlotYSize !== "undefined") {
                nativeObj.SlotYSize = baseInst.getNativeProperty("SlotYSize");
            }
            
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
                    UILoggerModule.uiError(text, payload, "PadWrapper", fnName || "");
                    return;
                }
                if (level === "warn" && UILoggerModule.uiWarn) {
                    UILoggerModule.uiWarn(text, payload, "PadWrapper", fnName || "");
                    return;
                }
                if (UILoggerModule.uiInfo) {
                    UILoggerModule.uiInfo(text, payload, "PadWrapper", fnName || "");
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

    function _padModeToLayerMode(padMode) {
        if (typeof ePadMode_Simple !== "undefined" && padMode === ePadMode_Simple) return "multilayer";
        if (typeof ePadMode_LocalStack !== "undefined" && padMode === ePadMode_LocalStack) return "top-mid-bot";
        if (typeof ePadMode_ExternalStack !== "undefined" && padMode === ePadMode_ExternalStack) return "full-stack";
        if (padMode === 0) return "multilayer";
        if (padMode === 1) return "top-mid-bot";
        if (padMode === 2) return "full-stack";
        return "multilayer";
    }

    function _layerModeToPadMode(layerMode) {
        if (layerMode === "top-mid-bot") {
            if (typeof ePadMode_LocalStack !== "undefined") return ePadMode_LocalStack;
            return 1;
        }
        if (layerMode === "full-stack") {
            if (typeof ePadMode_ExternalStack !== "undefined") return ePadMode_ExternalStack;
            return 2;
        }
        if (typeof ePadMode_Simple !== "undefined") return ePadMode_Simple;
        return 0;
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
     * 获取焊盘中心点X坐标
     * @returns {number} X坐标
     */
    function getX() {
        return baseInst.getNativeProperty("X");
    }
    
    /**
     * 设置焊盘中心点X坐标
     * @param {number} value X坐标
     */
    function setX(value) {
        baseInst.setNativeProperty("X", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘中心点Y坐标
     * @returns {number} Y坐标
     */
    function getY() {
        return baseInst.getNativeProperty("Y");
    }
    
    /**
     * 设置焊盘中心点Y坐标
     * @param {number} value Y坐标
     */
    function setY(value) {
        baseInst.setNativeProperty("Y", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘尺寸（X方向）
     * @returns {number} X方向尺寸
     */
    function getSizeX() {
        return baseInst.getNativeProperty("SizeX");
    }
    
    /**
     * 设置焊盘尺寸（X方向）
     * @param {number} value X方向尺寸
     */
    function setSizeX(value) {
        baseInst.setNativeProperty("SizeX", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘尺寸（Y方向）
     * @returns {number} Y方向尺寸
     */
    function getSizeY() {
        return baseInst.getNativeProperty("SizeY");
    }
    
    /**
     * 设置焊盘尺寸（Y方向）
     * @param {number} value Y方向尺寸
     */
    function setSizeY(value) {
        baseInst.setNativeProperty("SizeY", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘形状
     * @returns {string} 焊盘形状（Rect, Round, Octagonal, RoundedRect）
     */
    function getShape() {
        return baseInst.getNativeProperty("Shape");
    }
    
    /**
     * 设置焊盘形状
     * @param {string} value 焊盘形状
     */
    function setShape(value) {
        baseInst.setNativeProperty("Shape", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取钻孔尺寸
     * @returns {number} 钻孔尺寸
     */
    function getHoleSize() {
        return baseInst.getNativeProperty("HoleSize");
    }
    
    /**
     * 设置钻孔尺寸
     * @param {number} value 钻孔尺寸
     */
    function setHoleSize(value) {
        baseInst.setNativeProperty("HoleSize", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取所在层
     * @returns {Object} 层对象
     */
    function getLayer() {
        return baseInst.getNativeProperty("Layer");
    }
    
    /**
     * 设置所在层
     * @param {Object} value 层对象
     */
    function setLayer(value) {
        baseInst.setNativeProperty("Layer", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘编号
     * @returns {string} 焊盘编号
     */
    function getName() {
        return baseInst.getNativeProperty("Name");
    }
    
    /**
     * 设置焊盘编号
     * @param {string} value 焊盘编号
     */
    function setName(value) {
        baseInst.setNativeProperty("Name", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘类型
     * @returns {string} 焊盘类型（Standard, Mechanical, Thermal, Fiducial）
     */
    function getPadType() {
        return baseInst.getNativeProperty("PadType");
    }
    
    /**
     * 设置焊盘类型
     * @param {string} value 焊盘类型
     */
    function setPadType(value) {
        baseInst.setNativeProperty("PadType", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘旋转角度
     * @returns {number} 旋转角度（度）
     */
    function getRotation() {
        return baseInst.getNativeProperty("Rotation");
    }
    
    /**
     * 设置焊盘旋转角度
     * @param {number} value 旋转角度（度）
     */
    function setRotation(value) {
        baseInst.setNativeProperty("Rotation", value);
        baseInst._markDirty();
    }
    
    /**
     * 检查焊盘是否被电镀
     * @returns {boolean} 是否被电镀
     */
    function isPlated() {
        return baseInst.getNativeProperty("Plated");
    }
    
    /**
     * 设置焊盘电镀状态
     * @param {boolean} value 是否电镀
     */
    function setPlated(value) {
        baseInst.setNativeProperty("Plated", value);
        baseInst._markDirty();
    }
    
    /**
     * 检查焊盘是否已连接
     * @returns {boolean} 是否已连接
     */
    function isConnected() {
        return baseInst.getNativeProperty("Connected");
    }
    
    // ========== 高优先级API实现 ==========
    
    /**
     * 获取焊盘模式 (最高优先级API)
     * @returns {number} 焊盘模式
     */
    function getPadMode() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().padMode || 0;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.PadMode !== "undefined") {
                return nativeObj.PadMode;
            }
            return baseInst.getNativeProperty("PadMode") || 0;
        } catch (error) {
            baseInst.handleError("getPadMode", error);
            return 0;
        }
    }
    
    /**
     * 设置焊盘模式 (最高优先级API)
     * @param {number} value 焊盘模式
     */
    function setPadMode(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().padMode = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.PadMode !== "undefined") {
                nativeObj.PadMode = value;
            }
            baseInst.setNativeProperty("PadMode", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setPadMode", error);
        }
    }
    
    /**
     * 绕指定点旋转焊盘 (高优先级API)
     * @param {number} centerX 旋转中心X坐标
     * @param {number} centerY 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     */
    function rotateAroundXY(centerX, centerY, angle) {
        if (baseInst.isMockMode()) {
            // Mock模式下简单更新旋转角度
            var currentRotation = getRotation();
            setRotation(currentRotation + angle);
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
                setRotation(getRotation() + angle);
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
            // Mock模式下使用简单的矩形检测
            var padX = getX();
            var padY = getY();
            var sizeX = getSizeX();
            var sizeY = getSizeY();
            return x >= padX - sizeX/2 && x <= padX + sizeX/2 &&
                   y >= padY - sizeY/2 && y <= padY + sizeY/2;
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
    
    // ========== 中优先级API实现 ==========
    
    /**
     * 获取顶层焊盘形状 (中优先级API)
     * @returns {string} 顶层形状
     */
    function getTopShape() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().topShape || getShape();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.TopShape !== "undefined") {
                return nativeObj.TopShape;
            }
            return baseInst.getNativeProperty("TopShape") || getShape();
        } catch (error) {
            baseInst.handleError("getTopShape", error);
            return getShape();
        }
    }
    
    /**
     * 设置顶层焊盘形状 (中优先级API)
     * @param {string} value 顶层形状
     */
    function setTopShape(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().topShape = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.TopShape !== "undefined") {
                nativeObj.TopShape = value;
            }
            baseInst.setNativeProperty("TopShape", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setTopShape", error);
        }
    }
    
    /**
     * 获取中间层焊盘形状 (中优先级API)
     * @returns {string} 中间层形状
     */
    function getMidShape() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().midShape || getShape();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.MidShape !== "undefined") {
                return nativeObj.MidShape;
            }
            return baseInst.getNativeProperty("MidShape") || getShape();
        } catch (error) {
            baseInst.handleError("getMidShape", error);
            return getShape();
        }
    }
    
    /**
     * 设置中间层焊盘形状 (中优先级API)
     * @param {string} value 中间层形状
     */
    function setMidShape(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().midShape = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.MidShape !== "undefined") {
                nativeObj.MidShape = value;
            }
            baseInst.setNativeProperty("MidShape", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setMidShape", error);
        }
    }
    
    /**
     * 获取底层焊盘形状 (中优先级API)
     * @returns {string} 底层形状
     */
    function getBotShape() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().botShape || getShape();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.BotShape !== "undefined") {
                return nativeObj.BotShape;
            }
            return baseInst.getNativeProperty("BotShape") || getShape();
        } catch (error) {
            baseInst.handleError("getBotShape", error);
            return getShape();
        }
    }
    
    /**
     * 设置底层焊盘形状 (中优先级API)
     * @param {string} value 底层形状
     */
    function setBotShape(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().botShape = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.BotShape !== "undefined") {
                nativeObj.BotShape = value;
            }
            baseInst.setNativeProperty("BotShape", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setBotShape", error);
        }
    }
    
    /**
     * 获取槽孔尺寸 (中优先级API)
     * @returns {number} 槽孔尺寸
     */
    function getSlotSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().slotSize || getHoleSize();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotSize !== "undefined") {
                return nativeObj.SlotSize;
            }
            return baseInst.getNativeProperty("SlotSize") || getHoleSize();
        } catch (error) {
            baseInst.handleError("getSlotSize", error);
            return getHoleSize();
        }
    }
    
    /**
     * 设置槽孔尺寸 (中优先级API)
     * @param {number} value 槽孔尺寸
     */
    function setSlotSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().slotSize = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotSize !== "undefined") {
                nativeObj.SlotSize = value;
            }
            baseInst.setNativeProperty("SlotSize", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setSlotSize", error);
        }
    }
    
    /**
     * 获取槽孔X方向尺寸 (中优先级API)
     * @returns {number} 槽孔X方向尺寸
     */
    function getSlotXSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().slotXSize || getHoleSize();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotXSize !== "undefined") {
                return nativeObj.SlotXSize;
            }
            return baseInst.getNativeProperty("SlotXSize") || getHoleSize();
        } catch (error) {
            baseInst.handleError("getSlotXSize", error);
            return getHoleSize();
        }
    }
    
    /**
     * 设置槽孔X方向尺寸 (中优先级API)
     * @param {number} value 槽孔X方向尺寸
     */
    function setSlotXSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().slotXSize = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotXSize !== "undefined") {
                nativeObj.SlotXSize = value;
            }
            baseInst.setNativeProperty("SlotXSize", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setSlotXSize", error);
        }
    }
    
    /**
     * 获取槽孔Y方向尺寸 (中优先级API)
     * @returns {number} 槽孔Y方向尺寸
     */
    function getSlotYSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().slotYSize || getHoleSize();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotYSize !== "undefined") {
                return nativeObj.SlotYSize;
            }
            return baseInst.getNativeProperty("SlotYSize") || getHoleSize();
        } catch (error) {
            baseInst.handleError("getSlotYSize", error);
            return getHoleSize();
        }
    }
    
    /**
     * 设置槽孔Y方向尺寸 (中优先级API)
     * @param {number} value 槽孔Y方向尺寸
     */
    function setSlotYSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().slotYSize = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotYSize !== "undefined") {
                nativeObj.SlotYSize = value;
            }
            baseInst.setNativeProperty("SlotYSize", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setSlotYSize", error);
        }
    }
    
    // ========== 几何计算方法 ==========
    
    /**
     * 获取焊盘的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var x = getX();
        var y = getY();
        var sizeX = getSizeX();
        var sizeY = getSizeY();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateRectBoundingBox(x, y, sizeX, sizeY);
        }
        
        // 降级处理
        return {
            x1: x - sizeX / 2,
            y1: y - sizeY / 2,
            x2: x + sizeX / 2,
            y2: y + sizeY / 2
        };
    }
    
    /**
     * 获取焊盘面积
     * @returns {number} 焊盘面积
     */
    function getArea() {
        var sizeX = getSizeX();
        var sizeY = getSizeY();
        var shape = getShape();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculatePadArea(sizeX, sizeY, shape);
        }
        
        // 降级处理：简单矩形面积
        return sizeX * sizeY;
    }
    
    /**
     * 检查点是否在焊盘内
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否在焊盘内
     */
    function isPointInside(x, y) {
        var padX = getX();
        var padY = getY();
        var sizeX = getSizeX();
        var sizeY = getSizeY();
        var shape = getShape();
        var rotation = getRotation();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointInPad(x, y, padX, padY, sizeX, sizeY, shape, rotation);
        }
        
        // 降级处理：简单的矩形检测
        return x >= padX - sizeX/2 && x <= padX + sizeX/2 &&
               y >= padY - sizeY/2 && y <= padY + sizeY/2;
    }
    
    /**
     * 获取焊盘的电气特性
     * @returns {Object} 电气特性对象
     */
    function getElectricalProperties() {
        return {
            isPlated: isPlated(),
            isConnected: isConnected(),
            netName: getNetName(),
            voltage: getVoltage()
        };
    }
    
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
     * 获取焊盘电压
     * @returns {number} 电压值
     */
    function getVoltage() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().voltage || 0;
        }
        // 实际实现需要从网络或其他地方获取电压信息
        return 0;
    }
    
    /**
     * 获取焊盘的完整信息
     * @returns {Object} 焊盘信息对象
     */
    function getPadInfo() {
        return {
            x: getX(),
            y: getY(),
            sizeX: getSizeX(),
            sizeY: getSizeY(),
            shape: getShape(),
            holeSize: getHoleSize(),
            layer: getLayer(),
            name: getName(),
            padType: getPadType(),
            rotation: getRotation(),
            padMode: getPadMode(),
            topShape: getTopShape(),
            midShape: getMidShape(),
            botShape: getBotShape(),
            slotSize: getSlotSize(),
            slotXSize: getSlotXSize(),
            slotYSize: getSlotYSize(),
            boundingBox: getBoundingBox(),
            area: getArea(),
            electrical: getElectricalProperties()
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
        var x = null, y = null, sizeX = null, sizeY = null, hole = null, shape = null;
        var padMode = null;
        var layerId = null;

        try { x = nativeObj.X; } catch (e1) {}
        try { y = nativeObj.Y; } catch (e2) {}
        try { sizeX = nativeObj.SizeX; } catch (e3) {}
        try { sizeY = nativeObj.SizeY; } catch (e4) {}
        try { hole = nativeObj.HoleSize; } catch (e5) {}
        try { shape = nativeObj.Shape; } catch (e6) {}
        try { padMode = nativeObj.PadMode; } catch (e7) {}
        try { layerId = nativeObj.Layer; } catch (e8) {}

        var layerMode = _padModeToLayerMode(padMode);
        var layerTable = {};
        var note = null;

        if (layerMode === "multilayer") {
            var defaultLayerName = _resolveLayerName(layerId) || "MultiLayer";
            layerTable[defaultLayerName] = { shape: shape, xSize: sizeX, ySize: sizeY };
        } else if (layerMode === "top-mid-bot") {
            layerTable.TopLayer = { shape: getTopShape(), xSize: sizeX, ySize: sizeY };
            layerTable.MidLayer1 = { shape: getMidShape(), xSize: sizeX, ySize: sizeY };
            layerTable.BottomLayer = { shape: getBotShape(), xSize: sizeX, ySize: sizeY };
        } else {
            // full-stack: 尝试按 StackMap 逐层读取（未确认具体API）
            var layerNames = (typeof StackMap !== "undefined" && StackMap && StackMap.getAllNormalizedLayers) ? StackMap.getAllNormalizedLayers() : [];
            var i;
            for (i = 0; i < layerNames.length; i++) {
                var name = layerNames[i];
                if (name === "MultiLayer") continue;
                var lid = _resolveLayerId(name);
                if (lid === null) continue;
                var xStack = null;
                var yStack = null;
                var sStack = null;
                try {
                    if (nativeObj.GetState_XStackSizeOnLayer) xStack = nativeObj.GetState_XStackSizeOnLayer(lid);
                } catch (e9) {}
                try {
                    if (nativeObj.GetState_YStackSizeOnLayer) yStack = nativeObj.GetState_YStackSizeOnLayer(lid);
                } catch (e10) {}
                try {
                    if (nativeObj.GetState_StackShapeOnLayer) sStack = nativeObj.GetState_StackShapeOnLayer(lid);
                } catch (e11) {}

                if (xStack !== null || yStack !== null || sStack !== null) {
                    layerTable[name] = { shape: sStack || shape, xSize: xStack || sizeX, ySize: yStack || sizeY };
                }
            }
            var hasAny = false;
            var k;
            for (k in layerTable) {
                if (layerTable.hasOwnProperty(k)) { hasAny = true; break; }
            }
            if (!hasAny) {
                layerTable.TopLayer = { shape: shape, xSize: sizeX, ySize: sizeY };
                note = "未确认: full-stack 层数据读取";
            }
        }

        return {
            schema: "spec/0.1",
            type: "pad",
            handle: baseInst.handle || null,
            address: baseInst.address || null,
            payload: {
                common: {
                    x: x,
                    y: y,
                    net: getNetName(),
                    rotation: getRotation(),
                    isPlated: isPlated(),
                    hole: { diameter: hole },
                    note: note
                },
                layerMode: layerMode,
                layerTable: layerTable
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
        try { if (c.rotation !== undefined) nativeObj.Rotation = c.rotation; } catch (e3) {}
        try { if (c.isPlated !== undefined) nativeObj.Plated = c.isPlated; } catch (e4) {}
        try { if (c.hole && c.hole.diameter !== undefined) nativeObj.HoleSize = c.hole.diameter; } catch (e5) {}

        if (specPayload.layerMode) {
            try { nativeObj.PadMode = _layerModeToPadMode(specPayload.layerMode); } catch (e6) {}
        }

        var layerTable = specPayload.layerTable || {};

        if (specPayload.layerMode === "multilayer") {
            var layerKey = layerTable.MultiLayer ? "MultiLayer" : (layerTable.TopLayer ? "TopLayer" : null);
            if (layerKey) {
                try { if (layerTable[layerKey].shape !== undefined) nativeObj.Shape = layerTable[layerKey].shape; } catch (e7) {}
                try { if (layerTable[layerKey].xSize !== undefined) nativeObj.SizeX = layerTable[layerKey].xSize; } catch (e8) {}
                try { if (layerTable[layerKey].ySize !== undefined) nativeObj.SizeY = layerTable[layerKey].ySize; } catch (e9) {}
            }
        } else if (specPayload.layerMode === "top-mid-bot") {
            try { if (layerTable.TopLayer && layerTable.TopLayer.shape !== undefined) nativeObj.TopShape = layerTable.TopLayer.shape; } catch (e10) {}
            try { if (layerTable.MidLayer1 && layerTable.MidLayer1.shape !== undefined) nativeObj.MidShape = layerTable.MidLayer1.shape; } catch (e11) {}
            try { if (layerTable.BottomLayer && layerTable.BottomLayer.shape !== undefined) nativeObj.BotShape = layerTable.BottomLayer.shape; } catch (e12) {}
            try { if (layerTable.TopLayer && layerTable.TopLayer.xSize !== undefined) nativeObj.SizeX = layerTable.TopLayer.xSize; } catch (e13) {}
            try { if (layerTable.TopLayer && layerTable.TopLayer.ySize !== undefined) nativeObj.SizeY = layerTable.TopLayer.ySize; } catch (e14) {}
        } else if (specPayload.layerMode === "full-stack") {
            var canSetStack = (nativeObj.SetState_XStackSizeOnLayer || nativeObj.SetState_YStackSizeOnLayer || nativeObj.SetState_StackShapeOnLayer);
            if (!canSetStack) {
                _ui("warn", "applySpec: full-stack setters not available", null, "applySpec");
            } else {
                var name;
                for (name in layerTable) {
                    if (layerTable.hasOwnProperty(name)) {
                        var lid = _resolveLayerId(name);
                        if (lid === null) continue;
                        try { if (nativeObj.SetState_XStackSizeOnLayer && layerTable[name].xSize !== undefined) nativeObj.SetState_XStackSizeOnLayer(lid, layerTable[name].xSize); } catch (e15) {}
                        try { if (nativeObj.SetState_YStackSizeOnLayer && layerTable[name].ySize !== undefined) nativeObj.SetState_YStackSizeOnLayer(lid, layerTable[name].ySize); } catch (e16) {}
                        try { if (nativeObj.SetState_StackShapeOnLayer && layerTable[name].shape !== undefined) nativeObj.SetState_StackShapeOnLayer(lid, layerTable[name].shape); } catch (e17) {}
                    }
                }
            }
        }

        if (c.net) {
            // 未确认：Net/Net.Name 写入方式，使用 feature-detect
            try {
                if (nativeObj.Net && nativeObj.Net.Name !== undefined) {
                    nativeObj.Net.Name = c.net;
                }
            } catch (e18) {}
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
            sizeX: 1,
            sizeY: 1,
            shape: "Rect",
            holeSize: 0.5,
            layer: { "Name": "Top Layer" },
            name: "1",
            padType: "Standard",
            rotation: 0,
            plated: true,
            connected: false,
            netName: "",
            voltage: 0,
            padMode: 0,
            topShape: "Rect",
            midShape: "Rect",
            botShape: "Rect",
            slotSize: 0.5,
            slotXSize: 0.5,
            slotYSize: 0.5
        };
    }
    
    // 扩展基类实例
    baseInst.getX = getX;
    baseInst.setX = setX;
    baseInst.getY = getY;
    baseInst.setY = setY;
    baseInst.getSizeX = getSizeX;
    baseInst.setSizeX = setSizeX;
    baseInst.getSizeY = getSizeY;
    baseInst.setSizeY = setSizeY;
    baseInst.getShape = getShape;
    baseInst.setShape = setShape;
    baseInst.getHoleSize = getHoleSize;
    baseInst.setHoleSize = setHoleSize;
    baseInst.getLayer = getLayer;
    baseInst.setLayer = setLayer;
    baseInst.getName = getName;
    baseInst.setName = setName;
    baseInst.getPadType = getPadType;
    baseInst.setPadType = setPadType;
    baseInst.getRotation = getRotation;
    baseInst.setRotation = setRotation;
    baseInst.isPlated = isPlated;
    baseInst.setPlated = setPlated;
    baseInst.isConnected = isConnected;
    baseInst.getElectricalProperties = getElectricalProperties;
    baseInst.getNetName = getNetName;
    baseInst.getVoltage = getVoltage;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.getArea = getArea;
    baseInst.isPointInside = isPointInside;
    baseInst.getPadInfo = getPadInfo;
    baseInst.syncToNative = syncToNative;
    baseInst.syncFromNative = syncFromNative;
    
    // 高优先级API
    baseInst.getPadMode = getPadMode;
    baseInst.setPadMode = setPadMode;
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    // 中优先级API
    baseInst.getTopShape = getTopShape;
    baseInst.setTopShape = setTopShape;
    baseInst.getMidShape = getMidShape;
    baseInst.setMidShape = setMidShape;
    baseInst.getBotShape = getBotShape;
    baseInst.setBotShape = setBotShape;
    baseInst.getSlotSize = getSlotSize;
    baseInst.setSlotSize = setSlotSize;
    baseInst.getSlotXSize = getSlotXSize;
    baseInst.setSlotXSize = setSlotXSize;
    baseInst.getSlotYSize = getSlotYSize;
    baseInst.setSlotYSize = setSlotYSize;

    baseInst.initFromNative = initFromNative;
    baseInst.toSpec = toSpec;
    baseInst.applySpec = applySpec;
    
    return baseInst;
}

/**
 * 创建PadWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} PadWrapper实例
 */
PadWrapper.create = function(options) {
    return PadWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
PadWrapper.getDefaultMockData = function() {
    return {
        x: 0,
        y: 0,
        sizeX: 1,
        sizeY: 1,
        shape: "Rect",
        holeSize: 0.5,
        layer: { "Name": "Top Layer" },
        name: "1",
        padType: "Standard",
        rotation: 0,
        plated: true,
        connected: false,
        netName: "",
        voltage: 0,
        padMode: 0,
        topShape: "Rect",
        midShape: "Rect",
        botShape: "Rect",
        slotSize: 0.5,
        slotXSize: 0.5,
        slotYSize: 0.5
    };
};

    // 返回PadWrapper构造函数
    return PadWrapper;
    
})();


// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.PadWrapper = PadWrapper;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = PadWrapper;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PadWrapper = PadWrapper;
    }
})();
