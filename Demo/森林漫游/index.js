init()
function init(){
  scene = new THREE.Scene()
  initCamera()
  initLight()
  initRender()
  initModel()
  initHelper()
  initPointerLock()
  
  clock = new THREE.Clock()//定义时钟
  animate()
  function animate(){
    render()
    stats.update() //更新性能监视器
    renderer.render(scene,camera)
    requestAnimationFrame(animate)
  }
}

// 初始化辅助工具
function initHelper(){
  // 性能插件
  stats = new Stats()
  stats.setMode(0)
  document.getElementById("Stats-output").appendChild(stats.domElement)
  
  // 坐标轴
  var AxesHelper = new THREE.AxesHelper(1000);
  scene.add(AxesHelper);
  
  // 添加平移控件
  transformControls = new THREE.TransformControls(camera, renderer.domElement)
  scene.add(transformControls)
  
  initControl()
}
function initControl(){
  controls = new THREE.PointerLockControls(camera)
  controls.getObject().position.y = 5
  scene.add(controls.getObject())
  var onKeyDown = function(event){
    event.preventDefault()
    switch (event.keyCode){
      // up/w
      case 38:
      case 87: moveForward = true;break;
      // left/a
      case 37:
      case 65: moveLeft = true; break;
      // down/s
      case 40: 
      case 83: moveBackward = true;break;
      // right/d
      case 39:
      case 68: moveRight = true;break;
      // space(空格)
      case 32: 
        if ( canJump && spaceUp ) 
          velocity.y += upSpeed;
        canJump = false;
        spaceUp = false;
        break;
      // shift
      case 16: speed *= 2;break;
      // ctrl
      case 17: 
        if(controlsEnabled){
          dragControls.enabled = true
          ctrlControl = true
          document.exitPointerLock()
        }
        break
    }
  }
  var onKeyUp = function(event){
    event.preventDefault()
    switch(event.keyCode){
      case 38: 
      case 87: moveForward = false;break;
      case 37:
      case 65: moveLeft = false;break;
      case 40: 
      case 83: moveBackward = false;break;
      case 39: 
      case 68: moveRight = false;break;
      case 32: spaceUp = true;break;
      case 16: speed /= 2;break;
      case 17: 
        if(ctrlControl){
          dragControls.enabled = false
          ctrlControl = false
          element.requestPointerLock()
        }
        break;
    }
  }
  document.addEventListener('keydown',onKeyDown,false)
  document.addEventListener('keyup',onKeyUp,false)
}
function initDrag(objects){
  // 初始化拖拽控件
  dragControls = new THREE.DragControls(objects, camera,renderer.domElement)
  dragControls.enabled = false
  // 鼠标略过事件
  dragControls.addEventListener('hoveron',function(event) {
    if(!draging && controlsEnabled)
      transformControls.attach(event.object) // 生成指示器
  })
  // 开始拖拽
  dragControls.addEventListener('dragstart',function(event){
    draging = true
  })
  // 拖拽结束
  dragControls.addEventListener('dragend',function(event) {
    draging = false
    console.log(event.object.position)
  })
}

//初始化相机
function initCamera(){
  camera = new THREE.PerspectiveCamera(60, width/height,0.1,1000);
  camera.position.set(0,5,0)
}

//实现鼠标锁定
function initPointerLock(){
  instructions = document.querySelector('.instructions')
  menu = document.querySelector('.menu')
  const continueGame = document.querySelector('.menu .continue')
  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document
  if(havePointerLock){
    var pointerlockchange = function(event){
      initMove()
      if(document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element){
        controlsEnabled = true
        controls.enabled = true
      }
      else{
        controls.enabled = false
        if(ctrlControl) return //ctrl控制时跳过下面语句
        controlsEnabled = false
        menu.style.display = 'grid'
        window.onmousemove = ""
      }
    }
    var pointerlockerror = function(){
      instructions.style.display = ''
    }
    // 监听变动事件
    document.addEventListener('pointerlockchange',pointerlockchange,false)
    document.addEventListener('mozpointerlockchange',pointerlockchange,false)
    document.addEventListener('webkitpointerlockchange',pointerlockchange,false)
    document.addEventListener('pointerlockerror',pointerlockerror,false)
    document.addEventListener('mozpointerlockerror',pointerlockerror,false)
    document.addEventListener('webkitpointerlockerror',pointerlockerror,false)
    instructions.addEventListener('click',beginGame,false)
    continueGame.addEventListener('click',beginGame,false)
  }
  else
    instructions.innerHTML = '你的浏览器不支持相关操作，请更换浏览器'
}
function beginGame(){
  instructions.style.display = 'none'
  menu.style.display = 'none'
  //全屏
  launchFullScreen(renderer.domElement)
  // 锁定鼠标光标
  element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock
  element.requestPointerLock()
}

// 初始光源
function initLight(){
  var ambient = new THREE.AmbientLight(0xf4f4f4)
  scene.add(ambient);
  var light = new THREE.DirectionalLight(0xf4f4f4,1)
  light.position.set(150,150,150)
  scene.add(light)
}

// 初始化渲染对象renbder 
function initRender(){
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);//设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
}

