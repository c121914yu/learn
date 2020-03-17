# Three.js

## <span id="1" class="title">1 基本步骤</span>

>1. 初始化对象
>2. 创建模型
>3. 将模型添加到场景中
>4. 设置光源
>5. 创建相机对象
>6. 渲染对象

### <span id="1-1" class="title">1.1 渲染的基本要素</span>
```javascript
var scene = new THREE.Scene() //实例化场景
var mesh = new THREE.Mesh(model,material) //将模型和材质合成mesh对象
var point = new THREE.PointLight(0xffffff); //点光源
                      DirectionalLight() //平行光
var ambient = new THREE.AmbientLight(0x444444); //环境光
scene.add() //添加至环境中，mesh对象，光源,辅助坐标
var camera = new THREE.OrthographicCamera(); //实例化相机
var renderer = new THREE.WebGLRenderer();//实例化渲染对象
renderer.render(scene, camera); //开始渲染
```
### <span id="1-2" class="title">1.2 全局常用指令</span>
```javascript
var axesHelper = new THREE.AxesHelper(n);//创建辅助坐标系,n为坐标长度
requestAnimationFrame(rorate);//请求再次执行渲染函数rorate，用于重复动画
//创建控件对象,需要配合requestAnimationFrame使模型不断刷新
var controls = new THREE.OrbitControls(camera,renderer.domElement);
//查看光源线
var helper = new THREE.CameraHelper( spotLight.shadow.camera );
```

## <span id="2" class="title">2 顶点概念，几何结构</span>
> 坐标系：X右，Y上，Z外  
> 当法线与光线相对时才会高亮  

### <span id="2-1" class="title">2.1 Buffer对象</span>
```javascript
new THREE.BufferGeometry() //创建一个buffer对象  
new Float32Array([]) //定义坐标数组,顶点/颜色/法线  
new THREE.BufferAttribute(name, n) //将坐标按n个一组划分  
BufferGeometry.attributes.position //设置位置属性  
BufferGeometry.attributes.color // 访问几何体顶点颜色数据  
BufferGeometry.attributes.normal // 访问几何体顶点法向量数据    
var indexes = new Uint16Array([]) // Uint16Array类型数组创建顶点索引数据  
BufferGeometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组 
```

### <span id="2-2" class="title">2.2 Geometry对象</span>
```javascript
new THREE.Geometry() //创建对象  
new THREE.Vector3(x, y, z); //定义顶点坐标  
Geometry.vertices.push(p1, p2...) //推送坐标至数组中  
new THREE.Face3(0, 1, 2); //以0,1,2三个坐标形成平面  
var n1 = new THREE.Vector3(0, 0, -1); //为n1设置法线  
face1.vertexNormals.push(n1,n2,n3); //face1推送顶点法线  
face1.normal=new THREE.Vector3(0, 0, -1);//face1直接设置法线
face1.color = new THREE.Color(0xffff00) //face1设置颜色
face2.vertexColors = [//face2每个顶点设置颜色
  new THREE.Color(0xffff00),
  new THREE.Color(0xff00ff),
  new THREE.Color(0x00ffff),
]
```

### <span id="2-3" class="title">2.3 访问模型数据</span>
```javascript
//体模型
geometry.vertices //点
geometry.colors //颜色
geometry.faces //面,abc顶点1，2，3索引

//面模型
geometry.attributes.position //顶点位置
geometry.attributes.color //顶点颜色
geometry.attributes.normal //顶点法向量
geometry.attributes.uv //纹理贴图uv坐标
geometry.attributes.uv2 //光照贴图uv2坐标
geometry.index //顶点索引数据
```

### <span id="2-4" class="title">2.4 几何体旋转缩放平移</span>
geometry进行变化与mesh对象进行变化可实现相同效果，但是mesh变化不改变坐标，而geometry变化改变坐标
```javascript
geometry.scale(x,y,z) //缩放
geometry.translate(x,y,z) //平移
geometry.center() //居中
geometry.rotateX(angle) //X轴旋转
geometry.rotateY(angle) 
geometry.rotateZ(angle) 
```

