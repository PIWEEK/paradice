<script context="module">
  import * as THREE from "three";
  import OrbitControls from 'orbit-controls-es6';

  import CANNON from "cannon";
  import { DiceManager, DiceD4, DiceD6, DiceD8, DiceD10, DiceD12, DiceD20 } from "threejs-dice/lib/dice";
  import Stats from "stats.js";
	import { onMount } from 'svelte';

  // standard global variables
  let container,
    scene,
    camera,
    renderer,
    controls,
    stats,
    world,
    dice = [];

  export function initRollDice() {
    // SCENE
    scene = new THREE.Scene();
    scene.name = "ESCENA";
    // CAMERA
 
    var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 0.01,
      FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 40, 10);
 
    scene.add(camera);
    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;

    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);
    // EVENTS
    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    // STATS
    // stats = new Stats();
    // stats.domElement.style.position = "absolute";
    // stats.domElement.style.bottom = "0px";
    // stats.domElement.style.zIndex = 100;
    // container.appendChild(stats.domElement);

    let ambient = new THREE.AmbientLight("#ffffff", 0.8);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight("#ffffff", 0.8);
    directionalLight.position.x = -5;
    directionalLight.position.y = 50;
    directionalLight.position.z = 5;
    scene.add(directionalLight);

    let light = new THREE.SpotLight(0xefdfd5, 1.3);
    light.position.y = 100;
    light.position.x = -50;
    light.target.position.set(10, 10, 10);
    light.castShadow = true;
    light.shadow.camera.near = 5;
    light.shadow.camera.far = 11;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    scene.add(light);

    // FLOOR
    var texturepath = 'table/img/table00.jpg';
    var repeats = 5;
    var index = 0;
    var loader = new THREE.TextureLoader();
    var floorTexture = loader.load(texturepath);
    floorTexture.receiveShadow = true;
    floorTexture.needsUpdate = true;
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(repeats, repeats);

    var floorMaterial = new THREE.MeshBasicMaterial({
      map: floorTexture,
      side: THREE.BackSide
    });
    
    floorMaterial.castShadow = true;
   
    floorMaterial.needsUpdate = true;
  
    var floorGeometry = new THREE.PlaneGeometry(120, 120);
    floorGeometry.receiveShadow = true;
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.name = "Floor";
    floor.receiveShadow = true;
    floor.rotation.x += Math.PI/2;
    floor.matrixWorldNeedsUpdate = true;
    scene.add(floor);


    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshPhongMaterial({
      color: 0x9999ff,
      side: THREE.BackSide
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
    scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

    ////////////
    // CUSTOM //
    ////////////
    world = new CANNON.World();

    world.gravity.set(0, -9.82 * 20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    DiceManager.setWorld(world);

    //Floor
    let floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.floorBodyMaterial
    });
    floorBody.receiveShadow = true;
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );
    world.add(floorBody);

    //Walls

    // var colors = ["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#ff00ff"];
    // for (var i = 0; i < 5; i++) {
    // 	var die = new DiceD6({ size: 1.5, backColor: colors[i] });
    // 	scene.add(die.getObject());
    // 	dice.push(die);
    // }

    // var die = new DiceD20({ size: 3.5, backColor: "#ff0000" });
    // scene.add(die.getObject());
    // dice.push(die);

    document
      .querySelector("#ThreeJS")
      // .addEventListener("click", randomDiceThrow);
    // setInterval(randomDiceThrow, 3000);
    // randomDiceThrow();
    requestAnimationFrame(animate);
  }

  class CustomDiceD6 extends DiceD6 {
    constructor(options) {
        super(options);
        this.customTextTextureFunction = (text, color, backColor) => {
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          let ts = this.calculateTextureSize(this.size / 2 + this.size * this.textMargin) * 2;
          canvas.width = canvas.height = ts;
          context.font = ts / (1 + 2 * this.textMargin) + "pt Arial";
          var image = new Image();
          image.src = 'table/img/table01.jpg';
          const pFill = context.createPattern(image, "repeat");
          context.fillStyle = pFill;
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = color;
          context.fillText(text, canvas.width / 2, canvas.height / 2);
          let texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          return texture;
        };
        this.create();
    }
  }

  export function rollDice(diceInput) {
    dice.forEach((d) => {
      scene.remove(d.getObject());
    });

    var diceValues = [];
    diceInput.dice.forEach((diceIt) => {
      Array.from(Array(diceIt.qty)).forEach((x, i) => {
        var die = null;
        if (diceIt.label == "D4") {
          die = new DiceD4({ size: 1.5, backColor: "#ff0000" });
        } else if (diceIt.label == "D6") {
          die = new CustomDiceD6({ size: 2.5, fontColor: "#FFFFFF", backColor: "#ff0000" });
        } else if (diceIt.label == "D8") {
          die = new DiceD8({ size: 1.5, backColor: "#ff0000" });
        } else if (diceIt.label == "D10") {
          die = new DiceD10({ size: 1.5, backColor: "#ff0000" });
        } else if (diceIt.label == "D12") {
          die = new DiceD12({ size: 1.5, backColor: "#ff0000" });
        } else { //if (diceIt.label == "D20") {
          die = new DiceD20({ size: 1.5, backColor: "#ff0000" });
        }

        die.getObject().name = `${diceIt.label}-${i}`;
        scene.add(die.getObject());

        die.castShadow = true;
        die.receiveShadow = true;

        let yRand = Math.random() * 20;
        die.getObject().position.x = -15 - (i % 3) * 1.5;
        die.getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
        die.getObject().position.z = -15 + (i % 3) * 1.5;
        die.getObject().quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180;
        die.getObject().quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180;
        die.updateBodyFromMesh();
        let rand = Math.random() * 5;
        die.getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
        die.getObject().body.angularVelocity.set(
            20 * Math.random() - 10,
            20 * Math.random() - 10,
            20 * Math.random() - 10
          );

        dice.push(die);
        diceValues.push({ dice: die, value: diceIt.result[i]});
      });
    });

    console.log(diceValues);
    DiceManager.prepareValues(diceValues);
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
