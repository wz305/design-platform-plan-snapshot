// ==========================================================
// Iterators.js
// ----------------------------------------------------------
// 统一封装：IPCB_BoardIterator / IPCB_SpatialIterator
// 用于 AD 脚本环境的 PCB 对象遍历。
// ----------------------------------------------------------
// 提供：
//   ? IteratorFactory.newBoardIterator(board)
//   ? IteratorFactory.newSpatialIterator(board, x1,y1,x2,y2)
//   ? iterator.setObjectFilter(types[])
//   ? iterator.setLayerFilter(layers[])
//   ? iterator.setArea(x1,y1,x2,y2)   (board iterator 会自动警告)
//   ? iterator.setMethod(iterMethod)
//   ? iterator.reset()
//   ? iterator.next()      返回 objcopy(handle)
//   ? iterator.destroy()
// ----------------------------------------------------------
// 注意：封装中自动调用 MkSet() 以支持 Delphiscript 的虚拟集合。
//       所有返回对象均为 objcopy() 封装后的对象。
// ==========================================================


// ==========================================================
// 工具函数：创建 AD Set（对象集 / 层集）
// ==========================================================
/**
 * 创建 AD Set 对象
 * @param {Array} arr - 数字数组（如 [eTrackObject, ePadObject]）
 * @return {Object} AD Set 对象
 * @description
 *   AD 的 MkSet 接受可变参数，我们只能直接用 eval 模式拼接
 *   示例：MkSet(eTrackObject, eArcObject)
 */
function mkSetArray(arr) {
    try {
        // 参数验证
        if (!arr) {
            LOG.warn("mkSetArray: 参数 arr 为 null，返回空集");
            return MkSet();
        }
        
        if (arr.length === 0) {
            return MkSet(); // 空集
        }
        
        var args = "";
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) {
                args += ",";
            }
            args += arr[i];
        }
        
        // 使用 eval 动态调用 MkSet
        var result = eval("MkSet(" + args + ")");
        
        if (!result) {
            LOG.error("mkSetArray: MkSet() 调用失败，参数: " + args);
            return MkSet();
        }
        
        return result;
        
    } catch (error) {
        LOG.error("mkSetArray: 创建 Set 时发生错误 - " + error.message);
        return MkSet();
    }
}


// ==========================================================
// 基类：PCB_IteratorBase
// 所有迭代器的统一封装接口
// ==========================================================
/**
 * PCB 迭代器基类构造函数
 * @param {IPCB_Board} board - PCB 板对象
 * @param {Object} itHandle - AD 迭代器句柄
 * @param {Boolean} isSpatial - 是否为空间迭代器
 */
function PCB_IteratorBase(board, itHandle, isSpatial) {
    try {
        this.board = board;
        this.it = itHandle;        // 实际的 AD 迭代器
        this.isSpatial = !!isSpatial;
        this._nextHandle = null;   // 缓存下一个对象句柄
        
        // 验证必要参数
        if (!board) {
            throw new Error("board 参数不能为 null");
        }
        
        if (!itHandle) {
            throw new Error("itHandle 参数不能为 null");
        }
        
    } catch (error) {
        LOG.error("PCB_IteratorBase 构造函数错误: " + error.message);
        throw error;
    }
}

/**
 * 设置对象类型过滤器
 * @param {Array} typeArr - 对象类型数组，如 [eTrackObject, ePadObject]
 */
PCB_IteratorBase.prototype.setObjectFilter = function(typeArr) {
    try {
        if (!this.it) {
            LOG.warn("setObjectFilter: 迭代器句柄为 null");
            return;
        }
        
        if (!typeArr || typeArr.length === 0) {
            LOG.warn("setObjectFilter: typeArr 为空或未定义");
            return;
        }
        
        var set = mkSetArray(typeArr);
        if (set) {
            this.it.AddFilter_ObjectSet(set);
            LOG.debug("setObjectFilter: 成功设置对象过滤器，类型数量: " + typeArr.length);
        }
        
    } catch (error) {
        LOG.error("setObjectFilter: 设置对象过滤器时发生错误 - " + error.message);
    }
};

/**
 * 设置层过滤器
 * @param {Array} layerArr - 层数组，例如：[eTopLayer, eBottomLayer]
 */