## <span id="3" class="title">3 材质</span>
```javascript
/* 渲染方式 */
new THREE.
//点
PointsMaterial({
  color : 0x0000ff,
  size : 3
})

//线
LineBasicMaterial({//基础线
  color : 0x0000ff,//固定颜色
  //以顶点颜色为准,通常用于渐变，不能与color同时用
  vertexColors: THREE.VertexColors,
}) 
LineDashedMaterial({//虚线
  color : 0x0000ff,//固定颜色
  //以顶点颜色为准,通常用于渐变，不能与color同时用
  vertexColors: THREE.VertexColors,
  dashSize: 10,//显示线段的大小。默认为3。
  gapSize: 5,//间隙的大小。默认为1
}) 

//渲染面
MeshBasicMaterial //基础网格
MeshLambertMaterial({ //Lambert材质，暗淡，漫反射
  specular:0x444444,//高光部分的颜色
  shininess:20,//高光部分的亮度，默认30
})
MeshPhongMaterial({//Phong材质，高亮，镜面反射
  specular:0x444444,//高光部分的颜色
  shininess:20,//高光部分的亮度，默认30
}) 
MeshStandardMaterial/MeshPhysicalMaterial //PBR材质，比MeshPhongMaterial好
MeshDepthMaterial //网格深度材质
MeshNormalMaterial //网格向量材质

//构建方式
new THREE.
  Points(geometry, material)//点
  Line(geometry, material)//线
  LineLoop(geometry, material)//线，会把第一个和最后一个点连起来
  LineSegments(geometry, material)//线，只会两两组合，不共点
  Mesh(geometry, material)//网格
  
//对象属性
{
  color : 0x..... //以固定颜色渲染
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  
  size: 10.0 //点对象像素尺寸
  // 前面FrontSide  背面：BackSide 双面：DoubleSide
  side: THREE.DoubleSide,
  
  // transparent设置为true，开启透明，否则opacity不起作用
  transparent: true,
  // 设置材质透明度
  opacity: 0.4,
  
  wireframe:true,//网格模型以线条的模式渲染
}
```
## <span id="4" class="title">4 mesh对象</span>
```javascript
var mesh = new THREE.Mesh(model,material) //将模型和材质合成mesh对象
mesh.rotateZ(0.01);//每次绕Z轴旋转0.01弧度
mesh.translateY(120); //模型沿Y轴正方向平移120
mesh.position.set(120,0,0);//设置模型对象的顶点xyz坐标为120,0,0
mesh.clone()//复制
mesh.copy() //复制属性，本来就建立了对象才能复制
mesh.castShadow = true;//设置产生阴影,还需配置投影面，具体看5.2
mesh.name = "" //为模型添加name标记
```

## <span id="5" class="title">5 光源</span>
### <span id="5-1" class="title">5.1 4种光源</span>
```javascript
//属性
color //颜色
intensity //强度

position //位置
target //方向,可以是坐标，也可是一个mesh对象
angle //夹角

//环境光，无特定方向，亮度相同,通常不会只用环境光
AmbientLight
 
//平行光,位置代表夹角，还需要指定方向，不指定默认指向0，0，0
DirectionalLight 

//点光源，被直射的地方亮，背面暗,向四周发散所以只需要设置方向，
PointLight 

//聚光灯,需设置位置，角度，方向，当角度（PI/n）
SpotLight 
```

> 颜色计算方式
> R2 = R1 * R0 * cosθ  
> G2 = G1 * G0 * cosθ  
> B2 = B1 * B0 * cosθ  
> 当模型为白色时显示颜色以环境光和光源色为准

