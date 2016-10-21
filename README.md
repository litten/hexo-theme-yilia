hexo-theme-yilia
================

Yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题。
崇尚简约优雅，以及极致的性能。 你可以点击 [我的博客](http://litten.me/) 查看效果。           
 
如果想体验手机浏览效果，可以扫一下二维码：

![litten-qrcode](https://cloud.githubusercontent.com/assets/2024949/6349328/51a067fe-bc64-11e4-881c-f68050c50c28.png)

—————————————————————

关于主题：

1. 我喜欢简约。所以近期文章，搜索框都拿掉了    
2. 接地气一点。所以用上了jiathis分享，友言评论      
3. 追求移动端的体验
3. 让大家把注意力放到内容上。这是本主题设计初衷      
4. 主题不支持IE6，7，8。以后也不会     
             
## 一、外观

####**常规**

![常规](https://cloud.githubusercontent.com/assets/2024949/19027861/92879edc-8967-11e6-8e60-7987b6507c8d.gif)

####**手机**

![手机](https://cloud.githubusercontent.com/assets/2024949/19027020/1c5b756a-895f-11e6-99bf-ddff9687aee0.gif)   

####**ipad横竖屏切换**

![ipad横竖屏切换](https://cloud.githubusercontent.com/assets/2024949/19026392/e74e1816-8957-11e6-8f08-eac9b3c8c036.gif)                    

## 二、开发者

为了性能和开发工程化考虑，Yilia需要使用webpack进行构建生成。

如果您对主题有一些定制化的需求，请参考wiki[《Yilia源码目录结构及构建须知》](https://github.com/litten/hexo-theme-yilia/wiki/Yilia%E6%BA%90%E7%A0%81%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E5%8F%8A%E6%9E%84%E5%BB%BA%E9%A1%BB%E7%9F%A5)

## 三、使用

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

## 四、配置

主题配置文件在主目录下的`_config.yml`，请根据自己需要修改使用。
完整配置例子，可以参考[我的博客备份](https://github.com/litten/BlogBackup)

```
# Header

menu:
  主页: /
  随笔: /tags/随笔

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

# 是否需要修改 root 路径
# 如果您的网站存放在子目录中，例如 http://yoursite.com/blog，
# 请将您的 url 设为 http://yoursite.com/blog 并把 root 设为 /blog/。
root: 

# Content
excerpt_link: more
fancybox: true
mathjax: false

# 是否开启动画效果
animate: true

# 是否在新窗口打开链接
open_in_new: false

# Miscellaneous
google_analytics: ''
favicon: /favicon.png

#你的头像url
avatar:

#是否开启分享
share_jia: true
share_addthis: false

#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key
#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论
duoshuo: false

# 如不需要，将该项置为false
# 比如
#smart_menu:
#  friends: false

smart_menu:
  innerArchive: '所有文章'
  tagcloud: '标签'
  friends: '友链'
  aboutme: '关于我'

friends:
  友情链接1: http://localhost:4000/
  友情链接2: http://localhost:4000/
  友情链接3: http://localhost:4000/
  友情链接4: http://localhost:4000/
  友情链接5: http://localhost:4000/
  友情链接6: http://localhost:4000/

aboutme: 很惭愧<br><br>只做了一点微小的工作<br>谢谢大家
```


