![Yelee](
http://moxfive.github.io/resources/yelee-mockup.jpg)

### Introduction 前言

Theme **Yelee** relies on [Hexo-Theme-Yilia][1], thanks for the author [Litten][2]. Fix some bugs, change lots of styles, add several features. And then I made the theme. Yelee is mainly designed for fluent text reading. I change styles and add functions, meanwhile, try hard to keep this theme simple, stupid and clear. Theme DEMO: [MOxFIVE's Blog][6]

> M-Hexo-Blog [Commits][3]; hexo-theme-yelee [Commits][4]; [建站日志][5]

本主题 **Yelee** 基于主题 [Hexo-Theme-Yilia][1] 修改而来，在此感谢原作者 [Litten][2]。修复了一些 bugs，改变了大量的样式，添加了不少特性。对原主题百般折腾后，发觉变动越来越大，索性就发布个新主题了，主题随我微博名叫 "Yelee" 。个人喜欢简洁的样式，重视内容的浏览，同时希望博客作为个人网站，能稍微凸显出博主个性。各种修改折腾大抵基于以上考虑。主题实际效果，请访问本人博客查看：[MOxFIVE's Blog][6]

[1]: https://github.com/litten/hexo-theme-yilia
[2]: http://litten.github.io/ "Litten的博客"
[3]: https://github.com/MOxFIVE/M-Hexo-Blog/commits/master
[4]: https://github.com/MOxFIVE/hexo-theme-yelee/commits/master
[5]: http://moxfive.xyz/2015/08/20/blog-building/ "个人博客站点建设历程"
[6]: http://moxfive.xyz

![QR](http://moxfive.github.io/resources/yelee-qrcode.png)

### Installation 安装主题

```
git clone https://github.com/MOxFIVE/hexo-theme-yelee.git themes/yelee
```

Change theme field in Hexo root's _config.yml file. 修改 Hexo 根目录对应配置文件。

```
theme: yelee
```

### Update 更新

```
cd themes/yelee
git pull
```

### New Features 新特性
| - |            Chs           |                En               |
|:-:|:------------------------:|:-------------------------------:|
| 1 | 嵌入边栏的文章目录       | Flexible table of contents      |
| 2 | 透明化背景，随机背景大图 | Transparent & Random background |
| 3 | 页内跳转按钮             | Scrolling button                |
| 4 | 文章版权等信息显示       | Copyright info.                 |
| 5 | 文章导航切换按钮         | Post navigation button          |
| 6 | 网站计数                 | Site counter                    |
| 7 | 多语言支持                 | i18n, multi-language          |

![feature](http://moxfive.github.io/resources/yelee-features.jpg)

### Configuration 配置

#### Internationalization | 语言切换
Use internationalization to present your site in different languages.

https://hexo.io/docs/internationalization.html

```yaml
# Hexo Configuration
## Docs: http://hexo.io/docs/configuration.html

# Site
language: en
```

##### Available Languages | 目前可用语言

| Code           | -                     | -        | Contributor(s) |
|----------------|:-----------------------:|:----------:|:--------------:|
| **en**         | English               | 英语     |     MOxFIVE    |
| **zh-Hans**    | Chinese (Simplified)  | 大陆简体 |     MOxFIVE    |
| **zh-Hant-HK** | Chinese (Traditional) | 港澳繁體 |     MOxFIVE    |
| **zh-Hant-TW** | Chinese (Traditional) | 台灣正體 |     MOxFIVE    |

> **Any Contribution is Welcome! | 欢迎协助完善翻译！**

#### 0. Post Excerpt 文章摘要
There are two ways to show excerpt in homepage. 

目前主题可使用两种方式在首页显示文章摘要而不是全文。

- a: <!-- more -->

``` diff
title: Hello World
date: 2015-12-03 00:00:00
---
<Excerpt in index | 首页摘要> 
+ <!-- more -->
<The rest of contents | 余下全文>
```
- b: description in Front-matter

``` diff
title: Hello World
date: 2015-12-03 00:00:00
+ description: "Welcome to Hexo! This is your very first post."
---
<Contents>
```

> Description only support plain text. | 通过 description 添加的摘要只能为纯文本。

> Set the value of description with quotes to avoid unexpected error `:`. | description 的内容加双引号，可以避免一些程序错误，例如内容里包含英文冒号时。



#### 1. About Page 关于我页面: 
cd to your hexo folder and run this code:

使用以下代码添加一个新页面：

```
hexo new page about
```

#### 2. Tags Cloud Page 标签云页面:

```
hexo new page tags
```

> Post with several categories 文章设置多个分类后的问题 [issue#4](https://github.com/MOxFIVE/hexo-theme-yelee/issues/4) 

> - [让 Hexo 自动生成 Tag Cloud 标签云页面] (http://moxfive.xyz/2015/10/25/hexo-tag-cloud/)(Yelee 主题已自带，无需查看此教程)

#### 3. Background image 网页背景:

Find or change background images in folder | 修改背景图地址: 

> `/yelee/source/background/`

Setting in `themes/yelee/_config.yml` 背景参数:

`
background_image: 5
`

- Default value is 5, free to modify the number | 默认值为5，可按需修改

- "5": show 5 images form bg-1.jpg to bg-5.jpg in `/yelee/source/background/`

- "5": 设置`/yelee/source/background/`文件夹中 bg-1.jpg 到 bg-5.jpg 这5张图片为背景

- "0": remove background image and use white-gray theme | 取消网页背景图，使用淳朴的灰白主题 

#### 4. Highlight Style | 文本/代码高亮样式:
Set inline_code to style highlight text & Chose a highlight theme for code block.

通过 inline_code 切换内置文本高亮样式，通过 code_block 切换内置代码高亮配色主题。


```
highlight_style:
  #on: true
  inline_code: 1
  code_block: 1
```

Set `on: true` to enable this feature | 移除`#`后自定义样式生效

highlight theme from https://github.com/chriskempson/tomorrow-theme


#### 5. Comment 评论:
Disqus, duoshuo and youyan is supported, enable them in theme's "_config.yml".
主题目前支持 Disqus，多说 及 友言评论，请自行在主题配置中开启。

多说: http://duoshuo.com/create-site/ 登陆你的多说并创建站点，在 "domain" 中填入你设定的域名的前半部分。比如完整域名是: `http://moxfive.duoshuo.com`，只需填入 `moxfive` 即可。请设置好自己专属的多说，不要再群聊了。

> - [保留使用 Yilia 主题时的多说用户评论](https://github.com/MOxFIVE/hexo-theme-yelee/issues/1)

> - [多说样式折腾记录 — 添加 UA 浏览器标识、旋转头像等](http://moxfive.xyz/2015/09/29/duoshuo-style/)

#### 6. Table of Contents 文章目录:

Remove toc and the button via putting `toc: false` before "---" at [post].md.

文章中默认显示目录和对应切换按钮，在文章 “---” 前输入 `toc: false` 关闭目录。

Hide toc in default | 默认不显示目录

> Set `toc: false` in `yelee/_config.yml`. 

(*Set `toc: true` in front-matter to show it in certain post*)


#### 7. Copyright info. 文章版权信息:

Hide this via putting `original: false` to post's front-matter.

在文章顶部插入行 `original: false` 关闭文章版权声明框

Hide Copyright info. in default | 默认不显示版权信息

> Set `copyright: false` in `yelee/_config.yml`. 

(*Set `original: true` in front-matter to show it in certain post*)

#### 8. 404 Page:

```
hexo new page 404
```
And then set `permalink: /404` in `/source/404/index.md` front matter.

> - [在 Hexo 中创建匹配主题的404页面](http://moxfive.xyz/2015/10/16/hexo-404-page/)

#### 9. RSS Feed 文章订阅:

Install plugin: [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

#### 10. Sitemap for SEO 站点地图:

Install plugin: [hexo-generator-seo-friendly-sitemap](https://github.com/ludoviclefevre/hexo-generator-seo-friendly-sitemap)

百度专用: [hexo-generator-baidu-sitemap](https://github.com/coneycode/hexo-generator-baidu-sitemap)

#### 11. Apple Touch icon 苹果图标:

替换路径: `/yelee/source/apple-touch-icon.png`

[Recommended size: 180*180](https://realfavicongenerator.net/blog/apple-touch-icon-the-good-the-bad-the-ugly/)
