# 一键复制公式和github公式渲染

推荐环境：`Chrome`+`Tampermonkey`，不保证其他环境的兼容性。

## 一键复制公式

`main.user.js` 目前支持下列网站

| 网站      | 域名                                             | 描述
| --------- | ------------------------------------------------ | ---
| 知乎      | zhihu.com/question/\*<br>zhuanlan.zhihu.com/p/\* |
| wikipedia | wikipedia.org/\*                                 |
| wikiwand  | wikiwand.com/\*                                  |
| CSDN      | blog.csdn.net/\*/article/\*                      | 只支持markdown编写的<br>使用katex渲染的公式

如果你有其他常用的网站欢迎反馈

## github公式渲染

`github.user.js` 渲染github在线预览Markdown中的公式

例如下面这个公式，安装此插件后就能正确显示了，不过脚本还存在一些无法修复的小bug，**渲染结果仅供参考**。

$$e(\vec x,\vec y)=\frac 1n\sum_{i=1}^{n}\exp\left[-\frac 34\frac{(x_i-y_i)^2}{\sigma_i^2}\right]$$
