
# 土豪请使用打码平台
# 360浏览器 plugin.GetSig
> 长久以来360浏览器的抢票插件的稳定性都是很高的，但是他的抢票页面你懂的（麻花疼：这个问题充钱能解决！），代码并不是对360的抢票插件进行破解，研究过他代码的都应该知道，关键方法在这【plugin.GetSig】

>此服务是一个简单的nodejs socket.io服务器，配合页面js进行字符串签名计算！


>流程  
1. 进入项目根目录后，执行“npm i” 安装项目依赖
2. 使用安装了360抢票插件的[抢票浏览器](http://12306.360.cn/) 打开 http://localhost:3000
3. 在github上找一个开源的抢票代码，视自己能力进行代码修改
4. 调用此服务中的/token接口，
   ```
   url: localhost:3000/token
   header:
        Content-Type:application/json
   body:
        {"img_buf":"验证码的base64字符串"} 

   ```
5. 然后使用360接口
   ```
   url: http://check.huochepiao.360.cn/img_vcode
   header:
        Cookie:__huid=11+Xoiv....
        Host:check.huochepiao.360.cn
    body:
        {"img_buf":"/9j/4AAQSkZJ....",
         "type":"D",
         "logon":1,
         "check":"替换这里"
        }       
        
   ```
   使用上面服务返回字符串替换掉body中的【check】
   就能得到 
   ```json
    {"res":"(28,114)"}

   ```
   然后你就能做你先做的事了 :-)


以后可能会更新
    猎豹浏览器
    搜狗浏览器