PCB_IteratorBase.prototype.setLayerFilter = function(layerArr) {
    try {
        if (!this.it) {
            LOG.warn("setLayerFilter: 迭代器句柄为 null");
            return;
        }
        
        if (!layerArr || layerArr.length === 0) {
            LOG.warn("setLayerFilter: layerArr 为空或未定义");
            return;
        }
        
        var set = mkSetArray(layerArr);
        if (set) {
            this.it.AddFilter_LayerSet(set);
            LOG.debug("setLayerFilter: 成功设置层过滤器，层数量: " + layerArr.length);
        }
        
    } catch (error) {
        LOG.error("setLayerFilter: 设置层过滤器时发生错误 - " + error.message);
    }
};

/**
 * 设置区域过滤器
 * @param {number} x1 - 区域左上角 X 坐标
 * @param {number} y1 - 区域左上角 Y 坐标
 * @param {number} x2 - 区域右下角 X 坐标
 * @param {number} y2 - 区域右下角 Y 坐标
 * @description
 *   对 SpatialIterator 生效；
 *   对 BoardIterator 无效——会输出 WARN。
 */
PCB_IteratorBase.prototype.setArea = function(x1, y1, x2, y2) {
    try {
        if (!this.it) {
            LOG.warn("setArea: 迭代器句柄为 null");
            return;
        }
        
        // 参数验证
        if (typeof x1 !== "number" || typeof y1 !== "number" || 
            typeof x2 !== "number" || typeof y2 !== "number") {
            LOG.error("setArea: 坐标参数必须为数字类型");
            return;
        }
        
        if (!this.isSpatial) {
            LOG.warn("BoardIterator: AddFilter_Area 不生效，若需区域过滤请使用 SpatialIterator。");
            return;
        }
        
        this.it.AddFilter_Area(x1, y1, x2, y2);
        LOG.debug("setArea: 成功设置区域过滤器 [(" + x1 + "," + y1 + "),(" + x2 + "," + y2 + ")]");
        
    } catch (error) {
        LOG.error("setArea: 设置区域过滤器时发生错误 - " + error.message);
    }
};

/**
 * 设置迭代方法
 * @param {number} method - 迭代模式：eProcessAll / eProcessFree / eProcessComponents
 */
PCB_IteratorBase.prototype.setMethod = function(method) {
    try {
        if (!this.it) {
            LOG.warn("setMethod: 迭代器句柄为 null");
            return;
        }
        
        if (typeof method !== "number") {
            LOG.error("setMethod: method 参数必须为数字类型");
            return;
        }
        
        this.it.AddFilter_Method(method);
        LOG.debug("setMethod: 成功设置迭代方法: " + method);
        
    } catch (error) {
        LOG.error("setMethod: 设置迭代方法时发生错误 - " + error.message);
    }
};

/**
 * 允许所有层
 */
PCB_IteratorBase.prototype.allowAllLayers = function() {
    try {
        if (!this.it) {
            LOG.warn("allowAllLayers: 迭代器句柄为 null");
            return;
        }
        
        this.it.AddFilter_AllLayers();
        LOG.debug("allowAllLayers: 成功设置允许所有层");
        
    } catch (error) {
        LOG.error("allowAllLayers: 设置允许所有层时发生错误 - " + error.message);
    }
};

/**
 * 重置所有过滤器
 */
PCB_IteratorBase.prototype.filterAll = function() {
    try {
        if (!this.it) {
            LOG.warn("filterAll: 迭代器句柄为 null");
            return;
        }
        
        this.it.SetState_FilterAll();
        LOG.debug("filterAll: 成功重置所有过滤器");
        
    } catch (error) {
        LOG.error("filterAll: 重置过滤器时发生错误 - " + error.message);
    }
};

/**
 * 将迭代器重置到开始位置
 */
PCB_IteratorBase.prototype.reset = function() {
    try {
        if (!this.it) {
            LOG.warn("reset: 迭代器句柄为 null");
            return;
        }
        
        this._nextHandle = this.it.FirstPCBObject();
        LOG.debug("reset: 迭代器已重置到开始位置");
        
    } catch (error) {
        LOG.error("reset: 重置迭代器时发生错误 - " + error.message);
        this._nextHandle = null;
    }
};

/**
 * 获取下一个对象
 * @return {Object} 复制后的对象 或 null
 * @description 返回 objcopy() 封装后的对象
 */
PCB_IteratorBase.prototype.next = function() {
    try {
        if (!this.it) {
            LOG.warn("next: 迭代器句柄为 null");
            return null;
        }
        
        var h = null;
        
        if (!this._nextHandle) {
            // 初次调用
            h = this.it.FirstPCBObject();
        } else {
            h = this.it.NextPCBObject();
        }
        
        this._nextHandle = h;
        
        if (!h) {
            return null;
        }
        
        // 返回 copy 封装对象
        var result = objcopy(h);
        if (!result) {
            LOG.warn("next: objcopy() 返回 null");
        }
        
        return result;
        
    } catch (error) {
        LOG.error("next: 获取下一个对象时发生错误 - " + error.message);
        this._nextHandle = null;
        return null;
    }
};

