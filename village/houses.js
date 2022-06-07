const buildWalls = (name, scene, width) => {
  // 墙面门窗
  const faceUV = [];
  if (width == 2) {
    faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
  } else {
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  }
  const box = BABYLON.MeshBuilder.CreateBox(
    name,
    { width, faceUV, wrap: true },
    scene
  );

  box.position.y = 0.5;

  // 墙面纹理
  const boxMat = new BABYLON.StandardMaterial("boxMaterial");
  boxMat.diffuseTexture = new BABYLON.Texture(
    width === 2
      ? "https://assets.babylonjs.com/environments/semihouse.png"
      : "https://assets.babylonjs.com/environments/cubehouse.png",
    scene
  );
  box.material = boxMat;
  return box;
};

const buildRoof = (scene, width) => {
  const roof = BABYLON.MeshBuilder.CreateCylinder(
    "roof",
    { diameter: 1.3, height: 1.2, tessellation: 3 },
    scene
  );
  roof.scaling.x = 0.75;
  roof.scaling.y = width;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const roofMat = new BABYLON.StandardMaterial("roofMaterial");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg",
    scene
  );
  roof.material = roofMat;
  return roof;
};

const createBaseHouse = (name, scene, width) => {
  const box = buildWalls(name, scene, width);
  const roof = buildRoof(scene, width);

  const house = BABYLON.Mesh.MergeMeshes(
    [box, roof],
    true,
    false,
    null,
    false,
    true
  );
  return house;
};

export const buidBunchOfHouses = (scene) => {
  const detached_house = createBaseHouse("detached", scene, 1);
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = createBaseHouse("semi", scene, 2);
  semi_house.rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;
  // copy 一堆房子
  // 定义位置
  const places = []; //each entry is an array [rotation, x, z]
  places.push([1, -Math.PI / 16, -6.8, 2.5]);
  places.push([2, -Math.PI / 16, -4.5, 3]);
  places.push([2, -Math.PI / 16, -1.5, 4]);
  places.push([2, -Math.PI / 3, 1.5, 6]);
  places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
  places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
  places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
  places.push([1, (5 * Math.PI) / 4, 0, -1]);
  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
  places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
  places.push([2, Math.PI / 1.9, 4.75, -1]);
  places.push([1, Math.PI / 1.95, 4.5, -3]);
  places.push([2, Math.PI / 1.9, 4.75, -5]);
  places.push([1, Math.PI / 1.9, 4.75, -7]);
  places.push([2, -Math.PI / 3, 5.25, 2]);
  places.push([1, -Math.PI / 3, 6, 4]);
  const houses = [];
  for (let i = 0; i < places.length; i++) {
    const tarHouse = places[i][0] === 2 ? semi_house : detached_house;
    houses[i] = tarHouse.createInstance(`house${i}`);
    houses[i].rotation.y = places[i][1];
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }
};
