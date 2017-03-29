/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _anm = __webpack_require__(99);

	var _anm2 = _interopRequireDefault(_anm);

	var _browser = __webpack_require__(97);

	var _browser2 = _interopRequireDefault(_browser);

	var _Q = __webpack_require__(100);

	var _Q2 = _interopRequireDefault(_Q);

	var _es6Promise = __webpack_require__(106);

	var promise = _interopRequireWildcard(_es6Promise);

	var _fetchIe = __webpack_require__(109);

	var fetch = _interopRequireWildcard(_fetchIe);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 神特么safari不支持fetch

	// 浏览器判断
	window.Promise = window.Promise || promise.Promise;
	// Q 基础库
	// 动画

	window.fetch = window.fetch || fetch;

	var localTagKey = 'yilia-tag';
	var localSearchKey = 'yilia-search';
	var isMobile = _browser2.default.versions.mobile && window.screen.width < 800;

	function fixzero(str) {
		str = str + '';
		return str.length === 1 ? '0' + str : str;
	}

	function setScrollZero() {
		var $sct = document.querySelectorAll('.tools-section');
		$sct.forEach(function (em) {
			em.scrollTop = 0;
		});
	}

	function init() {
		var app = new _Q2.default({
			el: '#container',
			data: {
				isCtnShow: false,
				isShow: 0,
				innerArchive: false,
				friends: false,
				aboutme: false,
				items: [],
				jsonFail: false,
				showTags: false,
				search: ''
			},
			methods: {
				stop: function stop(e) {
					e.stopPropagation();
				},
				choseTag: function choseTag(e, name) {
					app.$set('search', '#' + (name ? name : e.target.innerHTML));
				},
				clearChose: function clearChose(e) {
					app.$set('search', '');
				},
				toggleTag: function toggleTag(e) {
					app.$set('showTags', !app.showTags);
					window.localStorage && window.localStorage.setItem(localTagKey, app.showTags);
				},
				openSlider: function openSlider(e, type) {
					e.stopPropagation();
					if (!type) {
						type = 'innerArchive';
					}
					// innerArchive: '所有文章'
					// friends: '友情链接'
					// aboutme: '关于我'
					app.$set('innerArchive', false);
					app.$set('friends', false);
					app.$set('aboutme', false);
					app.$set(type, true);
					app.$set('isShow', true);
					app.$set('isCtnShow', true);
					setScrollZero();
				}
			},
			filters: {
				isFalse: function isFalse(val) {
					return val === false;
				},
				isEmptyStr: function isEmptyStr(str) {
					return str === '';
				},
				isNotEmptyStr: function isNotEmptyStr(str) {
					return str !== '';
				},
				urlformat: function urlformat(str) {
					return '/' + str;
				},
				tagformat: function tagformat(str) {
					return '#' + str;
				},
				dateformat: function dateformat(str) {
					var d = new Date(str);
					return d.getFullYear() + '-' + fixzero(d.getMonth() + 1) + '-' + fixzero(d.getDate());
				}
			},
			ready: function ready() {}
		});

		function handleSearch(val) {
			val = (val || '').toLowerCase();
			var type = 'title';
			if (val.indexOf('#') === 0) {
				val = val.substr(1, val.length);
				type = 'tag';
			}
			var items = app.items;
			items.forEach(function (item) {
				var matchTitle = false;
				if (item.title.toLowerCase().indexOf(val) > -1) {
					matchTitle = true;
				}

				var matchTags = false;
				item.tags.forEach(function (tag) {
					if (tag.name.toLowerCase().indexOf(val) > -1) {
						matchTags = true;
					}
				});

				if (type === 'title' && matchTitle || type === 'tag' && matchTags) {
					item.isShow = true;
				} else {
					item.isShow = false;
				}
			});
			app.$set('items', items);
		}

		app.$watch('search', function (val, oldVal) {
			window.localStorage && window.localStorage.setItem(localSearchKey, val);
			handleSearch(val);
		});

		window.fetch(window.yiliaConfig.root + 'content.json?t=' + +new Date(), {
			method: 'get'
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			data.forEach(function (em) {
				em.isShow = true;
			});
			app.$set('items', data);
			// 搜索
			var searchWording = window.localStorage && window.localStorage.getItem(localSearchKey) || '';
			app.$set('search', searchWording);
			searchWording !== '' && handleSearch(searchWording);
		}).catch(function (err) {
			app.$set('jsonFail', true);
		});

		// 隐藏
		document.querySelector('#container').onclick = function (e) {
			if (app.isShow) {
				app.$set('isShow', false);
				setTimeout(function () {
					app.$set('isCtnShow', false);
				}, 300);
			}
		};

		// tag 显示/隐藏
		var localTag = false;
		if (window.localStorage) {
			localTag = window.localStorage.getItem(localTagKey);
		}
		var isTagOn = 'false';
		if (localTag === null) {
			isTagOn = window.yiliaConfig && window.yiliaConfig.showTags ? 'true' : 'false';
		} else {
			isTagOn = window.localStorage && window.localStorage.getItem(localTagKey) || 'false';
		}
		app.$set('showTags', JSON.parse(isTagOn));

		// 其他标签点击
		// 标签
		var $tags = document.querySelectorAll('.tagcloud a.js-tag');

		var _loop = function _loop() {
			var $em = $tags[i];
			$em.setAttribute('href', 'javascript:void(0)');
			$em.onclick = function (e) {
				e.stopPropagation();
				app.$set('innerArchive', true);
				app.$set('friends', false);
				app.$set('aboutme', false);
				app.$set('isShow', true);
				app.$set('isCtnShow', true);
				app.$set('search', '#' + $em.innerHTML);
				setScrollZero();
				return false;
			};
		};

		for (var i = 0, len = $tags.length; i < len; i++) {
			_loop();
		}
	}

	init();
	if (!isMobile) {
		_anm2.default.init();
	}

	module.exports = {};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(29);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(80);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	__webpack_require__(75);
	module.exports = __webpack_require__(79).f('iterator');

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(32)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(35)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(33)
	  , defined   = __webpack_require__(34);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(36)
	  , $export        = __webpack_require__(37)
	  , redefine       = __webpack_require__(52)
	  , hide           = __webpack_require__(42)
	  , has            = __webpack_require__(53)
	  , Iterators      = __webpack_require__(54)
	  , $iterCreate    = __webpack_require__(55)
	  , setToStringTag = __webpack_require__(71)
	  , getPrototypeOf = __webpack_require__(73)
	  , ITERATOR       = __webpack_require__(72)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(38)
	  , core      = __webpack_require__(39)
	  , ctx       = __webpack_require__(40)
	  , hide      = __webpack_require__(42)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 38 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 39 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(41);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(43)
	  , createDesc = __webpack_require__(51);
	module.exports = __webpack_require__(47) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(44)
	  , IE8_DOM_DEFINE = __webpack_require__(46)
	  , toPrimitive    = __webpack_require__(50)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(47) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(45);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(47) && !__webpack_require__(48)(function(){
	  return Object.defineProperty(__webpack_require__(49)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(48)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(45)
	  , document = __webpack_require__(38).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(45);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42);

/***/ },
/* 53 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(56)
	  , descriptor     = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(71)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(42)(IteratorPrototype, __webpack_require__(72)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(44)
	  , dPs         = __webpack_require__(57)
	  , enumBugKeys = __webpack_require__(69)
	  , IE_PROTO    = __webpack_require__(66)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(49)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(70).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(43)
	  , anObject = __webpack_require__(44)
	  , getKeys  = __webpack_require__(58);

	module.exports = __webpack_require__(47) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(59)
	  , enumBugKeys = __webpack_require__(69);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(53)
	  , toIObject    = __webpack_require__(60)
	  , arrayIndexOf = __webpack_require__(63)(false)
	  , IE_PROTO     = __webpack_require__(66)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(61)
	  , defined = __webpack_require__(34);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(62);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(60)
	  , toLength  = __webpack_require__(64)
	  , toIndex   = __webpack_require__(65);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(33)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(33)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(67)('keys')
	  , uid    = __webpack_require__(68);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(38)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(38).document && document.documentElement;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(43).f
	  , has = __webpack_require__(53)
	  , TAG = __webpack_require__(72)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(67)('wks')
	  , uid        = __webpack_require__(68)
	  , Symbol     = __webpack_require__(38).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(53)
	  , toObject    = __webpack_require__(74)
	  , IE_PROTO    = __webpack_require__(66)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(34);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	var global        = __webpack_require__(38)
	  , hide          = __webpack_require__(42)
	  , Iterators     = __webpack_require__(54)
	  , TO_STRING_TAG = __webpack_require__(72)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(77)
	  , step             = __webpack_require__(78)
	  , Iterators        = __webpack_require__(54)
	  , toIObject        = __webpack_require__(60);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(35)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(72);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	module.exports = __webpack_require__(39).Symbol;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(38)
	  , has            = __webpack_require__(53)
	  , DESCRIPTORS    = __webpack_require__(47)
	  , $export        = __webpack_require__(37)
	  , redefine       = __webpack_require__(52)
	  , META           = __webpack_require__(83).KEY
	  , $fails         = __webpack_require__(48)
	  , shared         = __webpack_require__(67)
	  , setToStringTag = __webpack_require__(71)
	  , uid            = __webpack_require__(68)
	  , wks            = __webpack_require__(72)
	  , wksExt         = __webpack_require__(79)
	  , wksDefine      = __webpack_require__(84)
	  , keyOf          = __webpack_require__(85)
	  , enumKeys       = __webpack_require__(86)
	  , isArray        = __webpack_require__(89)
	  , anObject       = __webpack_require__(44)
	  , toIObject      = __webpack_require__(60)
	  , toPrimitive    = __webpack_require__(50)
	  , createDesc     = __webpack_require__(51)
	  , _create        = __webpack_require__(56)
	  , gOPNExt        = __webpack_require__(90)
	  , $GOPD          = __webpack_require__(92)
	  , $DP            = __webpack_require__(43)
	  , $keys          = __webpack_require__(58)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(91).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(88).f  = $propertyIsEnumerable;
	  __webpack_require__(87).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(36)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(42)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(68)('meta')
	  , isObject = __webpack_require__(45)
	  , has      = __webpack_require__(53)
	  , setDesc  = __webpack_require__(43).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(48)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(38)
	  , core           = __webpack_require__(39)
	  , LIBRARY        = __webpack_require__(36)
	  , wksExt         = __webpack_require__(79)
	  , defineProperty = __webpack_require__(43).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(58)
	  , toIObject = __webpack_require__(60);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(58)
	  , gOPS    = __webpack_require__(87)
	  , pIE     = __webpack_require__(88);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 88 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(62);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(60)
	  , gOPN      = __webpack_require__(91).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(59)
	  , hiddenKeys = __webpack_require__(69).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(88)
	  , createDesc     = __webpack_require__(51)
	  , toIObject      = __webpack_require__(60)
	  , toPrimitive    = __webpack_require__(50)
	  , has            = __webpack_require__(53)
	  , IE8_DOM_DEFINE = __webpack_require__(46)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(47) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)('asyncIterator');

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)('observable');

/***/ },
/* 96 */,
/* 97 */
/***/ function(module, exports) {

	'use strict';

	var browser = {
	    versions: function () {
	        var u = window.navigator.userAgent;
	        return {
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
	            iPad: u.indexOf('iPad') > -1, //是否为iPad
	            webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
	            weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
	        };
	    }()
	};

	module.exports = browser;

/***/ },
/* 98 */,
/* 99 */
/***/ function(module, exports) {

	'use strict';

	function init() {
	    var width,
	        height,
	        largeHeader,
	        canvas,
	        ctx,
	        circles,
	        target,
	        animateHeader = true;

	    // Main
	    initHeader();
	    addListeners();

	    function initHeader() {
	        width = window.innerWidth;
	        height = window.innerHeight;
	        target = { x: 0, y: height };

	        largeHeader = document.getElementById('container');
	        largeHeader.style.height = height + 'px';

	        canvas = document.getElementById('anm-canvas');
	        canvas.width = width;
	        canvas.height = height;
	        ctx = canvas.getContext('2d');

	        // create particles
	        circles = [];
	        for (var x = 0; x < width * 0.5; x++) {
	            var c = new Circle();
	            circles.push(c);
	        }
	        animate();
	    }

	    // Event handling
	    function addListeners() {
	        window.addEventListener('scroll', scrollCheck);
	        window.addEventListener('resize', resize);
	    }

	    function scrollCheck() {
	        if (document.body.scrollTop > height) animateHeader = false;else animateHeader = true;
	    }

	    function resize() {
	        width = window.innerWidth;
	        height = window.innerHeight;
	        largeHeader.style.height = height + 'px';
	        canvas.width = width;
	        canvas.height = height;
	    }

	    function animate() {
	        if (animateHeader) {
	            ctx.clearRect(0, 0, width, height);
	            for (var i in circles) {
	                circles[i].draw();
	            }
	        }
	        requestAnimationFrame(animate);
	    }

	    // Canvas manipulation
	    function Circle() {
	        var _this = this;

	        // constructor
	        (function () {
	            _this.pos = {};
	            init();
	            //console.log(_this);
	        })();

	        function init() {
	            _this.pos.x = Math.random() * width;
	            _this.pos.y = height + Math.random() * 100;
	            _this.alpha = 0.1 + Math.random() * 0.3;
	            _this.scale = 0.1 + Math.random() * 0.3;
	            _this.velocity = Math.random();
	        }

	        this.draw = function () {
	            if (_this.alpha <= 0) {
	                init();
	            }
	            _this.pos.y -= _this.velocity;
	            _this.alpha -= 0.0005;
	            ctx.beginPath();
	            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
	            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
	            ctx.fill();
	        };
	    }
	}

	module.exports = {
	    init: init
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _keys = __webpack_require__(102);

	var _keys2 = _interopRequireDefault(_keys);

	var _typeof2 = __webpack_require__(28);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Q.js v1.0.12
	 * Inspired from vue.js
	 * (c) 2016 Daniel Yang
	 * Released under the MIT License.
	 */

	/**
	 * Just support modern browser
	 */

	(function webpackUniversalModuleDefinition(root, factory) {
	    if (( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && ( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') exports["Q"] = factory();else root["Q"] = factory();
	})(undefined, function () {
	    return (/******/function (modules) {
	            // webpackBootstrap
	            /******/ // The module cache
	            /******/var installedModules = {};

	            /******/ // The require function
	            /******/function __webpack_require__(moduleId) {

	                /******/ // Check if module is in cache
	                /******/if (installedModules[moduleId])
	                    /******/return installedModules[moduleId].exports;

	                /******/ // Create a new module (and put it into the cache)
	                /******/var module = installedModules[moduleId] = {
	                    /******/exports: {},
	                    /******/id: moduleId,
	                    /******/loaded: false
	                    /******/ };

	                /******/ // Execute the module function
	                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	                /******/ // Flag the module as loaded
	                /******/module.loaded = true;

	                /******/ // Return the exports of the module
	                /******/return module.exports;
	                /******/
	            }

	            /******/ // expose the modules object (__webpack_modules__)
	            /******/__webpack_require__.m = modules;

	            /******/ // expose the module cache
	            /******/__webpack_require__.c = installedModules;

	            /******/ // __webpack_public_path__
	            /******/__webpack_require__.p = "";

	            /******/ // Load entry module and return exports
	            /******/return __webpack_require__(0);
	            /******/
	        }(
	        /************************************************************************/
	        /******/[
	        /* 0 */
	        /***/function (module, exports, __webpack_require__) {

	            var utils = __webpack_require__(1),
	                _ = __webpack_require__(3),
	                factory = __webpack_require__(4);

	            _.extend(utils, _);
	            module.exports = factory(utils);

	            /***/
	        },
	        /* 1 */
	        /***/function (module, exports, __webpack_require__) {

	            var noop = function noop() {},
	                defer = window.requestAnimationFrame || window.webkitRequestAnimationFrame || setTimeout,
	                cache = new (__webpack_require__(2))(1000),

	            // priority directives
	            priorities = ['vm', 'repeat', 'if'],
	                _qtid = 0,
	                _slice = [].slice,
	                _alpaca = document.getElementsByTagName('html')[0],
	                slice = function () {
	                try {
	                    _slice.call(document.body.childNodes);
	                    return _slice;
	                } catch (e) {
	                    return function (i) {
	                        i = i || 0;
	                        var res = [],
	                            l = this.length;
	                        for (; i < l; i++) {
	                            res.push(this[i]);
	                        }
	                        return res;
	                    };
	                }
	            }();

	            _alpaca && (_alpaca = _alpaca.getAttribute('alpaca'));

	            function _loopPriority(el, res, setting) {
	                var attr, tmp;

	                // TODO need optimization
	                for (var j = 0, l = priorities.length; j < l; j++) {
	                    attr = 'q-' + priorities[j];
	                    if (tmp = el.getAttribute(attr)) {
	                        res.push({
	                            name: attr,
	                            value: tmp
	                        });

	                        el.removeAttribute(attr);
	                        // has priority directive
	                        return true;
	                    }
	                }
	            }

	            function walk($el, cb, setting) {
	                setting = setting || {};
	                var i, j, l, el, atts, res, qtid;
	                for (i = 0; el = $el[i++];) {
	                    if (el.nodeType === 1) {
	                        atts = el.attributes;
	                        res = [];

	                        // loop the priority directive
	                        if (!_loopPriority(el, res, setting)) {
	                            // loop other directive
	                            for (j = 0, l = atts.length; j < l; j++) {
	                                atts[j].name.indexOf('q-') === 0 && res.push({
	                                    name: atts[j].name,
	                                    value: atts[j].value
	                                });
	                            }
	                        }
	                        res.length > 0 && cb(el, res, setting);
	                    }
	                    if (el.childNodes.length && !setting.stop) walk(slice.call(el.childNodes, 0), cb, setting);
	                    // reset stop
	                    setting.stop = false;
	                }
	            }

	            module.exports = {
	                slice: slice,
	                noop: noop,
	                /**
	                 * Add class with compatibility for IE & SVG
	                 *
	                 * @param {Element} el
	                 * @param {Strong} cls
	                 */
	                addClass: function addClass(el, cls) {
	                    if (el.classList) {
	                        el.classList.add(cls);
	                    } else {
	                        var cur = ' ' + (el.className || '') + ' ';
	                        if (cur.indexOf(' ' + cls + ' ') < 0) {
	                            el.className = (cur + cls).trim();
	                        }
	                    }
	                },
	                /**
	                 * Remove class with compatibility for IE & SVG
	                 *
	                 * @param {Element} el
	                 * @param {Strong} cls
	                 */
	                removeClass: function removeClass(el, cls) {
	                    if (el.classList) {
	                        el.classList.remove(cls);
	                    } else {
	                        var cur = ' ' + (el.className || '') + ' ',
	                            tar = ' ' + cls + ' ';
	                        while (cur.indexOf(tar) >= 0) {
	                            cur = cur.replace(tar, ' ');
	                        }
	                        el.className = cur.trim();
	                    }
	                },
	                noexist: function noexist(vm, name) {
	                    this.warn(vm);
	                    throw new Error('Filter ' + name + ' hasn\'t implemented.');
	                },
	                warn: function () {
	                    return window.console && console.error ? function () {
	                        console.error.apply(console, arguments);
	                    } : noop;
	                }(),
	                isObject: function isObject(o) {
	                    return (typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) === 'object';
	                },
	                nextTick: function nextTick(cb, ctx) {
	                    return ctx ? defer(function () {
	                        cb.call(ctx);
	                    }, 0) : defer(cb, 0);
	                },
	                /**
	                 * get
	                 * @param {String} namespace
	                 * @param {String} key
	                 * @returns {String}
	                 */
	                get: function get(namespace, key) {
	                    var arr = [];
	                    namespace && arr.push(namespace);
	                    key && arr.push(key);
	                    return arr.join('.').replace(/^(.+\.)?\$top\./, '');
	                },
	                walk: walk,
	                /**
	                 * alpaca
	                 * just a flag
	                 */
	                alpaca: !!_alpaca
	            };

	            /***/
	        },
	        /* 2 */
	        /***/function (module, exports) {

	            /**
	             * just a copy of: https://github.com/yyx990803/vue/blob/master/src/cache.js
	             *
	             * @param {Number} limit
	             * @constructor
	             */

	            function Cache(limit) {
	                this.size = 0;
	                this.limit = limit;
	                this.head = this.tail = undefined;
	                this._keymap = {};
	            }

	            var p = Cache.prototype;

	            /**
	             * Put <value> into the cache associated with <key>.
	             * Returns the entry which was removed to make room for
	             * the new entry. Otherwise undefined is returned.
	             * (i.e. if there was enough room already).
	             *
	             * @param {String} key
	             * @param {*} value
	             * @return {Entry|undefined}
	             */

	            p.put = function (key, value) {
	                var entry = {
	                    key: key,
	                    value: value
	                };
	                this._keymap[key] = entry;
	                if (this.tail) {
	                    this.tail.newer = entry;
	                    entry.older = this.tail;
	                } else {
	                    this.head = entry;
	                }
	                this.tail = entry;
	                if (this.size === this.limit) {
	                    return this.shift();
	                } else {
	                    this.size++;
	                }
	            };

	            /**
	             * Purge the least recently used (oldest) entry from the
	             * cache. Returns the removed entry or undefined if the
	             * cache was empty.
	             */

	            p.shift = function () {
	                var entry = this.head;
	                if (entry) {
	                    this.head = this.head.newer;
	                    this.head.older = undefined;
	                    entry.newer = entry.older = undefined;
	                    this._keymap[entry.key] = undefined;
	                }
	                return entry;
	            };

	            /**
	             * Get and register recent use of <key>. Returns the value
	             * associated with <key> or undefined if not in cache.
	             *
	             * @param {String} key
	             * @param {Boolean} returnEntry
	             * @return {Entry|*}
	             */

	            p.get = function (key, returnEntry) {
	                var entry = this._keymap[key];
	                if (entry === undefined) return;
	                if (entry === this.tail) {
	                    return returnEntry ? entry : entry.value;
	                }
	                // HEAD--------------TAIL
	                //   <.older   .newer>
	                //  <--- add direction --
	                //   A  B  C  <D>  E
	                if (entry.newer) {
	                    if (entry === this.head) {
	                        this.head = entry.newer;
	                    }
	                    entry.newer.older = entry.older; // C <-- E.
	                }
	                if (entry.older) {
	                    entry.older.newer = entry.newer; // C. --> E
	                }
	                entry.newer = undefined; // D --x
	                entry.older = this.tail; // D. --> E
	                if (this.tail) {
	                    this.tail.newer = entry; // E. <-- D
	                }
	                this.tail = entry;
	                return returnEntry ? entry : entry.value;
	            };

	            module.exports = Cache;

	            /***/
	        },
	        /* 3 */
	        /***/function (module, exports) {

	            var DELEGATOR_CALLBACKS_KEY = '__cbs__',
	                NO_DELEGATOR = {
	                // prevent mouseover trigger more than one time
	                mouseover: true,
	                change: true,
	                input: true,
	                porpertychange: true
	            };
	            var _extend = function _extend(target, srcs) {
	                srcs = [].splice.call(arguments, 1);
	                var i = 0,
	                    l = srcs.length,
	                    src,
	                    key;
	                for (; i < l; i++) {
	                    src = srcs[i];
	                    for (key in src) {
	                        target[key] = src[key];
	                    }
	                }
	                return target;
	            },
	                _expando = 'QDataUid',
	                _uid = 0,
	                _map = {};

	            function contains(a, b) {
	                return a !== b && a.contains(b);
	            }

	            function data(el, key, value) {
	                var uid = el[_expando] = el[_expando] || ++_uid,
	                    data = _map[uid] = _map[uid] || {};
	                // set Data
	                if (value === undefined) return data[key];
	                return data[key] = value;
	            }

	            function _add(el, evt, fn) {
	                evt.split(' ').forEach(function (e) {
	                    el.addEventListener(e, fn, false);
	                });
	            }

	            module.exports = {
	                find: function find(selector) {
	                    return this.slice.call(document.querySelectorAll(selector), 0);
	                },
	                contains: contains,
	                data: data,
	                cleanData: function cleanData(els) {
	                    var uid;
	                    els.forEach(function (el) {
	                        var uid = el[_expando];
	                        // has data
	                        uid && uid in _map && delete _map[uid];
	                    });
	                },
	                add: function add(el, evt, fn, vm) {
	                    if (!vm || NO_DELEGATOR[evt]) {
	                        _add(el, evt, fn);
	                    } else {
	                        var $el = vm.$el,
	                            cbs = data($el, DELEGATOR_CALLBACKS_KEY);
	                        if (!cbs) {
	                            cbs = [];
	                            data($el, DELEGATOR_CALLBACKS_KEY, cbs);
	                            _add($el, evt, function (e) {
	                                var target = e.target;
	                                cbs.forEach(function (cb) {
	                                    var fn = cb.fn,
	                                        el = cb.el;
	                                    if (contains(el, target)) {
	                                        fn.call(el, e);
	                                    }
	                                });
	                            });
	                        }
	                        // push
	                        cbs.push({
	                            el: el,
	                            fn: fn
	                        });
	                    }
	                },
	                remove: function remove(el, evt, fn) {
	                    el.removeEventListener(evt, fn, false);
	                },
	                clone: function clone(ele) {
	                    return ele.cloneNode(true);
	                },
	                extend: function extend(target) {
	                    if (arguments.length === 1) return _extend(this, target);
	                    return _extend.apply(this, arguments);
	                }
	            };

	            /***/
	        },
	        /* 4 */
	        /***/function (module, exports, __webpack_require__) {

	            module.exports = function (_) {

	                var Seed = __webpack_require__(5),
	                    events = __webpack_require__(6),
	                    MARK = /\{\{(.+?)\}\}/,
	                    mergeOptions = __webpack_require__(7).mergeOptions,
	                    clas = __webpack_require__(8),
	                    _doc = document;

	                function _inDoc(ele) {
	                    return _.contains(_doc.documentElement, ele);
	                }

	                // lifecycle: created -> compiled

	                /**
	                 * Q
	                 * @class
	                 * @param {Object} options
	                 */
	                function Q(options) {
	                    this._init(options);
	                }
	                // exports utils
	                Q._ = _;
	                Q.options = {
	                    directives: __webpack_require__(9),
	                    filters: {}
	                };
	                /**
	                 * get
	                 * @param {String | Element} selector
	                 * @return {Q}
	                 */
	                Q.get = function (selector) {
	                    var ele = _.find(selector)[0];
	                    if (ele) {
	                        return _.data(ele, 'QI');
	                    } else {
	                        return new this({ el: selector });
	                    }
	                };
	                /**
	                 * all
	                 * @param {Object} options
	                 */
	                Q.all = function (options) {
	                    var self = this;
	                    return _.find(options.el).map(function (ele) {
	                        return new self(_.extend(options, { el: ele }));
	                    });
	                };
	                _.extend(Q, clas);
	                _.extend(Q.prototype, {
	                    _init: function _init(options) {
	                        options = options || {};
	                        this.$el = options.el && typeof options.el === 'string' ? _.find(options.el)[0] : options.el;
	                        // element references
	                        this.$$ = {};
	                        // set parent vm
	                        this.$parent = options._parent;
	                        // merge options
	                        options = this.$options = mergeOptions(this.constructor.options, options, this);
	                        // lifecycle state
	                        this._isCompiled = false;
	                        this._isAttached = false;
	                        this._isReady = false;
	                        // events bookkeeping
	                        this._events = {};
	                        this._watchers = {};

	                        // components
	                        this._children = [];
	                        // components references
	                        this.$ = {};

	                        Seed.call(this, options);
	                        // this._data = options.data;
	                        // initialize data and scope inheritance.
	                        this._initScope();
	                        // call created hook
	                        this._callHook('created');
	                        // start compilation
	                        if (this.$el) {
	                            // cache the instance
	                            _.data(this.$el, 'QI', this);
	                            this.$mount(this.$el);
	                        }
	                    },
	                    /**
	                     * Listen on the given `event` with `fn`.
	                     *
	                     * @param {String} event
	                     * @param {Function} fn
	                     */
	                    $on: function $on(event, fn) {
	                        (this._events[event] || (this._events[event] = [])).push(fn);
	                        return this;
	                    },
	                    /**
	                     * Adds an `event` listener that will be invoked a single
	                     * time then automatically removed.
	                     *
	                     * @param {String} event
	                     * @param {Function} fn
	                     */
	                    $once: function $once(event, fn) {
	                        var self = this;
	                        function on() {
	                            self.$off(event, on);
	                            fn.apply(this, arguments);
	                        }
	                        on.fn = fn;
	                        this.$on(event, on);
	                        return this;
	                    },

	                    /**
	                     * Remove the given callback for `event` or all
	                     * registered callbacks.
	                     *
	                     * @param {String} event
	                     * @param {Function} fn
	                     */

	                    $off: function $off(event, fn) {
	                        var cbs, cb, i;
	                        // all event
	                        if (!arguments.length) {
	                            this._events = {};
	                            return this;
	                        }
	                        // specific event
	                        cbs = this._events[event];
	                        if (!cbs) {
	                            return this;
	                        }
	                        if (arguments.length === 1) {
	                            this._events[event] = null;
	                            return this;
	                        }
	                        // specific handler
	                        i = cbs.length;
	                        while (i--) {
	                            cb = cbs[i];
	                            if (cb === fn || cb.fn === fn) {
	                                cbs.splice(i, 1);
	                                break;
	                            }
	                        }
	                        return this;
	                    },
	                    /**
	                     * Watch an expression, trigger callback when its
	                     * value changes.
	                     *
	                     * @param {String} exp
	                     * @param {Function} cb
	                     * @param {Boolean} [deep]
	                     * @param {Boolean} [immediate]
	                     * @return {Function} - unwatchFn
	                     */
	                    $watch: function $watch(exp, cb, deep, immediate) {
	                        var key = deep ? exp + '**deep**' : exp;
	                        (this._watchers[key] || (this._watchers[key] = [])).push(cb);
	                        immediate && cb(this.data(exp));
	                        return this;
	                    },
	                    /**
	                     * Trigger an event on self.
	                     *
	                     * @param {String} e
	                     */
	                    $emit: function $emit(e) {
	                        var args = _.slice.call(arguments, 1);
	                        events.emit.call(this, e, _.slice.call(args, 0));
	                        // emit data change
	                        if (!e.indexOf('data:')) {
	                            e = e.substring(5);
	                            events.callChange.call(this, e, _.slice.call(args, 0));
	                        }
	                        if (!e.indexOf('deep:')) {
	                            e = e.substring(5);
	                            events.callDeep.call(this, e, _.slice.call(args, 0));
	                            args.unshift(e);
	                            events.emit.call(this, 'datachange', args);
	                        }
	                        return this;
	                    },
	                    /**
	                     * Setup the scope of an instance, which contains:
	                     * - observed data
	                     * - computed properties
	                     * - user methods
	                     * - meta properties
	                     */
	                    _initScope: function _initScope() {
	                        this._initMethods();
	                    },

	                    /**
	                     * Setup instance methods. Methods must be bound to the
	                     * instance since they might be called by children
	                     * inheriting them.
	                     */
	                    _initMethods: function _initMethods() {
	                        var methods = this.$options.methods,
	                            key;
	                        if (methods) {
	                            for (key in methods) {
	                                this[key] = methods[key].bind(this);
	                            }
	                        }
	                    },

	                    /**
	                     * Set instance target element and kick off the compilation
	                     * process. The passed in `el` can be a template string, an
	                     * existing Element, or a DocumentFragment (for block
	                     * instances).
	                     *
	                     * @param {String|Element|DocumentFragment} el
	                     * @public
	                     */
	                    $mount: function $mount(el) {
	                        if (this._isCompiled) {
	                            return _.warn('$mount() should be called only once');
	                        }
	                        // TODO for template || we may not do for template
	                        // if (typeof el === 'string') {
	                        //
	                        // }
	                        this._compile(el);
	                        this._isCompiled = true;
	                        this._callHook('compiled');
	                        if (_inDoc(this.$el)) {
	                            this._callHook('attached');
	                            this._ready();
	                        } else {
	                            this.$once('hook:attached', this._ready);
	                        }
	                    },

	                    /**
	                     * ready
	                     */
	                    _ready: function _ready() {
	                        this._isAttached = true;
	                        this._isReady = true;
	                        this._callHook('ready');
	                    },
	                    /**
	                     * Transclude, compile and link element.
	                     *
	                     * If a pre-compiled linker is available, that means the
	                     * passed in element will be pre-transcluded and compiled
	                     * as well - all we need to do is to call the linker.
	                     *
	                     * Otherwise we need to call transclude/compile/link here.
	                     *
	                     * @param {Element} el
	                     * @return {Element}
	                     */
	                    _compile: function _compile(el) {
	                        this.transclue(el, this.$options);
	                    },
	                    /**
	                     * Process an element or a DocumentFragment based on a
	                     * instance option object. This allows us to transclude
	                     * a template node/fragment before the instance is created,
	                     * so the processed fragment can then be cloned and reused
	                     * in v-repeat.
	                     *
	                     * @param {Element} el
	                     * @param {Object} options
	                     */
	                    transclue: function transclue(el, options) {
	                        // just bind template
	                        this._templateBind(el, options);
	                    },

	                    /**
	                     * bind rendered template
	                     */
	                    _templateBind: __webpack_require__(11),

	                    /**
	                     * Trigger all handlers for a hook
	                     *
	                     * @param {String} hook
	                     */
	                    _callHook: function _callHook(hook) {
	                        var handlers = this.$options[hook];
	                        if (handlers) {
	                            for (var i = 0, j = handlers.length; i < j; i++) {
	                                handlers[i].call(this);
	                            }
	                        }
	                        this.$emit('hook:' + hook);
	                    },

	                    _makeReadFilters: function _makeReadFilters(names, $this) {
	                        if (!names.length) return [];
	                        var filters = this.$options.filters,
	                            self = this;
	                        return names.map(function (args) {
	                            args = _.slice.call(args, 0);
	                            var name = args.shift();
	                            var reader = filters[name] ? filters[name].read || filters[name] : _.noexist(self, name);
	                            return function (value, oldVal) {
	                                // don't modify args
	                                var thisArgs = [value].concat(args || []),
	                                    i = thisArgs.indexOf('$this');
	                                thisArgs.push(oldVal);
	                                // replace $this
	                                if (~i) {
	                                    thisArgs[i] = $this;
	                                }
	                                return args ? reader.apply(self, thisArgs) : reader.call(self, value, oldVal);
	                            };
	                        });
	                    },

	                    /**
	                     * Apply filters to a value
	                     *
	                     * @param {*} value
	                     * @param {Array} filters
	                     * @param {*} oldVal
	                     * @return {*}
	                     */
	                    applyFilters: function applyFilters(value, filters, oldVal) {
	                        if (!filters || !filters.length) {
	                            return value;
	                        }
	                        for (var i = 0, l = filters.length; i < l; i++) {
	                            value = filters[i].call(this, value, oldVal);
	                        }
	                        return value;
	                    }
	                });

	                _.extend(Q.prototype, Seed.prototype);

	                return Q;
	            };

	            /***/
	        },
	        /* 5 */
	        /***/function (module, exports, __webpack_require__) {

	            var _ = __webpack_require__(1);

	            /**
	             * prefix data
	             * @param {Data || DataArray} up
	             * @param {String} key
	             * @param {*} value
	             * @param {Boolean} trigger or not
	             */
	            function _prefix(up, key, value, trigger) {
	                var top = up._top,
	                    isArray = _isArray(value),
	                    options = {
	                    data: value,
	                    up: up,
	                    top: top,
	                    namespace: key + '',
	                    trigger: isArray ? false : trigger
	                },

	                // old value
	                oldVal = top.data ? top.data(up.$namespace(key)) : undefined;

	                if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value !== null) {
	                    up[key] = isArray ? new DataArray(options) : new Data(options);

	                    // trigger data change
	                    trigger && up.$change(up.$namespace(key), up[key], oldVal);
	                } else if (oldVal !== value) {
	                    up[key] = value;
	                    // trigger data change
	                    trigger && up.$change(up.$namespace(key), value, oldVal);
	                }
	                if (!~up._keys.indexOf(key)) up._keys.push(key);
	            }

	            function _isArray(obj) {
	                return Array.isArray(obj) || obj instanceof DataArray;
	            }

	            function _getLength(keys) {
	                return keys.filter(function (key) {
	                    return typeof key === 'number';
	                }).length;
	            }

	            /**
	             * Data
	             * @class
	             * @param {Object} options
	             */
	            function Data(options) {
	                var data = options.data,
	                    keys = (0, _keys2.default)(options.data || {}).filter(function (key) {
	                    return key.indexOf('_') !== 0;
	                }).map(function (num) {
	                    return +num + '' === num ? +num : num;
	                }),
	                    self = this;

	                _.extend(this, data);

	                // all key need to traverse
	                this._keys = keys;
	                // parent data container
	                this._up = options.up;
	                // the most top parent data container
	                this._top = options.top || this;
	                // the namespace of data
	                this._namespace = options.namespace || '';
	                keys.forEach(function (key) {
	                    _prefix(self, key, data[key], options.trigger);
	                });
	                // if it is a array
	                _isArray(data) && (
	                // fix the length
	                this.length = _getLength(keys));
	            }
	            _.extend(Data.prototype, {
	                /**
	                 * get the namespace
	                 */
	                $namespace: function $namespace(key) {
	                    var keys = [],
	                        self = this;
	                    for (; self != undefined; self = self._up) {
	                        self._namespace && keys.unshift(self._namespace);
	                    }
	                    if (key) keys.push(key);
	                    return keys.join('.');
	                },
	                /**
	                 * get the key of it's parent
	                 */
	                $key: function $key() {
	                    var key = this._namespace;
	                    return +key + '' === key ? +key : key;
	                },
	                /**
	                 * get the parent of the data
	                 */
	                $up: function $up(num) {
	                    num = num || 1;
	                    for (var src = this; num--;) {
	                        src = src['_up'];
	                    }
	                    return src;
	                },
	                /**
	                 * set the value of the key
	                 */
	                $set: function $set(key, value) {
	                    if ((typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)) === 'object') {
	                        var self = this;
	                        (0, _keys2.default)(key).filter(function (k) {
	                            return k.indexOf('_') !== 0;
	                        }).forEach(function (k) {
	                            _prefix(self, k, key[k], true);
	                        });
	                        this.$change(this.$namespace(key), this, undefined, 1);
	                    } else {
	                        var oldValue = this[key];
	                        _prefix(this, key, value, true);
	                        // just bubble
	                        this.$change(this.$namespace(key), this[key], oldValue, undefined, -1);
	                    }
	                    return this;
	                },
	                /**
	                 * get the actual value
	                 */
	                $get: function $get() {
	                    var res,
	                        keys = this._keys,
	                        self = this;
	                    if (this instanceof Data) {
	                        res = {};
	                    } else {
	                        res = [];
	                    }
	                    keys.forEach(function (key) {
	                        res[key] = self[key] == null ? self[key] : self[key].$get ? self[key].$get() : self[key];
	                    });
	                    return res;
	                },
	                /**
	                 * change
	                 * type = 0 just change
	                 * type = 1 trigger change & deep
	                 * type = -1 just deep
	                 */
	                $change: function $change(key, value, oldVal, patch, type) {
	                    type = type || 0;
	                    var top = this._top;
	                    if (top.$emit) {
	                        ~type && this._top.$emit('data:' + key, value, oldVal, patch);
	                        type && this._top.$emit('deep:' + key, value, oldVal, patch);
	                    }
	                }
	            });

	            /**
	             * DataArray
	             * Something just like Array
	             * @class
	             * @param {Object} options
	             */
	            function DataArray(options) {
	                Data.call(this, options);
	            }
	            _.extend(DataArray.prototype, Data.prototype, {
	                /**
	                 * push data
	                 */
	                push: function push(values) {
	                    values = _.slice.call(arguments, 0);
	                    var res = [];
	                    for (var i = 0, l = values.length; i < l; i++) {
	                        _prefix(this, this.length, values[i]);
	                        this._keys.push(this.length);
	                        res.push(this[this.length]);
	                        this.length++;
	                    }
	                    // value, oldValue, patch
	                    this.$change(this.$namespace(), this, null, {
	                        method: 'push',
	                        res: res,
	                        args: values
	                    }, 1);

	                    return this;
	                },
	                /**
	                 * pop data
	                 */
	                pop: function pop() {
	                    var res = this[--this.length];
	                    delete this[this.length];
	                    this._keys.pop();
	                    this.$change(this.$namespace(), this, null, undefined, 1);
	                    return res;
	                },
	                /**
	                 * unshift
	                 */
	                unshift: function unshift(value) {
	                    this._keys.push(this.length);
	                    this.length++;
	                    for (var l = this.length; l--;) {
	                        this[l] = this[l - 1];
	                        // fixed namespace
	                        (0, _typeof3.default)(this[l]) === 'object' && (this[l]._namespace = l + '');
	                    }
	                    _prefix(this, 0, value);
	                    this.$change(this.$namespace(), this, null, undefined, 1);
	                    return this;
	                },
	                /**
	                 * shift
	                 */
	                shift: function shift() {
	                    this.length--;
	                    var res = this[0];
	                    for (var i = 0, l = this.length; i < l; i++) {
	                        this[i] = this[i + 1];
	                        // fixed namespace
	                        (0, _typeof3.default)(this[i]) === 'object' && (this[i]._namespace = i + '');
	                    }
	                    this._keys.pop();
	                    delete this[this.length];
	                    this.$change(this.$namespace(), this, null, undefined, 1);
	                    return res;
	                },
	                /**
	                 * touch
	                 */
	                touch: function touch(key) {
	                    this.$change(this.$namespace(key), this, null, undefined, 1);
	                },
	                /**
	                 * indexOf
	                 */
	                indexOf: function indexOf(item) {
	                    if (item._up === this) {
	                        var i = +item._namespace;
	                        if (this[i] === item) return i;
	                    } else if ((typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) !== 'object') {
	                        for (var i = 0, l = this.length; i < l; i++) {
	                            if (this[i] === item) return i;
	                        }
	                    }
	                    return -1;
	                },
	                /**
	                 * splice
	                 */
	                splice: function splice(i, l /**, items support later **/) {
	                    var patch = {
	                        method: 'splice',
	                        args: [i, l]
	                    };
	                    for (var j = 0, k = l + i, z = this.length - l; i < z; i++, j++) {
	                        this[i] = this[k + j];
	                        (0, _typeof3.default)(this[i]) === 'object' && (this[i]._namespace = i + '');
	                    }
	                    for (; i < this.length; i++) {
	                        this[i] = null;
	                        delete this[i];
	                    }
	                    this.length -= l;
	                    this._keys.splice(this.length, l);
	                    this.$change(this.$namespace(), this, null, patch, 1);
	                },
	                /**
	                 * forEach
	                 */
	                forEach: function forEach(foo) {
	                    for (var i = 0, l = this.length; i < l; i++) {
	                        foo(this[i], i);
	                    }
	                },
	                /**
	                 * filter
	                 */
	                filter: function filter(foo) {
	                    var res = [];
	                    this.forEach(function (item, i) {
	                        if (foo(item)) res.push(item);
	                    });
	                    return res;
	                }
	            });

	            /**
	             * Seed
	             * @param {Object} options
	             */
	            function Seed(options) {
	                Data.call(this, options);
	            }
	            _.extend(Seed, {
	                Data: Data,
	                DataArray: DataArray
	            });
	            _.extend(Seed.prototype, Data.prototype, {
	                /**
	                 * Set data and Element value
	                 *
	                 * @param {String} key
	                 * @param {*} value
	                 * @returns {Data}
	                 */
	                data: function data(key, value) {
	                    if (key === undefined) return this;
	                    var i = 0,
	                        l,
	                        data = this,
	                        next;
	                    if (~key.indexOf('.')) {
	                        var keys = key.split('.');
	                        for (l = keys.length; i < l - 1; i++) {
	                            key = keys[i];
	                            // key is number
	                            if (+key + '' === key) key = +key;
	                            if (key in data && data[key] != null) {
	                                data = data[key];
	                            } else if (value === undefined) {
	                                // data is undefind
	                                return undefined;
	                            } else {
	                                next = keys[i + 1];
	                                // next is number
	                                if (+next + '' == next) {
	                                    // set a array
	                                    _prefix(data, key, [], true);
	                                } else {
	                                    // set a object
	                                    _prefix(data, key, {}, true);
	                                }
	                            }
	                        }
	                    }
	                    l && (key = keys[i]);
	                    // if data === undefined, just return
	                    if (value === undefined) return data && key ? data[key] : data;
	                    data.$set(key, value);
	                    return data[key];
	                }
	            });

	            module.exports = Seed;

	            /***/
	        },
	        /* 6 */
	        /***/function (module, exports, __webpack_require__) {

	            var Data = __webpack_require__(5),
	                _ = __webpack_require__(1);

	            function emit(key, args, target) {
	                // set the trigger target is pass in or this
	                target = target || this;
	                var cbs = this._events[key];
	                if (cbs) {
	                    var i = 0;
	                    cbs = cbs.length > 1 ? _.slice.call(cbs, 0) : cbs;
	                    for (var l = cbs.length; i < l; i++) {
	                        cbs[i].apply(target, args);
	                    }
	                }
	                // emit parent
	                // prevent data: event and hook: event trigger
	                if (key.indexOf('data:') && key.indexOf('hook:') && key.indexOf('deep:') && this.$parent) {
	                    emit.call(this.$parent, key, args, target);
	                }
	            }

	            function callChange(key, args) {
	                var self = {
	                    _events: this._watchers
	                };
	                emit.call(self, key, args);
	                emit.call(self, key + '**deep**', args);
	            }

	            function callDeep(key, args) {
	                var props,
	                    nArgs,
	                    keys = key.split('.'),
	                    self = { _events: this._watchers };

	                for (keys.pop(); keys.length > 0; keys.pop()) {
	                    key = keys.join('.');
	                    props = key + '**deep**';
	                    // remove the old value
	                    emit.call(self, props, [this.data(key)]);
	                }
	                // emit vm is change
	                emit.call(self, '**deep**', [this]);
	            }

	            module.exports = {
	                emit: emit,
	                callChange: callChange,
	                callDeep: callDeep
	            };

	            /***/
	        },
	        /* 7 */
	        /***/function (module, exports, __webpack_require__) {

	            var _ = __webpack_require__(1);

	            var strats = {};
	            strats.created = strats.ready = strats.attached = strats.detached = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.paramAttributes = function (parentVal, childVal) {
	                return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
	            };
	            strats.data = strats.filters = strats.methods = strats.directives = function (parentVal, childVal) {
	                if (!childVal) return parentVal;
	                if (!parentVal) return childVal;
	                return _.extend({}, parentVal, childVal);
	            };

	            var defaultStrat = function defaultStrat(parentVal, childVal) {
	                return childVal === undefined ? parentVal : childVal;
	            };

	            /**
	             * Option overwriting strategies are functions that handle
	             * how to merge a parent option value and a child option
	             * value into the final value.
	             *
	             * All strategy functions follow the same signature:
	             *
	             * @param {*} parentVal
	             * @param {*} childVal
	             * @param {Vue} [vm]
	             */
	            function mergeOptions(parent, child, vm) {
	                var options = {},
	                    key;
	                for (key in parent) {
	                    merge(key);
	                }
	                for (key in child) {
	                    if (!parent.hasOwnProperty(key)) {
	                        merge(key);
	                    }
	                }
	                function merge(key) {
	                    var strat = strats[key] || defaultStrat;
	                    options[key] = strat(parent[key], child[key], vm, key);
	                }
	                return options;
	            }

	            module.exports = {
	                strats: strats,
	                mergeOptions: mergeOptions
	            };

	            /***/
	        },
	        /* 8 */
	        /***/function (module, exports, __webpack_require__) {

	            // Modules map
	            var modules = {},
	                mergeOptions = __webpack_require__(7).mergeOptions,
	                listeners = {};

	            function _define(name, options) {
	                if (modules[name]) return false;
	                var module = modules[name] = this.extend(options || {});
	                return module;
	            }

	            function _require(name, callback) {
	                return modules[name] || this;
	            }

	            function _create(o) {
	                function F() {}
	                F.prototype = o;
	                return new F();
	            }

	            function _extend(extendOptions) {
	                extendOptions = extendOptions || {};
	                var Super = this,
	                    Sub = createClass(extendOptions.name || 'QComponent');
	                Sub.prototype = _create(Super.prototype);
	                Sub.prototype.constructor = Sub;
	                Sub.options = mergeOptions(Super.options, extendOptions);
	                Sub['super'] = Super;
	                ['extend', 'get', 'all', 'require', 'define'].forEach(function (key) {
	                    Sub[key] = Super[key];
	                });
	                return Sub;
	            }

	            function createClass(name) {
	                return new Function('return function ' + name + ' (options) { this._init(options) }')();
	            }

	            module.exports = {
	                /**
	                 * define
	                 * define a component
	                 * @param {String} name
	                 * @param {Object} options
	                 */
	                define: _define,
	                /**
	                 * require
	                 * require(name)
	                 * require(names, callback)
	                 * require a component
	                 * @param {String} name
	                 * @param {Array} names
	                 * @param {Function} callback
	                 */
	                require: _require,
	                /**
	                 * extend
	                 * extend the class
	                 * @param {Object} options
	                 */
	                extend: _extend
	            };

	            /***/
	        },
	        /* 9 */
	        /***/function (module, exports, __webpack_require__) {

	            var _ = __webpack_require__(1),
	                strats = __webpack_require__(7);

	            var PROP_REG = /^(.*)\.([\w\-]+)$/;

	            module.exports = {
	                cloak: {
	                    bind: function bind() {
	                        var vm = this.vm,
	                            el = this.el;

	                        // after ready
	                        vm.$once('hook:ready', function () {
	                            // if data change
	                            vm.$once('datachange', function () {
	                                el.removeAttribute('q-cloak');
	                            });
	                        });
	                    }
	                },
	                show: function show(value) {
	                    var el = this.el;
	                    if (value) {
	                        el.style.display = '';
	                        var display = el.currentStyle ? el.currentStyle.display : getComputedStyle(el, null).display;
	                        if (display === 'none') {
	                            el.style.display = 'block';
	                        }
	                    } else {
	                        el.style.display = 'none';
	                    }
	                },
	                'class': function _class(value) {
	                    var el = this.el,
	                        arg = this.arg;
	                    if (arg) {
	                        value ? _.addClass(el, arg) : _.removeClass(el, arg);
	                    } else {
	                        if (this.lastVal) {
	                            _.removeClass(el, this.lastVal);
	                        }
	                        if (value) {
	                            _.addClass(el, value);
	                            this.lastVal = value;
	                        }
	                    }
	                },
	                value: function value(_value) {
	                    var el = this.el;
	                    if (el.type === 'checkbox') {
	                        el.checked = _value;
	                    } else {
	                        el.value = _value;
	                    }
	                },
	                attr: function attr(value) {
	                    if (value === undefined) return;
	                    var arg = this.arg,
	                        el = this.el;
	                    // property
	                    if (arg === 'style') {
	                        if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
	                            for (var k in value) {
	                                if (value.hasOwnProperty(k)) {
	                                    el.style[k] = value[k];
	                                }
	                            }
	                        } else {
	                            el.setAttribute(arg, value);
	                        }
	                    } else {
	                        if (arg in el) {
	                            el[arg] = value;
	                        } else {
	                            el.setAttribute(arg, value);
	                        }
	                    }
	                },
	                text: function text(value) {
	                    var text;

	                    value !== undefined && (text = typeof this.el.textContent === 'string' ? 'textContent' : 'innerText') && (this.el[text] = value == null ? '' : value.toString());
	                },
	                html: function html(value) {
	                    this.el.innerHTML = value && value.toString() || '';
	                },
	                on: {
	                    bind: function bind() {
	                        var self = this,
	                            key = this.target,
	                            param = this.param,
	                            filters = this.filters,
	                            vm = this.vm,
	                            handler = vm.applyFilters(this.vm[key], filters),
	                            data = param && ~param.indexOf('this') && self.data();
	                        _.add(this.el, this.arg, function (e) {
	                            if (!handler || typeof handler !== 'function') {
	                                return _.warn('You need implement the ' + key + ' method.');
	                            }
	                            var args = [];
	                            param ? param.forEach(function (arg) {
	                                if (arg === 'e') args.push(e);else if (arg === 'this') args.push(data);else if (arg === 'true') args.push(true);else if (arg === 'false') args.push(false);else if (+arg + '' === arg) args.push(+arg);else if (arg.match(/^(['"]).*\1$/)) args.push(arg.slice(1, -1));else args.push(self.data(arg));
	                            }) : args.push(e);

	                            handler.apply(vm, args);
	                        });
	                    }
	                },
	                model: {
	                    bind: function bind() {
	                        var keys = ((this.namespace ? this.namespace + '.' : '') + this.target).split('.'),
	                            key = keys.pop(),
	                            namespace = keys.join('.'),
	                            el = this.el,
	                            vm = this.vm,
	                            data = vm.data(namespace),
	                            composing = false;
	                        _.add(el, 'input propertychange change keypress keyup', function (e) {
	                            if (composing) return;
	                            data.$set(key, el.value);
	                        });
	                        _.add(el, 'compositionstart', function (e) {
	                            composing = true;
	                        });
	                        _.add(el, 'compositionend', function (e) {
	                            composing = false;
	                        });
	                    },
	                    update: function update(value) {
	                        if (this.el.value !== value) {
	                            this.el.value = value;
	                        }
	                    }
	                },
	                vm: {
	                    bind: function bind() {
	                        // stop walk
	                        this.setting.stop = true;

	                        // which component
	                        var name = this.target,
	                            vm = this.vm,
	                            el = this.el,

	                        // component reference
	                        ref = el.getAttribute('q-ref') || false,
	                            Child = vm.constructor.require(name),
	                            data = Child.options.data,
	                            options,
	                            childVm;

	                        options = {
	                            el: el,
	                            data: data,
	                            _parent: vm
	                        };

	                        childVm = new Child(options);

	                        vm._children.push(childVm);
	                        ref && !function () {
	                            var refs = vm.$[ref];
	                            refs ? refs.length ? refs.push(childVm) : vm.$[ref] = [refs, childVm] : vm.$[ref] = childVm;
	                        }();
	                    }
	                },
	                'if': {
	                    bind: function bind() {
	                        // return if el is a template
	                        if (!this.el.parentNode) return;

	                        var tpl = this.el,
	                            parentNode = tpl.parentNode,
	                            ref = document.createComment('q-if'),
	                            hasInit = false,
	                            exist = true,
	                            key = this.target,
	                            namespace = this.namespace,
	                            target = _.get(namespace, key),
	                            readFilters = this.filters,
	                            data = this.data(),
	                            vm = this.vm;

	                        this.setting.stop = true;

	                        function _init(value) {
	                            // no exist no bind
	                            if (hasInit || !exist || !value) return;
	                            hasInit = true;
	                            vm._templateBind(tpl, {
	                                data: data,
	                                namespace: namespace,
	                                immediate: true
	                            });
	                        }

	                        vm.$watch(target, function (value, oldVal) {
	                            value = vm.applyFilters(value, readFilters, oldVal);

	                            _init(value);
	                            // need to init
	                            if (value === exist) return;
	                            // bind
	                            if (value === true) {
	                                parentNode.replaceChild(tpl, ref);
	                                exist = value;
	                                // unbind
	                            } else if (value === false) {
	                                parentNode.replaceChild(ref, tpl);
	                                exist = value;
	                            }

	                            _init(value);
	                        }, (0, _typeof3.default)(this.data(key)) === 'object', true);
	                    }
	                },
	                el: {
	                    bind: function bind() {
	                        this.vm.$$[this.target] = this.el;
	                    }
	                },
	                repeat: __webpack_require__(10)
	            };

	            /***/
	        },
	        /* 10 */
	        /***/function (module, exports, __webpack_require__) {

	            var _ = __webpack_require__(1);
	            var methods = {
	                'default': {
	                    // how to clean the dom
	                    clean: function clean(parentNode, repeats) {
	                        if (repeats.length) {
	                            repeats.forEach(function (node) {
	                                // repeat element may has been remove
	                                node.parentNode === parentNode && parentNode.removeChild(node);
	                            });
	                            _.cleanData(repeats);
	                            repeats.length = 0;
	                        }
	                    },
	                    insert: function insert(parentNode, fragment, ref) {
	                        parentNode.insertBefore(fragment, ref);
	                    }
	                },
	                push: {
	                    insert: function insert(parentNode, fragment, ref) {
	                        parentNode.insertBefore(fragment, ref);
	                    },
	                    dp: function dp(data, patch) {
	                        return patch.res;
	                    }
	                },
	                splice: {
	                    clean: function clean(parentNode, repeats, value, watchers) {
	                        var i = value[0],
	                            l = value[1],
	                            target = value[2].$namespace(),
	                            eles = repeats.splice(i, l);
	                        eles.forEach(function (ele) {
	                            parentNode.removeChild(ele);
	                        });
	                        // just splice one time
	                        if (!value.done) {
	                            splice(watchers, target, i, l);
	                            value.done = true;
	                        }
	                        return true;
	                    },
	                    dp: function dp(data, patch) {
	                        patch.args.push(data);
	                        return patch.args;
	                    }
	                }
	            };

	            function splice(watchers, target, i, l) {
	                var length = target.length,
	                    subKey,
	                    cur,
	                    index,
	                    newKey;
	                (0, _keys2.default)(watchers).forEach(function (key) {
	                    if (~key.indexOf(target)) {
	                        subKey = key.substring(length + 1);
	                        cur = subKey.split('.');
	                        if (cur.length) {
	                            index = +cur.shift();
	                            if ((index -= l) >= i) {
	                                cur.unshift(index);
	                                cur.unshift(target);
	                                newKey = cur.join('.');
	                                watchers[newKey] = watchers[key];
	                                delete watchers[key];
	                            }
	                        }
	                    }
	                });
	            }

	            exports.bind = function () {
	                var tpl = this.el,
	                    setting = this.setting,
	                    parentNode = tpl.parentNode,
	                    key,
	                    namespace,
	                    target,
	                    readFilters,
	                    repeats,
	                    ref,
	                    vm;
	                // return
	                if (!parentNode || setting.stop) return;

	                // stop binding
	                setting.stop = true;

	                key = this.target;
	                namespace = this.namespace;
	                target = _.get(namespace, key);
	                readFilters = this.filters;
	                repeats = [];
	                ref = document.createComment('q-repeat');
	                vm = this.vm;

	                parentNode.replaceChild(ref, tpl);

	                vm.$watch(target, function (value, oldVal, patch) {
	                    value = vm.applyFilters(value, readFilters);
	                    // if value is undefined or null just return
	                    if (value == null) return;
	                    var method = !readFilters.length && patch ? patch.method : 'default',
	                        dp = (methods[method] || {}).dp,
	                        clean = (methods[method] || {}).clean,
	                        insert = (methods[method] || {}).insert;

	                    // if dp exists, proceess data
	                    dp && (value = dp(value, patch));

	                    if (clean && clean(parentNode, repeats, value, vm._watchers, target) === true) {
	                        return;
	                    }

	                    var fragment = document.createDocumentFragment(),
	                        itemNode;

	                    value.forEach(function (obj, i) {
	                        itemNode = _.clone(tpl);
	                        vm._templateBind(itemNode, {
	                            data: obj,
	                            namespace: obj.$namespace(),
	                            immediate: true
	                        });
	                        // TODO this must refactor
	                        repeats.push(itemNode);
	                        fragment.appendChild(itemNode);
	                    });

	                    insert && insert(parentNode, fragment, ref);
	                    vm.$emit('repeat-render');
	                }, false, true);
	            };

	            /***/
	        },
	        /* 11 */
	        /***/function (module, exports, __webpack_require__) {

	            var parse = __webpack_require__(12),
	                _ = __webpack_require__(1);

	            module.exports = function (el, options) {
	                options = options || {};

	                var self = this,
	                    directives = self.$options.directives,
	                    index = options.index,
	                    data = options.data || self,
	                    namespace = options.namespace;

	                _.walk([el], function (node, res, setting) {
	                    res.forEach(function (obj) {
	                        var name = obj.name.substring(2),
	                            directive = directives[name],
	                            descriptors = parse(obj.value);
	                        directive && descriptors.forEach(function (descriptor) {
	                            var readFilters = self._makeReadFilters(descriptor.filters, self.data(namespace)),
	                                key = descriptor.target,
	                                target = _.get(namespace, key),
	                                update = _.isObject(directive) ? directive.update : directive,
	                                that = _.extend({
	                                el: node,
	                                vm: self,
	                                data: function data(key) {
	                                    return self.data(_.get(namespace, key));
	                                },
	                                namespace: namespace,
	                                setting: setting
	                            }, descriptor, {
	                                filters: readFilters
	                            }),
	                                tmp = that.data(key);

	                            update && self.$watch(target, function (value, oldValue) {
	                                value = self.applyFilters(value, readFilters, oldValue);
	                                update.call(that, value, oldValue);
	                            }, (typeof tmp === 'undefined' ? 'undefined' : (0, _typeof3.default)(tmp)) === 'object', _.alpaca ? false : typeof options.immediate === 'boolean' ? options.immediate : tmp !== undefined);
	                            if (_.isObject(directive) && directive.bind) directive.bind.call(that);
	                        });
	                    });
	                });
	            };

	            /***/
	        },
	        /* 12 */
	        /***/function (module, exports, __webpack_require__) {

	            var cache = new (__webpack_require__(2))(1000),
	                tokens = [
	            // space
	            [/^ +/],
	            // arg
	            [/^([\w\-]+):/, function (captures, status) {
	                status.token.arg = captures[1];
	            }],
	            // function
	            [/^([\w]+)\((.+?)\)/, function (captures, status) {
	                status.token.target = captures[1];
	                status.token.param = captures[2].split(/ *, */);
	            }],
	            // target
	            [/^([\w\-\.\$]+)/, function (captures, status) {
	                status.token.target = captures[1];
	            }],
	            // filter
	            [/^(?=\|)/, function (captures, status) {
	                status.filter = true;
	            }],
	            // next
	            [/^,/, function (captures, status, res) {
	                res.push(status.token);
	                status.token = {
	                    filters: []
	                };
	            }]],
	                filterREG = /^(.+?)(?=,|$)/,
	                filterTokens = [
	            // space
	            [/^ +/],
	            // filter
	            [/^\| *([\w\-\!]+)/, function (captures, filters) {
	                filters.push([captures[1]]);
	            }],
	            // string
	            [/^(['"])(((\\['"])?([^\1])*)+)\1/, function (captures, filters) {
	                filters[filters.length - 1].push(captures[3]);
	            }],
	            // arg
	            [/^([\w\-\$]+)/, function (captures, filters) {
	                filters[filters.length - 1].push(captures[1]);
	            }]];
	            /**
	             * click: onclick | filter1 | filter2
	             * click: onclick , keydown: onkeydown
	             * click: onclick(this)
	             * click: onclick(e, this)
	             * value1 | filter1 | filter2
	             * value - 1 | filter1 | filter2   don't support
	             */
	            function parse(str) {
	                var name = str,
	                    hit = cache.get(name);
	                if (hit) return hit;

	                var res = [],
	                    captures,
	                    i,
	                    l = tokens.length,
	                    foo,

	                // if has token or not
	                has = false,
	                    status = {
	                    // if in filter or not
	                    filter: false,
	                    // just token object
	                    token: {
	                        filters: []
	                    }
	                };

	                while (str.length) {
	                    for (i = 0; i < l; i++) {
	                        if (captures = tokens[i][0].exec(str)) {
	                            var has = true;
	                            var foo = tokens[i][1];
	                            foo && foo(captures, status, res);
	                            str = str.replace(tokens[i][0], '');
	                            if (status.filter) {
	                                captures = filterREG.exec(str);
	                                parseFilter(captures[0].trim(), status.token);
	                                str = str.replace(filterREG, '');
	                                status.filter = false;
	                            }
	                            break;
	                        }
	                    }
	                    if (has) {
	                        has = false;
	                    } else {
	                        throw new Error('Syntax error at: ' + str);
	                    }
	                }

	                res.push(status.token);
	                cache.put(name, res);
	                return res;
	            }

	            function parseFilter(str, token) {
	                var i,
	                    l = filterTokens.length,
	                    has = false;
	                while (str.length) {
	                    for (i = 0; i < l; i++) {
	                        var captures = filterTokens[i][0].exec(str);
	                        if (captures) {
	                            var has = true;
	                            var foo = filterTokens[i][1];
	                            foo && foo(captures, token.filters);
	                            str = str.replace(filterTokens[i][0], '');
	                            break;
	                        }
	                    }
	                    if (has) {
	                        has = false;
	                    } else {
	                        throw new Error('Syntax error at: ' + str);
	                    }
	                }
	            }

	            module.exports = parse;

	            /***/
	        }
	        /******/])
	    );
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(101)(module)))

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	module.exports = __webpack_require__(39).Object.keys;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(74)
	  , $keys    = __webpack_require__(58);

	__webpack_require__(105)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(37)
	  , core    = __webpack_require__(39)
	  , fails   = __webpack_require__(48);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.1.0
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(108);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	      GET_THEN_ERROR.error = null;
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107), (function() { return this; }())))

/***/ },
/* 107 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 108 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 109 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  // if __disableNativeFetch is set to true, the it will always polyfill fetch
	  // with Ajax.
	  if (!self.__disableNativeFetch && self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob, options) {
	    var reader = new FileReader()
	    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
	    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
	    var _charset = blob.type.match(regex) || contentType.match(regex)
	    var args = [blob]

	    if(_charset) {
	      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
	    }

	    reader.readAsText.apply(reader, args)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body, options) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	        this._options = options
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob, this._options)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body, options)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit, options)
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      var __onLoadHandled = false;

	      function onload() {
	        if (xhr.readyState !== 4) {
	          return
	        }
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;

	        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
	        resolve(new Response(body, options))
	      }
	      xhr.onreadystatechange = onload;
	      xhr.onload = onload;
	      xhr.onerror = function() {
	        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      // `withCredentials` should be setted after calling `.open` in IE10
	      // http://stackoverflow.com/a/19667959/1219343
	      try {
	        if (request.credentials === 'include') {
	          if ('withCredentials' in xhr) {
	            xhr.withCredentials = true;
	          } else {
	            console && console.warn && console.warn('withCredentials is not supported, you can ignore this warning');
	          }
	        }
	      } catch (e) {
	        console && console.warn && console.warn('set withCredentials error:' + e);
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true

	  // Support CommonJS
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = self.fetch;
	  }
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);