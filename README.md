# 随机密码生成器

```javascript 
String.fromCharCode(number) //根据ascii码值返回对应字符
+String //可以将number类型的string转换成number类型
Object.keys(obj) //获取到obj里每个key
Object.values(obj) //获取到obj里每个key的值，以数组形式返回
object[key] //相当于object.key的值，key可为变量
string.slice() //字符串截取

//复制文本的思路
textarea = document.createElement('textarea') //创建textarea元素
textarea.value = text //将文本赋值给textarea
document.body.appendChild(textarea) //添加到body中
textarea.select() //选择文本
document.execCommand('copy') //复制
textarea.remove() //移除textarea
```