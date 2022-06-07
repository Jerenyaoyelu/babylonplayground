export function moveAround(scene) {
  // 方法1: 拉去远端资源
  //   BABYLON.SceneLoader.ImportMeshAsync(
  //     "",
  //     Assets.meshes.dude.rootUrl,
  //     Assets.meshes.dude.filename,
  //     scene
  //   ).then((res) => {
  //     let dude = res.meshes[0];
  //     dude.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);

  //     scene.beginAnimation(res.skeletons[0], 0, 100, true, 1.0);
  //   });

  //   console.log(Assets);

  const track = [];
  track.push(new walk(86, 7));
  track.push(new walk(-85, 14.8));
  track.push(new walk(-93, 16.5));
  track.push(new walk(48, 25.5));
  track.push(new walk(-112, 30.5));
  track.push(new walk(-72, 33.2));
  track.push(new walk(42, 37.5));
  track.push(new walk(-98, 45.2));
  track.push(new walk(0, 47));
  // 方法2： 导入本地资源
  BABYLON.SceneLoader.ImportMeshAsync(
    "him", // 前面导入失败是因为这里的命名问题，him或空字符则不会报错
    "./village/walker/Dude/",
    "Dude.babylon",
    scene
  ).then((res) => {
    let dude = res.meshes[0];
    dude.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);

    dude.position = new BABYLON.Vector3(-6, 0, 0);
    dude.rotate(
      BABYLON.Axis.Y,
      BABYLON.Tools.ToRadians(-95),
      BABYLON.Space.Local
    );
    const startRotation = dude.rotationQuaternion.clone(); //use clone so that variables are independent not linked copies

    scene.beginAnimation(res.skeletons[0], 0, 100, true, 1.0);
    let distance = 0;
    let step = 0.03;
    let p = 0;
    scene.onBeforeRenderObservable.add(() => {
      dude.movePOV(0, 0, step);
      distance += step;
      if (distance > track[p].dist) {
        dude.rotate(
          BABYLON.Axis.Y,
          BABYLON.Tools.ToRadians(track[p].turn),
          BABYLON.Space.Local
        );
        p += 1;
        p %= track.length;
        if (p === 0) {
          distance = 0;
          dude.position = new BABYLON.Vector3(-6, 0, 0);
          dude.rotationQuaternion = startRotation.clone();
        }
      }
    });
  });
}

function walk(turn, dist) {
  this.turn = turn;
  this.dist = dist;
}
