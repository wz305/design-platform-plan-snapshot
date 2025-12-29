/**
 * JsonUtil
 *
 * 业务统一 JSON 入口，禁止直接使用 eval
 */
var JsonUtil = (function () {
    function parse(text) {
        try {
            if (typeof JSON !== "undefined" && JSON && typeof JSON.parse === "function") {
                return JSON.parse(text);
            }
        } catch (e1) {}

        try {
            if (typeof __adJsonParse === "function") {
                return __adJsonParse(text);
            }
        } catch (e2) {}

        return null;
    }

    function stringify(obj) {
        try {
            if (typeof JSON !== "undefined" && JSON && typeof JSON.stringify === "function") {
                return JSON.stringify(obj);
            }
        } catch (e1) {}
        try {
            return String(obj);
        } catch (e2) {
            return "";
        }
    }

    return {
        parse: parse,
        stringify: stringify
    };
})();
