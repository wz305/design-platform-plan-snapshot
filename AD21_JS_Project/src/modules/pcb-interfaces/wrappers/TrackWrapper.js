/**
 * TrackWrapper - 走线对象封装（双向绑定架构）
 * 
 * 封装IPCB_Track接口，提供走线对象的属性访问、计算和Mock支持
 * 支持直接访问原生对象和双向绑定
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var TrackWrapper = (function(){
    // 引入依赖 - 使用全局变量
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * TrackWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Track对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     */
    function TrackWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数，启用直接访问和实时同步
    var baseInst = BasePCBWrapper.create({
        objectType: "Track",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        enableMock: options.enableMock,
        mockData: options.mockData || TrackWrapper.getDefaultMockData(),
        enableDirectAccess: true,
        syncMode: options.syncMode || "auto"  // 默认自动同步模式
    });
    
    // 重写基类的属性提取方法
    baseInst._extractSpecificProperties = function() {
        if (baseInst.nativeObject) {
            // 提取Track特有属性
            baseInst.cachedProperties.X1 = baseInst.nativeObject.X1;
            baseInst.cachedProperties.Y1 = baseInst.nativeObject.Y1;
            baseInst.cachedProperties.X2 = baseInst.nativeObject.X2;
            baseInst.cachedProperties.Y2 = baseInst.nativeObject.Y2;
            baseInst.cachedProperties.Width = baseInst.nativeObject.Width;
            baseInst.cachedProperties.Layer = baseInst.nativeObject.Layer;
            baseInst.cachedProperties.Net = baseInst.nativeObject.Net;
            baseInst.cachedProperties.ObjectId = baseInst.nativeObject.ObjectId;
            baseInst.cachedProperties.I_ObjectAddress = baseInst.nativeObject.I_ObjectAddress;
            baseInst.cachedProperties.V6_LayerID = baseInst.nativeObject.V6_LayerID;
            baseInst.cachedProperties.V7_LayerID = baseInst.nativeObject.V7_LayerID;
            baseInst.cachedProperties.LayerStack = baseInst.nativeObject.LayerStack;
        }
    };
    
    // 重写基类的属性同步方法
    baseInst._syncPropertiesToNative = function() {
        if (baseInst.nativeObject && baseInst.isDirty) {
            // 同步Track特有属性
            if (baseInst.cachedProperties.hasOwnProperty("X1")) {
                baseInst.nativeObject.X1 = baseInst.cachedProperties.X1;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Y1")) {
                baseInst.nativeObject.Y1 = baseInst.cachedProperties.Y1;
            }
            if (baseInst.cachedProperties.hasOwnProperty("X2")) {
                baseInst.nativeObject.X2 = baseInst.cachedProperties.X2;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Y2")) {
                baseInst.nativeObject.Y2 = baseInst.cachedProperties.Y2;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Width")) {
                baseInst.nativeObject.Width = baseInst.cachedProperties.Width;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Layer")) {
                baseInst.nativeObject.Layer = baseInst.cachedProperties.Layer;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Net")) {
                baseInst.nativeObject.Net = baseInst.cachedProperties.Net;
            }
            
            return true;
        }
        return true;
    };

    if (options.nativeObject) {
        _setIdentityFromNative(options.nativeObject);
    }

    if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
        try { PCBObjectPool.register(baseInst); } catch (eReg) {}
    }

    function _ui(level, message, context, fnName) {
        var text = String(message || "");
        var payload = context || null;
        try {
            if (typeof UILoggerModule !== "undefined" && UILoggerModule) {
                if (level === "error" && UILoggerModule.uiError) {
                    UILoggerModule.uiError(text, payload, "TrackWrapper", fnName || "");
                    return;
                }
                if (level === "warn" && UILoggerModule.uiWarn) {
                    UILoggerModule.uiWarn(text, payload, "TrackWrapper", fnName || "");
                    return;
                }
                if (UILoggerModule.uiInfo) {
                    UILoggerModule.uiInfo(text, payload, "TrackWrapper", fnName || "");
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
    
    // === 基础属性访问方法（双向绑定） ===
    
    /**
     * 获取起点X坐标
     * @returns {number} X坐标
     */
    function getX1() {
        return baseInst.getProperty("X1");
    }
    
    /**
     * 设置起点X坐标
     * @param {number} value X坐标
     */
    function setX1(value) {
        baseInst.setProperty("X1", value);
    }
    
    /**
     * 获取起点Y坐标
     * @returns {number} Y坐标
     */
    function getY1() {
        return baseInst.getProperty("Y1");
    }
    
    /**
     * 设置起点Y坐标
     * @param {number} value Y坐标
     */
    function setY1(value) {
        baseInst.setProperty("Y1", value);
    }
    
    /**
     * 获取终点X坐标
     * @returns {number} X坐标
     */
    function getX2() {
        return baseInst.getProperty("X2");
    }
    
    /**
     * 设置终点X坐标
     * @param {number} value X坐标
     */
    function setX2(value) {
        baseInst.setProperty("X2", value);
    }
    
    /**
     * 获取终点Y坐标
     * @returns {number} Y坐标
     */
    function getY2() {
        return baseInst.getProperty("Y2");
    }
    
    /**
     * 设置终点Y坐标
     * @param {number} value Y坐标
     */
    function setY2(value) {
        baseInst.setProperty("Y2", value);
    }
    
    /**
     * 获取线宽
     * @returns {number} 线宽
     */
    function getWidth() {
        return baseInst.getProperty("Width");
    }
    
    /**
     * 设置线宽
     * @param {number} value 线宽
     */
    function setWidth(value) {
        baseInst.setProperty("Width", value);
    }
    
    /**
     * 获取所在层
     * @returns {Object} 层对象
     */
    function getLayer() {
        return baseInst.getProperty("Layer");
    }
    
    /**
     * 设置所在层
     * @param {Object} value 层对象
     */
    function setLayer(value) {
        baseInst.setProperty("Layer", value);
    }
    
    /**
     * 获取网络对象
     * @returns {Object} 网络对象
     */
    function getNet() {
        return baseInst.getProperty("Net");
    }
    
    /**
     * 设置网络对象
     * @param {Object} value 网络对象
     */
    function setNet(value) {
        baseInst.setProperty("Net", value);
    }
    
    /**
     * 获取网络名称
     * @returns {string} 网络名称
     */
    function getNetName() {
        var net = getNet();
        if (net && net.Name) {
            return net.Name;
        }
        return "";
    }
    
    // === 高优先级缺失API实现 ===
    
    /**
     * 绕指定点旋转走线（高优先级API）
     * @param {number} cx 旋转中心X坐标
     * @param {number} cy 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     * @returns {boolean} 是否成功
     */
    function rotateAroundXY(cx, cy, angle) {
        if (baseInst.isMock) {
            // Mock模式：手动计算旋转
            var x1 = getX1();
            var y1 = getY1();
            var x2 = getX2();
            var y2 = getY2();
            
            var rad = angle * Math.PI / 180;
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);
            
            // 旋转起点
            var newX1 = cx + (x1 - cx) * cos - (y1 - cy) * sin;
            var newY1 = cy + (x1 - cx) * sin + (y1 - cy) * cos;
            
            // 旋转终点
            var newX2 = cx + (x2 - cx) * cos - (y2 - cy) * sin;
            var newY2 = cy + (x2 - cx) * sin + (y2 - cy) * cos;
            
            setX1(newX1);
            setY1(newY1);
            setX2(newX2);
            setY2(newY2);
            
            return true;
        } else {
            // 直接调用原生方法
            try {
                baseInst.callNativeMethod("RotateAroundXY", cx, cy, angle);
                // 重新同步属性
                baseInst.syncFromNative();
                return true;
            } catch (error) {
                if (baseInst.logger && baseInst.logger.error) {
                    baseInst.logger.error("[TrackWrapper][index.js][rotateAroundXY] Native method failed: " + error.message);
                }
                return false;
            }
        }
    }
    
    /**
     * 获取精确点碰撞检测结果（中优先级API）
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否碰撞
     */
    function getState_StrictHitTest(x, y) {
        if (baseInst.isMock) {
            // Mock模式：使用几何计算
            return isPointOnTrack(x, y, getWidth() / 2);
        } else {
            // 直接调用原生方法
            try {
                return baseInst.callNativeMethod("GetState_StrictHitTest", x, y);
            } catch (error) {
                if (baseInst.logger && baseInst.logger.error) {
                    baseInst.logger.error("[TrackWrapper][index.js][getState_StrictHitTest] Native method failed: " + error.message);
                }
                // 降级到几何计算
                return isPointOnTrack(x, y, getWidth() / 2);
            }
        }
    }
    
    // === 计算方法 ===
    
    /**
     * 获取走线长度
     * @returns {number} 走线长度
     */
    function getLength() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateDistance(x1, y1, x2, y2);
        } else {
            // 降级计算
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
    
    /**
     * 获取走线角度（度）
     * @returns {number} 走线角度
     */
    function getAngle() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateAngle(x1, y1, x2, y2);
        } else {
            // 降级计算
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }
    }
    
    /**
     * 获取走线的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        var width = getWidth();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackBoundingBox(x1, y1, x2, y2, width);
        } else {
            // 降级计算
            return {
                x1: Math.min(x1, x2) - width / 2,
                y1: Math.min(y1, y2) - width / 2,
                x2: Math.max(x1, x2) + width / 2,
                y2: Math.max(y1, y2) + width / 2
            };
        }
    }
    
    /**
     * 获取走线面积
     * @returns {number} 走线面积
     */
    function getArea() {
        var length = getLength();
        var width = getWidth();
        return length * width;
    }
    
    /**
     * 检查点是否在走线上
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @param {number} tolerance 容差
     * @returns {boolean} 是否在走线上
     */
    function isPointOnTrack(x, y, tolerance) {
        tolerance = tolerance || getWidth() / 2;
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointOnLine(x, y, x1, y1, x2, y2, tolerance);
        } else {
            // 降级计算
            var A = x - x1;
            var B = y - y1;
            var C = x2 - x1;
            var D = y2 - y1;
            
            var dot = A * C + B * D;
            var lenSq = C * C + D * D;
            var param = lenSq !== 0 ? dot / lenSq : -1;
            
            var xx, yy;
            
            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            
            var dx = x - xx;
            var dy = y - yy;
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            return distance <= tolerance;
        }
    }
    
    /**
     * 获取走线中点坐标
     * @returns {Object} {x, y} 中点坐标
     */
    function getMidPoint() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateMidPoint(x1, y1, x2, y2);
        } else {
            // 降级计算
            return {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2
            };
        }
    }
    
    // === 操作方法 ===
    
    /**
     * 反转走线方向
     */
    function reverse() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        setX1(x2);
        setY1(y2);
        setX2(x1);
        setY2(y1);
    }
    
    /**
     * 延长走线
     * @param {number} startExtension 起点延长距离
     * @param {number} endExtension 终点延长距离
     */
    function extend(startExtension, endExtension) {
        startExtension = startExtension || 0;
        endExtension = endExtension || 0;
        
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        var angle = getAngle();
        
        if (startExtension > 0) {
            var rad = angle * Math.PI / 180;
            var newX1 = x1 - startExtension * Math.cos(rad);
            var newY1 = y1 - startExtension * Math.sin(rad);
            setX1(newX1);
            setY1(newY1);
        }
        
        if (endExtension > 0) {
            var rad = angle * Math.PI / 180;
            var newX2 = x2 + endExtension * Math.cos(rad);
            var newY2 = y2 + endExtension * Math.sin(rad);
            setX2(newX2);
            setY2(newY2);
        }
    }
    
    /**
     * 移动走线
     * @param {number} dx X方向偏移
     * @param {number} dy Y方向偏移
     */
    function move(dx, dy) {
        setX1(getX1() + dx);
        setY1(getY1() + dy);
        setX2(getX2() + dx);
        setY2(getY2() + dy);
    }
    
    /**
     * 设置走线坐标
     * @param {number} x1 起点X
     * @param {number} y1 起点Y
     * @param {number} x2 终点X
     * @param {number} y2 终点Y
     */
    function setCoordinates(x1, y1, x2, y2) {
        setX1(x1);
        setY1(y1);
        setX2(x2);
        setY2(y2);
    }
    
    // === 电气特性计算 ===
    
    /**
     * 获取走线的电气特性
     * @returns {Object} 电气特性对象
     */
    function getElectricalProperties() {
        return {
            netName: getNetName(),
            resistance: calculateResistance(),
            capacitance: calculateCapacitance(),
            impedance: calculateImpedance()
        };
    }
    
    /**
     * 计算走线电阻
     * @returns {number} 电阻值（欧姆）
     */
    function calculateResistance() {
        var length = getLength();
        var width = getWidth();
        var thickness = 0.035; // 默认铜厚35um
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackResistance(length, width, thickness);
        } else {
            // 降级计算（简化公式）
            return 0.0175 * length / (width * thickness); // 铜电阻率
        }
    }
    
    /**
     * 计算走线电容
     * @returns {number} 电容值（pF）
     */
    function calculateCapacitance() {
        var length = getLength();
        var width = getWidth();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackCapacitance(length, width, getLayer());
        } else {
            // 降级计算（简化公式）
            return 0.1 * length * width; // 简化估算
        }
    }
    
    /**
     * 计算走线阻抗
     * @returns {number} 阻抗值（欧姆）
     */
    function calculateImpedance() {
        var width = getWidth();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackImpedance(width, 0.035, getLayer());
        } else {
            // 降级计算（简化公式）
            return 50 / width; // 简化估算
        }
    }
    
    // === 冲突检测 ===
    
    /**
     * 检查走线是否与其他对象冲突
     * @param {Array} otherObjects 其他对象数组
     * @returns {Array} 冲突对象数组
     */
    function checkConflicts(otherObjects) {
        var conflicts = [];
        var boundingBox = getBoundingBox();
        
        for (var i = 0; i < otherObjects.length; i++) {
            var obj = otherObjects[i];
            if (obj.getObjectId && obj.getObjectId() !== baseInst.getObjectId()) {
                var objBoundingBox = obj.getBoundingBox();
                if (GeometryCalculator && GeometryCalculator.doBoundingBoxesIntersect) {
                    if (GeometryCalculator.doBoundingBoxesIntersect(boundingBox, objBoundingBox)) {
                        conflicts.push(obj);
                    }
                } else {
                    // 降级检测
                    if (objBoundingBox && 
                        !(boundingBox.x2 < objBoundingBox.x1 || 
                          boundingBox.x1 > objBoundingBox.x2 || 
                          boundingBox.y2 < objBoundingBox.y1 || 
                          boundingBox.y1 > objBoundingBox.y2)) {
                        conflicts.push(obj);
                    }
                }
            }
        }
        
        return conflicts;
    }
    
    // === 信息获取 ===
    
    /**
     * 获取走线的完整信息
     * @returns {Object} 走线信息对象
     */
    function getTrackInfo() {
        return {
            x1: getX1(),
            y1: getY1(),
            x2: getX2(),
            y2: getY2(),
            width: getWidth(),
            layer: getLayer(),
            netName: getNetName(),
            length: getLength(),
            angle: getAngle(),
            boundingBox: getBoundingBox(),
            area: getArea(),
            midPoint: getMidPoint(),
            electrical: getElectricalProperties(),
            objectId: baseInst.getObjectId(),
            isMock: baseInst.isMockObject()
        };
    }

    function initFromNative(nativeRef) {
        if (!nativeRef) {
            _ui("warn", "initFromNative: nativeRef is null", null, "initFromNative");
            return false;
        }
        _setIdentityFromNative(nativeRef);
        try { baseInst._extractSpecificProperties(); } catch (e1) {}
        if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
            try { PCBObjectPool.register(baseInst); } catch (eReg) {}
        }
        return true;
    }

    function toSpec() {
        var nativeObj = baseInst.nativeObject || null;
        var x1 = null, y1 = null, x2 = null, y2 = null, width = null, layerId = null;
        try { x1 = nativeObj.X1; } catch (e1) {}
        try { y1 = nativeObj.Y1; } catch (e2) {}
        try { x2 = nativeObj.X2; } catch (e3) {}
        try { y2 = nativeObj.Y2; } catch (e4) {}
        try { width = nativeObj.Width; } catch (e5) {}
        try { layerId = nativeObj.Layer; } catch (e6) {}

        var netName = "";
        try { if (nativeObj.Net && nativeObj.Net.Name) netName = nativeObj.Net.Name; } catch (e7) {}

        var layerName = _resolveLayerName(layerId);
        if (!layerName) {
            _ui("warn", "toSpec: layer name not resolved", { layerId: layerId }, "toSpec");
        }

        return {
            schema: "spec/0.1",
            type: "track",
            handle: baseInst.handle || null,
            address: baseInst.address || null,
            payload: {
                common: {
                    x1: x1, y1: y1, x2: x2, y2: y2,
                    width: width,
                    layer: layerName,
                    net: netName
                }
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
        try { if (c.x1 !== undefined) nativeObj.X1 = c.x1; } catch (e1) {}
        try { if (c.y1 !== undefined) nativeObj.Y1 = c.y1; } catch (e2) {}
        try { if (c.x2 !== undefined) nativeObj.X2 = c.x2; } catch (e3) {}
        try { if (c.y2 !== undefined) nativeObj.Y2 = c.y2; } catch (e4) {}
        try { if (c.width !== undefined) nativeObj.Width = c.width; } catch (e5) {}

        if (c.layer) {
            var layerId = _resolveLayerId(c.layer);
            if (layerId !== null && layerId !== undefined) {
                try { nativeObj.Layer = layerId; } catch (e6) {}
            } else {
                _ui("warn", "applySpec: unsupported layer", { layer: c.layer }, "applySpec");
            }
        }

        if (c.net) {
            // 未确认：Net/Net.Name 写入方式，使用 feature-detect
            try {
                if (nativeObj.Net && nativeObj.Net.Name !== undefined) {
                    nativeObj.Net.Name = c.net;
                }
            } catch (e7) {}
        }

        return { ok: true };
    }
    
    /**
     * 获取默认Mock数据
     * @returns {Object} 默认Mock数据
     */
    function getDefaultMockData() {
        return {
            X1: 0,
            Y1: 0,
            X2: 1,
            Y2: 0,
            Width: 0.1,
            Layer: { "Name": "Top Layer", "V6_LayerID": 1 },
            Net: { "Name": "" },
            ObjectId: "mock_track_001",
            I_ObjectAddress: 1001,
            V6_LayerID: 1,
            V7_LayerID: 1,
            LayerStack: null
        };
    }
    
    // === 扩展基类实例 ===
    baseInst.getX1 = getX1;
    baseInst.setX1 = setX1;
    baseInst.getY1 = getY1;
    baseInst.setY1 = setY1;
    baseInst.getX2 = getX2;
    baseInst.setX2 = setX2;
    baseInst.getY2 = getY2;
    baseInst.setY2 = setY2;
    baseInst.getWidth = getWidth;
    baseInst.setWidth = setWidth;
    baseInst.getLayer = getLayer;
    baseInst.setLayer = setLayer;
    baseInst.getNet = getNet;
    baseInst.setNet = setNet;
    baseInst.getNetName = getNetName;
    
    // 高优先级API
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    // 计算方法
    baseInst.getLength = getLength;
    baseInst.getAngle = getAngle;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.getArea = getArea;
    baseInst.isPointOnTrack = isPointOnTrack;
    baseInst.getMidPoint = getMidPoint;
    
    // 操作方法
    baseInst.reverse = reverse;
    baseInst.extend = extend;
    baseInst.move = move;
    baseInst.setCoordinates = setCoordinates;
    
    // 电气特性
    baseInst.getElectricalProperties = getElectricalProperties;
    baseInst.calculateResistance = calculateResistance;
    baseInst.calculateCapacitance = calculateCapacitance;
    baseInst.calculateImpedance = calculateImpedance;
    
    // 冲突检测
    baseInst.checkConflicts = checkConflicts;
    
    // 信息获取
    baseInst.getTrackInfo = getTrackInfo;
    baseInst.getDefaultMockData = getDefaultMockData;

    baseInst.initFromNative = initFromNative;
    baseInst.toSpec = toSpec;
    baseInst.applySpec = applySpec;
    
    return baseInst;
}

/**
 * 创建TrackWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} TrackWrapper实例
 */
TrackWrapper.create = function(options) {
    return TrackWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
TrackWrapper.getDefaultMockData = function() {
    return {
        X1: 0,
        Y1: 0,
        X2: 1,
        Y2: 0,
        Width: 0.1,
        Layer: { "Name": "Top Layer", "V6_LayerID": 1 },
        Net: { "Name": "" },
        ObjectId: "mock_track_001",
        I_ObjectAddress: 1001,
        V6_LayerID: 1,
        V7_LayerID: 1,
        LayerStack: null
    };
};

    // 返回TrackWrapper构造函数
    return TrackWrapper;
    
})();


// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.TrackWrapper = TrackWrapper;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = TrackWrapper;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.TrackWrapper = TrackWrapper;
    }
})();
