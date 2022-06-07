export function createGround(scene) {
  // create village ground
  const villGround = BABYLON.MeshBuilder.CreateGround("villground", {
    width: 24,
    height: 24,
  });
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/villagegreen.png"
  );
  groundMat.diffuseTexture.hasAlpha = true;
  villGround.material = groundMat;

  const valley = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    "valley",
    "https://assets.babylonjs.com/environments/villageheightmap.png",
    { width: 100, height: 100, subdivisions: 20, minHeight: 0, maxHeight: 10 },
    scene
  );

  const mat = new BABYLON.StandardMaterial("valleyMat");
  mat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/valleygrass.png"
  );

  valley.material = mat;
  valley.position.y = -0.01;
}
