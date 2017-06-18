hexo-theme-yilia
================

Yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题。
崇尚简约优雅，以及极致的性能。 你可以点击 [我的博客](http://litten.me/) 查看效果。           
 
如果想体验手机浏览效果，可以扫一下二维码：

![litten-qrcode](https://cloud.githubusercontent.com/assets/2024949/6349328/51a067fe-bc64-11e4-881c-f68050c50c28.png)

—————————————————————

**关于主题：**

1. 崇尚简约       
2. 追求移动端体验     
3. 希望把加载速度做到极致（努力中）    
4. 让大家把注意力放到内容上。这是本主题设计初衷      
5. 主题不支持IE6，7，8。以后也不会     

**近期更新（2016.12.04）：**

1. 打赏
2. 搜索
3. “更好的”标签云
4. “更好的”分享
5. 一些动画

**计划中：**

1. TOC
2. 移动端优化
             
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
  随笔: /tags/随笔/

# SubNav
subnav:
  github: "#"
  weibo: "#"
  rss: "#"
  zhihu: "#"
  #qq: "#"
  #weixin: "#"
  #jianshu: "#"
  #douban: "#"
  #segmentfault: "#"
  #bilibili: "#"
  #acfun: "#"
  #mail: "mailto:litten225@qq.com"
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

# 文章太长，截断按钮文字
excerpt_link: more
# 文章卡片右下角常驻链接，不需要请设置为false
show_all_link: '展开全文'
# 数学公式
mathjax: false
# 是否在新窗口打开链接
open_in_new: false

# 打赏
# 请在需要打赏的文章的md文件头部，设置属性reward: true

# 打赏基础设定：0-关闭打赏； 1-文章对应的md文件里有reward:true属性，才有打赏； 2-所有文章均有打赏
reward_type: 2
# 打赏wording
reward_wording: '谢谢你请我吃糖果'
# 支付宝二维码图片地址，跟你设置头像的方式一样。比如：/assets/img/alipay.jpg
alipay: 
# 微信二维码图片地址
weixin: 

# Miscellaneous
baidu_analytics: ''
google_analytics: ''
favicon: /favicon.png

#你的头像url
avatar:

#是否开启分享
share_jia: true

#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key
#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论
duoshuo: false

# 样式定制 - 一般不需要修改，除非有很强的定制欲望…
style:
  # 头像上面的背景颜色
  header: '#4d4d4d'
  # 右滑板块背景
  slider: 'linear-gradient(200deg,#a0cfe4,#e8c37e)'

# slider的设置
slider:
  # 是否默认展开tags板块
  showTags: false
  
# 智能菜单
# 如不需要，将该对应项置为false
# 比如
#smart_menu:
#  friends: false
smart_menu:
  innerArchive: '所有文章'
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


