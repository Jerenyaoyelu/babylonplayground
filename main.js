var canvas = document.getElementById("renderCanvas"); // 得到canvas对象的引用
var engine = new BABYLON.Engine(canvas, true); // 初始化 BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {
  // 创建一个场景scene
  var scene = new BABYLON.Scene(engine);

  // 添加一个相机，并绑定鼠标事件
  // 参数: 名字, alpha, beta, radius, 目标位置position, scene场景实例
  // 弧形旋转相机
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 5, -10),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  // 添加一组灯光到场景
  var light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // var sphere = BABYLON.MeshBuilder.CreateSphere(
  //   "sphere",
  //   { diameter: 2, segments: 32 },
  //   scene
  // );
  // // Move the sphere upward 1/2 its height
  // sphere.position.y = 1;

  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );

  let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
  ground.material = groundMaterial; // 设置物体的材质属性
  // 纹理需要配合材质来使用
  // let groundTexture = new BABYLON.Texture("./ground.png", scene);
  let groundTexture = new BABYLON.Texture(
    Assets.textures.checkerboard_basecolor_png.rootUrl,
    scene
  );
  ground.material.diffuseTexture = groundTexture;

  // 场景加载器夹在gltf模型
  // BABYLON.SceneLoader.ImportMesh(
  //   "",
  //   "./",
  //   "gun.gltf",
  //   scene,
  //   function (newMeshes) {
  //     newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
  //   }
  // );
  BABYLON.SceneLoader.ImportMesh(
    "",
    Assets.meshes.Yeti.rootUrl,
    Assets.meshes.Yeti.filename,
    scene,
    function (newMeshes) {
      newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    }
  );

  return scene;
};

/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function

// 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来
engine.runRenderLoop(function () {
  scene.render();
});

// 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
window.addEventListener("resize", function () {
  engine.resize();
});
