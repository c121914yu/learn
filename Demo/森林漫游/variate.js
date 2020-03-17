var scene,camera,renderer
var ground,treeGroup,rainGroup

var stats,controls,clock,transformControls,dragControls

//移动相关的变量
var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var spaceUp = true; //处理一直按着空格连续跳的问题

var ctrlControl = false
var draging = false

//声明射线
var upRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3( 0, 1, 0), 0, 10);
var horizontalRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, 10);
var downRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3( 0, -1, 0), 0, 10);

var velocity = new THREE.Vector3(); //移动速度变量
var direction = new THREE.Vector3(); //移动的方向变量
var rotation = new THREE.Vector3(); //当前的相机朝向

var speed = 500; //控制器移动速度
var upSpeed = 250; //控制跳起时的速度

// DOM节点
var instructions,menu
var element = document.body

// 宽度/高度
var width = window.innerWidth
var height = window.innerHeight

function initMove(){
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;
  spaceUp = true; //处理一直按着空格连续跳的问题
  velocity = new THREE.Vector3() //移动速度变量
  direction = new THREE.Vector3(); //移动的方向变量
}