### <span id="5-2" class="title">5.2 阴影效果</span>
```javascript
//1. 设置产生投影的对象
mesh.castShadow = true;

//2. 设置接收投影的平面
var planeGeometry = new THREE.PlaneGeometry(x, y)
//调整平面位置至模型底部
planeMesh.receiveShadow = true;

//3. 设置光源产生阴影
light.castShadow = true;
light.shadow.camera.far = 300;//光线距离
//平行光扩张，原本只有窄窄的一个点
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.mapSize.set(1024,1024)//阴影清晰

//4. 允许渲染阴影
renderer.shadowMap.enabled = true;
```

## <span id="6" class="title">6 层级结构</span>
```javascript
var group = new THREE.Group();
group.add(mesh1，mesh2);//将mesh1，mesh2构成一个group，变化group可同时改变两个模型的属性
group.remove(mesh2)//将mesh2移除
group.children //查看group的子元素

group.traverse(obj => {}) //遍历group对象,scene也是一个group
group.getObjectById(n) //查找id=n的元素
group.getObjectByName(m) //查找name=m的元素
```

> 本地坐标与世界坐标
> 本地坐标是模型相对于坐标系
> 世界坐标是模型相对于组 + 组相对于坐标系，没有组时两者相同

## <span id="7" class="title">7 几何图形与曲线</span>
### <span id="7-1" class="title">7.1 基础api</span>
```javascript
//声明一个几何体对象Geometry
var geometry = new THREE.Geometry(); 
var points = line.getPoints(50);//分段数50，返回51个顶点
geometry.setFromPoints(points);//在模型中由点绘制曲线
```

### <span id="7-2" class="title">7.2 曲线绘制</span>
```javascript
//圆弧线
var line = new THREE.ArcCurve(X,Y,R,startAngle,endAngle,是否顺时针（默认false）)
//样条曲线,自动圆滑绘制
var line = new THREE.CatmullRomCurve3([new THREE.Vector3(-50, 20, 90)..])
//赛贝尔曲线，p1,p3为起始点，p2控制点
var line = new THREE.QuadraticBezierCurve3(p1, p2, p3)
//组合曲线
CurvePath.curves.push(line1,line2...)
```

### <span id="7-3" class="title">7.3 成型方式</span>
```javascript
//管道成型
var geometry = new THREE.TubeGeometry(路径,轨迹细分数,管道半径, 管道截面圆细分,是否闭合);
//旋转成型
var geometry = new THREE.LatheGeometry(点, 细分数, 起始角度, 旋转角度)
//拉伸成型
var geometry = new THREE.ExtrudeGeometry({
  shape,//二维轮廓
  {//参数
    amount : 长度
    bevelEnabled : 有无倒角（圆角弧度）
    bevelSegments : 倒角细分数
    bevelThickness ： 倒角尺寸（径向）
    bevelSize ： 倒角尺寸（拉伸方向）
    curveSegments ： 拉伸轮廓细分数
    steps ： 拉伸方向细分数
    extrudePath ： 扫描的方向
    material ： 前后面材质索引号
    extrudeMaterial ： 拉伸面，倒角面材质索引号
  }
})
```

### <span id="7-4" class="title">7.4 shape对象</span>
```javascript
var geometry = new THREE.ShapeGeometry(shape,填充数)//shape也可以是数组
//1. 填充顶点轮廓
var points = [
  new THREE.Vector2(-50, -50),
  new THREE.Vector2(-60, 0),
  new THREE.Vector2(0, 50),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(50, -50),
  new THREE.Vector2(-50, -50),
]  
var shape = new THREE.Shape(points);//5边行自动割成三角形
//2. 圆弧填充
var shape = new THREE.Shape();
shape.absarc(0,0,100,0,2*Math.PI);//圆弧轮廓,填充数需要够大
//3. 画笔
var shape = new THREE.Shape();
// 四条直线绘制一个矩形轮廓
shape.moveTo(0,0);//起点
shape.lineTo(0,100);//第2点
shape.lineTo(100,100);//第3点
shape.lineTo(100,0);//第4点
shape.lineTo(0,0);//第5点
//4. 内外轮廓
//外轮廓
shape.absarc(0, 0, 100, 0, 2 * Math.PI);
// 内轮廓1
var path1 = new THREE.Path();
path1.absarc(0, 0, 40, 0, 2 * Math.PI);
shape.holes.push(path1, path2...);
```

