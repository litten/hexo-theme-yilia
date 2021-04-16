hexo-theme-yilia
================

Yilia 是为 [hexo](https://github.com/tommy351/hexo) 2.4+制作的主题，改进后支持hexo3.0(个人改进均以PC端页面优先)。
崇尚简约优雅，以及极致的性能。 你可以点击 [我的博客](https://www.luhawxem.com:4000/) 查看效果。           

—————————————————————

**关于主题：**

1. 崇尚简约(个人的修改仍基于崇尚简约的目的)       
2. 追求移动端体验     
3. 希望把加载速度做到极致（努力中）    
4. 让大家把注意力放到内容上。这是本主题设计初衷      
5. 主题不支持IE6，7，8。以后也不会     

**最近更新:**

**2021.04.16**

1. 点击移动端头像现在可以返回首页了
2. 将PC端的smart_menu中的link一并添加到移动端header-menu中

**2021.04.15**

1. 添加categories分类页(原yilia无法支持分类页)，使用方法：

   ```shell
   hexo new page "categories"
   ```

   然后在生成的index.md文件头部新增行`layout: categories`即可

**2021.04.10**

1. 向smart_menu中添加链接功能

**2021.04.08**

1. 修复hexo3.0下作者名及简介栏不显示的问题
2. 删除了已关停的多说及网易云评论，添加utterance评论系统(基于Github Apps)
3. 添加文章底部的版权声明栏
4. 添加不蒜子访问量统计及网站运行时间(于footer.ejs中，请自行修改)
5. 解决了微信分享生成二维码功能失效的问题
6. 添加subNav栏gitee图标链接

**计划中：**

没有计划，用到什么功能就改什么。如果有需要可以在issue中提出，会尽力解决。
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
$ git clone https://github.com/LuHawXem/hexo-theme-yilia-luhawxem.git themes/yilia
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

```
# Header

menu:
  主页: /
  随笔: /tags/随笔/

# SubNav
subnav:
  github: "#"
  gitee: "#"
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
root: /

# Content

# 文章太长，截断按钮文字，建议直接使用show_all_link展开全文阅读，此处设为false表示截断按钮隐藏，截断功能仍保留
excerpt_link: false
# 文章卡片右下角常驻链接，不需要请设置为false
show_all_link: '展开全文'
# 数学公式
mathjax: false
# 是否在新窗口打开链接
open_in_new: false

# 打赏
# 打赏type设定：0-关闭打赏； 1-文章对应的md文件里有reward:true属性，才有打赏； 2-所有文章均有打赏
reward_type: 1
# 打赏wording
reward_wording: '谢谢你请我吃糖果'
# 支付宝二维码图片地址，跟你设置头像的方式一样。比如：/assets/img/alipay.jpg
alipay: 
# 微信二维码图片地址
weixin:

# 版权声明
#在需要进行版权声明的文章的md文件头部，设置属性declare: true。
#版权基础设定：0-关闭声明； 1-文章对应的md文件里有declare: true属性，才有版权声明； 2-所有文章均有版权声明
declare:
  declare_type: 1
  licensee_url: https://creativecommons.org/licenses/by-nc-sa/4.0/        #当前应用的版权协议地址。
  licensee_name: 'CC BY-NC-SA 4.0'                                        #版权协议的名称
  licensee_alias: '知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议'       # alias别名
  licensee_img:    #版权协议的Logo

# 目录
# 目录设定：0-不显示目录； 1-文章对应的md文件里有toc:true属性，才有目录； 2-所有文章均显示目录
toc: 1
# 根据自己的习惯来设置，如果你的目录标题习惯有标号，置为true即可隐藏hexo重复的序号；否则置为false
toc_hide_index: true
# 目录为空时的提示
toc_empty_wording: '目录，不存在的…'

# 是否有快速回到顶部的按钮
top: true

# Miscellaneous
baidu_analytics: ''
google_analytics: ''
favicon: /favicon.png

#你的头像url，存放在当前主体下的/source/img文件夹中
avatar:

#是否开启分享
share_jia: true

#评论：1、畅言；2、Disqus；3、Gitment；4、utterance
#不需要使用某项，直接设置值为false，或注释掉
#具体请参考wiki：https://github.com/litten/hexo-theme-yilia/wiki/

#1、畅言，使用需备案
changyan_appid: false
changyan_conf: false

#2、Disqus 在hexo根目录的config里也有disqus_shortname字段，优先使用yilia的，国外评论软件，需科学上网使用
disqus: false

#3、Gitment，项目停更4年
gitment_owner: false      #你的 GitHub ID
gitment_repo: ''          #存储评论的 repo
gitment_oauth:
  client_id: ''           #client ID
  client_secret: ''       #client secret

#4、utterance
utterance:
  enable: true
  # 仓库名字，格式：你的用户ID/仓库名称
  repo: '#'
  # 主题
  theme: 'github-light'
  # 映射配置
  issue_term: 'title'

#建站时间 
SetUpTime: "#"

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


