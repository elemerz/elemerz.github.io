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
            const el = evt.currentTarget;
            const file = el.href.substring(el.href.indexOf("#") + 1);
            fetch(file).then((x) => x.text()).then((sourceCode) => {
                const hlt = hljs.highlight(sourceCode, {language: el.lang}).value;
                $(`<pre id=\"localContent\" tabindex="1"><code class=\"language-${el.lang}\">${hlt}</code></pre>`)
                    .on("keydown", (evt) => {
                        if (evt.keyCode === 27) {
                            $("#localContent").remove();
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