## <span id="8" class="title">8 纹理贴图</span>
### <span id="8-1" class="title">8.1 贴图加载</span>
```javascript
//直接使用纹理加载器
var textureLoader = new THREE.TextureLoader();
textureLoader.load(url,(texture) => {//返回纹理
  var material = ...{
    map : texture
  }
})
//使用图片加载器
var ImageLoader = new THREE.ImageLoader();
ImageLoader.load(url,(img) => {
  var texture = new THREE.Texture(img);
  // 下次使用纹理时触发更新
  texture.needsUpdate = true;
})
```

### <span id="8-2" class="title">8.2 UV坐标</span>
```javascript
var geometry = new THREE.PlaneGeometry(204, 102, 4, 4);
var t0 = new THREE.Vector2(0,0);//图片左下角
var t1 = new THREE.Vector2(1,0);//图片右下角
var t2 = new THREE.Vector2(1,1);//图片右上角
var t3 = new THREE.Vector2(0,1);//图片左上角
uv1 = [t0,t1,t2];//选中图片一个三角区域像素——映射到三角面1
uv2 = [t0,t2,t3];//选中图片一个三角区域像素——映射到三角面2
geometry.faceVertexUvs[0][4] = uv1
geometry.faceVertexUvs[0][5] = uv2
```

### <span id="8-3" class="title">8.3 材质数组与材质索引</span>
```js
var materialArr = [material1,material2,material3,...]
//材质索引
geometry.faces.forEach(elem => {
  console.log(elem.materialIndex );
})
//材质索引与数组下标对应
```

### <span id="8-4" class="title">8.4 纹理对象变化</span>
```js
//阵列模式
texture.wrapS = THREE.RepeatWrapping //横向重复
texture.wrapT = THREE.RepeatWrapping //纵向重复
texture.repeat.set(4, 2) //横向4次，纵向2次
//位移
texture.offset = new THREE.Vector2(0.3, 0.1)
//旋转
texture.rotation = Math.PI/4
texture.center.set(0.5,0.5) //选中中心
```

### <span id="8-5" class="title">8.5 法线贴图</span>
```js
var material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  map : texture, //普通纹理图
  normalMap: textureNormal, //法线贴图
  //设置深浅程度，默认值(1,1)。
  normalScale: new THREE.Vector2(3, 3),
  bumpScale:3,//设置凹凸高度，默认值1。
  shininess: 30,//高光部分的亮度，默认30
  specularMap: textureSpecular, //高光贴图
  envMap: CubeTexture, //设置环境贴图
  // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
  reflectivity: 0.1,
})
```

## <span id="9" class="title">9 相机</span>
```js
//正投影相机
OrthographicCamera( left, right, top, bottom, near, far )
/*
  left : 左边界
  right ：右边界
  top ：上边界
  bottom ： 下边界
  near ：距离多远开始渲染（一般很小）
  far ：表示距离多远结束渲染（太小看不到）
*/
PerspectiveCamera( fov, aspect, near, far )
/*
  fov : 能看到的角度范围，游戏一般60-90
  aspect : 渲染窗口比例
  near ：多远开始渲染
  far ：结束渲染位置
*/
camera.updateProjectionMatrix () //更新相机数据
//相机位置设置
camera.position.x
camera.position.y
camera.position.z
camera.lookAt()//需要重置下朝向
```

