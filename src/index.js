import * as THREE from 'three';
import { Apple } from './scripts/apple';
import { Sushi } from './scripts/sushi';
import { Pizza } from './scripts/pizza';
import { Milk } from './scripts/milk';
import { Carrot } from './scripts/carrot';
import { BuddyUtil } from './scripts/buddy_util';
import {Piggy} from './scripts/piggy';

document.addEventListener('DOMContentLoaded', function(event) {
    const CONSTANTS = {
        NUM_FOODS: 5
    }

    let scene,
    camera,
    shadowLight,
    backLight,
    light,
    renderer,
    env,
    piggy,
    mousePos = {x: 0, y: 0},
    xTarget,
    yTarget,
    floor,
    foods = [];

    // draggable vars
    let mouseX,
    mouseY,
    lastX,
    lastY,
    mouseIsDown = false;

    // DOM elements
    const canvas = document.querySelector('#world');
    const canvas2D = document.querySelector('#two-plain');
    let expBar = document.getElementById('exp-bar').firstElementChild;
    let hungerBar = document.getElementById('hunger-bar').firstElementChild;
    let happinessBar = document.getElementById('happiness-bar').firstElementChild;
    let buddyLevel = document.getElementById('level');



    function init(){
        const backgroundColor = 0x81eefc;

        // create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        // scene.fog = new THREE.Fog(backgroundColor, 60, 100);
        scene.fog = new THREE.Fog(0x81eefc, 350, 500);

        // create camera
        camera = new THREE.PerspectiveCamera(50, window.innerWidth/ window.innerHeight, 1, 2000);
        camera.position.x = 150;
        camera.position.y = 100;
        camera.position.z = 300;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // create renderer
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // event listeners
        window.addEventListener("resize", onWindowResize, false);
        canvas2D.addEventListener("click", function(){
            piggy.happyGain(5);
            updateProgressBars();
        })
        document.addEventListener('mousemove', handleMouseMove, false);
    }

    function createLights() {
        light = new THREE.HemisphereLight(0xffffff, 0xb3858c, .8);
    
        shadowLight = new THREE.DirectionalLight(0xffffff, .8);
        shadowLight.position.set(-100, 100, 50);
        shadowLight.castShadow = true;
        shadowLight.shadowDarkness = .15;
    
        backLight = new THREE.DirectionalLight(0xffffff, .4);
        backLight.position.set(200, 100, 100);
        backLight.shadowDarkness = .1;
        backLight.castShadow = true;
    
        scene.add(backLight);
        scene.add(light);
        scene.add(shadowLight);
    }

    function createFloor() {
        env = new THREE.Group();
    
        floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshBasicMaterial({
        color: 0x28871e
        }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -36;
        floor.receiveShadow = true;
    
        env.add(floor);
        scene.add(env);
    }

    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    // Refactor for other buddy types
    function createPiggy() {
        piggy = new Piggy('oinkers');
        scene.add(piggy.threegroup);
    }
    
    function handleMouseMove(event) {
        mousePos = {x:event.clientX, y:event.clientY};
    }
    function render(){
        renderer.render(scene, camera);
    }

    function animate(){
        render();
        xTarget = (mousePos.x - window.innerWidth/2);
        yTarget = (mousePos.y - window.innerHeight/2);
        piggy.look(xTarget, yTarget);
        requestAnimationFrame( animate );
    }
    
    function updateProgressBars(){
        // console.log(piggy.hungerLevel);
        // console.log(piggy.happyLevel);
        // console.log(piggy.exp);
        hungerBar.style.width = `${piggy.hungerLevel}%` ;
        happinessBar.style.width = `${piggy.happyLevel}%`;
        expBar.style.width = `${piggy.exp}%`;
        buddyLevel.innerHTML = `Lv. ${piggy.level}`;
    }

    function updateBuddyInfo(buddy){
        setInterval(() => {
            // buddy.hungerDrain();
            buddy.happyDrain();
            buddy.passiveExpGain();
            updateProgressBars();
        }, 5000)
    }

    function spawnFood(){
        foods.push(new Apple());
        foods.push(new Sushi());
        foods.push(new Pizza());
        foods.push(new Carrot());
        foods.push(new Milk());
    }

    function drawFoods(){
        let context = canvas2D.getContext('2d');
        foods.forEach((el) => {
            el.draw(context);
        })
    }

    function handleMouseDown(e){

        // get the current mouse position relative to the canvas
      
        mouseX = parseInt(e.clientX-offsetX);
        mouseY = parseInt(e.clientY-offsetY);
      
        // save this last mouseX/mouseY
      
        lastX = mouseX;
        lastY = mouseY;
      
        // set the mouseIsDown flag
      
        mouseIsDown = true;
    }

    function handleMouseUp(e){

        // clear the mouseIsDown flag
      
        mouseIsDown=false;
    }
      
    function handleMouseMove2D(e){
        // if the mouseIsDown flag isn't set, no work to do
      
        if(!mouseIsDown){return;}
        // get mouseX/mouseY
      
        mouseX = parseInt(e.clientX-offsetX);
        mouseY = parseInt(e.clientY-offsetY);
      
        // for each food in the foods array
        // use context.isPointInPath to test if it’s being dragged
      
        for(let i = 0; i < foods.length; i++){
            let food = foods[i];
            food.draw(context);
            if(context.isPointInPath(lastX,lastY)){ 
      
                // if this food’s being dragged, 
                // move it by the change in mouse position from lastXY to currentXY
      
                food.posX += (mouseX-lastX);
                food.posY += (mouseY-lastY);
                food.right = food.posX + food.width;
                food.bottom = food.posY + food.height;
            }
        }
      
        // update the lastXY to the current mouse position
        lastX = mouseX;
        lastY = mouseY;
          // draw all foods in their new positions
        drawFoods();
    }
    init();
    createLights();
    createFloor();
    createPiggy();
    updateProgressBars();
    spawnFood();
    drawFoods();
    updateBuddyInfo(piggy);
    animate();

});