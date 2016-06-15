define(function (){

    var toggleTocArea = function(){
        var valueHide = yiliaConfig.toc[0];
        var valueShow = yiliaConfig.toc[1];
        if ($(".left-col").is(":hidden")) {
            $("#tocButton").attr("value", valueShow);
        }
        $("#tocButton").click(function() {
            if ($("#toc").is(":hidden")) {
                $("#tocButton").attr("value", valueHide);
                $("#toc").slideDown(320);
                $(".switch-btn, .switch-area").fadeOut(300);
            }
            else {
                $("#tocButton").attr("value", valueShow);
                $("#toc").slideUp(350);
                $(".switch-btn, .switch-area").fadeIn(500);
            }
        })
    }()

    var HideTOCifNoHeader = function(){
        if (!$(".toc").length) {
            $("#toc, #tocButton").hide();
            $(".switch-btn, .switch-area").show();
        }
    }()

    var $itemHasChild = $("#toc .toc-item:has(> .toc-child)");
    var $titleHasChild = $itemHasChild.children(".toc-link");
    $itemHasChild.prepend("<i class='fa fa-caret-down'></i><i class='fa fa-caret-right'></i>");

    var clickIcon = function(){
        $("#toc .toc-item > i").click(function(){
            $(this).siblings(".toc-child").slideToggle(100);
            $(this).toggleClass("hide");
            $(this).siblings("i").toggleClass("hide");
        })
    }()

    var clickTitle = function(){
        $titleHasChild.dblclick(function(){
            $(this).siblings(".toc-child").hide(100);
            $(this).siblings("i").toggleClass("hide");
        })
        // After dblclick enent
        $titleHasChild.click(function(){
            var $curentTocChild = $(this).siblings(".toc-child");
            if ($curentTocChild.is(":hidden")) {
                $curentTocChild.show(100);
                $(this).siblings("i").toggleClass("hide");
            }
        })
    }()

    var clickTocTitle = function(){
        var $iconToExpand = $(".toc-item > .fa-caret-right");
        var $iconToFold = $(".toc-item > .fa-caret-down");
        var $subToc = $titleHasChild.next(".toc-child");
        $iconToExpand.addClass("hide");

        var $tocTitle = $("#toc .toc-title");
        if ($titleHasChild.length) {
            $tocTitle.addClass("clickable");
            $tocTitle.click(function(){
                if ($subToc.is(":hidden")) {
                    $subToc.show(150);
                    $iconToExpand.removeClass("hide");
                    $iconToFold.addClass("hide");
                } else {
                    $subToc.hide(100);
                    $iconToExpand.addClass("hide");
                    $iconToFold.removeClass("hide");
                }
            })
            // TOC on mobile
            if ($(".left-col").is(":hidden")) {
                $("#container .toc-article .toc").css("padding-left", "1.4em");
                $("#container .toc-article .toc-title").css("display", "initial");
            }
        }
    }()

    var TocNoWarp = function(cond){
        if (cond) {
            var $tocLink = $(".toc li a");
            $tocLink.each(function(){
                var title = $(this).find('.toc-text').text();
                // Find elements with ellipsis
                if (this.offsetWidth < this.scrollWidth) {
                    $(this).attr("title", title);
                    if (!!$().tooltip) { $(this).tooltip() }
                }
            })
            var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
            if (isSafari) {
                $("#toc .toc-item i").css("bottom", ".1em");
            }
        }
    }
    TocNoWarp(yiliaConfig.toc[2]);

})
