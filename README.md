# 图片拖拽

```javascript 
//拖拽目标函数
draggable="true" //dom开启拖拽效果
ondragstart //拖拽开始
ondragenbd //拖拽结束

//容器监听拖拽对象事件
dragover //拖动对象处于容器内
dragenter //进入
dragleave //离开
drop //松开

//关于append()事件一些事
const fill = document.querySelector(".fill")
const empties = document.querySelectorAll('.empty')
//此时fill只有一个，若使用append后，原来容器的fill会被去掉
empties[1].append(fill) //只有容器1有fill
```