export function createTrees(scene) {
  const treeManager = new BABYLON.SpriteManager(
    "treesManager",
    Assets.sprites.palm_png.path,
    2000,
    { width: 512, height: 1024 },
    scene
  );
  for (let i = 0; i < 500; i++) {
    const tree = new BABYLON.Sprite("tree", treeManager);
    tree.position.x = Math.random() * -30;
    tree.position.z = Math.random() * 20 + 8;
    tree.position.y = 0.5;
  }

  for (let i = 0; i < 500; i++) {
    const tree = new BABYLON.Sprite("tree", treeManager);
    tree.position.x = Math.random() * 25 + 7;
    tree.position.z = Math.random() * -35 + 8;
    tree.position.y = 0.5;
  }
}
