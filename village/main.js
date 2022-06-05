const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
  disableWebGL2Support: false,
});

const buidGround = (scene) => {
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene
  );

  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  ground.material = groundMat;
};

const buildWalls = (name, scene) => {
  // 墙面门窗
  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //back face
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
  faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
  faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  const box = BABYLON.MeshBuilder.CreateBox(
    name,
    { faceUV, wrap: true },
    scene
  );

  box.position.y = 0.75;
  box.scaling = new BABYLON.Vector3(2, 1.5, 3);
  box.rotation.y = BABYLON.Tools.ToRadians(90);

  // 墙面纹理
  const boxMat = new BABYLON.StandardMaterial("boxMaterial");
  boxMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/cubehouse.png",
    scene
  );
  box.material = boxMat;
  return box;
};

const buildRoof = (scene) => {
  const roof = BABYLON.MeshBuilder.CreateCylinder(
    "roof",
    { diameter: 2.6, height: 3, tessellation: 3 },
    scene
  );
  roof.scaling.x = 0.8;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 2;

  const roofMat = new BABYLON.StandardMaterial("roofMaterial");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg",
    scene
  );
  roof.material = roofMat;
  return roof;
};

const createBaseHouse = async (name, scene) => {
  const box = buildWalls(name, scene);
  const roof = buildRoof(scene);

  return { box, roof };
};

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

  createBaseHouse("house1", scene).then(({ box, roof }) => {
    box.position.x = -3;
    roof.position.x = -3;
  });

  createBaseHouse("house2", scene).then(({ box, roof }) => {
    box.position.x = 3;
    roof.position.x = 3;
  });

  buidGround();

  const sound = new BABYLON.Sound(
    "nature",
    "./village/nature.wav",
    scene,
    null,
    {
      loop: true,
      autoplay: true,
    }
  );

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
