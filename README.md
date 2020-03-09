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
scene.add( helper );
```

## <span id="2" class="title">2 顶点概念，几何结构</span>
> 坐标系：X右，Y上，Z外  
> 法线所指发现为亮除  

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