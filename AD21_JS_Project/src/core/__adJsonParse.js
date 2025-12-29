/**
 * __adJsonParse
 *
 * ⚠️ 例外函数：全仓库 JSON 解析唯一允许触达 eval 的地方
 *
 * 安全策略：
 * - 正则校验 JSON token
 * - 校验通过后 eval('(' + text + ')')
 *
 * @param {String} text JSON 字符串
 * @returns {*} 解析后的对象
 * @throws {Error} JSON 无效时抛异常
 */
function __adJsonParse(text) {
    var _geval = eval;

    if (text && text.charCodeAt(0) === 0xFEFF) {
        text = text.substring(1);
    }

    try {
        var iObj = text.indexOf("{");
        var iArr = text.indexOf("[");
        var iMin = -1;
        if (iObj >= 0 && iArr >= 0) iMin = (iObj < iArr ? iObj : iArr);
        else if (iObj >= 0) iMin = iObj;
        else if (iArr >= 0) iMin = iArr;
        if (iMin > 0) text = text.substring(iMin);
    } catch (e0) {}

    var rxOne = /^[\],:{}\s]*$/;
    var rxTwo = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rxThree = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rxFour = /(?:^|:|,)(?:\s*\[)+/g;

    var ok = false;
    try {
        ok = rxOne.test(
            text
                .replace(rxTwo, "@")
                .replace(rxThree, "]")
                .replace(rxFour, "")
        );
    } catch (e1) {
        ok = false;
    }

    if (!ok) {
        throw new Error("Invalid JSON text");
    }

    return _geval("(" + text + ")");
}
