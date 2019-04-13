(function($){
    'use strict';
    /*onLoad*/
    $(function(){
        $(document)
            .on("click", "ul.main li>span", WT.expandCollapseNode)
            .on("click", "ul.main > .expand-all", WT.expandCollapseAll);
    });

    var WT={
        expandCollapseNode: function(){
            $(this).find("+ul").slideToggle();
        },
        expandCollapseAll: function(){
            $(this).toggleClass("expanded");
            $("li > ul")[$(this).is(".expanded") ? "show" : "hide"]();
        }
    };
}(jQuery))
