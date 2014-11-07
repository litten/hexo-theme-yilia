hexo-theme-yilia
================

hexo-theme-yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题。     
响应式设计，风格简约， 你可以点击 [我的博客](http://litten.github.io/) 查看效果。            
如有问题或需求，请提issue给我；或在这篇文章下留言[Hexo主题Yilia](http://litten.github.io/2014/08/31/hexo-theme-yilia/)。我都会看到并处理。

关于主题：

1. 我喜欢简约。所以近期文章，搜索框都拿掉了    
2. 接地气一点。所以用上了jiathis分享，友言评论，以及baidu的cdn       
3. 让大家把注意力放到内容上。这是本主题设计初衷      
4. 主题不支持IE6，7，8。以后也不会        

##一、近期更新

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
  facebook: "#"
  # google: "#"
  # twitter: "#"
  # linkedin: "#"

rss: /atom.xml

# Content
excerpt_link: more
fancybox: true

# Miscellaneous

favicon: /favicon.png

#你的头像
avatar: "https://avatars2.githubusercontent.com/u/2024949?v=2&s=150"
#是否开启分享
share: true
#是否开启多说评论，填写你在多说申请的项目名称
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
##五、同步你的instagram图片

如果喜欢instagram，Yilia可以帮助您同步图片。
（目前由于HongKong问题，ins被禁…暂不可用）

1. 新建页面

    执行命令：
    ```
    hexo new page "instagram"
```
2. 修改文件

	在目录**yourBlog\source\instagram**下，修改index.md内容为：
    ```
    ---
    layout: post
    slug: "instagram"
    title: "相册"
    noDate: "true"
    ---

    <div class="instagram" data-client-id="956dd096b6e5496aba6662165b9b8443" data-user-id="438522285">
        <a href="http://instagram.com/litten225" target="_blank" class="open-ins">图片来自instagram，正在加载中…</a>
    </div>
    <script src="/js/jquery.lazyload.js"></script>
    <script src="/js/instagram.js"></script>
    ```
    注意其中的**data-client-id**属性，是你instagram上的client-id(不是用户id)。                    
    具体可到[instagram-manage](http://instagram.com/developer/clients/manage/)网站上去获得。                       
    **data-user-id**属性，需要到[lookup-user-id](http://jelled.com/instagram/lookup-user-id#)查找并填写。                          
    
    有了这两个参数，就可以获取到instagram的图片了。                        
    
    如遇到疑问，也可以参考这篇文章[《instagram图片拉取小经验》](http://litten.github.io/2014/03/03/instagram-api-ex/)并留言。
    
    另外，Yilia实现了图片异常处理，会将instagram图片的cdn路径替换成源服务器路径。因而你不必担心图片在天朝被墙的情况。

