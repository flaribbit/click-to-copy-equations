// ==UserScript==
// @name         一键复制公式
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Click to copy equation in Wikipedia
// @author       flaribbit
// @match        http://*.wikipedia.org/*
// @match        https://*.wikipedia.org/*
// @match        https://www.zhihu.com/question/*
// @match        https://zhuanlan.zhihu.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.tempbox=document.createElement("input");
    document.body.appendChild(window.tempbox);
    let host=document.location.host;
    let el=document.createElement("style");
    el.innerText="@keyframes aniclick{0%{background:#03A9F400}20%{background:#03A9F47F}100%{background:#03A9F400}}";
    document.head.appendChild(el);
    let clearAnimation=function(){
        this.style.animation="";
    }
    if(host.search('wikipedia')>=0){
        let copyTex=function(){
            window.tempbox.value='$'+this.alt+'$';
            window.tempbox.select();
            document.execCommand('copy');
            this.style.animation="aniclick .4s";
        }
        let eqs=document.getElementsByClassName("mwe-math-fallback-image-inline");
        for(let i=0;i<eqs.length;i++){
            eqs[i].onclick=copyTex;
            eqs[i].addEventListener("animationend",clearAnimation);
            eqs[i].title='点击即可复制公式';
        }
    }else if(host.search('zhihu')>=0){
        let copyTex=function(){
            window.tempbox.value='$'+this.getAttribute("data-formula")+'$';
            window.tempbox.select();
            document.execCommand('copy');
            this.style.animation="aniclick .4s";
        }
        let ref=function(){
            if(document.visibilityState=="visible"){
                let eqs=document.querySelectorAll("img[alt]");
                for(let i=0;i<eqs.length;i++){
                    eqs[i].onclick=copyTex;
                    eqs[i].addEventListener("animationend",clearAnimation);
                    eqs[i].title='点击即可复制公式';
                }
            }
        }
        if(document.location.href.search('question')>=0){
            setInterval(ref,1000);
        }else{
            ref();
        }
    }
})();
