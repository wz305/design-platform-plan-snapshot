/**
 * __adGetHostGlobal
 *
 * ⚠️ 例外函数：全仓库唯一允许触达 eval 的地方
 *
 * 目的：
 * - 解决“合并后同一作用域”导致的宿主全局变量遮蔽问题
 *
 * 约束：
 * - 禁止在其它任何文件出现 eval/new Function
 * - 业务代码不得直接调用本函数；必须通过「全局符号桥」间接访问
 *
 * @param {String} name 宿主全局符号名
 * @returns {*} 取到的全局符号值；失败返回 undefined
 */
function __adGetHostGlobal(name) {
    // “间接 eval”：在 JScript 中可在全局作用域解析符号名
    var _geval = eval;
    try {
        return _geval(String(name));
    } catch (e) {
        return undefined;
    }
}
