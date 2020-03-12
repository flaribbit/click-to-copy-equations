// ==UserScript==
// @name         Github公式渲染
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*.md
// @require      https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js
// @resource     customCSS https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';
    let css=GM_getResourceText("customCSS").replace(/url\(/g,"url(https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/");
    console.log(css);
    GM_addStyle(css);
    let convert=function(str){
        let flag=false;
        let strs=str.split("$");
        let out="";
        for(let i=0;i<strs.length;i++){
            if(flag){
                //如果是公式
                if(!strs[i]){
                    //如果是空白
                    out+="<大型公式>";
                    //console.log(strs[i+1]);
                    i+=2;
                }else{
                    console.log(strs[i]);
                    out+=katex.renderToString(strs[i], {throwOnError: false});
                }
            }else{
                out+=strs[i];
            }
            flag=!flag;
        }
        return out;
    }
    let elements=document.querySelectorAll("p");
    for(let i=0;i<elements.length;i++){
        elements[i].innerHTML=convert(elements[i].innerHTML);
        // console.log(elements[i].innerHTML);
    }
})();
