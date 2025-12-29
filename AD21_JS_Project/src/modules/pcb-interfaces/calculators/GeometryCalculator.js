/**
 * GeometryCalculator - 几何计算器
 * 
 * 提供PCB对象几何计算的核心功能
 * 
 * @author AD21 PCB Interface Module
 * @version 1.0.0
 */

var GeometryCalculator = (function(){
    // 简化的日志系统（用于测试）
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

    /**
     * GeometryCalculator构造函数
     */
    function GeometryCalculator() {
        // 构造函数逻辑
    }

/**
 * 计算两点之间的距离
 * @param {number} x1 第一个点的X坐标
 * @param {number} y1 第一个点的Y坐标
 * @param {number} x2 第二个点的X坐标
 * @param {number} y2 第二个点的Y坐标
 * @returns {number} 距离
 */
GeometryCalculator.calculateDistance = function(x1, y1, x2, y2) {
    logger.debug("[GeometryCalculator][calculateDistance] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }));
    
    try {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        logger.debug("[GeometryCalculator][calculateDistance] SUCCESS - result: " + distance);
        return distance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateDistance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算线段的角度（度）
 * @param {number} x1 起点X坐标
 * @param {number} y1 起点Y坐标
 * @param {number} x2 终点X坐标
 * @param {number} y2 终点Y坐标
 * @returns {number} 角度（度）
 */
GeometryCalculator.calculateAngle = function(x1, y1, x2, y2) {
    logger.debug("[GeometryCalculator][calculateAngle] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }));
    
    try {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angleRad = Math.atan2(dy, dx);
        var angleDeg = angleRad * 180 / Math.PI;
        
        // 确保角度在0-360度范围内
        if (angleDeg < 0) {
            angleDeg += 360;
        }
        
        logger.debug("[GeometryCalculator][calculateAngle] SUCCESS - result: " + angleDeg);
        return angleDeg;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateAngle] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算线段的中点
 * @param {number} x1 起点X坐标
 * @param {number} y1 起点Y坐标
 * @param {number} x2 终点X坐标
 * @param {number} y2 终点Y坐标
 * @returns {Object} {x, y} 中点坐标
 */
GeometryCalculator.calculateMidPoint = function(x1, y1, x2, y2) {
    logger.debug("[GeometryCalculator][calculateMidPoint] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }));
    
    try {
        var midX = (x1 + x2) / 2;
        var midY = (y1 + y2) / 2;
        
        var result = { x: midX, y: midY };
        
        logger.debug("[GeometryCalculator][calculateMidPoint] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateMidPoint] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 极坐标转换为直角坐标
 * @param {number} centerX 中心点X坐标
 * @param {number} centerY 中心点Y坐标
 * @param {number} radius 半径
 * @param {number} angle 角度（度）
 * @returns {Object} {x, y} 直角坐标
 */
GeometryCalculator.polarToCartesian = function(centerX, centerY, radius, angle) {
    logger.debug("[GeometryCalculator][polarToCartesian] START - params: " + JSON.stringify({
        centerX: centerX,
        centerY: centerY,
        radius: radius,
        angle: angle
    }));
    
    try {
        var angleRad = angle * Math.PI / 180;
        var x = centerX + radius * Math.cos(angleRad);
        var y = centerY + radius * Math.sin(angleRad);
        
        var result = { x: x, y: y };
        
        logger.debug("[GeometryCalculator][polarToCartesian] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][polarToCartesian] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算圆弧长度
 * @param {number} radius 半径
 * @param {number} startAngle 起始角度（度）
 * @param {number} endAngle 结束角度（度）
 * @returns {number} 圆弧长度
 */
GeometryCalculator.calculateArcLength = function(radius, startAngle, endAngle) {
    logger.debug("[GeometryCalculator][calculateArcLength] START - params: " + JSON.stringify({
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle
    }));
    
    try {
        var angleDiff = endAngle - startAngle;
        
        // 处理角度跨越0度的情况
        if (angleDiff < 0) {
            angleDiff += 360;
        }
        
        var angleRad = angleDiff * Math.PI / 180;
        var arcLength = radius * angleRad;
        
        logger.debug("[GeometryCalculator][calculateArcLength] SUCCESS - result: " + arcLength);
        return arcLength;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateArcLength] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算圆的包围盒
 * @param {number} centerX 中心点X坐标
 * @param {number} centerY 中心点Y坐标
 * @param {number} radius 半径
 * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
 */
GeometryCalculator.calculateCircleBoundingBox = function(centerX, centerY, radius) {
    logger.debug("[GeometryCalculator][calculateCircleBoundingBox] START - params: " + JSON.stringify({
        centerX: centerX,
        centerY: centerY,
        radius: radius
    }));
    
    try {
        var result = {
            x1: centerX - radius,
            y1: centerY - radius,
            x2: centerX + radius,
            y2: centerY + radius
        };
        
        logger.debug("[GeometryCalculator][calculateCircleBoundingBox] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateCircleBoundingBox] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算矩形的包围盒
 * @param {number} x 中心点X坐标
 * @param {number} y 中心点Y坐标
 * @param {number} width 宽度
 * @param {number} height 高度
 * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
 */
GeometryCalculator.calculateRectBoundingBox = function(x, y, width, height) {
    logger.debug("[GeometryCalculator][calculateRectBoundingBox] START - params: " + JSON.stringify({
        x: x,
        y: y,
        width: width,
        height: height
    }));
    
    try {
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        
        var result = {
            x1: x - halfWidth,
            y1: y - halfHeight,
            x2: x + halfWidth,
            y2: y + halfHeight
        };
        
        logger.debug("[GeometryCalculator][calculateRectBoundingBox] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateRectBoundingBox] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算走线的包围盒
 * @param {number} x1 起点X坐标
 * @param {number} y1 起点Y坐标
 * @param {number} x2 终点X坐标
 * @param {number} y2 终点Y坐标
 * @param {number} width 线宽
 * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
 */
GeometryCalculator.calculateTrackBoundingBox = function(x1, y1, x2, y2, width) {
    logger.debug("[GeometryCalculator][calculateTrackBoundingBox] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        width: width
    }));
    
    try {
        var halfWidth = width / 2;
        
        var result = {
            x1: Math.min(x1, x2) - halfWidth,
            y1: Math.min(y1, y2) - halfWidth,
            x2: Math.max(x1, x2) + halfWidth,
            y2: Math.max(y1, y2) + halfWidth
        };
        
        logger.debug("[GeometryCalculator][calculateTrackBoundingBox] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackBoundingBox] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算圆的面积
 * @param {number} radius 半径
 * @returns {number} 面积
 */
GeometryCalculator.calculateCircleArea = function(radius) {
    logger.debug("[GeometryCalculator][calculateCircleArea] START - params: " + JSON.stringify({
        radius: radius
    }));
    
    try {
        var area = Math.PI * radius * radius;
        
        logger.debug("[GeometryCalculator][calculateCircleArea] SUCCESS - result: " + area);
        return area;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateCircleArea] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算焊盘面积
 * @param {number} sizeX X方向尺寸
 * @param {number} sizeY Y方向尺寸
 * @param {string} shape 形状（Rect, Round, Octagonal, RoundedRect）
 * @returns {number} 面积
 */
GeometryCalculator.calculatePadArea = function(sizeX, sizeY, shape) {
    logger.debug("[GeometryCalculator][calculatePadArea] START - params: " + JSON.stringify({
        sizeX: sizeX,
        sizeY: sizeY,
        shape: shape
    }));
    
    try {
        var area;
        
        switch (shape) {
            case "Round":
                var radius = Math.min(sizeX, sizeY) / 2;
                area = Math.PI * radius * radius;
                break;
            case "Rect":
                area = sizeX * sizeY;
                break;
            case "Octagonal":
                // 八边形面积近似为矩形面积的0.828倍
                area = sizeX * sizeY * 0.828;
                break;
            case "RoundedRect":
                // 圆角矩形面积近似为矩形面积的0.95倍
                area = sizeX * sizeY * 0.95;
                break;
            default:
                area = sizeX * sizeY;
        }
        
        logger.debug("[GeometryCalculator][calculatePadArea] SUCCESS - result: " + area);
        return area;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculatePadArea] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在圆内
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} centerX 圆心X坐标
 * @param {number} centerY 圆心Y坐标
 * @param {number} radius 半径
 * @returns {boolean} 是否在圆内
 */
GeometryCalculator.isPointInCircle = function(x, y, centerX, centerY, radius) {
    logger.debug("[GeometryCalculator][isPointInCircle] START - params: " + JSON.stringify({
        x: x,
        y: y,
        centerX: centerX,
        centerY: centerY,
        radius: radius
    }));
    
    try {
        var distance = GeometryCalculator.calculateDistance(x, y, centerX, centerY);
        var result = distance <= radius;
        
        logger.debug("[GeometryCalculator][isPointInCircle] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointInCircle] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在线段上
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} x1 线段起点X坐标
 * @param {number} y1 线段起点Y坐标
 * @param {number} x2 线段终点X坐标
 * @param {number} y2 线段终点Y坐标
 * @param {number} tolerance 容差
 * @returns {boolean} 是否在线段上
 */
GeometryCalculator.isPointOnLine = function(x, y, x1, y1, x2, y2, tolerance) {
    logger.debug("[GeometryCalculator][isPointOnLine] START - params: " + JSON.stringify({
        x: x,
        y: y,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        tolerance: tolerance
    }));
    
    try {
        // 计算点到线段的距离
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;
        
        var dot = A * C + B * D;
        var lenSq = C * C + D * D;
        var param = -1;
        
        if (lenSq !== 0) {
            param = dot / lenSq;
        }
        
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
        
        var distance = GeometryCalculator.calculateDistance(x, y, xx, yy);
        var result = distance <= tolerance;
        
        logger.debug("[GeometryCalculator][isPointOnLine] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointOnLine] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在圆弧上
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} centerX 圆弧中心X坐标
 * @param {number} centerY 圆弧中心Y坐标
 * @param {number} radius 半径
 * @param {number} startAngle 起始角度（度）
 * @param {number} endAngle 结束角度（度）
 * @param {number} tolerance 容差
 * @returns {boolean} 是否在圆弧上
 */
GeometryCalculator.isPointOnArc = function(x, y, centerX, centerY, radius, startAngle, endAngle, tolerance) {
    logger.debug("[GeometryCalculator][isPointOnArc] START - params: " + JSON.stringify({
        x: x,
        y: y,
        centerX: centerX,
        centerY: centerY,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        tolerance: tolerance
    }));
    
    try {
        // 首先检查点是否在圆环内
        var distance = GeometryCalculator.calculateDistance(x, y, centerX, centerY);
        if (Math.abs(distance - radius) > tolerance) {
            logger.debug("[GeometryCalculator][isPointOnArc] SUCCESS - result: false (not on circle)");
            return false;
        }
        
        // 计算点的角度
        var angle = GeometryCalculator.calculateAngle(centerX, centerY, x, y);
        
        // 检查角度是否在圆弧范围内
        var result;
        if (startAngle <= endAngle) {
            result = angle >= startAngle && angle <= endAngle;
        } else {
            // 处理跨越0度的情况
            result = angle >= startAngle || angle <= endAngle;
        }
        
        logger.debug("[GeometryCalculator][isPointOnArc] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointOnArc] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在焊盘内
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} padX 焊盘中心X坐标
 * @param {number} padY 焊盘中心Y坐标
 * @param {number} sizeX 焊盘X方向尺寸
 * @param {number} sizeY 焊盘Y方向尺寸
 * @param {string} shape 焊盘形状
 * @param {number} rotation 旋转角度（度）
 * @returns {boolean} 是否在焊盘内
 */
GeometryCalculator.isPointInPad = function(x, y, padX, padY, sizeX, sizeY, shape, rotation) {
    logger.debug("[GeometryCalculator][isPointInPad] START - params: " + JSON.stringify({
        x: x,
        y: y,
        padX: padX,
        padY: padY,
        sizeX: sizeX,
        sizeY: sizeY,
        shape: shape,
        rotation: rotation
    }));
    
    try {
        // 如果有旋转，先旋转点坐标
        if (rotation && rotation !== 0) {
            var rotatedPoint = GeometryCalculator.rotatePoint(x, y, padX, padY, -rotation);
            x = rotatedPoint.x;
            y = rotatedPoint.y;
        }
        
        var result;
        
        switch (shape) {
            case "Round":
                var radius = Math.min(sizeX, sizeY) / 2;
                result = GeometryCalculator.isPointInCircle(x, y, padX, padY, radius);
                break;
            case "Rect":
            case "RoundedRect":
                var halfWidth = sizeX / 2;
                var halfHeight = sizeY / 2;
                result = x >= padX - halfWidth && x <= padX + halfWidth &&
                        y >= padY - halfHeight && y <= padY + halfHeight;
                break;
            case "Octagonal":
                // 八边形检测简化为内切圆检测
                var inscribedRadius = Math.min(sizeX, sizeY) / 2 * 0.924;
                result = GeometryCalculator.isPointInCircle(x, y, padX, padY, inscribedRadius);
                break;
            default:
                // 默认按矩形处理
                var halfWidth = sizeX / 2;
                var halfHeight = sizeY / 2;
                result = x >= padX - halfWidth && x <= padX + halfWidth &&
                        y >= padY - halfHeight && y <= padY + halfHeight;
        }
        
        logger.debug("[GeometryCalculator][isPointInPad] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointInPad] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 旋转点坐标
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} centerX 旋转中心X坐标
 * @param {number} centerY 旋转中心Y坐标
 * @param {number} angle 旋转角度（度）
 * @returns {Object} {x, y} 旋转后的坐标
 */
GeometryCalculator.rotatePoint = function(x, y, centerX, centerY, angle) {
    logger.debug("[GeometryCalculator][rotatePoint] START - params: " + JSON.stringify({
        x: x,
        y: y,
        centerX: centerX,
        centerY: centerY,
        angle: angle
    }));
    
    try {
        var angleRad = angle * Math.PI / 180;
        var cos = Math.cos(angleRad);
        var sin = Math.sin(angleRad);
        
        var dx = x - centerX;
        var dy = y - centerY;
        
        var rotatedX = centerX + dx * cos - dy * sin;
        var rotatedY = centerY + dx * sin + dy * cos;
        
        var result = { x: rotatedX, y: rotatedY };
        
        logger.debug("[GeometryCalculator][rotatePoint] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][rotatePoint] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 延长线段
 * @param {number} x1 线段起点X坐标
 * @param {number} y1 线段起点Y坐标
 * @param {number} x2 线段终点X坐标
 * @param {number} y2 线段终点Y坐标
 * @param {number} extension 延长距离
 * @returns {Object} {x, y} 延长后的点坐标
 */
GeometryCalculator.extendLine = function(x1, y1, x2, y2, extension) {
    logger.debug("[GeometryCalculator][extendLine] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        extension: extension
    }));
    
    try {
        var angle = GeometryCalculator.calculateAngle(x1, y1, x2, y2);
        var angleRad = angle * Math.PI / 180;
        
        var extendedX = x2 + extension * Math.cos(angleRad);
        var extendedY = y2 + extension * Math.sin(angleRad);
        
        var result = { x: extendedX, y: extendedY };
        
        logger.debug("[GeometryCalculator][extendLine] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][extendLine] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查两个包围盒是否相交
 * @param {Object} box1 第一个包围盒 {x1, y1, x2, y2}
 * @param {Object} box2 第二个包围盒 {x1, y1, x2, y2}
 * @returns {boolean} 是否相交
 */
GeometryCalculator.doBoundingBoxesIntersect = function(box1, box2) {
    logger.debug("[GeometryCalculator][doBoundingBoxesIntersect] START - params: " + JSON.stringify({
        box1: box1,
        box2: box2
    }));
    
    try {
        var result = !(box1.x2 < box2.x1 || box2.x2 < box1.x1 ||
                      box1.y2 < box2.y1 || box2.y2 < box1.y1);
        
        logger.debug("[GeometryCalculator][doBoundingBoxesIntersect] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][doBoundingBoxesIntersect] ERROR - " + error.message);
        throw error;
    }
};

// 电气计算相关方法（简化实现）

/**
 * 计算走线电阻
 * @param {number} length 长度（mm）
 * @param {number} width 宽度（mm）
 * @param {number} thickness 厚度（mm）
 * @returns {number} 电阻值（欧姆）
 */
GeometryCalculator.calculateTrackResistance = function(length, width, thickness) {
    logger.debug("[GeometryCalculator][calculateTrackResistance] START - params: " + JSON.stringify({
        length: length,
        width: width,
        thickness: thickness
    }));
    
    try {
        // 铜的电阻率：0.0175 Ω·mm²/m
        var resistivity = 0.0175;
        var crossSection = width * thickness; // mm²
        var resistance = resistivity * length / 1000 / crossSection; // 转换为米
        
        logger.debug("[GeometryCalculator][calculateTrackResistance] SUCCESS - result: " + resistance);
        return resistance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackResistance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算走线电容
 * @param {number} length 长度（mm）
 * @param {number} width 宽度（mm）
 * @param {Object} layer 层对象
 * @returns {number} 电容值（pF）
 */
GeometryCalculator.calculateTrackCapacitance = function(length, width, layer) {
    logger.debug("[GeometryCalculator][calculateTrackCapacitance] START - params: " + JSON.stringify({
        length: length,
        width: width,
        layer: layer
    }));
    
    try {
        // 简化的电容计算，实际需要考虑介电常数、层间距等
        var dielectricConstant = 4.5; // FR4的介电常数
        var capacitancePerMm = 0.2; // pF/mm 经验值
        var capacitance = length * capacitancePerMm;
        
        logger.debug("[GeometryCalculator][calculateTrackCapacitance] SUCCESS - result: " + capacitance);
        return capacitance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackCapacitance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算走线阻抗
 * @param {number} width 宽度（mm）
 * @param {number} thickness 厚度（mm）
 * @param {Object} layer 层对象
 * @returns {number} 阻抗值（欧姆）
 */
GeometryCalculator.calculateTrackImpedance = function(width, thickness, layer) {
    logger.debug("[GeometryCalculator][calculateTrackImpedance] START - params: " + JSON.stringify({
        width: width,
        thickness: thickness,
        layer: layer
    }));
    
    try {
        // 简化的阻抗计算，实际需要考虑层间距、介电常数等
        var impedance = 50; // 默认50欧姆
        if (width > 0.2) {
            impedance = 35; // 较宽的走线阻抗较低
        } else if (width < 0.1) {
            impedance = 65; // 较窄的走线阻抗较高
        }
        
        logger.debug("[GeometryCalculator][calculateTrackImpedance] SUCCESS - result: " + impedance);
        return impedance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackImpedance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔电阻
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @returns {number} 电阻值（欧姆）
 */
GeometryCalculator.calculateViaResistance = function(size, holeSize, startLayer, endLayer) {
    logger.debug("[GeometryCalculator][calculateViaResistance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize,
        startLayer: startLayer,
        endLayer: endLayer
    }));
    
    try {
        // 简化的过孔电阻计算
        var ringThickness = (size - holeSize) / 2;
        var resistance = 0.001; // 典型过孔电阻约1mΩ
        
        logger.debug("[GeometryCalculator][calculateViaResistance] SUCCESS - result: " + resistance);
        return resistance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaResistance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔电容
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @returns {number} 电容值（pF）
 */
GeometryCalculator.calculateViaCapacitance = function(size, holeSize, startLayer, endLayer) {
    logger.debug("[GeometryCalculator][calculateViaCapacitance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize,
        startLayer: startLayer,
        endLayer: endLayer
    }));
    
    try {
        // 简化的过孔电容计算
        var capacitance = 0.5; // 典型过孔电容约0.5pF
        
        logger.debug("[GeometryCalculator][calculateViaCapacitance] SUCCESS - result: " + capacitance);
        return capacitance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaCapacitance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔电感
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @returns {number} 电感值（nH）
 */
GeometryCalculator.calculateViaInductance = function(size, holeSize, startLayer, endLayer) {
    logger.debug("[GeometryCalculator][calculateViaInductance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize,
        startLayer: startLayer,
        endLayer: endLayer
    }));
    
    try {
        // 简化的过孔电感计算
        var inductance = 1.0; // 典型过孔电感约1nH
        
        logger.debug("[GeometryCalculator][calculateViaInductance] SUCCESS - result: " + inductance);
        return inductance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaInductance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔阻抗
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @returns {number} 阻抗值（欧姆）
 */
GeometryCalculator.calculateViaImpedance = function(size, holeSize) {
    logger.debug("[GeometryCalculator][calculateViaImpedance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize
    }));
    
    try {
        // 简化的过孔阻抗计算
        var impedance = 25; // 典型过孔阻抗约25欧姆
        
        logger.debug("[GeometryCalculator][calculateViaImpedance] SUCCESS - result: " + impedance);
        return impedance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaImpedance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔纵横比
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @param {number} holeSize 孔径（mm）
 * @returns {number} 纵横比
 */
GeometryCalculator.calculateViaAspectRatio = function(startLayer, endLayer, holeSize) {
    logger.debug("[GeometryCalculator][calculateViaAspectRatio] START - params: " + JSON.stringify({
        startLayer: startLayer,
        endLayer: endLayer,
        holeSize: holeSize
    }));
    
    try {
        // 简化的层间距计算
        var layerDistance = 1.6; // 标准FR4板厚1.6mm
        var aspectRatio = layerDistance / holeSize;
        
        logger.debug("[GeometryCalculator][calculateViaAspectRatio] SUCCESS - result: " + aspectRatio);
        return aspectRatio;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaAspectRatio] ERROR - " + error.message);
        throw error;
    }
};

    // 返回GeometryCalculator对象
    return GeometryCalculator;
    
})();

// AD环境兼容性导出
if (typeof window !== "undefined") {
    window.GeometryCalculator = GeometryCalculator;
}
