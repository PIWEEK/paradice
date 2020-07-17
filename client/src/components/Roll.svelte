<script context="module">
  import * as THREE from "three";
  import OrbitControls from 'orbit-controls-es6';

  import CANNON from "cannon";
  import { DiceManager, DiceD4, DiceD6, DiceD8, DiceD10, DiceD12, DiceD20, DiceD100 } from "./dice";
  import Stats from "stats.js";
  import { onMount } from 'svelte';
  import { DICE_TEXTURES } from '../constants';

  const imageTextures = {};
  // Preload dice textures
  DICE_TEXTURES.forEach(texture => {
    imageTextures[texture.path] = new Image();
    imageTextures[texture.path].src = texture.path;
  });

  // standard global variables
  let container,
    scene,
    camera,
    renderer,
    controls,
    stats,
    world,
    dice = [],
    diceResults = [],
    diceValues = [];

  export function initRollDice() {
    // SCENE
    scene = new THREE.Scene();
    scene.name = "ESCENA";

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 1,
      FAR = 200;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 40, 2);
    scene.add(camera);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 1);
    renderer.physicallyCorrectLights = true;

    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;

    let ambient = new THREE.AmbientLight("#ffffff", 1.3);
    //scene.add(ambient);

    let light = new THREE.SpotLight(0xf2dba4, 2.8);
    light.position.y = 40;
    light.position.x = 0;
    light.target.position.set(3, 0, 3);
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 200;
    light.shadow.camera.fov = 50;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    var spotLightHelper = new THREE.SpotLightHelper( light );
    //scene.add( spotLightHelper );
    scene.add(light);
    var desk_color = 0xdfdfdf;
    // DESK


    var texturepath = 'table/img/table00.jpg';
    var repeats = 10;
    var index = 0;
    var loader = new THREE.TextureLoader();
    var floorTexture = loader.load(texturepath);
    floorTexture.receiveShadow = true;
    floorTexture.needsUpdate = true;
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(repeats, repeats);

    var texture1 = loader.load("table/img/table00.jpg");

    var desk = new THREE.Mesh(new THREE.PlaneGeometry(90, 60),
             new THREE.MeshPhongMaterial({ color: desk_color, map:texture1 }));
    desk.receiveShadow = true;
    desk.rotation.x -= Math.PI/2;
    desk.name = "Floor";
    scene.add(desk);

    ////////////
    // CUSTOM //
    ////////////
    world = new CANNON.World();

    world.gravity.set(-15, -9.82 * 60, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 32;

    DiceManager.setWorld(world);

    //Floor
    let floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.floorBodyMaterial // floorMaterial???
    });
    floorBody.receiveShadow = true;
    floorBody.position.y = 0;
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );
    world.add(floorBody);

    // BOUNDARIES FOR DICE TRAY

    function createBoundary(x, y, z, w, h, t){
      // w = width h = height t = thickness
      // x, y, z are coordinates

      var bodyShape = new CANNON.Box(new CANNON.Vec3(w, h, t));
      var bodyMass = 5.0;
      var body = new CANNON.Body({
        mass: 0,
        shape: bodyShape,
        material: DiceManager.floorBodyMaterial
      });
      body.position.set(x, y/2, z);
      world.add(body);

      var barrierGeometry = new THREE.CubeGeometry(w*2, h*2, t*2);
      var barrierMaterial = new THREE.MeshPhongMaterial({
        color: 0x761CEC,
        side: THREE.BackSide,
        wireframe: true
      });
      var barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
      barrier.castShadow = true;
      barrier.position.x = x;
      barrier.position.y = y;
      barrier.position.z = z;

    //scene.add(barrier);

    };

    var sw = SCREEN_WIDTH;
    var sh = SCREEN_HEIGHT;
    createBoundary(Math.max(12,sw/90), 0, 0, 5, 50, 30); //dirty hack until we solve proper mobile support
    createBoundary(0, 0, 15, 30, 50, 5);
    createBoundary(Math.min(-15,-sw/100), 0, 0, 5, 10, 20); //dirty hack until we solve proper mobile support
    createBoundary(0, 0, -20, 30, 50, 5);

    requestAnimationFrame(animate);
  }

  export function rollDice(diceInput, allStableCallback) {
    if (diceInput.wipe) {
      dice.forEach((d) => {
        scene.remove(d.getObject());
        world.remove(d.getObject().body);
      });

      diceValues = [];
      dice = [];
    }

    const imageTexture = imageTextures[diceInput.texture]

    diceInput.dice.forEach((diceIt) => {
      Array.from(Array(diceIt.qty)).forEach((x, i) => {
        var die = null;
        if (diceIt.label == "D4") {
          die = new DiceD4({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        } else if (diceIt.label == "D6") {
          die = new DiceD6({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        } else if (diceIt.label == "D8") {
          die = new DiceD8({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        } else if (diceIt.label == "D10") {
          die = new DiceD10({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        } else if (diceIt.label == "D12") {
          die = new DiceD12({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        } else if (diceIt.label == "D20") {
          die = new DiceD20({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        } else {
          die = new DiceD100({ size: 1.5, fontColor: diceInput.fontColor, imageTexture: imageTexture });
        }

        die.getObject().name = `${diceIt.label}-${i}`;
        die.castShadow = true;
        die.receiveShadow = false;

        scene.add(die.getObject());
        dice.push(die);
        let yRand = Math.random() * 20
        let zPosRand = Math.random() * 10
        die.getObject().position.x = -10 - (i % 3) * 1.5 + zPosRand;
        die.getObject().position.y = 15 + Math.floor(i / 3) * 1.5;
        die.getObject().position.z = -10 + (i % 3) * 1.5  - zPosRand;
        die.getObject().quaternion.x = (Math.random()*90-45) * Math.PI / 180;
        die.getObject().quaternion.z = (Math.random()*90-45) * Math.PI / 180;
        die.updateBodyFromMesh();
        let rand = Math.random() * 5;
        die.getObject().body.velocity.set(160 + rand,  yRand, 80 + rand);
        die.getObject().body.angularVelocity.set(20 * Math.random() -10, 20 * Math.random() -10, 20 * Math.random() -10);

        diceValues.push({dice: die, value: diceIt.result[i]});
      });
    });

    DiceManager.prepareValues(diceValues, allStableCallback);
  }

  function animate() {
    updatePhysics();
    render();
    update();
    requestAnimationFrame(animate);
  }

  function updatePhysics() {
    world.step(1.0 / 60.0);

    for (var i in dice) {
      dice[i].updateMeshFromBody();
    }
  }

  function update() {
    controls.update();
    // stats.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  export function changeTexture(texturepath) {
    var repeats = 5;
    var index = 0;
	  var loader = new THREE.TextureLoader();
	  var floorTexture = loader.load(texturepath);
	  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(repeats, repeats);
    		//change of floor texture on the fly
    let f = scene.getObjectByName("Floor");
    f.material.map = floorTexture;
    f.material.needsUpdate = true;
  }

</script>

<style>
</style>

<div id="ThreeJS"/>
