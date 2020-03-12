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
    GM_addStyle(GM_getResourceText("customCSS").replace(/url\(/g,"url(https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/"));
    let convert=function(str){
        let flag=false;
        let strs=str.replace(/\\\n/g,"\\\\").split("$");
        let out="";
        for(let i=0;i<strs.length;i++){
            if(flag){
                if(!strs[i]){
                    console.log(strs[i+1]);
                    out+="</p>"+katex.renderToString(strs[i+1], {throwOnError: false})+"<p>";
                    i+=2;
                }else{
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
        elements[i].innerHTML=convert(elements[i].textContent);
    }
})();
