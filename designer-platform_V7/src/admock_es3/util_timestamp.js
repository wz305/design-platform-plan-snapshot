/**
 * util_timestamp.js
 * --------------------------------------------------------------------
 * ES3-compatible timestamp / ISO string generation (avoid Date.toISOString).
 * --------------------------------------------------------------------
 */

var Util_Timestamp = (function () {
    function _pad2(n) {
        n = (n < 10) ? ("0" + n) : String(n);
        return n;
    }

    function _pad3(n) {
        if (n < 10) { return "00" + n; }
        if (n < 100) { return "0" + n; }
        return String(n);
    }

    /**
     * Generate ISO-like string in UTC.
     * @returns {String} Example: 2025-12-27T12:34:56.789Z
     */
    function nowISO() {
        var d = new Date();
        var Y = d.getUTCFullYear();
        var M = _pad2(d.getUTCMonth() + 1);
        var D = _pad2(d.getUTCDate());
        var h = _pad2(d.getUTCHours());
        var m = _pad2(d.getUTCMinutes());
        var s = _pad2(d.getUTCSeconds());
        var ms = _pad3(d.getUTCMilliseconds());
        return Y + "-" + M + "-" + D + "T" + h + ":" + m + ":" + s + "." + ms + "Z";
    }

    return {
        nowISO: nowISO
    };
})();

if (typeof window !== "undefined") {
    window["Util_Timestamp"] = Util_Timestamp;
} else if (typeof global !== "undefined") {
    global["Util_Timestamp"] = Util_Timestamp;
}
