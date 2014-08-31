function H$(i){return document.getElementById(i);}
function H$$(c,p){
	if(p) return p.getElementsByTagName(c);
	else return document.getElementsByTagName(c);
}
var tagElems = [];
(function() {
	function ranOrNot(e, t) {
		var n = [];
		typeof t == "undefined" && (t = e, e = 0);
		for (; e < t; e++) n.push(e);
		return n
	}
	Array.prototype.randomEach = function(t) {
		if (typeof t != "function") throw new TypeError;
		var n = this.length,
		r = ranOrNot(n);
		while (n) {
			var i = Math.floor(Math.random() * n--);
			if (t(this[r[i]]) === !1) break;
			r[i] = r[n]
		}
	},
	Array.prototype.forEach || (Array.prototype.forEach = function(e) {
		var t = this.length;
		if (typeof e != "function") throw new TypeError;
		var n = arguments[1];
		for (var r = 0; r < t; r++) r in this && e.call(n, this[r], r, this)
	})
} )();


function _shadowClone(e) {
	var t = {};
	for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
	return t;
}
function attrStyle(elem,attr){
    if(elem.style[attr]){
        return elem.style[attr];
    }else if(elem.currentStyle){
        return elem.currentStyle[attr];
    }else if(document.defaultView && document.defaultView.getComputedStyle){
        attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
        return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
    }else{
        return null;
    }
}

///////////////////////////


function AutoLoader(fun, timeout) {
	if (typeof fun != "function") throw new TypeError;
	this._generator = fun;
	this._timeout = timeout;
	this._context = arguments[2];
	this._pool = [];
}
AutoLoader.prototype._load = function() {
	var e = this;
	clearTimeout(this._loading);
	this._loading = setTimeout(function() {
		e._pool.push(e._generator.apply(e._context))
	},
	this._timeout);

}
AutoLoader.prototype.get = function() {
	var e;
	clearTimeout(this._loading);
	this._pool.length > 0 ? e = this._pool.pop() : e = this._generator.apply(this._context);
	return e;
}

function _cutGrid(tag, funcJudge) {
	function a(a) {
		function h(cutLength) {
			var u, a = _shadowClone(cutLength);
			c++,
			u = c === l ? tag[cutType2.measure] - s: Math.floor(cutLength[cutType2.measure] * tag[cutType2.measure] / 100),
			a[cutType1.offset] = i + tag[cutType1.offset],
			a[cutType2.offset] = s + tag[cutType2.offset],
			a[cutType1.measure] = f,
			a[cutType2.measure] = u,
			a.colorPattern = tag.colorPattern,
			funcJudge(a),
			s += u
		}
		var f, l = a[cutType2.name].length,
		c = 0;
		u++,
		f = u === cutLength ? tag[cutType1.measure] - i: Math.floor(a[cutType1.measure] * tag[cutType1.measure] / 100),
		a.random === !1 ? a[cutType2.name].forEach(h) : a[cutType2.name].randomEach(h),
		s = 0,
		i += f
	}
	/*根据大块是否有rows属性，定义两种切割方式*/
	var cutType1, cutType2;
	tag.rows ? (cutType1 = {
		name: "rows",
		measure: "height",
		offset: "top"
	},
	cutType2 = {
		name: "cols",
		measure: "width",
		offset: "left"
	}) : (cutType1 = {
		name: "cols",
		measure: "width",
		offset: "left"
	},
	cutType2 = {
		name: "rows",
		measure: "height",
		offset: "top"
	});
	var i = 0,
	s = 0,
	cutLength = tag[cutType1.name].length,
	u = 0;
	tag.random === !1 ? tag[cutType1.name].forEach(a) : tag[cutType1.name].randomEach(a)
}

function _getGrids(tag) {
	var t = [],
	colorCount = 0,
	fontScale = .18,
	colorArr = tag.colorPatterns[0];
	_cutGrid(tag.pageLayout,
		function(tag) {
			/*如果是新的大块，则colorPattern不存在，使用新的颜色。*/
			tag.colorPattern || (tag.colorPattern = colorArr[colorCount++]);
			/*tagConfig本来没有rows或cols，是大块。执行else部分*/
			if (tag.rows || tag.cols) {
				_cutGrid(tag, arguments.callee);
			}
			else {
				var s = tag.colorPattern,
				o = s.backgrounds,
				u = o.length,
				a = s.fontColor;
				tag.fontSize = Math.floor(Math.sqrt(tag.width * tag.height) * fontScale);
				tag.backgroundColor = o[Math.floor(Math.random() * u)];
				tag.fontColor = a;
				t.push(tag);
			}
		}
	);
	return t;
}

var myReader = function(){
	function inits(o){
		this.dom = H$(o.domId);
		this.len = o.len;
		this.block = o.block;
		this.fillStage(H$("container"));
		this.clickEve();
	}
	inits.prototype={
		clickEve:function(){
			var _this=this;
			var dom = H$$("button");
			dom[0].onclick=function(){
				H$("container").innerHTML="";
				_this.fillStage(H$("container"));
			}
		},
		reflowTagElem:function(dom, t,sw,sh) {
			
			dom.style.top = t.top*sh + "px";
			dom.style.left = t.left*sw + "px";
			dom.style.width = t.width*sw - 2 + "px";
			dom.style.height = t.height*sh - 2 + "px";
			dom.style.fontSize = t.fontSize*sw + "px";
			dom.style.color = t.fontColor;
			dom.style.backgroundColor = t.backgroundColor;
			dom.order = t.width*sw * t.height*sh;
		},
		fillStage:function(dom) {
			var _this=this;
			var data = _getGrids(window.tagConfig);
			data.forEach(function(data) {
				var div = document.createElement("div");
				div.className = "tag";
				_this.reflowTagElem(div, data,6,4);
				dom.appendChild(div);
				tagElems.push(div);
			});
		}
	}
	return inits;
}();

var myData = {
	domId:"container"
}
new myReader(myData);