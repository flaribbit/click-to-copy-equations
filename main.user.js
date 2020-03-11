// ==UserScript==
// @name         一键复制wiki公式
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Click to copy equation in Wikipedia
// @author       flaribbit
// @match        http://*.wikipedia.org/*
// @match        https://*.wikipedia.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    window.tempbox=document.createElement("input");
    document.body.appendChild(window.tempbox);
    let copyTex=function(){
        window.tempbox.value='$'+this.alt+'$';
        window.tempbox.select();
        document.execCommand('copy');
    }
    let eqs=document.getElementsByClassName("mwe-math-fallback-image-inline");
    for(let i=0;i<eqs.length;i++){
        eqs[i].onclick=copyTex;
        eqs[i].title='点击即可复制公式';
    }
})();
