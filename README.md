hexo-theme-yilia
================

hexo-theme-yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题。     
响应式设计，风格简约， 你可以点击 [我的博客](http://litten.github.io/) 查看效果。    

关于主题：

1. 我喜欢简约。所以标签云，搜索框都拿掉了    
2. 接地气一点。所以用上了jiathis分享，友言评论，以及baidu的cdn       
3. 让大家把注意力放到内容上。这是本主题设计初衷      
4. 主题不支持IE6，7，8。以后也不会        


##一、使用

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

##二、外观

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

##三、配置

主题配置文件在主目录下的`_config.yml`：

```
# Header
menu:
  主页: /
  所有文章: /archives
  # 随笔: /tags/随笔

# SubNav
subnav:
  github: "https://github.com/litten"
  weibo: "http://weibo.com/litten225"
  rss: "http://feed.feedsky.com/litten"
  # facebook: "/"
  # google: "/"
  # twitter: "/"
  # linkedin: "/"

rss: /atom.xml

# Content
excerpt_link: more
fancybox: true

# Miscellaneous

favicon: /favicon.png

avatar: "https://avatars2.githubusercontent.com/u/2024949?v=2&s=150"
share: true
duoshuo: true
```
