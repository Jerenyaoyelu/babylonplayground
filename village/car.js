import * as earcut from "earcut";

export const createCar = (scene) => {
  // base
  const outline = [
    new BABYLON.Vector3(-0.3, 0, -0.1),
    new BABYLON.Vector3(0.2, 0, -0.1),
  ];
  // curved front
  for (let i = 0; i < 20; i++) {
    outline.push(
      new BABYLON.Vector3(
        0.2 * Math.cos((i * Math.PI) / 40),
        0,
        0.2 * Math.sin((i * Math.PI) / 40) - 0.1
      )
    );
  }
  // top
  outline.push(new BABYLON.Vector3(0, 0, 0.1));
  outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

  const carMat = new BABYLON.StandardMaterial("carMaterial");
  carMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/car.png"
  );

  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
  faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
  faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

  // extrudePolygon需要引入 earcut slicing algorithm
  const car = BABYLON.MeshBuilder.ExtrudePolygon(
    "car",
    {
      shape: outline,
      depth: 0.2,
      faceUV,
      wrap: true,
    },
    scene,
    earcut
  );

  car.material = carMat;

  addWheels(car, scene);

  car.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, Math.PI / 2);
  car.position.y = 0.16;
  car.position.x = 3.25;
  car.position.z = 8;
  addMoveAnimation(car, scene);
  return car;
};
function addWheels(car, scene) {
  const wheelUV = [];
  wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
  wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
  wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);
  const wheelMat = new BABYLON.StandardMaterial("wheelMaterial");
  wheelMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/wheel.png"
  );
  const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {
    diameter: 0.125,
    height: 0.05,
    faceUV: wheelUV,
  });
  wheelRB.material = wheelMat;
  wheelRB.parent = car;
  wheelRB.position.z = -0.1;
  wheelRB.position.x = -0.2;
  wheelRB.position.y = 0.035;

  const wheelRF = wheelRB.clone("wheelRF");
  wheelRF.position.x = 0.1;

  const wheelLB = wheelRB.clone("wheelLB");
  wheelLB.position.y = -0.2 - 0.035;

  const wheelLF = wheelRF.clone("wheelLF");
  wheelLF.position.y = -0.2 - 0.035;

  // 添加轮子滚动动画
  addWheelAnimation(wheelRB, scene);
  addWheelAnimation(wheelRF, scene);
  addWheelAnimation(wheelLB, scene);
  addWheelAnimation(wheelLF, scene);
}

function addWheelAnimation(mesh, scene) {
  const animWheel = new BABYLON.Animation(
    "wheelAnimation",
    "rotation.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  const keys = [];
  keys.push({
    frame: 0,
    value: 0,
  });
  keys.push({
    frame: 30,
    value: 2 * Math.PI,
  });
  animWheel.setKeys(keys);
  mesh.animations = [];
  mesh.animations.push(animWheel);

  scene.beginAnimation(mesh, 0, 30, true);
}

function addMoveAnimation(mesh, scene) {
  const ani = new BABYLON.Animation(
    "carAnimation",
    "position.z",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  const keys = [];
  keys.push({
    frame: 0,
    value: 8,
  });
  keys.push({
    frame: 150,
    value: -7,
  });
  keys.push({
    frame: 180,
    value: -7,
  });
  ani.setKeys(keys);
  mesh.animations = [];
  mesh.animations.push(ani);
  scene.beginAnimation(mesh, 0, 180, true);
}
