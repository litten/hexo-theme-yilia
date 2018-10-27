var e = function() {
    function r(e, r, n) {
        return r || n ? String.fromCharCode(r || n) : u[e] || e
    }
    function n(e) {
        return p[e]
    }
    var t = /&quot;|&lt;|&gt;|&amp;|&nbsp;|&apos;|&#(\d+);|&#(\d+)/g
      , o = /['<> "&]/g
      , u = {
        "&quot;": '"',
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&nbsp;": " "
    }
      , c = /\u00a0/g
      , a = /<br\s*\/?>/gi
      , i = /\r?\n/g
      , f = /\s/g
      , p = {};
    for (var s in u)
        p[u[s]] = s;
    return u["&apos;"] = "'",
    p["'"] = "&#39;",
    {
        encode: function(e) {
            return e ? ("" + e).replace(o, n).replace(i, "<br/>").replace(f, "&nbsp;") : ""
        },
        decode: function(e) {
            return e ? ("" + e).replace(a, "\n").replace(t, r).replace(c, " ") : ""
        },
        encodeBase16: function(e) {
            if (!e)
                return e;
            e += "";
            for (var r = [], n = 0, t = e.length; t > n; n++)
                r.push(e.charCodeAt(n).toString(16).toUpperCase());
            return r.join("")
        },
        encodeBase16forJSON: function(e) {
            if (!e)
                return e;
            e = e.replace(/[\u4E00-\u9FBF]/gi, function(e) {
                return escape(e).replace("%u", "\\u")
            });
            for (var r = [], n = 0, t = e.length; t > n; n++)
                r.push(e.charCodeAt(n).toString(16).toUpperCase());
            return r.join("")
        },
        decodeBase16: function(e) {
            if (!e)
                return e;
            e += "";
            for (var r = [], n = 0, t = e.length; t > n; n += 2)
                r.push(String.fromCharCode("0x" + e.slice(n, n + 2)));
            return r.join("")
        },
        encodeObject: function(r) {
            if (r instanceof Array)
                for (var n = 0, t = r.length; t > n; n++)
                    r[n] = e.encodeObject(r[n]);
            else if ("object" == typeof r)
                for (var o in r)
                    r[o] = e.encodeObject(r[o]);
            else if ("string" == typeof r)
                return e.encode(r);
            return r
        },
        loadScript: function(path) {
            var $script = document.createElement('script')
            document.getElementsByTagName('body')[0].appendChild($script)
            $script.setAttribute('src', path)
        },
        addLoadEvent: function(func){
            var oldonload = window.onload;
            if (typeof window.onload!="function") {
                window.onload = func;
            } else {
                window.onload = function() {
                    oldonload();
                    func();
                }
            }
        }
    }
}();

module.exports = e