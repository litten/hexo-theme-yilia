var backTop = function (domE, ctn, distance) {
    if (!domE) return;
    var timer = null;
    var _onscroll = window.onscroll,
        _onclick = domE.onclick;
    (ctn || window).onscroll = throttle(function () {
        typeof _onscroll === 'function' && _onscroll.apply(this, arguments);
        toggleDomE();
    }, 100);
    domE.onclick = function () {
        typeof _onclick === 'function' && _onclick.apply(this, arguments);
        var baseCt = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
        timer = setInterval(function () { //设置一个计时器
            var ct = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
            var diff = Math.max(10, ct / 6);
            ct -= diff;
            if (ct > 0) {//如果与顶部的距离大于零
                ctn.scrollTop = ctn.scrollTop - diff;
                window.scrollTo(0, ct);//向上移动10px
            } else {//如果距离小于等于零
                ctn.scrollTop = 0;
                window.scrollTo(0, 0);//移动到顶部
                clearInterval(timer);//清除计时器
            }
        }, 10);//隔10ms执行一次前面的function，展现一种平滑滑动效果
    };

    function toggleDomE() {
        domE.style.display = (ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop) > (distance || 500) ? 'block' : 'none';
    }
    function throttle(func, wait) {
        var timer = null;
        return function () {
            var self = this, args = arguments;
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                return typeof func === 'function' && func.apply(self, args);
            }, wait);
        }
    }
};

function init() {
    backTop(document.getElementById('js-jump-container'), document.getElementById('container'));
}

module.exports = {
    init: init
}