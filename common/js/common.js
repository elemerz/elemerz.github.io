(function($){
    'use strict';
    /*onLoad*/
    $(function(){
        $(document)
            .on("click", "ul.main li>span", WT.expandCollapseNode)
            .on("click", "ul.main > .expand-all", WT.expandCollapseAll)
            .on("click", "a[href^=\"#local-\"]", WT.displayLocalCodeSnippet);
    });

    var WT={
        expandCollapseNode: function(){
            $(this).find("+ul").slideToggle();
        },
        expandCollapseAll: function(){
            $(this).toggleClass("expanded");
            $("li > ul")[$(this).is(".expanded") ? "show" : "hide"]();
        },
        displayLocalCodeSnippet: function(evt){
            console.log(evt.currentTarget.href);
            var hashIdx = evt.currentTarget.href.lastIndexOf("#");
            if (hashIdx !== -1) {
                var targetId = evt.currentTarget.href.substr(hashIdx + 1);
                var $target = $("#" + targetId);
                if ($target.length) {
                    const isHidden = $target.is(":hidden");
                    $('pre[id^="local-"]').hide();
                    if (isHidden) {
                        $target.show();
                    } else {
                        $target.hide();
                    }
                }
            }
            return false
        }
    };
}(jQuery))
