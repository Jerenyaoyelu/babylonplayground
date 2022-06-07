export function createSkyBox(scene) {
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 100 }, scene);
  const skyMat = new BABYLON.StandardMaterial("skyBox", scene);
  skyMat.backFaceCulling = false;
  // Assets.skyboxes对象下任意图片的rootUrl都指向对应系列6张图的文件夹
  skyMat.reflectionTexture = new BABYLON.CubeTexture(
    `${Assets.skyboxes.skybox_ny_jpg.rootUrl}skybox`,
    scene
  );
  skyMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyMat.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyMat;
}
