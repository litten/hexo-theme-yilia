<p align="center">
    <a href="https://github.com/MOxFIVE/hexo-theme-yelee" target="_blank">
        <img src="http://moxfive.github.io/resources/yelee-mockup.jpg">
    </a>
</p>

&emsp;&emsp;Theme **Yelee** relies on [Hexo-Theme-Yilia][1], thanks for the author [Litten][2]. Fix some bugs, change lots of styles, add several features. And then I made the theme. Yelee is mainly designed for fluent text reading. I change styles and add functions, meanwhile, try hard to keep this theme simple, stupid and clear. Theme DEMO: [MOxFIVE's Blog][3]

[1]: https://github.com/litten/hexo-theme-yilia
[2]: https://github.com/litten
[3]: http://moxfive.xyz

<p align="center">
    <img src="https://img.shields.io/badge/Hexo-v3.1%2B-blue.svg">
    <img src="https://img.shields.io/badge/IE-8%2B-red.svg">
    <a href="https://github.com/MOxFIVE/hexo-theme-yelee/releases" target="_blank">
        <img src="https://img.shields.io/github/release/MOxFIVE/hexo-theme-yelee.svg">
    </a>
    <a href="http://moxfive.xyz" target="_blank">
        <img src="https://img.shields.io/badge/DEMO-MOxFIVE's%20Blog-brightgreen.svg">
    </a>
</p>

<p align="center">
    <a href="http://moxfive.xyz" target="_blank">
        <img src="http://moxfive.github.io/resources/yelee-qrcode.png">
    </a>
</p>

<h3 align="center">
    <a href="http://MOxFIVE.coding.me/yelee" target="_blank">
        Yelee 主题使用说明 [简中]
    </a>
    <br>
    <a href="https://github.com/MOxFIVE/yelee" target="_blank">
        文档 GitHub 仓库
    </a>
</h3>
### Installation

```
git clone https://github.com/MOxFIVE/hexo-theme-yelee.git themes/yelee
```

Change theme field in Hexo root's _config.yml file. 

```
theme: yelee
```

### Update

```
cd themes/yelee
git pull
```

### New Features [DEMO](http://moxfive.xyz/yelee/new-features.html)
| - |                En               |
|:-:|:-------------------------------:|
| 1 |  Flexible table of contents      |
| 2 |  Transparent & Random background |
| 3 |  Scrolling button                |
| 4 |  Copyright info.                 |
| 5 |  Post navigation button          |
| 6 |  Site counter                    |
| 7 |  i18n, multi-language          |
| 8 |  Local Site Search           |
| 9 |  Load Comment dynamically    |

### Configuration

#### Internationalization
Use internationalization to present your site in different languages.

https://hexo.io/docs/internationalization.html

```yaml
# Hexo Configuration
## Docs: http://hexo.io/docs/configuration.html

# Site
language: en
```

##### Available Languages

| Code           | -                     | -        | Contributor(s) |
|----------------|:-----------------------:|:----------:|:--------------:|
| **en**         | English               | 英语     |     MOxFIVE    |
| **zh-Hans**    | Chinese (Simplified)  | 大陆简体 |     MOxFIVE    |
| **zh-Hant-HK** | Chinese (Traditional) | 港澳繁體 |     MOxFIVE    |
| **zh-Hant-TW** | Chinese (Traditional) | 台灣正體 |     MOxFIVE    |

> **Any Contribution is Welcome！**

#### 0. Post Excerpt
There are two ways to show excerpt in homepage. 

- a: <!-- more -->

``` diff
title: Hello World
date: 2015-12-03 00:00:00
---
<Excerpt in index> 
+ <!-- more -->
<The rest of contents文>
```
- b: description in Front-matter

``` diff
title: Hello World
date: 2015-12-03 00:00:00
+ description: "Welcome to Hexo! This is your very first post."
---
<Contents>
```

> Description only support plain text

> Set the value of description with quotes to avoid unexpected error `:`



#### 1. About Page:
cd to your hexo folder and run this code:


```
hexo new page about
```

#### 2. Tags Cloud Page:

```
hexo new page tags
```

> Post with several categories [issue#4](https://github.com/MOxFIVE/hexo-theme-yelee/issues/4) 

#### 3. Background image:

Find or change background images in folder: 

> `/yelee/source/background/`

Setting in `themes/yelee/_config.yml`:

`
background_image: 5
`

- Default value is 5, free to modify the number

- "5": show 5 images form bg-1.jpg to bg-5.jpg in `/yelee/source/background/`

- "0": remove background image and use white-gray theme

> [Saving JPEGs for the Web: Setting Photoshop Up for Progressive JPEGs](http://peteschuster.com/2013/01/saving-jpegs-for-the-web-setting-photoshop-up-for-progressive-jpegs/)

> Optimize images with PhotoShop (JPEG, Quality 0, Progressive)

#### 4. Highlight Style:
Set inline_code to style highlight text & Chose a highlight theme for code block.

```
highlight_style:
  #on: true
  inline_code: 1
  code_block: 1
```

Set `on: true` to enable this feature

highlight theme from https://github.com/chriskempson/tomorrow-theme

#### 5. Comment:
Disqus, duoshuo and youyan is supported, enable ONE of them in theme's "_config.yml".


#### 6. Table of Contents:

Remove toc and the button via putting `toc: false` before "---" at [post].md.

Hide toc in default

> Set `toc: false` in `yelee/_config.yml`. 

(*Set `toc: true` in front-matter to show it in certain post*)


#### 7. Copyright info.:

Hide this via putting `original: false` to post's front-matter.

Hide Copyright info. in default

> Set `copyright: false` in `yelee/_config.yml`. 

(*Set `original: true` in front-matter to show it in certain post*)

#### 8. 404 Page:

```
hexo new page 404
```
And then set `permalink: /404` in `/source/404/index.md` front matter.

#### 9. RSS Feed:

Install plugin: [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

#### 10. Sitemap for SEO:

Install plugin: [hexo-generator-seo-friendly-sitemap](https://github.com/ludoviclefevre/hexo-generator-seo-friendly-sitemap)

Baidu: [hexo-generator-baidu-sitemap](https://github.com/coneycode/hexo-generator-baidu-sitemap)

#### 11. Apple Touch icon:

The Path is `/yelee/source/apple-touch-icon.png`

[Recommended size: 180*180](https://realfavicongenerator.net/blog/apple-touch-icon-the-good-the-bad-the-ugly/)
