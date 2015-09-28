!
function(e, t, s) {
  function a() {
    return c.short_name ? g + "//" + c.short_name + "." + S.DOMAIN: S.REMOTE
  }
  function i() {
    function t() {
      for (var t; t = y.shift();) {
        var a = t.url,
        i = new s(t.title, {
          dir: "auto",
          icon: t.iconUrl,
          body: t.body
        });
        try {
          i.onclick = function() {
            e.focus(),
            h.href = a,
            i.close()
          }
        } catch(r) {}
        setTimeout(function() {
          i.close && i.close()
        },
        8e3)
      }
    }
    var s = e.Notification;
    "Notification" in e && "denied" !== s.permission && ("granted" === s.permission && t(), s.requestPermission(function(e) {
      "granted" === e && t()
    }))
  }
  function r() {
    return 0 == nt.data.user_id
  }
  function n(e) {
    S.theme = e,
    "none" != e && o.injectStylesheet(S.STATIC_URL + "/styles/embed" + (e ? "." + e + ".css?" + U[e] : "." + short_name) + ".css")
  }
  var o = {},
  d = t.getElementsByTagName("head")[0] || t.getElementsByTagName("body")[0];
  if (o.extend = function(e, t) {
    for (var s in t) e[s] = t[s];
    return e
  },
  o.injectScript = function(a, i) {
    var r = t.createElement("script"),
    n = t.head || t.getElementsByTagName("head")[0] || t.documentElement;
    r.type = "text/javascript",
    r.src = a,
    r.async = "async",
    r.charset = "utf-8",
    i && (r.onload = r.onreadystatechange = function(t, a) {
      var o = a || !r.readyState || /loaded|complete/.test(r.readyState);
      o && (r.onload = r.onreadystatechange = null, n && r.parentNode && n.removeChild(r), r = s, a || i.call(e))
    }),
    n.insertBefore(r, n.firstChild)
  },
  o.injectStylesheet = function(e) {
    var s = t.createElement("link");
    s.type = "text/css",
    s.rel = "stylesheet",
    s.href = e,
    d.appendChild(s)
  },
  o.injectStyle = function(e) {
    var s = t.createElement("style");
    return s.type = "text/css",
    d.appendChild(s),
    e = e.replace(/\}/g, "}\n"),
    s.styleSheet ? s.styleSheet.cssText = e: s.appendChild(t.createTextNode(e)),
    s
  },
  o.getCookie = function(e) {
    for (var a, i, r, n = " " + e + "=",
    o = t.cookie.split(";"), d = 0; d < o.length; d++) if (a = " " + o[d], i = a.indexOf(n), i >= 0 && i + n.length == (r = a.indexOf("=") + 1)) return decodeURIComponent(a.substring(r, a.length).replace(/\+/g, ""));
    return s
  },
  o.param = function(e) {
    var t = [];
    for (var a in e) e[a] != s && t.push(a + "=" + encodeURIComponent(e[a]));
    return t.join("&")
  },
  o.cssProperty = function(e, s) {
    var a = (t.body || t.documentElement).style;
    if ("undefined" == typeof a) return ! 1;
    if ("string" == typeof a[e]) return s ? e: !0;
    for (var i = ["Moz", "Webkit", "ms"], e = e.charAt(0).toUpperCase() + e.substr(1), r = 0; r < i.length; r++) if ("string" == typeof a[i[r] + e]) return s ? i[r] + e: !0
  },
  !e.DUOSHUO) {
    for (var l in Object.prototype) return alert("Object.prototype 不为空，请不要给 Object.prototype 设置方法");
    var c, u, p = e.JSON,
    h = e.location,
    f = e.XMLHttpRequest,
    m = p && p.stringify && e.localStorage,
    v = e.navigator.userAgent,
    g = (e.webkitNotifications, "https:" == t.location.protocol ? "https:": "http:"),
    b = 0,
    y = [],
    _ = u = function() {
      function e(e) {
        return t[e] || "&amp;"
      }
      var t = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      },
      s = /&(?!\w+;)|[<>"'`]/g,
      a = /[&<>"'`]/;
      return function(t) {
        return null == t || t === !1 ? "": a.test(t) ? t.replace(s, e) : t
      }
    } (),
    k = function(e) {
      if (e.match(/^(http|https):/)) return e;
      var s = t.createElement("a");
      return s.href = e,
      P.hrefNormalized ? s.href: s.getAttribute("href", 4)
    },
    w = function(e) {
      return function() {
        return e
      }
    },
    x = function() {
      for (var e = {},
      t = 0; t < arguments.length; t++) arguments[t] && o.extend(e, arguments[t]);
      var s = o.param(e);
      return s ? "?" + s: ""
    },
    T = function() {
      var e = o.getCookie("duoshuo_token");
      return e ? {
        jwt: e
      }: c.remote_auth ? {
        short_name: c.short_name,
        remote_auth: c.remote_auth
      }: s
    },
    q = function() {
      if (!c && (c = e.duoshuoQuery)) {
        if (!c.short_name || "your_duoshuo_short_name" === c.short_name) return c = s,
        void alert("你还没有设置多说域名(duoshuoQuery.short_name)，填入已有域名或创建新站点：http://duoshuo.com/create-site/");
        it.trigger("queryDefined")
      }
      return c
    },
    C = function(e) {
      return e && e.error && e.warn ? e: {
        error: function() {},
        log: function() {},
        warn: function() {}
      }
    } (e.console),
    S = e.DUOSHUO = {
      sourceName: {
        weibo: "新浪微博",
        qq: "QQ",
        qzone: "QQ空间",
        qqt: "腾讯微博",
        renren: "人人网",
        douban: "豆瓣网",
        netease: "网易微博",
        kaixin: "开心网",
        sohu: "搜狐微博",
        baidu: "百度",
        taobao: "淘宝",
        msn: "MSN",
        google: "谷歌",
        wechat: "微信",
        diandian: "点点网",
        duitang: "堆糖",
        youdao: "有道云笔记",
        pengyou: "朋友网",
        facebook: "Facebook",
        twitter: "Twitter",
        linkedin: "Linkedin",
        huaban: "花瓣网",
        mogujie: "蘑菇街",
        meilishuo: "美丽说"
      },
      serviceNames: {
        weibo: "微博",
        qq: "QQ",
        douban: "豆瓣",
        renren: "人人",
        netease: "网易",
        kaixin: "开心",
        sohu: "搜狐",
        baidu: "百度",
        taobao: "淘宝",
        msn: "MSN",
        google: "谷歌",
        google: "谷歌",
        wechat: "微信",
        diandian: "点点",
        duitang: "堆糖",
        youdao: "有道云笔记",
        pengyou: "朋友网",
        facebook: "Facebook",
        twitter: "Twitter",
        linkedin: "Linkedin",
        huaban: "花瓣网",
        mogujie: "蘑菇街",
        meilishuo: "美丽说"
      },
      parseDate: function(e) {
        return e.parse("2011-10-28T00:00:00+08:00") &&
        function(t) {
          return new e(t)
        } || e.parse("2011/10/28T00:00:00+0800") &&
        function(t) {
          return new e(t.replace(/-/g, "/").replace(/:(\d\d)$/, "$1"))
        } || e.parse("2011/10/28 00:00:00+0800") &&
        function(t) {
          return new e(t.replace(/-/g, "/").replace(/:(\d\d)$/, "$1").replace("T", " "))
        } ||
        function(t) {
          return new e(t)
        }
      } (Date),
      fullTime: function(e) {
        var t = S.parseDate(e);
        return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日 " + t.toLocaleTimeString()
      },
      elapsedTime: function(e) {
        var t = S.parseDate(e),
        s = new Date,
        a = (s - b - t) / 1e3;
        return 10 > a ? "刚刚": 60 > a ? Math.round(a) + "秒前": 3600 > a ? Math.round(a / 60) + "分钟前": 86400 > a ? Math.round(a / 3600) + "小时前": (s.getFullYear() == t.getFullYear() ? "": t.getFullYear() + "年") + (t.getMonth() + 1) + "月" + t.getDate() + "日"
      },
      compileStyle: function(e) {
        var t = "",
        s = {};
        if (s.textbox = "#ds-thread #ds-reset .ds-replybox .ds-textarea-wrapper", !e) return t;
        for (var a in e) t += s[a] + "{" + e[a] + "}\n";
        return t
      },
      init: function(e, t) {
        e && !O[e] && (O[e] = t || {
          type: "EmbedThread"
        }),
        S.initView && S.initView()
      }
    },
    j = t.all,
    P = S.support = function() {
      var s = t.createElement("div");
      s.innerHTML = '<a href="/a" style="opacity:.55;">a</a><input type="checkbox"/>';
      var a = s.getElementsByTagName("a")[0],
      i = s.getElementsByTagName("input")[0],
      r = {
        placeholder: "placeholder" in i,
        touch: "ontouchstart" in e || "onmsgesturechange" in e,
        opacity: /^0.55$/.test(a.style.opacity),
        hrefNormalized: "/a" === a.getAttribute("href"),
        iOS: v.match(/ \((iPad|iPhone|iPod);( U;)? CPU( iPhone)? OS /),
        android: v.match(/ \(Linux; U; Android /)
      };
      return r.ie6 = !f && "undefined" == typeof s.style.maxHeight,
      r.authInWin = e.postMessage && e.screen.width > 800 && !r.iOS && !r.android && h.origin,
      r
    } (),
    O = S.selectors = {
      ".ds-thread": {
        type: "EmbedThread"
      },
      ".ds-recent-comments": {
        type: "RecentComments"
      },
      ".ds-recent-visitors": {
        type: "RecentVisitors"
      },
      ".ds-top-users": {
        type: "TopUsers"
      },
      ".ds-top-threads": {
        type: "TopThreads"
      },
      ".ds-login": {
        type: "LoginWidget"
      },
      ".ds-thread-count": {
        type: "ThreadCount"
      },
      ".ds-share": {
        type: "ShareWidget"
      }
    },
    E = S.openDialog = function(e) {
      return S.dialog !== s && S.dialog.el.remove(),
      S.dialog = new st.Dialog(et.dialog(e)).open()
    },
    N = S.smilies = {};
    S.require = function() {
      function t(e) {
        var t = R[e] ? "?" + R[e] + ".js": "";
        return S.STATIC_URL + "/libs/" + e + ".js" + t
      }
      var s = {
        mzadxN: "undefined" != typeof mzadxN
      };
      return "undefined" != typeof jQuery && jQuery.fn.jquery >= "1.5" && (s["embed.compat"] = !0, S.jQuery = e.jQuery),
      function(e, a) {
        if ("string" == typeof e) s[e] ? a() : o.injectScript(t(e),
        function() {
          s[e] = !0,
          a()
        });
        else if ("object" == typeof e) {
          var i, r = !0;
          for (i = 0; i < e.length; i++)(function(n) {
            s[e[i]] || (r = !1, o.injectScript(t(n),
            function() {
              s[n] = !0;
              for (var t = 0; t < e.length; t++) if (!s[e[t]]) return;
              a()
            }))
          })(e[i]);
          r && a()
        }
      }
    } ();
    for (var L = 0,
    I = ["EmbedThread", "RecentComments", "RecentVisitors", "TopUsers", "TopThreads", "LoginWidget", "ThreadCount"]; L < I.length; L++) S[I[L]] = function(e) {
      return function(t, s) {
        s = s || {},
        s.type = e,
        t && !O[t] && (O[t] = s),
        S.initSelector && S.initSelector(t, s)
      }
    } (I[L]),
    S["create" + I[L]] = function(e) {
      return function(s, a) {
        var i = t.createElement(s);
        for (var r in a) i.setAttribute("data-" + r, a[r]);
        return S[e](i),
        i
      }
    } (I[L]);
    S.RecentCommentsWidget = S.RecentComments;
    var M = S.API = {
      ajax: function(e, t, i, r, n) {
        function d(e) {
          var t = e.getResponseHeader("Date");
          t && (b = new Date - new Date(t))
        }
        function l(e, t, s) {
          var a, i, o, l = t;
          if (e >= 200 && 300 > e || 304 === e) if (304 === e) l = "notmodified",
          o = !0;
          else try {
            a = p.parse(s),
            l = "success",
            o = !0
          } catch(c) {
            l = "parsererror",
            i = c
          } else {
            i = l,
            (!l || e) && (l = "error", 0 > e && (e = 0));
            try {
              a = p.parse(s)
            } catch(c) {
              l = "parsererror",
              i = c
            }
          }
          o ? r && r(a) : "parseerror" === l ? C.error("解析错误: " + s) : (C.error("出错啦(" + a.code + "): " + a.errorMessage), n && n(a), a.errorTrace && C.error(a.errorTrace)),
          d(m)
        }
        var u = o.getCookie("duoshuo_token");
        i = i || {},
        i.v = S.version,
        u ? i.jwt = u: c.remote_auth && (i.remote_auth = c.remote_auth);
        var h = f && p && p.parse;
        if (h) {
          var m = new f,
          v = !!m && "withCredentials" in m;
          if (v) {
            var g;
            return m.open(e, a() + "/api/" + t + ".json" + ("GET" == e ? "?" + o.param(i) : ""), !0),
            m.withCredentials = !0,
            m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            m.send("GET" == e ? null: o.param(i)),
            g = function(e, t) {
              var a, i, r, n;
              try {
                if (g && (t || 4 === m.readyState)) if (g = s, t) 4 !== m.readyState && m.abort();
                else {
                  a = m.status,
                  r = m.getAllResponseHeaders();
                  try {
                    n = m.responseText
                  } catch(e) {}
                  try {
                    i = m.statusText
                  } catch(o) {
                    i = ""
                  }
                }
              } catch(d) {
                t || l( - 1, d)
              }
              n && l(a, i, n, r)
            },
            void(4 === m.readyState ? g() : m.onreadystatechange = g)
          }
        }
        "GET" != e && (i._method = "POST");
        var y = "cb_" + Math.round(1e6 * Math.random());
        M[y] = function(e) {
          switch (e.code) {
          case 0:
            r && r(e);
            break;
          default:
            n && n(e),
            C.error("出错啦(" + e.code + "): " + e.errorMessage),
            e.errorTrace && C.error(e.errorTrace)
          }
        },
        i.callback = "DUOSHUO.API['" + y + "']",
        o.injectScript(a() + "/api/" + t + ".jsonp?" + o.param(i))
      },
      get: function(e, t, s, a) {
        return this.ajax("GET", e, t, s, a)
      },
      post: function(e, t, s, a) {
        return this.ajax("POST", e, t, s, a)
      }
    },
    A = S.ws = {
      messages: [],
      send: function(s) {
        if (! ("WebSocket" in e && p)) return ! 1;
        var a = this;
        if (a.messages.push(p.stringify(s)), !a.webSocket) {
          var r = "https:" === t.location.protocol ? "wss://ws.duoshuo.com:8202/": "ws://ws.duoshuo.com:8201/",
          n = a.webSocket = new WebSocket(r);
          n.onopen = function() {
            var e, t = 1 === n.readyState;
            if (t) for (; e = a.messages.shift();) n.send(e)
          },
          n.onmessage = function(e) {
            try {
              var t = p.parse(e.data)
            } catch(s) {
              return
            }
            switch (t.type) {
            case "post":
              for (var a, r = 0; r < S.pagelets.length; r++) a = S.pagelets[r],
              a.threadId == t.thread_id && a.onMessage(t);
              break;
            case "notification":
              y.push(t),
              i()
            }
          },
          e.addEventListener("beforeunload",
          function() {
            n.close()
          })
        }
        a.webSocket.onopen()
      }
    };
    S.DOMAIN = "duoshuo.com",
    S.STATIC_URL = g + "//static.duoshuo.com",
    S.REMOTE = g + "//duoshuo.com",
    S.version = "15.9.25";
    var U = {
      "default": "080f31b2",
      dark: "ddc346d8",
      bluebox: "0f0f035c",
      newhua: "dc453ca2"
    },
    R = {
      "embed.compat": "24f8ca3f",
      smilies: "921e8eda"
    },
    z = {
      post: "发布",
      posting: "正在发布",
      settings: "设置",
      reply: "回复",
      like: "顶",
      repost: "转发",
      report: "举报",
      "delete": "删除",
      reply_to: "回复 ",
      reposts: "转发",
      comments: "评论",
      floor: "楼",
      latest: "最新",
      earliest: "最早",
      hottest: "最热",
      share_to: "分享到:",
      leave_a_message: "说点什么吧…",
      no_comments_yet: "还没有评论，沙发等你来抢",
      repost_reason: "请输入转发理由",
      hot_posts_title: "被顶起来的评论",
      comments_zero: "暂无评论",
      comments_one: "1条评论",
      comments_multiple: "{num}条评论",
      reposts_zero: "暂无转发",
      reposts_one: "1条转发",
      reposts_multiple: "{num}条转发",
      weibo_reposts_zero: "暂无新浪微博",
      weibo_reposts_one: "1条新浪微博",
      weibo_reposts_multiple: "{num}条新浪微博",
      qqt_reposts_zero: "暂无腾讯微博",
      qqt_reposts_one: "1条腾讯微博",
      qqt_reposts_multiple: "{num}条腾讯微博"
    },
    D = {
      get: function(e) {
        return m ? m[e] : void 0
      },
      save: function(e, t) {
        if (m) try {
          m.removeItem(e),
          m[e] = p.stringify(t),
          m.removeItem(e + ":timestamp"),
          m[e + ":timestamp"] = Math.floor((new Date - b) / 1e3)
        } catch(s) {}
      }
    },
    W = S.loadRequire = function(e) {
      if (e.visitor && (!nt.data && e.visitor.user_id && Notification && !Notification.requestPermission() && A.send({
        logged_user_id: e.visitor.user_id
      }), nt.reset(e.visitor)), e.site && (rt.reset(e.site), D.save("ds_site_" + c.short_name, e.site)), !S.theme && rt.data.theme && n(rt.data.theme), e.lang && (o.extend(z, e.lang), D.save("ds_lang_" + c.short_name, e.lang)), e.stylesheets) for (var t = 0; t < e.stylesheets.length; t++) o.injectStylesheet(e.stylesheets[t]);
      if (e.nonce && (S.nonce = e.nonce), e.style && o.injectStyle((e.style || "") + S.compileStyle(c.component_style)), e.unread && ot.reset(e.unread), e.warnings) for (var t = 0; t < e.warnings.length; t++) C.warn(e.warnings[t])
    },
    H = 0,
    B = S.Class = function() {};
    B.extend = function(e) {
      function t() { ! H && this.init && this.init.apply(this, arguments)
      }
      H = 1;
      var s = new this;
      H = 0;
      for (var a in e) s[a] = e[a];
      return t.prototype = s,
      t.prototype.constructor = t,
      t.extend = arguments.callee,
      t
    };
    var J = S.Event = B.extend({
      on: function(e, t) {
        var a = this.handlers || (this.handlers = {});
        return a[e] === s && (a[e] = []),
        a[e].push(t),
        this
      },
      trigger: function(e, t) {
        var s = (this.handlers || (this.handlers = {}))[e];
        if (s) for (var a = 0; a < s.length && s[a].call(this, t) !== !1; a++);
        return this
      }
    }),
    Q = S.Widget = J.extend({
      init: function(e, t) {
        this.el = e,
        this.options = t || {},
        this.render()
      },
      render: function() {},
      reset: function() {},
      load: function(e) {
        switch (e.code) {
        case 0:
          W(e);
          var t = this.prepare(e);
          t.options = o.extend(this.options, e.options),
          this.onload(t);
          break;
        default:
          this.onError(e)
        }
      },
      onload: function(e) {
        this.el.html(et[this.tmpl](e))
      },
      prepare: function(e) {
        return e
      },
      onMessage: function() {},
      onError: function(e) {
        C.error("出错啦(" + e.code + "): " + e.errorMessage),
        e.errorTrace && C.error(e.errorTrace)
      }
    }),
    V = S.Model = J.extend({
      init: function(e) {
        this.data = e
      },
      reset: function(e) {
        this.data = e,
        this.trigger("reset")
      },
      remove: function(e) {
        this.data.splice(e, 1),
        this.trigger("reset")
      },
      set: function(e, t) {
        if (t === s) for (var a in e) this.data[a] = e[a];
        else this.data[e] = t;
        return this.trigger("reset"),
        this
      },
      toJSON: function() {
        return o.extend({},
        this.data)
      }
    }),
    $ = V.extend({
      toJSON: function() {
        return o.extend({},
        this.data)
      }
    }),
    F = V.extend({
      toJSON: function() {
        var e = o.extend({},
        this.data);
        return e.theAuthor = ct[this.data.author_id] && ct[this.data.author_id].data || this.data.author,
        e.parents = this.data.parents || [],
        e
      }
    }),
    G = V.extend({
      toJSON: function() {
        return o.extend({},
        this.data)
      }
    }),
    Y = function(e) {
      this.model = e
    };
    Y.prototype.set = function(e) {
      for (var t in e) e[t] && (this[t] ? this[t].set(e[t]) : this[t] = new this.model(e[t]))
    },
    Y.prototype.get = function(e) {
      for (var t = 0,
      s = []; t < e.length; t++) s[t] = this[e[t]];
      return s
    },
    Y.prototype.getJSON = function(e) {
      for (var t = 0,
      s = []; t < e.length; t++) this[e[t]] && s.push(this[e[t]].toJSON());
      return s
    };
    var Z = {
      userUrl: function(e) {
        return e.url
      },
      avatarUrl: function(e) {
        if (e.avatar_url) {
          e.avatar_url = e.avatar_url.replace(/^http\:\/\//, "https://www.fancycoding.com/proxy/");
	}else{
          rt.data.default_avatar_url = rt.data.default_avatar_url.replace(/^http\:\/\//, "https://www.fancycoding.com/proxy/");
	}
        return e.avatar_url || rt.data.default_avatar_url
      },
      loginUrl: function(e, t) {
        return t || (t = {}),
        c.sso && c.sso.login && (t.sso = 1, t.redirect_uri = c.sso.login),
        a() + "/login/" + e + "/" + x(t)
      },
      bindUrl: function(e) {
        return a() + "/bind/" + e + "/" + x(c.sso && c.sso.login ? {
          sso: 1,
          redirect_uri: c.sso.login
        }: null, T())
      },
      logoutUrl: function() {
        return a() + "/logout/" + x(c.sso && c.sso.logout ? {
          sso: 1,
          redirect_uri: c.sso.logout
        }: null)
      }
    },
    X = ["weibo", "qq", "renren", "douban"],
    K = ["kaixin", "netease", "sohu", "baidu", "google"],
    et = S.templates = {
      userAnchor: function(e) {
        return e.url ? '<a rel="nofollow author" target="_blank" href="' + _(e.url) + '">' + _(e.name) + "</a>": _(e.name)
      },
      avatarImg: function(e, t) {
        return '<img src="' + _(Z.avatarUrl(e, t)) + '" alt="' + _(e.name) + '"' + (t ? ' style="width:' + t + "px;height:" + t + 'px"': "") + "/>"
      },
      avatar: function(e, t) {
        var s = et.avatarImg(e, t),
        i = Z.userUrl(e);
        return i ? '<a rel="nofollow author" target="_blank" href="' + _(i) + '" ' + (e.user_id ? " onclick=\"this.href='" + a() + "/user-url/?user_id=" + e.user_id + "';\"": "") + ' title="' + _(e.name) + '">' + s + "</a>": s
      },
      timeText: function(e) {
        return e ? '<span class="ds-time" datetime="' + e + '" title="' + S.fullTime(e) + '">' + S.elapsedTime(e) + "</span>": ""
      },
      timeAnchor: function(e, t) {
        return e ? '<a href="' + t + '" target="_blank" rel="nofollow" class="ds-time" datetime="' + e + '" title="' + S.fullTime(e) + '">' + S.elapsedTime(e) + "</a>": ""
      },
      serviceIcon: function(e, t) {
        return '<a href="javascript:void(0)" class="ds-service-icon' + (t ? "-grey": "") + " ds-" + e + '" data-service="' + e + '" title="' + S.sourceName[e] + '"></a>'
      },
      poweredBy: function(e) {
        return '<p class="ds-powered-by"><a href="http://duoshuo.com" target="_blank" rel="nofollow">' + _(e) + "</a></p>"
      },
      indicator: w('<div id="ds-indicator"></div>'),
      waitingImg: w('<div id="ds-waiting"></div>'),
      loginItem: function(e, t) {
        var s = Z[t ? "bindUrl": "loginUrl"](e);
        return '<li>    <a href="' + s + '" rel="nofollow" class="ds-service-link ds-' + e + '">' + S.serviceNames[e] + (nt.data.social_uid[e] ? ' <span class="ds-icon ds-icon-ok"></span>': "") + "</a></li>"
      }
    },
    tt = function(e) {
      var t = [];
      for (var s in e) t.push('<input type="hidden" name="' + s + '" value="' + _(e[s]) + '" />');
      return t.join("\n")
    };
    et.commentList = function(e) {
      var t = "",
      s = e.list;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<li class="ds-comment',
      e.options.show_avatars && (t += " ds-show-avatars"),
      t += '" data-post-id="' + a.post_id + '">',
      e.options.show_avatars && (t += '<div class="ds-avatar">' + et.avatar(a.theAuthor, e.options.avatar_size) + "</div>"),
      t += '<div class="ds-meta">' + et.userAnchor(a.theAuthor),
      e.options.show_time && (t += et.timeText(a.created_at)),
      t += "</div>",
      t += e.options.show_title ? '<div class="ds-thread-title">在 <a href="' + u(a.thread.url) + '#comments">' + u(a.thread.title) + '</a> 中评论</div><div class="ds-excerpt">' + a.message + "</div>": '<a class="ds-excerpt" title="' + a.thread.title + ' 中的评论" href="' + u(a.thread.url) + '#comments">' + a.message + "</a>",
      t += "</li>";
      return t
    },
    et.ctxPost = function(e) {
      var t = "";
      return e.post && (t += '<li class="ds-ctx-entry"', e.hidden && (t += ' style="display:none"'), t += ' data-post-id="' + e.post.post_id + '"><div class="ds-avatar">' + et.avatar(e.post.theAuthor || e.post.author) + '</div><div class="ds-ctx-body"><div class="ds-ctx-head">' + et.userAnchor(e.post.theAuthor || e.post.author) + et.timeAnchor(e.post.created_at, e.post.url), e.index >= 0 && (t += '<div class="ds-ctx-nth" title="' + S.fullTime(e.post.created_at) + '">' + (e.index + 1) + z.floor + "</div>"), t += '</div><div class="ds-ctx-content">' + e.post.message, e.index >= 0 && (t += '　　　　　　　<div class="ds-comment-actions', e.post.vote > 0 && (t += " ds-post-liked"), t += '">' + et.likePost(e.post) + '<a class="ds-post-repost" href="javascript:void(0);"><span class="ds-icon ds-icon-share"></span>' + z.repost + '</a><a class="ds-post-reply" href="javascript:void(0);"><span class="ds-icon ds-icon-reply"></span>' + z.reply + "</a></div>"), t += "</div></div></li>"),
      t
    },
    et["dialog-anonymous"] = function(e) {
      var t = '<h2>社交帐号登录</h2><div class="ds-icons-32">',
      s = e.services;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<a class="ds-' + a + '" href="' + Z.loginUrl(a) + '">' + S.sourceName[a] + "</a>";
      return t += "</div>",
      e.options.deny_anonymous || (t += '<h2>作为游客留言</h2><form><div class="ds-control-group"><input type="text" name="author_name" id="ds-dialog-name" value="' + u(nt.data.name) + '" required /><label for="ds-dialog-name">名字(必填)</label></div>', e.options.require_guest_email && (t += '<div class="ds-control-group"><input type="email" name="author_email" id="ds-dialog-email" value="' + u(nt.data.email) + '" required /><label for="ds-dialog-email">邮箱(必填)</label></div>'), e.options.require_guest_url && (t += '<div class="ds-control-group"><input type="url" name="author_url" id="ds-dialog-url" placeholder="http://" value="' + u(nt.data.url) + '" /><label for="ds-dialog-url">网址(可选)</label></div>'), t += '<button type="submit">发布</button></form>'),
      t
    },
    et["dialog-ask-for-auth"] = function() {
      var e = '<h2>社交帐号登录</h2><ul class="ds-service-list">' + et.serviceList(X) + '</ul><ul class="ds-service-list ds-additional-services">' + et.serviceList(K) + "</ul>";
      return e
    },
    et["dialog-bind-more"] = function() {
      var e = '<h2>绑定更多帐号</h2><ul class="ds-service-list">' + et.serviceBindList(X) + '</ul><ul class="ds-service-list ds-additional-services">' + et.serviceBindList(K) + '</ul><div style="clear:both"></div>';
      return e
    },
    et["dialog-qrcode"] = function(e) {
      var t = '<h2>微信扫一扫，分享到朋友圈</h2><div class="ds-share-qrcode" style="text-align:center;"><img src="' + e.qrcode_url + '" alt="' + e.url + '"></div>';
      return t
    },
    et["dialog-reposts"] = function(e) {
      var t = '<h2>转发到微博</h2><div class="ds-quote"><strong>@' + u(e.post.theAuthor.name) + "</strong>: " + e.post.message + "</div><form>" + tt({
        post_id: e.post.post_id
      }) + '<div class="ds-textarea-wrapper"><textarea name="message" title="Ctrl+Enter快捷提交" placeholder="' + u(z.repost_reason) + '">' + u(e.repostMessage) + '</textarea><pre class="ds-hidden-text"></pre>';
      return t += '</div><div class="ds-actions">',
      e.service ? t += tt({
        "service[]": e.service
      }) : (t += '<label><input type="checkbox" name="service[]" value="weibo"', nt.data.social_uid.weibo && (t += ' checked="checked"'), t += ' /><span class="ds-service-icon ds-weibo"></span>新浪微博</label><label><input type="checkbox" name="service[]" value="qqt"', nt.data.social_uid.qq && (t += ' checked="checked"'), t += ' /><span class="ds-service-icon ds-qqt"></span>腾讯微博</label>'),
      t += '<button type="submit">' + z.repost + "</button></div></form>"
    },
    et.dialog = function(e) {
      var t = '<div class="ds-dialog"><div class="ds-dialog-inner ds-rounded"><div class="ds-dialog-body">' + e + '</div><div class="ds-dialog-footer"><a href="http://duoshuo.com/" target="_blank" class="ds-logo"></a><span>社会化评论框</span></div><a class="ds-dialog-close" href="javascript:void(0)" title="关闭"></a></div></div>';
      return t
    },
    et.hotPosts = function(e) {
      var t = '<div class="ds-header ds-gradient-bg">' + u(z.hot_posts_title) + "</div><ul>",
      s = e.list;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += et.post({
        post: a,
        options: e.options
      });
      return t += "</ul>"
    },
    et.likePost = function(e) {
      var t = '<a class="ds-post-likes" href="javascript:void(0);"><span class="ds-icon ds-icon-like"></span>' + z.like;
      return e.likes > 0 && (t += "(" + e.likes + ")"),
      t += "</a>"
    },
    et.likeTooltip = function(e) {
      var t = '<div class="ds-like-tooltip ds-rounded"><p>很高兴你能喜欢，分享一下吧：</p><ul>';
      for (var s in e.services) t += '<li><a class="ds-share-to-' + s + " ds-service-link ds-" + s + '" href="' + a() + "/share-proxy/?" + o.param({
        service: s,
        thread_id: e.thread_id
      }) + '">' + e.services[s] + "</a></li>";
      return t += '</ul><p class="ds-like-tooltip-footer"><a class="ds-like-tooltip-close">算了</a></p></div>'
    },
    et.loginButtons = function() {
      var e = '<div class="ds-login-buttons"><p>社交帐号登录:</p><div class="ds-social-links"><ul class="ds-service-list">' + et.serviceList(X) + '<li><a class="ds-more-services" href="javascript:void(0)">更多»</a></li></ul><ul class="ds-service-list ds-additional-services">' + et.serviceList(K) + "</ul></div></div>";
      return e
    },
    et.loginWidget = function(e) {
      var t = '<div class="ds-icons-32">',
      s = e;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<a class="ds-' + a + '" href="' + Z.loginUrl(a) + '">' + S.sourceName[a] + "</a>";
      return t += "</div>"
    },
    et.meta = function(e) {
      var t = '<div class="ds-meta"><a href="javascript:void(0)" class="ds-like-thread-button ds-rounded';
      return e.user_vote > 0 && (t += " ds-thread-liked"),
      t += '"><span class="ds-icon ds-icon-heart"></span> <span class="ds-thread-like-text">',
      t += e.user_vote > 0 ? "已喜欢": "喜欢",
      t += '</span><span class="ds-thread-cancel-like">取消喜欢</span></a><span class="ds-like-panel"></span></div>'
    },
    et.notify = function(e) {
      var t = '<div id="ds-reset"><a class="ds-logo" href="http://duoshuo.com/" target="_blank" title="多说"></a><ul class="ds-notify-unread"><li';
      return e.comments || (t += ' style="display:none;"'),
      t += '><a data-type="unread-comments" href="javascript:void(0);">你有' + e.comments + "条新回复</a></li><li",
      e.notifications || (t += ' style="display:none;"'),
      t += '><a data-type="unread-notifications" href="javascript:void(0);">你有' + e.notifications + "条系统消息</a></li></ul></div>"
    },
    et.post = function(e) {
      var t = "",
      s = e.post,
      i = e.options,
      r = s.author;
      if (t += '<li class="ds-post" data-post-id="' + s.post_id + '"><div class="ds-post-self" data-post-id="' + s.post_id + '" data-thread-id="' + s.thread_id + '" data-root-id="' + s.root_id + '" data-source="' + s.source + '"><div class="ds-avatar"', r.user_id && (t += ' data-user-id="' + r.user_id + '"'), t += ">" + et.avatar(r), S.sourceName[s.source] && (t += et.serviceIcon(s.source)), t += '</div><div class="ds-comment-body"><div class="ds-comment-header">', r.url ? (t += '<a class="ds-user-name ds-highlight" data-qqt-account="' + (r.qqt_account || "") + '" href="' + u(r.url) + '" ', r.user_id && (t += " onclick=\"this.href='" + a() + "/user-url/?user_id=" + r.user_id + "';\""), t += ' rel="nofollow" target="_blank"', r.user_id && (t += ' data-user-id="' + r.user_id + '"'), t += ">" + u(r.name) + "</a>") : (t += '<span class="ds-user-name"', r.user_id && (t += ' data-user-id="' + r.user_id + '"'), t += ' data-qqt-account="' + (r.qqt_account || "") + '">' + u(r.name) + "</span>"), t += "</div>", 1 == i.max_depth && i.show_context && s.parents.length) {
        t += '<ol id="ds-ctx">';
        var n = lt.getJSON(s.parents);
        if (n) for (var o, d = -1,
        l = n.length - 1; l > d;) o = n[d += 1],
        1 == d && s.parents.length > 2 && (t += '<li class="ds-ctx-entry"><a href="javascript:void(0);" class="ds-expand">还有' + (s.parents.length - 2) + "条评论</a></li>"),
        t += et.ctxPost({
          post: o,
          index: d,
          hidden: d && d < s.parents.length - 1
        });
        t += "</ol>"
      }
      s.message = ((s.message.indexOf("src=\"http:\/\/") == -1) ? s.message : ((document.location.protocol == "https:") ? s.message.replace(/src=\"http\:\/\//, "src=\"https://www.fancycoding.com/proxy/") : s.message))
      if (t += "<p>", s.parents.length >= i.max_depth && (!i.show_context || i.max_depth > 1) && s.parent_id && lt[s.parent_id] && (t += '<a class="ds-comment-context" data-post-id="' + s.post_id + '" data-parent-id="' + s.parent_id + '">' + z.reply_to + u(lt[s.parent_id].toJSON().author.name) + ": </a>"), t += s.message + '</p><div class="ds-comment-footer ds-comment-actions', s.vote > 0 && (t += " ds-post-liked"), t += '">', t += s.url ? et.timeAnchor(s.created_at, s.url) : et.timeText(s.created_at), "duoshuo" == s.source ? (t += '<a class="ds-post-reply" href="javascript:void(0);"><span class="ds-icon ds-icon-reply"></span>' + z.reply + "</a>" + et.likePost(s) + '<a class="ds-post-repost" href="javascript:void(0);"><span class="ds-icon ds-icon-share"></span>' + z.repost + '</a><a class="ds-post-report" href="javascript:void(0);"><span class="ds-icon ds-icon-report"></span>' + z.report + "</a>", s.privileges["delete"] && (t += '<a class="ds-post-delete" href="javascript:void(0);"><span class="ds-icon ds-icon-delete"></span>' + z["delete"] + "</a>")) : ("qqt" == s.source || "weibo" == s.source) && (t += '<a class="ds-weibo-comments" href="javascript:void(0);">' + z.comments, s.type.match(/\-comment$/) || (t += '(<span class="ds-count">' + s.comments + "</span>)"), t += '</a><a class="ds-weibo-reposts" href="javascript:void(0);">' + z.reposts, s.type.match(/\-comment$/) || (t += '(<span class="ds-count">' + s.reposts + "</span>)"), t += "</a>"), t += "</div></div></div>", i.max_depth > 1 && (s.childrenArray || s.children) && "weibo" != s.source && "qqt" != s.source) {
        t += '<ul class="ds-children">';
        var c = lt.getJSON(s.childrenArray || s.children);
        if (c) for (var s, d = -1,
        p = c.length - 1; p > d;) s = c[d += 1],
        t += et.post({
          post: s,
          options: i
        });
        t += "</ul>"
      }
      return t += "</li>"
    },
    et.postListHead = function(e) {
      var t = '<div class="ds-comments-info"><div class="ds-sort"><a class="ds-order-desc">' + z.latest + '</a><a class="ds-order-asc">' + z.earliest + '</a><a class="ds-order-hot">' + z.hottest + '</a></div><ul class="ds-comments-tabs"><li class="ds-tab"><a class="ds-comments-tab-duoshuo ds-current" href="javascript:void(0);"></a></li>';
      return e.options.show_reposts && e.thread.reposts && (t += '<li class="ds-tab"><a class="ds-comments-tab-repost" href="javascript:void(0);"></a></li>'),
      t += " ",
      e.options.show_weibo && e.thread.weibo_reposts && (t += '<li class="ds-tab"><a class="ds-comments-tab-weibo" href="javascript:void(0);"></a></li>'),
      t += " ",
      e.options.show_qqt && e.thread.qqt_reposts && (t += '<li class="ds-tab"><a class="ds-comments-tab-qqt" href="javascript:void(0);"></a></li>'),
      t += "</ul></div>"
    },
    et.recentVisitors = function(e) {
      var t = "",
      s = e.response;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<div class="ds-avatar">' + et.avatar(a, e.options.avatar_size) + "</div>";
      return t
    },
    et.replybox = function(e) {
      var t = '<div class="ds-replybox"><a class="ds-avatar"';
      if (t += r() ? ' href="javascript:void(0);" onclick="return false"': ' href="' + S.REMOTE + "/settings/avatar/" + x(T()) + '" target="_blank" title="设置头像"', t += ">" + et.avatarImg(nt.data) + '</a><form method="post">' + tt(e.params) + '<div class="ds-textarea-wrapper ds-rounded-top"><textarea name="message" title="Ctrl+Enter快捷提交" placeholder="' + u(z.leave_a_message) + '"></textarea><pre class="ds-hidden-text"></pre>', t += "</div>", t += '<div class="ds-post-toolbar"><div class="ds-post-options ds-gradient-bg"><span class="ds-sync">', !r() && nt.data.repostOptions) {
        t += '<input id="ds-sync-checkbox',
        e.inline && (t += "-inline"),
        t += '" type="checkbox" name="repost" ',
        e.checked && (t += 'checked="checked" '),
        t += 'value="' + e.repostArray.join(",") + '"> <label for="ds-sync-checkbox',
        e.inline && (t += "-inline"),
        t += '">' + z.share_to + "</label>";
        for (var s in nt.data.repostOptions) t += et.serviceIcon(s, !nt.data.repostOptions[s])
      }
      return t += "</span>",
      t += "</div>",
      t += '<button class="ds-post-button" type="submit">' + u(z.post) + '</button><div class="ds-toolbar-buttons">',
      e.options.use_smilies && (t += '<a class="ds-toolbar-button ds-add-emote" title="插入表情"></a>'),
      e.options.use_images && e.options.parse_html_enabled && (t += '<a class="ds-toolbar-button ds-add-image" title="插入图片"></a>'),
      t += "</div></div>",
      t += "</form></div>"
    },
    et.serviceBindList = function(e) {
      var t = "",
      s = e;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<li><a href="' + Z.bindUrl(a) + '" rel="nofollow" class="ds-service-link ds-' + a + '">' + S.serviceNames[a],
      nt.data.social_uid[a] && (t += ' <span class="ds-icon ds-icon-ok"></span>'),
      t += "</a></li>";
      return t
    },
    et.serviceList = function(e) {
      var t = "",
      s = e;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<li><a href="' + Z.loginUrl(a) + '" rel="nofollow" class="ds-service-link ds-' + a + '">' + S.serviceNames[a] + "</a></li>";
      return t
    },
    et.shareWidget = function(e) {
      var t = '<div class="ds-share-icons"> <div class="ds-share-icons-inner"> <ul class="ds-share-icons-16"> ',
      s = e.services;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += ' <li> <a class="ds-' + a + '" href="javascript:void(0);" data-service="' + a + '">' + S.sourceName[a] + "</a> </li> ";
      return t += ' </ul> </div> <div class="ds-share-icons-footer">' + e.copyright + "</div></div>"
    },
    et.smiliesTooltip = function(e) {
      var t = '<div id="ds-smilies-tooltip"><ul class="ds-smilies-tabs">';
      for (var s in e) t += "<li><a>" + s + "</a></li>";
      return t += '</ul><div class="ds-smilies-container"></div></div>'
    },
    et.toolbar = function() {
      var e = '<div class="ds-toolbar"><div class="ds-account-control"><span class="ds-icon ds-icon-settings"></span> <span>帐号管理</span><ul><li><a class="ds-bind-more" href="javascript:void(0);" style="border-top: none">绑定更多</a></li><li><a target="_blank" href="' + S.REMOTE + "/settings/" + x(T()) + '">' + u(z.settings) + '</a></li><li><a rel="nofollow" href="' + Z.logoutUrl() + '" style="border-bottom: none">登出</a></li></ul></div><div class="ds-visitor">';
      return e += nt.data.url ? '<a class="ds-visitor-name" href="' + u(nt.data.url) + '" target="_blank">' + u(nt.data.name) + "</a>": '<span class="ds-visitor-name">' + u(nt.data.name) + "</span>",
      e += '<a class="ds-unread-comments-count" href="javascript:void(0);" title="新回复"></a></div></div>'
    },
    et.topThreads = function(e) {
      var t = "",
      s = e.response;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<li><a target="_blank" href="' + u(a.url) + '" title="' + u(a.title) + '">' + u(a.title) + "</a></li>";
      return t
    },
    et.topUsers = function(e) {
      var t = "",
      s = e.response;
      if (s) for (var a, i = -1,
      r = s.length - 1; r > i;) a = s[i += 1],
      t += '<div class="ds-avatar">' + et.avatar(a, e.options.avatar_size) + "<h4>" + u(a.name) + "</h4></div>";
      return t
    },
    et.userInfo = function(e) {
      var t = '<a href="' + u(e.url) + '" onclick="this.href=\'' + a() + "/user-url/?user_id=" + e.user_id + '\';" class="ds-avatar" target="_blank">' + et.avatarImg(e) + '</a><a href="' + u(e.url) + '" onclick="this.href=\'' + a() + "/user-url/?user_id=" + e.user_id + '\';" class="ds-user-name ds-highlight" target="_blank">' + u(e.name) + "</a>";
      for (var s in e.social_uid) t += '<a href="' + S.REMOTE + "/user-proxy/" + s + "/" + e.social_uid[s] + '/" target="_blank" class="ds-service-icon ds-' + s + '" title="' + S.sourceName[s] + '"></a>';
      return t += '<p class="ds-user-card-meta"><a href="' + S.REMOTE + "/profile/" + e.user_id + '/" target="_blank"><span class="ds-highlight">' + e.comments + "</span>条评论</a></p>",
      e.description && (t += '<p class="ds-user-description">' + u(e.description) + "</p>"),
      t
    };
    var st = S.Views = {},
    at = (S.Callbacks = {},
    S.pagelets = []),
    it = S.events = new J,
    rt = S.site = new V,
    nt = S.visitor = new $,
    ot = S.unread = new V,
    dt = S.threadPool = new Y(G),
    lt = S.postPool = new Y(F),
    ct = S.userPool = new Y($);
    it.on("queryDefined",
    function() {
      var e = c.short_name;
      if (c.theme && n(c.theme), m) {
        var t = m["ds_site_" + e],
        s = m["ds_lang_" + e];
        t && rt.reset(p.parse(t)),
        s && o.extend(z, p.parse(s))
      }
    }),
    q(),
    S.require("embed.compat",
    function() {
      function i(e) {
        e.stopPropagation()
      }
      function n(e) { (e.ctrlKey && 13 == e.which || 10 == e.which) && B(this.form).trigger("submit")
      }
      function d() {
        var e = B(this);
        e.height(Math.max(54, e.next(".ds-hidden-text").text(this.value).height() + 27))
      }
      function l() {
        if (P.authInWin) {
          var e = this.href.match(/\/(login|bind)\/(\w+)\//i);
          if (e && S.serviceNames[e[2]]) return ! b(e[2], this.href)
        }
      }
      function u() {
        var e, s, a, i, r, n = this,
        o = 0,
        d = 0;
        t.selection && (s = t.selection.createRange(), s && s.parentElement() == n && (i = n.value.length, e = n.value.replace(/\r\n/g, "\n"), a = n.createTextRange(), a.moveToBookmark(s.getBookmark()), r = n.createTextRange(), r.collapse(!1), a.compareEndPoints("StartToEnd", r) > -1 ? o = d = i: (o = -a.moveStart("character", -i), o += e.slice(0, o).split("\n").length - 1, a.compareEndPoints("EndToEnd", r) > -1 ? d = i: (d = -a.moveEnd("character", -i), d += e.slice(0, d).split("\n").length - 1)))),
        B(n).data("ds-range-start", o).data("ds-range-end", d)
      }
      function p(e) {
        return P.touch && e.addClass("ds-touch"),
        o.cssProperty("transition") || e.addClass("ds-no-transition"),
        P.ie6 && e.addClass("ds-ie6"),
        P.opacity || e.addClass("ds-no-opacity"),
        e
      }
      function f(e) {
        if (!P.placeholder) {
          var t = e.attr("placeholder");
          e.val(t).focus(function() {
            this.value === t && (this.value = "")
          }).blur(function() {
            "" === this.value && (this.value = t)
          })
        }
        return e
      }
      function g(e) {
        if ("http://duoshuo.com" === e.origin) switch (e.data.type) {
        case "login":
          h.href = e.data.redirectUrl
        }
      }
      function b(t, s) {
        var a = {
          weibo: [760, 600],
          renren: [420, 322],
          qq: [504, 445],
          netease: [810, 645],
          sohu: [972, 600],
          google: [600, 440],
          taobao: [480, 585]
        } [t] || [550, 400];
        return e.open(s + ( - 1 == s.indexOf("?") ? "?": "&") + o.param({
          origin: h.origin || "http://" + h.host
        }), "_blank", "width=" + a[0] + ",height=" + a[1] + ",toolbar=no,menubar=no,location=yes")
      }
      function y(e) {
        var t = Z[r() ? "loginUrl": "bindUrl"](e);
        P.authInWin && b(e, t) || (h.href = t)
      }
      function w() {
        var e = E(et["dialog-ask-for-auth"]({})).el.find(".ds-dialog").css("width", "300px");
        e.find("a.ds-service-link").click(l)
      }
      function x(e, t, s, a) {
        function i() {
          function e(e) {
            if (s && a) {
              var t = s.options,
              i = U(s.postList.el, e.response[a], t);
              "asc" == t.order == ("top" == t.formPosition) && S.scrollTo(i);
              var r = s.el.find(".ds-comments-tab-" + a + " span.ds-highlight");
              r.html(parseInt(r.html()) + 1)
            }
          }
          return a || l.find("[type=checkbox]:checked")[0] ? (M.post("posts/repost", S.toJSON(l), e), o.close(), !1) : (alert("还没有选发布到哪儿呢"), !1)
        }
        function r() {
          var e = this.value;
          return this.checked && !nt.data.social_uid["qqt" == e ? "qq": e] ? void y(e) : void 0
        }
        var o = E(et["dialog-reposts"]({
          post: e.toJSON(),
          repostMessage: t,
          service: a
        })),
        l = o.el.find("form");
        return l.submit(i),
        l.find(".ds-actions [type=checkbox]").change(r),
        f(l.find("textarea")).keyup(n).keyup(d).focus(),
        !1
      }
      function T(e) {
        var t = {
          "unread-comments": {
            title: "新留言及回复",
            apiUrl: "users/unreadComments",
            tmpl: function(e) {
              return e.thread ? '<li data-thread-id="' + e.thread.thread_id + '">' + B.map(e.authors, et.userAnchor).join("、") + ' 在 <a class="ds-read" href="' + e.thread.url + '#comments" target="_blank">' + _(e.thread.title || "无标题") + '</a> 中回复了你 <a class="ds-delete ds-read" title="知道了" href="javascript:void(0)">知道了</a></li>': ""
            },
            read: function(e) {
              var t = e.attr("data-thread-id");
              M.post("threads/read", {
                thread_id: t
              }),
              ot.data.comments--
            }
          },
          "unread-notifications": {
            title: "系统消息",
            apiUrl: "users/unreadNotifications",
            tmpl: function(e) {
              return '<li data-notification-id="' + e.notification_id + '" data-notification-type="' + e.type + '">' + e.content + ' <a class="ds-delete ds-read" title="知道了" href="javascript:void(0)">知道了</a></li>'
            },
            read: function(e) {
              var t = e.attr("data-notification-id");
              M.post("notifications/read", {
                notification_id: t
              }),
              ot.data.notifications--
            }
          }
        } [e],
        s = E("<h2>" + t.title + '</h2><ul class="ds-unread-list"></ul>');
        s.on("close", S.resetNotify);
        var a = s.el.find(".ds-unread-list").delegate(".ds-delete", "click",
        function() {
          return B(this).parent().remove(),
          0 === a.children().length && s.close(),
          !1
        }).delegate(".ds-read", "click",
        function() {
          t.read(B(this).parent())
        });
        B("#ds-notify").hide(),
        M.get(t.apiUrl, {},
        function(e) {
          s.el.find(".ds-unread-list").html(B.map(e.response, t.tmpl).join("\n"))
        })
      }
      function L() {
        bubbleOutTimer && (clearTimeout(bubbleOutTimer), bubbleOutTimer = 0)
      }
      function I() {
        bubbleOutTimer = setTimeout(function() {
          bubbleOutTimer = 0,
          X.detach()
        },
        400)
      }
      function U(e, t, s) {
        return e.find(".ds-post[data-post-id=" + t.data.post_id + "]")[0] ? void 0 : (e.find(".ds-post-placeholder").remove(), B(et.post({
          post: t.toJSON(),
          options: s
        })).hide()["asc" == s.order ? "appendTo": "prependTo"](e).slideDown(function() {}))
      }
      function R(e, t) {
        function s() {
          if (r()) return w(),
          !1;
          var e = B(this).parent(),
          t = e.hasClass("ds-post-liked"),
          s = B(this).html().match(/\((\d+)\)/),
          a = (s ? parseInt(s[1]) : 0) + (t ? -1 : 1);
          return M.post("posts/vote", {
            post_id: e.closest(".ds-ctx-entry, .ds-post-self").attr("data-post-id"),
            vote: t ? 0 : 1
          }),
          B(this).html(B(this).html().replace(/\(\d+\)/, "") + (a ? "(" + a + ")": "")),
          e[t ? "removeClass": "addClass"]("ds-post-liked"),
          !1
        }
        function a() {
          var e = B(this).closest(".ds-post-self"),
          t = lt[e.attr("data-post-id")];
          return x(t, ""),
          !1
        }
        function i() {
          if (!confirm("确定要删除这条评论吗？")) return ! 1;
          var t = B(this).closest(".ds-post-self");
          return M.post("posts/remove", {
            post_id: t.attr("data-post-id")
          }),
          t.parent().fadeOut(200,
          function() {
            e.data.comments--,
            e.updateCounter("duoshuo"),
            B(this).remove()
          }),
          !1
        }
        function n() {
          if (!confirm("确定要举报这条评论吗？")) return ! 1;
          var e = B(this).closest(".ds-post-self");
          return M.post("posts/report", {
            post_id: e.attr("data-post-id")
          }),
          alert("感谢您的反馈！"),
          !1
        }
        function o() {
          var s = B(this),
          a = s.closest(".ds-comment-actions");
          if (a.hasClass("ds-reply-active")) h.el.fadeOut(200,
          function() {
            B(this).detach()
          }),
          a.removeClass("ds-reply-active");
          else {
            var i = s.closest(".ds-ctx-entry, .ds-post-self");
            h ? h.actionsBar.removeClass("ds-reply-active") : (h = new st.Replybox(e), h.render(!0).el.addClass("ds-inline-replybox").detach()),
            h.el.find("[name=parent_id]").val(i.attr("data-post-id")),
            h.el.show().appendTo(s.closest(".ds-ctx-body, .ds-comment-body")).find("textarea").focus(),
            h.actionsBar = a.addClass("ds-reply-active"),
            t.max_depth <= 1 ? h.postList = e.postList.el: (h.postList = i.siblings(".ds-children"), h.postList[0] || (h.postList = B('<ul class="ds-children"></ul>').insertAfter(i)))
          }
          return ! 1
        }
        function d() {
          function e(e) {
            W(e),
            i.append(B.map(e.response,
            function(e) {
              return et.post({
                post: e,
                options: t
              })
            }).join(""))
          } {
            var s = B(this).closest(".ds-post-self"),
            a = s.attr("data-post-id");
            s.data("source")
          }
          if (0 != s.attr("data-root-id")) return ! 1;
          var i = s.siblings(".ds-children");
          return i[0] ? (i.remove(), !1) : (i = B('<ul class="ds-children"></ul>').insertAfter(s), M.get("posts/listComments", H({
            post_id: a
          }), e), !1)
        }
        function l() {
          var t = B(this).closest(".ds-post-self"),
          s = lt[t.attr("data-post-id")],
          a = s.data.source;
          if (!nt.data.social_uid["qqt" == a ? "qq": a]) return void y(a);
          var i = s.data.root_id,
          r = "0" != i ? lt[i] : s,
          n = "";
          if ("0" != i) {
            var o = prepatePost(s.data).theAuthor;
            n = ("weibo" == a ? "//@" + o.name: "|| @" + o.qqt_account) + ":" + s.data.message
          }
          return x(r, n, e, a),
          !1
        }
        function c() {
          var e = B(this).parent();
          return e.siblings().show(),
          e.remove(),
          !1
        }
        function u() {
          function t() {
            function t(e) {
              var t = e.response;
              ct[c] ? ct[c].set(t) : ct[c] = new $(t),
              X.owner == s && K.html(et.userInfo(t))
            }
            tt = 0,
            X.owner = s,
            L();
            var i = a.offset(),
            r = e.el.offset(),
            n = a.innerWidth() / 2,
            o = e.el.innerHeight() - (i.top - r.top) + 6,
            d = i.left - r.left - 35 + (n > 35 ? 35 : n);
            try {
              if (a.hasClass("ds-comment-context")) K.attr("id", "ds-ctx-bubble").attr("data-post-id", a.attr("data-post-id")).html('<ul id="ds-ctx">' + et.ctxPost({
                post: lt[a.attr("data-parent-id")].toJSON()
              }) + '</ul><div class="ds-bubble-footer"><a class="ds-ctx-open" href="javascript:void(0);">查看对话</a></div>');
              else if (a.hasClass("ds-avatar") || a.hasClass("ds-user-name")) {
                var l = {},
                c = l.user_id = a.attr("data-user-id");
                if (!c) throw "no info";
                K.attr("id", "ds-user-card").attr("data-user-id", c).empty(),
                ct[c] ? K.html(et.userInfo(ct[c].data)) : M.get("users/profile", H(l), t)
              }
              X.css({
                bottom: o,
                left: d
              }).appendTo(e.innerEl)
            } catch(u) {
              X.detach()
            }
          }
          var s = this;
          if (bubbleOutTimer && X.owner == s) return clearTimeout(bubbleOutTimer),
          void(bubbleOutTimer = 0);
          var a = B(s);
          tt = setTimeout(t, 200)
        }
        function p() {
          tt ? (clearTimeout(tt), tt = 0) : bubbleOutTimer || I()
        }
        var h;
        this.delegate("a.ds-post-likes", "click", s).delegate("a.ds-post-repost", "click", a).delegate("a.ds-post-delete", "click", i).delegate("a.ds-post-report", "click", n).delegate("a.ds-post-reply", "click", o).delegate("a.ds-weibo-comments", "click", d).delegate("a.ds-weibo-reposts", "click", l).delegate("a.ds-expand", "click", c),
        P.touch || this.delegate("a.ds-comment-context, .ds-avatar, .ds-user-name", "mouseenter", u).delegate("a.ds-comment-context, .ds-avatar, .ds-user-name", "mouseleave", p)
      }
      function H(e) {
        var s = {
          require: "site,visitor,nonce,lang" + (it++?"": ",unread,log,extraCss"),
          site_ims: D.get("ds_site_" + c.short_name + ":timestamp"),
          lang_ims: D.get("ds_lang_" + c.short_name + ":timestamp"),
          referer: t.referrer
        };
        c.stylePatch && (s.style_patch = c.stylePatch);
        for (var a in s) s[a] && (!P.ie6 || encodeURIComponent(s[a]).length < 200) && (e[a] = s[a]);
        return e
      }
      var B = S.jQuery,
      V = B(e),
      Y = B(t);
      e.postMessage && (e.addEventListener ? e.addEventListener("message", g, !1) : e.attachEvent && e.attachEvent("onmessage", g)),
      S.scrollTo = function(e) {
        var t = e.offset().top; (t < V.scrollTop() || t > V.scrollTop() + V.height()) && B("html, body").animate({
          scrollTop: t - 40
        },
        200, "swing")
      },
      S.toJSON = function(e) {
        var t = /\r?\n/g,
        s = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        a = /^(?:select|textarea)/i,
        i = e.map(function() {
          return this.elements ? B.makeArray(this.elements) : this
        }).filter(function() {
          return this.name && !this.disabled && (this.checked || a.test(this.nodeName) || s.test(this.type))
        }).map(function(e, s) {
          var a = B(this).val();
          return null == a ? null: B.isArray(a) ? B.map(a,
          function(e) {
            return {
              name: s.name,
              value: e.replace(t, "\r\n")
            }
          }) : {
            name: s.name,
            value: a.replace(t, "\r\n")
          }
        }).toArray(),
        r = {};
        return B.each(i,
        function() {
          r[this.name] = this.value
        }),
        r
      },
      S.resetNotify = function() {
        var e = B("#ds-notify"),
        s = ot.data;
        e[0] || (e = B('<div id="ds-notify"></div>').css({
          hidden: {
            display: "none"
          },
          "top-right": {
            top: "24px",
            right: "24px"
          },
          "bottom-right": {
            bottom: "24px",
            right: "24px"
          }
        } [rt.data.notify_position]).delegate(".ds-notify-unread a", "click",
        function() {
          return T(B(this).data("type")),
          !1
        }).appendTo(t.body)),
        e.html(et.notify(s))[!s.comments && !s.notifications || "hidden" === rt.data.notify_position || B(".ds-dialog")[0] ? "hide": "show"]()
      },
      ot.on("reset", S.resetNotify),
      st.Replybox = function(e) {
        this.embedThread = e
      },
      st.Replybox.prototype = {
        render: function(e) {
          function s(e) {
            e.data("submitting", !0),
            e.find(".ds-post-button").addClass("ds-waiting").html(z.posting)[0].disabled = !0
          }
          function a(e) {
            e.data("submitting", !1),
            e.find(".ds-post-button").removeClass("ds-waiting").html(z.post)[0].disabled = !1
          }
          var i = this,
          o = i.embedThread,
          c = o.options,
          p = function() {
            S.require("smilies",
            function() {})
          },
          h = {
            thread: o,
            options: c,
            inline: e,
            params: {
              thread_id: o.threadId,
              parent_id: "",
              nonce: S.nonce
            },
            repostArray: [],
            checked: 0
          };
          for (var v in nt.data.repostOptions) nt.data.repostOptions[v] && (h.repostArray.push(v), h.checked = 1);
          var g = i.el = B(et.replybox(h)).click(p),
          b = g.find("form"),
          y = b.find("input[type=checkbox]")[0],
          _ = b.find("a.ds-service-icon, a.ds-service-icon-grey"),
          k = f(b.find("textarea")).focus(p).keyup(n).keyup(d).bind("focus mousedown mouseup keyup", u),
          w = g.find(".ds-add-emote").click(function(e) {
            var s = S.smiliesTooltip;
            return w.toggleClass("ds-expanded").hasClass("ds-expanded") ? (s || (s = S.smiliesTooltip = new st.SmiliesTooltip, s.render(), S.require("smilies",
            function() {
              s.reset("微博-默认")
            })), s.replybox = i, s.el.appendTo(t.body).css({
              top: i.el.offset().top + i.el.outerHeight() + 4 + "px",
              left: i.el.find(".ds-textarea-wrapper").offset().left + "px"
            }), B(t.body).click(x)) : x(e),
            !1
          }),
          x = (g.find(".ds-add-image").click(function(e) {
            var s = k[0],
            a = s.value,
            i = "请输入图片地址",
            r = '<img src="' + i + '" />';
            if (t.selection) {
              s.value = a.substring(0, k.data("ds-range-start")) + r + a.substring(k.data("ds-range-end"), a.length),
              s.value = s.value.replace("说点什么吧 ...", ""),
              s.focus();
              var n = t.selection.createRange();
              n.collapse(),
              n.findText(i),
              n.select()
            } else {
              s.value = a.substring(0, s.selectionStart) + r + a.substring(s.selectionEnd);
              var o = s.value.search(i);
              s.setSelectionRange(o, o + i.length),
              s.focus()
            }
            e.preventDefault()
          }), i.hideSmilies = function() {
            w.removeClass("ds-expanded"),
            S.smiliesTooltip.el.detach(),
            B(t.body).unbind("click", x)
          }),
          T = function(e, t) {
            var s = E(et["dialog-anonymous"]({
              services: ["weibo", "qq", "renren", "kaixin", "douban", "netease", "sohu"],
              options: c
            })),
            a = s.el.find(".ds-dialog").css("width", "320px");
            if (a.find(".ds-icons-32 a").click(l), !c.deny_anonymous) {
              var i = s.el.find("form");
              i.submit(function() {
                var e = i.find("input[name=author_email]").val();
                return ! e && !c.require_guest_email || e.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? (t(S.toJSON(i)), s.close(), !1) : (alert("请输入一个有效的email地址."), !1)
              }),
              i.find("input[name=author_name]")[0].focus()
            }
          };
          c.deny_anonymous && k.focus(function() {
            if (r()) {
              T(b, q);
              var e = function(t) {
                t.stopPropagation(),
                k.unbind("click", e)
              };
              k.click(e)
            }
            return ! 1
          });
          var q = function(e) {
            s(b),
            M.post("posts/create", B.extend(S.toJSON(b), e),
            function(e) {
              var t = lt[e.response.post_id] = new F(e.response),
              s = U(i.postList, t, c);
              if ("asc" == c.order == ("top" == c.formPosition) && S.scrollTo(s), o.data.comments++, o.updateCounter("duoshuo"), k.val("").trigger("keyup"), a(b), g.hasClass("ds-inline-replybox") && (g.detach(), i.actionsBar.removeClass("ds-reply-active")), m) try {
                m.removeItem("ds_draft_" + o.threadId)
              } catch(r) {}
            },
            function(e) {
              a(b),
              alert(e.errorMessage)
            })
          };
          b.submit(function() {
            if (b.data("submitting")) return ! 1;
            var e = B.trim(b[0].message.value);
            return "" == e || !P.placeholder && e == k.attr("placeholder") ? (alert("您还没写内容呢"), !1) : (r() ? T(b, q) : q(), !1)
          });
          var C = function(e) {
            return B(e).hasClass("ds-service-icon-grey") ? null: B(e).attr("data-service")
          };
          if (_.click(function() {
            return B(this).toggleClass("ds-service-icon-grey").toggleClass("ds-service-icon"),
            y.value = B.map(_, C).join(","),
            y.checked = "" != y.value,
            !1
          }), B(y).change(function() {
            var e = this.checked;
            _[e ? "removeClass": "addClass"]("ds-service-icon-grey")[e ? "addClass": "removeClass"]("ds-service-icon"),
            this.value = B.map(_, C).join(",")
          }), !e && m) {
            var j = "ds_draft_" + o.threadId;
            k.bind("focus blur keyup",
            function(e) {
              var t = B(e.currentTarget).val();
              try {
                m[j] = t
              } catch(e) {}
            }),
            m[j] && k.val(m[j])
          }
          return this
        }
      },
      st.Dialog = J.extend({
        init: function(e, t) { (this.el = B("#ds-wrapper"))[0] || (this.el = p(B('<div id="ds-wrapper"></div>'))),
          this.options = B.extend({
            width: 600
          },
          t),
          e !== s && B(e).attr("id", "ds-reset").appendTo(this.el)
        },
        open: function() {
          function e(e) {
            return 27 == e.which ? (a.close(), !1) : void 0
          }
          function s() {
            return a.close(),
            !1
          }
          var a = this;
          return a.el.hide().appendTo(t.body).fadeIn(200),
          P.ie6 && a.el.css("top", V.scrollTop() + 100),
          a.el.show().find(".ds-dialog").delegate("a.ds-dialog-close", "click",
          function() {
            return a.close(),
            !1
          }).click(i),
          Y.keydown(e),
          B(t.body).click(s),
          a.close = function() {
            Y.unbind("keydown", e),
            B(t.body).unbind("click", s),
            a.el.fadeOut(200,
            function() {
              B(this).remove()
            }),
            a.trigger("close")
          },
          a
        }
      }),
      et.likePanel = function(e) {
        return e.likes ? '<span class="ds-highlight">' + e.likes + "</span> 人喜欢": ""
      },
      st.Meta = function(e) {
        this.embedThread = e
      },
      st.Meta.prototype = {
        render: function() {
          function a(a) {
            function r(e) {
              o.set(e),
              n.resetLikePanel()
            }
            function c() {
              n.tooltip.detach(),
              B(t.body).unbind("click", c)
            }
            function u(t) {
              switch (this.className) {
              case "ds-like-tooltip-close":
                c(t);
                break;
              default:
                if (!e.open(this.href, "_blank", "height=500,width=600,top=0,left=0,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")) return
              }
              return ! 1
            }
            var p = l.hasClass("ds-thread-liked");
            if (M.post("threads/vote", {
              thread_id: n.embedThread.threadId,
              vote: p ? 0 : 1
            },
            r), l.toggleClass("ds-thread-liked"), l.find(".ds-thread-like-text").text(p ? "喜欢": "已喜欢"), p) return n.tooltip && c(a),
            !1;
            if (n.tooltip === s) {
              var h = et.likeTooltip({
                services: {
                  qzone: "QQ空间",
                  weibo: "新浪微博",
                  qqt: "腾讯微博",
                  renren: "人人网",
                  kaixin: "开心网",
                  douban: "豆瓣网",
                  baidu: "百度搜藏",
                  netease: "网易微博",
                  sohu: "搜狐微博"
                },
                thread_id: o.data.thread_id
              });
              n.tooltip = B(h).click(i).delegate("a", "click", u)
            }
            var f = {};
            return f.left = 0,
            f.top = d.position().top + d.outerHeight() - 4 + "px",
            n.tooltip.appendTo(n.embedThread.innerEl).css(f),
            B(t.body).click(c),
            !1
          }
          var n = this,
          o = n.embedThread.model,
          d = n.el = B(et.meta(o.toJSON())),
          l = d.find(".ds-like-thread-button");
          return l.click(a),
          n.resetLikePanel(),
          r() && d.hide(),
          n
        },
        resetLikePanel: function() {
          this.el.find(".ds-like-panel").html(et.likePanel(this.embedThread.model.toJSON()))
        }
      },
      st.PostListHead = function(e) {
        this.embedThread = e
      },
      st.PostListHead.prototype = {
        render: function() {
          function e(e) {
            r.find("a.ds-current").removeClass("ds-current"),
            a.params.page = 1;
            var t = e.currentTarget;
            switch (t.className) {
            case "ds-comments-tab-duoshuo":
              a.params.source = "duoshuo",
              s.replybox.el.show();
              break;
            case "ds-comments-tab-repost":
              a.params.source = "repost",
              s.replybox.el.hide();
              break;
            case "ds-comments-tab-weibo":
              a.params.source = "weibo",
              s.replybox.el.hide();
              break;
            case "ds-comments-tab-qqt":
              a.params.source = "qqt",
              s.replybox.el.hide()
            }
            return B(t).addClass("ds-current"),
            a.refetch(),
            !1
          }
          function t() {
            return n.find("a.ds-current").removeClass("ds-current"),
            a.params.order = s.options.order = this.className.replace("ds-order-", ""),
            a.params.page = 1,
            a.refetch(),
            B(this).addClass("ds-current"),
            !1
          }
          var s = this.embedThread,
          a = s.postList,
          i = this.el = B(et.postListHead({
            thread: s.model.toJSON(),
            options: s.options
          })),
          r = i.find("ul.ds-comments-tabs");
          r.delegate(".ds-tab a", "click", e);
          var n = i.find(".ds-sort");
          return n.delegate("a", "click", t),
          n.find(".ds-order-" + a.params.order).addClass("ds-current"),
          this
        }
      },
      st.Paginator = function(e) {
        function t() {
          return i.params.page = parseInt(this.innerHTML),
          i.refetch(),
          a.find(".ds-current").removeClass("ds-current"),
          B(this).addClass("ds-current"),
          !1
        }
        e = e || {};
        var s = this,
        a = s.el = e.el || B('<div class="ds-paginator"></div>'),
        i = s.collection = e.collection;
        a.delegate("a", "click", t)
      },
      st.Paginator.prototype = {
        reset: function(e) {
          function t(e) {
            i.push('<a data-page="' + e + '" href="javascript:void(0);">' + e + "</a>")
          }
          var s, a = this.collection.params.page || 1,
          i = [];
          if (a > 1) for (t(1), s = a > 4 ? a - 2 : 2, s > 2 && i.push('<span class="page-break">...</span>'); a > s; s++) t(s);
          if (i.push('<a data-page="' + a + '" href="javascript:void(0);" class="ds-current">' + a + "</a>"), a < e.pages) {
            for (s = a + 1; a + 4 >= s && s < e.pages; s++) t(s);
            s < e.pages && i.push('<span class="page-break">...</span>'),
            t(e.pages)
          }
          this.el.html('<div class="ds-border"></div>' + i.join(" "))[e.pages > 1 ? "show": "hide"]()
        }
      },
      S.addSmilies = function(e, t) {
        var s = S.smiliesTooltip;
        s && s.el.find("ul.ds-smilies-tabs").append("<li><a>" + e + "</a></li>"),
        S.smilies[e] = t
      },
      st.SmiliesTooltip = function() {},
      st.SmiliesTooltip.prototype = {
        render: function() {
          function e() {
            var e = s.replybox,
            a = e.el.find("textarea"),
            i = a[0],
            r = i.value;
            if (t.selection) {
              i.value = r.substring(0, a.data("ds-range-start")) + this.title + r.substring(a.data("ds-range-end"), r.length),
              i.value = i.value.replace(z.leave_a_message, ""),
              i.focus();
              var n = t.selection.createRange();
              n.moveStart("character", a.data("ds-range-start") + this.title.length),
              n.collapse(),
              n.select()
            } else {
              var o = i.selectionStart + this.title.length;
              i.value = r.substring(0, i.selectionStart) + this.title + r.substring(i.selectionEnd),
              i.setSelectionRange(o, o)
            }
            e.hideSmilies(),
            i.focus()
          }
          var s = this,
          a = s.el = B(et.smiliesTooltip(N));
          return a.click(i).find("ul.ds-smilies-tabs").delegate("a", "click",
          function() {
            s.reset(this.innerHTML)
          }),
          a.find(".ds-smilies-container").delegate("img", "click", e),
          this
        },
        reset: function(e) {
          function t(t, s) {
            var i = 0 === e.indexOf("微博") ? "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/" + s.replace("_org", "_thumb") : S.STATIC_URL + "/images/smilies/" + s;
            "WordPress" === e && (t = " " + t + " "),
            a += '<li><img src="' + i + '" title="' + _(t) + '" /></li>'
          }
          var s = this.el.find("ul.ds-smilies-tabs");
          s.find("a.ds-current").removeClass("ds-current"),
          s.find("a").filter(function() {
            return this.innerHTML == e
          }).addClass("ds-current");
          var a = "<ul>";
          return B.each(N[e], t),
          a += "</ul>",
          this.el.find(".ds-smilies-container").html(a),
          this
        }
      },
      et.postPlaceholder = function() {
        return ['<li class="ds-post ds-post-placeholder">', z.no_comments_yet, "</li>"].join("")
      };
      var X = B('<div id="ds-bubble"><div class="ds-bubble-content"></div><div class="ds-arrow ds-arrow-down ds-arrow-border"></div><div class="ds-arrow ds-arrow-down"></div></div>'),
      K = X.find(".ds-bubble-content").delegate("a.ds-ctx-open", "click",
      function() {
        function e(e) {
          function t(e, t) {
            return et.ctxPost({
              post: e,
              index: t
            })
          }
          C.log(B.map(e.response, t).join("\n"));
          s.el.find("ol");
          s.el.find("ol").html(B.map(e.response, t).join("\n"))
        }
        var t = {};
        t.post_id = K.attr("data-post-id"),
        M.get("posts/conversation", t, e);
        var s = E('<h2>查看对话</h2><ol id="ds-ctx"></ol>');
        return s.el.find(".ds-dialog").css("width", "600px"),
        s.el.find(".ds-dialog-body").css({
          "max-height": "350px",
          _height: "350px",
          "overflow-y": "auto",
          "padding-top": "10px"
        }),
        !1
      }),
      tt = bubbleOutTimer = 0;
      X.mouseenter(L).mouseleave(I),
      st.PostList = function(e) {
        e && (e.params && (this.params = e.params), e.embedThread && (this.embedThread = e.embedThread)),
        this.el = B('<ul class="ds-comments"></ul>')
      },
      st.PostList.prototype = {
        url: "threads/listPosts",
        render: function() {
          return R.call(this.el, this.embedThread, this.embedThread.options),
          this
        },
        reset: function(e) {
          var t = this.embedThread.options;
          this.el.html(e[0] ? B.map(lt.getJSON(e),
          function(e) {
            return et.post({
              post: e,
              options: t
            })
          }).join("") : et.postPlaceholder())
        },
        refetch: function() {
          function e(e) {
            lt.set(e.parentPosts || e.relatedPosts),
            ct.set(e.users),
            s.reset(e.response),
            s.embedThread.paginator.reset(e.cursor),
            s.el.fadeTo(200, 1),
            S.scrollTo(s.el),
            a.remove()
          }
          var s = this,
          a = B(et.indicator()).appendTo(t.body).fadeIn(200);
          s.el.fadeTo(200, .5),
          M.get(s.url, s.params, e)
        }
      },
      st.EmbedThread = Q.extend({
        uri: "threads/listPosts",
        params: "thread-id local-thread-id source-thread-id thread-key category channel-key author-key author-id url limit order max-depth form-position container-url" + (v.match(/MSIE 6\.0/) ? "": " title image thumbnail"),
        render: function() {
          var e = this.el;
          if ("请将此处替换成文章在你的站点中的ID" === e.data("thread-key")) return alert("请设置正确的 data-thread-key 属性"),
          !1;
          e.attr("id", "ds-thread").append(et.waitingImg());
          var t = e.width(),
          s = e.data("url") || !e.attr("data-thread-id") && B("link[rel=canonical]").attr("href");
          s ? e.data("url", k(s)) : e.data("container-url", h.href),
          t && 400 >= t && e.addClass("ds-narrow").data("max-depth", 1)
        },
        updateCounter: function(e) {
          function t(e) {
            return e.substr(e.indexOf("}") + 1)
          }
          var s = {
            duoshuo: ["comments", t(z.comments_multiple) || "评论"],
            repost: ["reposts", t(z.reposts_multiple) || "转载"],
            weibo: ["weibo_reposts", t(z.weibo_reposts_multiple) || "新浪微博"],
            qqt: ["qqt_reposts", t(z.qqt_reposts_multiple) || "腾讯微博"]
          };
          for (var a in s) if (!e || e == a) {
            var i = this.data[s[a][0]];
            this.el.find(".ds-comments-tab-" + a).html(this.el.hasClass("ds-narrow") ? '<span class="ds-service-icon ds-' + a + '"></span>' + i: (i ? '<span class="ds-highlight">' + i + "</span>": "0") + s[a][1])
          }
        },
        onError: function(e) {
          this.el.html("评论框出错啦(" + e.code + "): " + e.errorMessage)
        },
        onload: function(t) {
          var a = this,
          i = a.threadId = t.thread.thread_id,
          n = t.cursor,
          o = a.options = t.options,
          d = a.innerEl = p(B('<div id="ds-reset"></div>').appendTo(a.el));
          a.model = new G(a.data = t.thread),
          lt.set(t.parentPosts || t.relatedPosts),
          ct.set(t.users),
          a.el.find("#ds-waiting").remove(),
          o.like_thread_enabled && (a.meta = new st.Meta(a), d.append(a.meta.render().el)),
          o.hot_posts && t.hotPosts && t.hotPosts.length && (a.hotPosts = new st.HotPosts(B('<div class="ds-rounded"></div>'), {
            max_depth: 1,
            show_context: o.show_context
          }), a.hotPosts.thread = a, d.append(a.hotPosts.el), a.hotPosts.onload({
            list: lt.getJSON(t.hotPosts)
          })),
          a.postListHead = new st.PostListHead(a),
          a.postList = new st.PostList({
            embedThread: a,
            params: {
              source: "duoshuo",
              thread_id: i,
              max_depth: o.max_depth,
              order: o.order,
              limit: o.limit
            }
          }),
          a.postList.render().reset(t.response),
          a.paginator = new st.Paginator({
            collection: a.postList
          }),
          a.paginator.reset(n);
          var c = a.replybox = new st.Replybox(a);
          c.postList = a.postList.el,
          r() ? a.loginButtons = B(et.loginButtons()).delegate("a.ds-more-services", "click",
          function() {
            return a.loginButtons.find(".ds-additional-services").toggle(),
            !1
          }).delegate("a.ds-service-link", "click", l) : a.toolbar = B(et.toolbar()).delegate(".ds-account-control", "mouseenter",
          function() {
            B(this).addClass("ds-active")
          }).delegate(".ds-account-control", "mouseleave",
          function() {
            B(this).removeClass("ds-active")
          }).delegate("a.ds-bind-more", "click",
          function() {
            var e = E(et["dialog-bind-more"]()).el.find(".ds-dialog").addClass("ds-dialog-bind-more").css("width", "300px");
            return e.find("a.ds-service-link").click(l),
            !1
          }).delegate("a.ds-unread-comments-count", "click",
          function() {
            return T("unread-comments"),
            !1
          });
          var u = ['<a name="respond"></a>', a.toolbar || a.loginButtons, c.render().el];
          "top" == o.formPosition && B.fn.append.apply(d, u),
          d.append(a.postListHead.render().el, a.postList.el, a.paginator.el),
          "bottom" == o.formPosition && B.fn.append.apply(d, u),
          d.append(et.poweredBy(o.poweredby_text)),
          a.updateCounter(),
          t.alerts && B.each(t.alerts,
          function(e, t) {
            B('<div class="ds-alert">' + t + "</div>").insertBefore(a.toolbar || loginButtons)
          }),
          o.message && c.el.find("textarea").val(o.message).focus(),
          ot.on("reset",
          function() {
            var e = ot.data.comments || 0;
            d.find("a.ds-unread-comments-count").html(e).attr("title", e ? "你有" + e + "条新回复": "你没有新回复").css("display", e ? "inline": "none")
          }),
          o.mzadx_id && (S.require("mzadxN",
          function() {}), B('<div id="MZADX_' + o.mzadx_id + '" style="margin:0 auto;"></div>').appendTo(d), __mz_rpq = e.__mz_rpq || [], __mz_rpq.push({
            l: [o.mzadx_id],
            r: "1",
            _srv: "MZADX",
            _callback: function() {}
          })),
          S.thread = a,
          ot.data !== s && ot.trigger("reset"),
          r() || A.send({
            visit_thread_id: a.threadId
          })
        },
        onMessage: function(e) {
          U(this.postList.el, new F(e), this.options)
        }
      }),
      st.HotPosts = Q.extend({
        tmpl: "hotPosts",
        params: "show-quote",
        render: function() {
          return this.el.attr("id", "ds-hot-posts"),
          this
        },
        onload: function(e) {
          e.options = B.extend(this.options, e.options),
          Q.prototype.onload.call(this, e),
          R.call(this.el.find("ul"), this.thread, this.options)
        }
      }),
      st.RecentComments = Q.extend({
        tmpl: "commentList",
        uri: "sites/listRecentPosts",
        params: "show-avatars show-time show-title avatar-size show-admin excerpt-length num-items channel-key",
        render: function() {
          this.el.attr("id", "ds-recent-comments")
        },
        prepare: function(e) {
          return {
            list: B.map(e.response,
            function(e) {
              return new F(e).toJSON()
            })
          }
        }
      }),
      st.RecentVisitors = Q.extend({
        tmpl: "recentVisitors",
        uri: "sites/listVisitors",
        params: "show-time avatar-size num-items channel-key",
        render: function() {
          this.el.children().detach(),
          this.el.attr("id", "ds-recent-visitors").append(this.waitingEl = B(et.waitingImg()))
        }
      }),
      st.TopThreads = Q.extend({
        tmpl: "topThreads",
        uri: "sites/listTopThreads",
        params: "range num-items channel-key",
        render: function() {
          this.el.children().detach(),
          this.el.attr("id", "ds-top-threads").append(this.waitingEl = B(et.waitingImg()))
        }
      }),
      st.LoginWidget = Q.extend({
        tmpl: "loginWidget",
        render: function() {
          var e = this.el;
          e.attr("id", "ds-login").html(et.loginWidget(["weibo", "qq", "renren", "kaixin", "douban", "netease", "sohu"])),
          e.find("a").click(l),
          e.find("a.ds-logout").attr("href", Z.logoutUrl())
        }
      }),
      st.ThreadCount = Q.extend({
        onload: function(e) {
          var t = this.el,
          s = t.data("count-type") || "comments",
          a = e.data[s];
          t[t.data("replace") ? "replaceWith": "html"](z[s + "_" + (a ? a > 1 ? "multiple": "one": "zero")].replace("{num}", a))
        }
      }),
      st.ShareWidget = Q.extend({
        tmpl: "shareWidget",
        render: function() {
          var e = {
            copyright: "多说分享插件",
            services: ["weibo", "qzone", "sohu", "renren", "netease", "qqt", "kaixin", "douban", "qq", "meilishuo", "mogujie", "baidu", "taobao", "google", "wechat", "diandian", "huaban", "duitang", "youdao", "pengyou", "facebook", "twitter", "linkedin", "msn"]
          };
          this.el.attr("id", "ds-share"),
          this.el.children().attr("id", "ds-reset"),
          this.el.find(".ds-share-aside-inner").html(et.shareWidget(e)),
          this.el.find(".ds-share-icons-more").html(et.shareWidget(e)),
          this.el.find(".ds-share-icons-more").hide(),
          this.el.hasClass("flat") && this.el.find("a").each(function() {
            B(this).addClass("flat")
          }),
          p(this.el),
          this.delegateEvents()
        },
        delegateEvents: function() {
          var s = this,
          i = s.el;
          if (i.children().hasClass("ds-share-inline")) {
            var r = ".ds-share-icons-more",
            n = i.find(r),
            d = "[data-toggle=ds-share-icons-more]";
            i.delegate(d, "mouseover",
            function() {
              n.show()
            }),
            i.delegate(d, "mouseout",
            function() {
              n.hide()
            }),
            i.delegate(r, "mouseover",
            function() {
              n.show()
            }),
            i.delegate(r, "mouseout",
            function() {
              n.hide()
            })
          } else {
            var l = i.children().hasClass("ds-share-aside-left") ? "slide-to-right": "slide-to-left",
            c = i.children();
            if (!o.cssProperty("transition")) {
              var u = i.children().hasClass("ds-share-aside-left") ? "left": "right";
              i.delegate(".ds-share-aside-toggle", "mouseover",
              function() {
                var e = {},
                s = P.ie6 && "right" === u;
                s ? e.left = (t.documentElement.scrollLeft + t.documentElement.clientWidth - this.offsetWidth - (parseInt(this.currentStyle.marginLeft, 10) || 0) - parseInt(this.currentStyle.marginRight, 10) || 0) - 195 : e[u] = 0,
                c.animate(e, 200)
              }),
              i.delegate(".ds-share-aside-inner", "mouseleave",
              function() {
                var e = {},
                s = P.ie6 && "right" === u;
                s ? e.left = (t.documentElement.scrollLeft + t.documentElement.clientWidth - this.offsetWidth - (parseInt(this.currentStyle.marginLeft, 10) || 0) - parseInt(this.currentStyle.marginRight, 10) || 0) + 230 : e[u] = -229,
                c.animate(e, 200)
              })
            }
            i.delegate(".ds-share-aside-toggle,.ds-share-aside-inner", "mouseover",
            function() {
              c.addClass(l)
            }),
            i.delegate(".ds-share-aside-toggle,.ds-share-aside-inner", "mouseleave",
            function() {
              c.removeClass(l)
            })
          }
          i.delegate("a", "click",
          function(t) {
            var s = B(this).data("service");
            if (!i.data("url")) return void alert("请设置data-url");
            if ("wechat" === s) {
              var r = a() + "/api/qrcode/getImage.png",
              n = "?size=240&text=" + i.data("url"),
              d = E(et["dialog-qrcode"]({
                qrcode_url: r + n,
                url: i.data("url")
              }));
              d.el.find(".ds-dialog").css("width", "320px")
            } else {
              var l = a() + "/share-proxy/?" + o.param({
                service: B(this).data("service"),
                thread_key: i.data("threadKey"),
                title: i.data("title"),
                images: i.data("images"),
                content: i.data("content"),
                url: i.data("url")
              });
              e.open(l, "_blank")
            }
            t.preventDefault(),
            t.stopPropagation()
          })
        }
      });
      var it = 0;
      S.initSelector = function(e, t) {
        function s(e) {
          W(e),
          o.extend(z, e.options),
          dt.set(e.response)
        }
        var a = []; ! q() || !B.isReady && j || B(e).each(function(e, s) {
          var i = B(s);
          if (!i.data("initialized")) {
            i.data("initialized", !0);
            var r = new st[t.type](i, t);
            if (at.push(r), "ThreadCount" === t.type) {
              var n = i.attr("data-thread-key");
              i.attr("data-channel-key") && (n = i.attr("data-channel-key") + ":" + n),
              a.push(n),
              dt[n] || (dt[n] = new G({})),
              dt[n].on("reset",
              function() {
                r.onload(this)
              })
            } else if (r.uri) {
              var o = {};
              B.each(r.params.split(" "),
              function(e, t) {
                o[t.replace(/-/g, "_")] = i.attr("data-" + t) || i.data(t)
              }),
              M.get(r.uri, H(o),
              function(e) {
                r.load(e)
              })
            }
          }
        }),
        a.length && M.get("threads/counts", H({
          threads: a.join(",")
        }), s)
      },
      (S.initView = function() {
        B.each(O, S.initSelector)
      })(),
      B(function() {
        if (!c) {
          if (!q()) return C.error("缺少 duoshuoQuery 的定义");
          C.warn("请在加载多说 embed.js 之前定义 duoshuoQuery")
        }
        setInterval(function() {
          B(".ds-time").each(function() {
            var e = B(this).attr("datetime");
            e && (this.innerHTML = S.elapsedTime(e))
          })
        },
        2e4),
        c.ondomready && c.ondomready(),
        S.initView(),
        !it && c.short_name && M.get("analytics/ping", H({}), W)
      })
    })
  }
} (window, document);
