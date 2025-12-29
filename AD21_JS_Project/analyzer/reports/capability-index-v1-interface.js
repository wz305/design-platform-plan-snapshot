/**
 * Capability Query Interface v1.0
 * Stage 5.5 Semantic Query Suite
 */

var CapabilityQuery = {
    /**
     * 检查对象是否可调用
     * @param {string} objectName - 对象名称
     * @returns {boolean} 是否可调用
     */
    isObjectCallable: function(objectName) {
        return queryInterface.isObjectCallable(objectName);
    },

    /**
     * 列出对象的方法
     * @param {string} objectName - 对象名称
     * @returns {Array} 方法列表
     */
    listMethods: function(objectName) {
        return queryInterface.listMethods(objectName);
    },

    /**
     * 检查访问权限
     * @param {string} fromObject - 源对象
     * @param {string} toTarget - 目标对象
     * @returns {Object} 访问权限信息
     */
    canAccess: function(fromObject, toTarget) {
        return queryInterface.canAccess(fromObject, toTarget);
    },

    /**
     * 获取全局符号列表
     * @returns {Object} 全局符号信息
     */
    getGlobalSymbols: function() {
        return queryInterface.getGlobalSymbols();
    }
};

// 注意：queryInterface 是内部实现的引用
// 实际使用时需要加载 capability-index-v1.json
