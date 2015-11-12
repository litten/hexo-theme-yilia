![Yelee](
http://i13.tietuku.com/404b8c63eb155793.jpg)

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

![QR](http://i11.tietuku.com/f9ce6d6bb62921d4.png)

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

![feature](http://i13.tietuku.com/2bfd34c63f627bae.jpg)


### Configuration 配置

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

> - [让 Hexo 自动生成 Tag Cloud 标签云页面](http://moxfive.xyz/2015/10/25/hexo-tag-cloud/)

#### 3. Background image 网页背景:

Change image list in: 修改背景图地址

> `themes/yelee/layout/_partial/background.ejs` 

Remove background image and use white-gray theme by: 

取消网页背景图，使用淳朴的灰白主题 

> `themes/yelee/_config.yml` - `background_image: false`

#### 4. Comment 多说评论:
在 `themes/yelee/_config.yml` 中，按 `duoshuo: duoshuo-key` 填写。

注册多说后，地址前面的就是你的 duoshuo-key http://duoshuo-key.duoshuo.com

> - [保留使用 Yilia 主题时的多说用户评论](https://github.com/MOxFIVE/hexo-theme-yelee/issues/1)

> - [多说样式折腾记录 — 添加 UA 浏览器标识、旋转头像等](http://moxfive.xyz/2015/09/29/duoshuo-style/)

#### 5. Table of Contents 文章目录:

Remove toc and the button via putting `toc: false` before "---" at [post].md.

文章中默认显示目录和对应切换按钮，在文章 “---” 前输入 `toc: false` 关闭目录。

#### 6. Copyright info. 文章版权信息:

Hide this  via putting `original: false` to post's front-matter.

在文章顶部插入行 `original: false` 关闭文章版权声明框

#### 7. 404 Page:

```
hexo new page 404
```
And then set `permalink: /404` in `/source/404/index.md` front matter.

> - [在 Hexo 中创建匹配主题的404页面](http://moxfive.xyz/2015/10/16/hexo-404-page/)

#### 8. RSS Feed 文章订阅:

Install plugin: [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

#### 9. Sitemap for SEO 站点地图:

Install plugin: [hexo-generator-seo-friendly-sitemap](https://github.com/ludoviclefevre/hexo-generator-seo-friendly-sitemap)

百度专用: [hexo-generator-baidu-sitemap](https://github.com/coneycode/hexo-generator-baidu-sitemap)

#### 10. Apple Touch icon 苹果图标:

替换路径: `/yelee/source/apple-touch-icon.png`

[Recommended size: 180*180](https://realfavicongenerator.net/blog/apple-touch-icon-the-good-the-bad-the-ugly/)
