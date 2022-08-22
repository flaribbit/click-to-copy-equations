// ==UserScript==
// @name         一键复制公式
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Click to copy equation in Wikipedia
// @author       flaribbit
// @match        http://*.wikipedia.org/*
// @match        https://*.wikipedia.org/*
// @match        http://www.wikiwand.com/*
// @match        https://www.zhihu.com/question/*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://blog.csdn.net/*/article/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const host = document.location.host;
    const el = document.createElement('style');
    el.innerText = '@keyframes aniclick{0%{background:#03A9F400}20%{background:#03A9F47F}100%{background:#03A9F400}}';
    document.head.appendChild(el);
    const clearAnimation = function () {
        this.style.animation = '';
    }
    if (host.search('wikipedia') >= 0 || host.search('wikiwand') >= 0) {
        const copyTex = function () {
            navigator.clipboard.writeText('$' + this.alt + '$');
            this.style.animation = 'aniclick .4s';
        }
        const eqs = document.querySelectorAll('.mwe-math-fallback-image-inline, .mwe-math-fallback-image-display');
        for (let i = 0; i < eqs.length; i++) {
            eqs[i].onclick = copyTex;
            eqs[i].addEventListener('animationend', clearAnimation);
            eqs[i].title = '点击即可复制公式';
        }
    } else if (host.search('zhihu') >= 0) {
        const copyTex = function () {
            navigator.clipboard.writeText('$' + this.getAttribute('data-tex') + '$');
            this.style.animation = 'aniclick .4s';
        }
        const check_equations = function () {
            if (document.visibilityState == 'visible') {
                const eqs = document.querySelectorAll('.ztext-math');
                for (let i = 0; i < eqs.length; i++) {
                    const inner_element = eqs[i].querySelector('.MathJax_SVG');
                    if (!inner_element) continue;
                    inner_element.onclick = copyTex;
                    inner_element.addEventListener('animationend', clearAnimation);
                    inner_element.title = '点击即可复制公式';
                }
            }
        }
        if (document.location.href.search('question') >= 0) {
            setInterval(check_equations, 1000);
        } else {
            check_equations();
        }
    } else if (host.search('blog.csdn') >= 0) {
        const copyTex = function () {
            navigator.clipboard.writeText('$' + this.querySelector('annotation').textContent.trim() + '$');
            this.style.animation = 'aniclick .4s';
        }
        const eqs = document.querySelectorAll('.katex');
        for (let i = 0; i < eqs.length; i++) {
            eqs[i].onclick = copyTex;
            eqs[i].addEventListener('animationend', clearAnimation);
            eqs[i].title = '点击即可复制公式';
        }
    }
})();
