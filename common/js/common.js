//import hljs from "./3rdparty/highlight/highlight.min";

(function($){
    const WT={
        expandCollapseNode: function(){
            $(this).find("+ul").slideToggle();
        },
        expandCollapseAll: function(){
            $(this).toggleClass("expanded");
            $("li > ul")[$(this).is(".expanded") ? "show" : "hide"]();
        },
        displayLocalCodeSnippet: function(evt){
            const link = evt.currentTarget;
            const file = link.href.substring(link.href.indexOf("#") + 1);
            fetch(file).then((x) => x.text()).then((sourceCode) => {
                const hlt = hljs.highlight(sourceCode, {language: link.lang}).value;
                $(`<pre id=\"localContent\" tabindex="1"><code class=\"language-${link.lang}\">${hlt}</code></pre>`)
                    .on("keydown", (keyEvent) => {
                        if (keyEvent.keyCode === 27) {
                            keyEvent.currentTarget.remove();
                        }
                    }).appendTo("body").show().focus();
            });
            return false
        }
    };

    'use strict';
    /*onLoad*/
    $(function(){
        $(document)
            .on("click", "ul.main li>span", WT.expandCollapseNode)
            .on("click", "ul.main > .expand-all", WT.expandCollapseAll)
            .on("click", "a[href^=\"#local/\"]", WT.displayLocalCodeSnippet);
    });

}(jQuery))
