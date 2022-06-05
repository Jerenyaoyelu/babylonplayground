const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
  disableWebGL2Support: false,
});

const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 2, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "https://assets.babylonjs.com/meshes/",
    "both_houses_scene.babylon"
  ).then(() => {
    const h1 = scene.getMeshByName("detached_house");
    h1.position.x = 1;
    h1.rotation.y = -Math.PI / 4;
    const h2 = scene.getMeshByName("semi_house");
    h2.rotation.y = Math.PI / 4;
    h2.position.x = 3;
  });

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
