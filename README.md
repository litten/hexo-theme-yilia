hexo-theme-yilia
================

Yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题。
崇尚简约优雅，以及极致的性能。 你可以点击 [我的博客](http://litten.github.io/) 查看效果。           
 
如遇到问题或有需求，可以：
* 提issue给我
* 在这篇文章下留言[Hexo主题Yilia](http://litten.github.io/2014/08/31/hexo-theme-yilia/)
* 移动端问题留言[Yilia在移动端适配的一些事](http://litten.github.io/2015/02/23/yilia-on-mobile/)

我都会看到并处理。

如果你想体验手机浏览效果，可以扫一下二维码：

![litten-qrcode](https://cloud.githubusercontent.com/assets/2024949/6349328/51a067fe-bc64-11e4-881c-f68050c50c28.png)

—————————————————————

关于主题：

1. 我喜欢简约。所以近期文章，搜索框都拿掉了    
2. 接地气一点。所以用上了jiathis分享，友言评论，以及baidu的cdn       
3. 追求移动端的体验
3. 让大家把注意力放到内容上。这是本主题设计初衷      
4. 主题不支持IE6，7，8。以后也不会        

##一、近期更新

2015.2.21 - 移动侧重构&布局bug修改
2014.11.7 - 增加“友情链接”“关于我”               
2014.10.22 - 优化fancybox展示               
2014.10.16 - 增加表格样式                 
2014.9.19 - 云标签挂件                 

##二、使用

#### 安装

``` bash
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```

#### 配置

修改hexo根目录下的 `_config.yml` ： `theme: yilia`

#### 更新

``` bash
cd themes/yilia
git pull
```

##三、外观

####**宽屏**
![宽屏](http://littendomo.sinaapp.com/yilia/yilia-pc1.png)        

####**宽屏文字**
![宽屏文字](http://littendomo.sinaapp.com/yilia/yilia-pc2.png)   

####**窄屏**
![窄屏](http://littendomo.sinaapp.com/yilia/yilia-pc3.png)     

####**同步instagram**
![同步instagram](http://littendomo.sinaapp.com/yilia/yilia-pc4.png)

####**移动端**
![移动端](http://littendomo.sinaapp.com/yilia/yilia-mobile.png)
![移动端](http://littendomo.sinaapp.com/yilia/yilia-mobile2.png)   

##四、配置

主题配置文件在主目录下的`_config.yml`：

```
# Header
menu:
  主页: /
  所有文章: /archives
  # 随笔: /tags/随笔

# SubNav
subnav:
  github: "#"
  weibo: "#"
  rss: "#"
  zhihu: "#"
  #douban: "#"
  #mail: "#"
  #facebook: "#"
  #google: "#"
  #twitter: "#"
  #linkedin: "#"

rss: /atom.xml

# Content
excerpt_link: more
fancybox: true
mathjax: true

# Miscellaneous
google_analytics: ''
favicon: /favicon.png

#你的头像url
avatar: ""
#是否开启分享
share: true
#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key
#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论
duoshuo: true
#是否开启云标签
tagcloud: true

#是否开启友情链接
#不开启——
#friends: false
#开启——
friends:
  奥巴马的博客: http://localhost:4000/
  卡卡的美丽传说: http://localhost:4000/
  本泽马的博客: http://localhost:4000/
  吉格斯的博客: http://localhost:4000/
  习大大大不同: http://localhost:4000/
  托蒂的博客: http://localhost:4000/

#是否开启“关于我”。
#不开启——
#aboutme: false
#开启——
aboutme: 我是谁，我从哪里来，我到哪里去？我就是我，是颜色不一样的吃货…
```
##五、其他

[同步你的instagram图片](https://github.com/litten/hexo-theme-yilia/wiki/%E5%90%8C%E6%AD%A5%E4%BD%A0%E7%9A%84instagram%E5%9B%BE%E7%89%87)