// 初始化模型渲染
function initModel(){
  var treeAmount = 100
  var rainAmount = 3000
  var model,texture
  // 创建草地
  model = new THREE.PlaneGeometry(1000,1000)
  texture = new THREE.TextureLoader().load('texture/grass.jpg')
  //设置纹理重复
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(10,10)
  var material = new THREE.MeshLambertMaterial({
    map : texture,
    side: THREE.DoubleSide,
  })
  ground = new THREE.Mesh(model,material)
  ground.rotateX(-Math.PI / 2)
  ground.name = 'ground'
  
  // 创建树木
  treeGroup = new THREE.Group()
  treeGroup.name = "treeGroup"
  texture = new THREE.TextureLoader().load('texture/tree.png')
  for(let i=0;i<treeAmount;i++){
    // 创建树模型
    const tree = new THREE.Sprite(new THREE.SpriteMaterial({
      map : texture
    }))
    // 控制树大小
    tree.scale.set(30,80,10)
    const k1 = Math.random() - 0.5;
    const k2 = Math.random() - 0.5;
    // 设置模型位置，在xoz平面上随机分布
    tree.position.set(900*k1,40, 900*k2)
    treeGroup.add(tree)
  }
  initDrag(treeGroup.children)
  
  // 创建雨滴
  rainGroup = new THREE.Group()
  texture = new THREE.TextureLoader().load('texture/rain.png')
  for(let i=0;i<rainAmount;i++){
    const rain = new THREE.Sprite(new THREE.SpriteMaterial({
      map : texture
    }))
    rain.scale.set(1, 2, 1)
    const k1 = Math.random() - 0.5;
    const k2 = Math.random() - 0.5;
    const k3 = Math.random()
    rain.position.set(900*k1,(1+k3)*50,900*k2)
    rainGroup.add(rain)
  }
  
  scene.add(ground)
  scene.add(treeGroup)
  scene.add(rainGroup)
}
// 雨滴运动动画
function rainDrop(){
  rainGroup.children.forEach(rain => {
    rain.position.y -= 1
    if(rain.position.y < 0){
      const k1 = Math.random() - 0.5;
      const k2 = Math.random() - 0.5;
      const k3 = Math.random()
      rain.position.set(900*k1,(1+k3)*50,900*k2)
    }
  })
}

// 重复渲染
function render(){
  if(!controlsEnabled)  return
  rainDrop() //下雨
  //获取到控制器对象
  var control = controls.getObject()
  //获取刷新时间
  var delta = clock.getDelta()
  //velocity每次的速度，为了保证有过渡
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;
  velocity.y -= 9.8 * 100.0 * delta; // 默认下降的速度
  
  //获取当前按键的方向并获取朝哪个方向移动
  direction.z = Number(moveForward) - Number(moveBackward)//1为前，-1为后
  direction.x = Number(moveLeft) - Number(moveRight)
  //将法向量的值归一化
  direction.normalize()

  //判断鼠标按下的方向
  var m = new THREE.Matrix4()
  if(direction.z > 0){
    if(direction.x > 0)
      m.makeRotationY(Math.PI/4)
    else if(direction.x < 0)
      m.makeRotationY(-Math.PI/4)
    else
      m.makeRotationY(0);
  }
  else if(direction.z < 0){
    if(direction.x > 0)
      m.makeRotationY(Math.PI/4*3)
    else if(direction.x < 0)
      m.makeRotationY(-Math.PI/4*3)
    else
      m.makeRotationY(Math.PI)
  }
  else{
      if(direction.x > 0)
          m.makeRotationY(Math.PI/2)
      else if(direction.x < 0)
          m.makeRotationY(-Math.PI/2)
  }
  //给向量使用变换矩阵
  rotation.applyMatrix4(m);
  horizontalRaycaster.set(control.position,rotation)

  // 判断移动方向修改速度方向
  if (moveForward || moveBackward)
    velocity.z -= direction.z * speed * delta
  if (moveLeft || moveRight) 
    velocity.x -= direction.x * speed * delta
  
  //复制相机的位置
  downRaycaster.ray.origin.copy( control.position )
  
  // 判断是否站在物体上
  var intersections = downRaycaster.intersectObjects([ground],true)
  if(intersections.length > 0){
    velocity.y = Math.max(0, velocity.y)
    canJump = true
  }
  else
    canJump = false
  
  //根据速度值移动控制器
  control.translateX(velocity.x * delta)
  control.translateY(velocity.y * delta)
  control.translateZ(velocity.z * delta)
  
  if(control.position.y < 5){
    control.position.y = 5
    canJump = true
  }
}

// 全屏
function launchFullScreen(element) {
    /*if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }*/
}

// 结束游戏
function overGame(){
  instructions.style.display = ""
  menu.style.display = 'none'
  scene.getObjectByName("treeGroup").remove(treeGroup.getObjectByName("temporary")) //删除模型
}
// 点击菜单
function menuClick(index){
  let texture,textureName,groupName
  let scale = new THREE.Vector3()
  let position = new THREE.Vector3()
  switch(index){
    case 0:[textureName,groupName]=['tree.png','treeGroup'];break
  }
  
  texture = new THREE.TextureLoader().load('texture/'+textureName)
  const mesh = new THREE.Sprite(new THREE.SpriteMaterial({
    map : texture
  }))
  mesh.scale.set(30,80,10)
  mesh.position.set(0,40,0)
  mesh.name = "temporary"
  scene.getObjectByName(groupName).children.push(mesh)
  
  // scene.remove(scene.getObjectByName("temporary")) 删除模型
  beginGame()
  initDrag([mesh])
}

