import { buidBunchOfHouses } from "./village/houses.js";
import { createCar } from "./village/car.js";
import { moveAround } from "./village/walker/walking.js";
import { createGround } from "./village/valley/ground.js";
import { createSkyBox } from "./village/valley/sky.js";
import { createTrees } from "./village/valley/trees.js";

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
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.upperBetaLimit = Math.PI / 2.2;
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(2, 1, 0),
    scene
  );

  createSkyBox(scene);

  buidBunchOfHouses();

  createGround(scene);

  createTrees(scene);

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

  const car = createCar(scene);

  moveAround(scene);

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