## <span id="10" class="title">10 精灵系统</span>
### <span id="10-1" class="title">10.1 sprite对象</span>
sprite对象类似贴图的形式，但它也是一个对象，只需要材质，不需要geometry  
关于用途，你可以在三维场景中把精灵模型作为一个模型的标签，标签上可以显示一个写模型的信息，你可以通过足够多的精灵模型对象，构建一个粒子系统，来模拟一个下雨、森林、或下雪的场景效果。
```js
var texture = new THREE.TextureLoader().load("sprite.png")//加载贴图
var spriteMaterial = new THREE.SpriteMaterial({
  color:0xff00ff,//设置精灵矩形区域颜色
  map: texture,//设置精灵纹理贴图
  // rotation : Math.PI / 4,//旋转图片
})
var sprite = new THREE.Sprite(spriteMaterial);
scene.add(sprite);
sprite.scale.set(x,y) //缩放(类似设置x，y长度)
sprite.position.set(x,y,z)位置
```

## <span id="11" class="title">11 关键帧动画</span>
> API
> new THREE.KeyframeTrack('模型name.属性',times, values) times与values为数组
> new THREE.AnimationClip("name", duration, [key1, key2, key2] 多个帧动画创建一个clip对象
> new THREE.AnimationMixer(group)  group合成mixer对象
> mixer.clipAction(clip) 剪辑clip的参数，返回action对象
> AnimationAction.timeScale = 20 播放速率
> AnimationAction.loop = THREE.LoopOnce 不循环播放
> AnimationAction.clampWhenFinished=true 停留在最后一帧
> AnimationAction.paused  暂停判断
> AnimationAction.play() 播放
> AnimationAction.time 开始时间,结束时间用clip.duration控制
> var clock = new THREE.Clock() 时钟对象
> mixer.update(clock.getDelta()) 更新混合器相关的时间

```js
// 创建模型组，注意name，与后续配置一致
mesh1.name = "Box"
mesh2.name = "Sphere"
group.add(mesh1)
group.add(mesh2)

// 编辑group子元素的帧动画.
var values = [0,0,0,200,0,0]//与时间点对应的值组成的数组
var times = [0,15]
// 创建位置关键帧对象：0时刻对应0，0，0； 10时刻对应200，0，0
var posTrack = new THREE.KeyframeTrack('Box.position',times,values)
// 创建颜色关键帧
var colorKF = new THREE.KeyframeTrack('Box.material.color', [5, 15], [0, 1, 0,0 , 0.5, 1])
// 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
var scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3])

// duration决定了默认的播放时间，一般取所有帧动画的最大时间
var duration = 20;
// 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
var clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, scaleTrack]);

// 播放编辑好的关键帧数据
var mixer = new THREE.AnimationMixer(group)
// 剪辑clip错位参数
var AnimationAction = mixer.clipAction(clip)
// 通过操作Action设置播放方式(类似速度，越大效果越快)
AnimationAction.timeScale = 20
//不循环播放(默认是循环播放)
AnimationAction.loop = THREE.LoopOnce;
//暂停在最后一帧播放的状态
AnimationAction.clampWhenFinished=true;
// 暂停状态，修改后可暂停或继续播放
AnimationAction.paused = boolean
// 动画开始时间
AnimationAction.time = Number
AnimationAction.play();

render(){
  // 创建一个时钟对象Clock
  var clock = new THREE.Clock();
  // 更新混合器相关的时间
  mixer.update(clock.getDelta());
  stats.update()//更新帧率检测
}

// 帧率检测器
var stats = initStats()
//初始化统计对象
function initStats() {
  var stats = new Stats();
  //设置统计模式
  stats.setMode(0); // 0: fps, 1: ms
  //统计信息显示在左上角
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  //将统计对象添加到对应的<div>元素中
  document.getElementById("Stats-output").appendChild(stats.domElement);
  return stats;
}
```
## <span id="12" class="title">12 音频模块</span>
### <span id="12-1" class="title">12.1 共同步骤</span> 
```js
// 创建一个监听者
var listener = new THREE.AudioListener()
// 创建一个音频加载器
var audioLoader = new THREE.AudioLoader()
audioLoader.load('dog.Ogg',buffer => {
  // 音频缓冲区对象关联音频对象
  audio.setBuffer(buffer)
  audio.setLoop(false)//循环
  audio.setVolume(0.50)
  PosAudio.setRefDistance(100) // 位置音频必备
  audio.play()// 播放
})
```

### <span id="12-2" class="title">12.2 非位置音频</span> 
不受位置影响
```js
// 创建一个非位置音频对象
var audio = new THREE.Audio(listener)
// 加载
```
### <span id="12-3" class="title">12.3 位置音频</span> 
受监听者与音频位置影响
```js
// 创建音频网格对象
var audioMesh = new THREE.Mesh(geometry,material)
// 设置对象位置（音频位置）
audioMesh.position.set(0,300,0)
// 创建一个位置音频对象
var PosAudio = new THREE.PositionalAudio(listener)
// 音源绑定在模型上
audioMesh.add(PosAudio)
// 加载
// 加载需包含 PosAudio.setRefDistance(100) 代表离相机多远接受音频
```
### <span id="12-4" class="title">12.4 音频属性</span> 
> analyser = new THREE.AudioAnalyser(audio) // 创建音频分析器（音频加载完毕后）
> analyser.getFrequencyData() // 返回傅里叶变换得到的所有频率
> analyser.getAverageFrequency() //返回平均音频

## <span id="13" class="title">13 模型加载</span>
> API总结  
> JSON.stringify(mesh/group/scene,"","\t") - 导出模型  
> new THREE.ObjectLoader() - 可加载导出的json模型，和obj模型  
> new THREE.MTLLoader() - mtl材质文件加载器  
> new THREE.FBXLoader() - fbx模型加载器
### <span id="13-1" class="title">13.1 导出模型</span> 
```js
// 以json数据形式导出，前两个不常用。
const jsonGeometry = JSON.stringify(geometry,"","\t")
const jsonMaterial = JSON.stringify(material,"","\t")
const jsonMesh = JSON.stringify(mesh,"","\t")
const jsonGroup = JSON.stringify(group,"","\t")
const jsonScene = JSON.stringify(scene,"","\t")
```
### <span id="13-2" class="title">13.2 加载json模型</span> 
```js
var loader = new THREE.ObjectLoader()//可加载mesh，group，scene
//加载mesh
loader.load('./json/jsonMesh.json',mesh => {
  scene.add(mesh)
})
//加载group
loader.load('./json/jsonGroup.json',group => {
  scene.add(group)
})
//加载场景
loader.load('./json/jsonScene.json',res => {
  scene = res
})
```
### <span id="13-3" class="title">13.3 加载obj模型</span>
```js
var OBJLoader = new THREE.OBJLoader();//模型文件加载器
var MTLLoader = new THREE.MTLLoader();//材质文件加载器
// 加载材质
MTLLoader.load('./obj/city.mtl', materials => {
  OBJLoader.setMaterials(materials);
  // 加载模型
  OBJLoader.load('./obj/city.obj',obj => {
    console.log(obj)
    obj.children[0].material.normalScale.set(3, 3)
    scene.add(obj)
  })
})
```
### <span id="13-4" class="title">13.4 加载fbx动画模型</span>
```js
var loader = new THREE.FBXLoader()
var mixer = null //声明一个混合器变量
loader.load('fbx/Samba Dancing.fbx',obj => {
  scene.add(obj)
  // 查看动画
  console.log(obj.animations)
  // 解析动画
  // obj作为参数创建一个混合器，解析播放obj及其子对象包含的动画数据
  mixer = new THREE.AnimationMixer(obj)
  var AnimationAction=mixer.clipAction(obj.animations[0]);
  AnimationAction.timeScale = 1; //默认1，可以调节播放速度
  //AnimationAction.loop = THREE.LoopOnce; //不循环播放
  //AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
  AnimationAction.play()//播放动画
})
// render部分
mixer.update(clock.getDelta());
``` 