/**
 * 销毁迭代器
 * @description Board / Spatial 迭代器均需要销毁
 */
PCB_IteratorBase.prototype.destroy = function() {
    try {
        if (!this.it) {
            LOG.warn("destroy: 迭代器句柄已经为 null");
            return;
        }
        
        // AD 会自动回收，我们只需要清空引用
        this.it = null;
        this._nextHandle = null;
        this.board = null;
        
        LOG.debug("destroy: 迭代器已销毁");
        
    } catch (error) {
        LOG.error("destroy: 销毁迭代器时发生错误 - " + error.message);
    }
};


// ==========================================================
// IteratorFactory
// 用于创建 BoardIterator / SpatialIterator
// ==========================================================
var IteratorFactory = {

    /**
     * 创建 Board 迭代器
     * @param {IPCB_Board} board - PCB 板对象
     * @return {PCB_IteratorBase} Board 迭代器实例
     */
    newBoardIterator: function(board) {
        try {
            if (!board) {
                LOG.error("IteratorFactory.newBoardIterator: board 为 null");
                return null;
            }
            
            var it = board.BoardIterator_Create();
            if (!it) {
                LOG.error("IteratorFactory.newBoardIterator: BoardIterator_Create() 失败");
                return null;
            }
            
            var iterator = new PCB_IteratorBase(board, it, false);
            LOG.debug("IteratorFactory.newBoardIterator: 成功创建 Board 迭代器");
            
            return iterator;
            
        } catch (error) {
            LOG.error("IteratorFactory.newBoardIterator: 创建 Board 迭代器时发生错误 - " + error.message);
            return null;
        }
    },

    /**
     * 创建空间迭代器
     * @param {IPCB_Board} board - PCB 板对象
     * @param {number} x1 - 区域左上角 X 坐标
     * @param {number} y1 - 区域左上角 Y 坐标
     * @param {number} x2 - 区域右下角 X 坐标
     * @param {number} y2 - 区域右下角 Y 坐标
     * @return {PCB_IteratorBase} 空间迭代器实例
     */
    newSpatialIterator: function(board, x1, y1, x2, y2) {
        try {
            if (!board) {
                LOG.error("IteratorFactory.newSpatialIterator: board 为 null");
                return null;
            }
            
            // 参数验证
            if (typeof x1 !== "number" || typeof y1 !== "number" || 
                typeof x2 !== "number" || typeof y2 !== "number") {
                LOG.error("IteratorFactory.newSpatialIterator: 坐标参数必须为数字类型");
                return null;
            }
            
            var it = board.SpatialIterator_Create();
            if (!it) {
                LOG.error("IteratorFactory.newSpatialIterator: SpatialIterator_Create() 失败");
                return null;
            }
            
            var inst = new PCB_IteratorBase(board, it, true);
            inst.setArea(x1, y1, x2, y2);
            
            LOG.debug("IteratorFactory.newSpatialIterator: 成功创建空间迭代器 [(" + x1 + "," + y1 + "),(" + x2 + "," + y2 + ")]");
            
            return inst;
            
        } catch (error) {
            LOG.error("IteratorFactory.newSpatialIterator: 创建空间迭代器时发生错误 - " + error.message);
            return null;
        }
    }
};


// ==========================================================
// 示例：使用 BoardIterator
// ==========================================================
/*
var it = IteratorFactory.newBoardIterator(board);
if (it) {
    try {
        it.setObjectFilter([eTrackObject, ePadObject]);
        it.setLayerFilter([eTopLayer, eBottomLayer]);
        it.reset();
        
        for (var obj = it.next(); obj; obj = it.next()) {
            // obj 是 objcopy(handle) 返回的 JS 对象
            // 在这里处理对象
        }
    } finally {
        it.destroy();
    }
}
*/


// ==========================================================
// 示例：使用 SpatialIterator（区域搜索）
// ==========================================================
/*
var x1 = 0, y1 = 0, x2 = 10000, y2 = 10000; // 示例坐标
var it = IteratorFactory.newSpatialIterator(board, x1, y1, x2, y2);
if (it) {
    try {
        it.setObjectFilter([eTrackObject, eFillObject]);
        it.reset();
        
        var o = it.next();
        while (o) {
            // 处理对象 o
            o = it.next();
        }
    } finally {
        it.destroy();
    }
}
*/
