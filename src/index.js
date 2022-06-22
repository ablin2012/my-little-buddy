import * as THREE from 'three';
import { Apple } from './scripts/apple';
import { Sushi } from './scripts/sushi';
import { Pizza } from './scripts/pizza';
import { Milk } from './scripts/milk';
import { Carrot } from './scripts/carrot';
import { BuddyUtil } from './scripts/buddy_util';
import { collisionUtils } from './scripts/collision_utils';
import { Piggy } from './scripts/piggy';
import { Slothy } from './scripts/slothy';
import { Ducky } from './scripts/ducky';

document.addEventListener('DOMContentLoaded', function(event) {
    const CONSTANTS = {
        NUM_FOODS: window.innerHeight/2 + 100,
        HITBOX_TOP: window.innerWidth/2 + 100, 
        HITBOX_BOT: window.innerHeight/2 - 100,
        HITBOX_LEFT: window.innerWidth/2 - 100,
        HITBOX_RIGHT: window.innerWidth/2 + 100,
    }

    let scene,
    camera,
    shadowLight,
    backLight,
    light,
    renderer,
    env,
    pet,
    mousePos = {x: 0, y: 0},
    xTarget,
    yTarget,
    floor,
    foods = [],
    height = window.innerHeight,
    width = window.innerWidth,
    selectedPet = null,
    petType = null;

    // draggable vars
    let mouseX,
    mouseY,
    lastX,
    lastY,
    mouseIsDown = false,
    offsetX = 0,
    offsetY = 0,
    offset = {},
    selected = null;

    // start screen
    let startButton = document.getElementById('start-button')

    // DOM elements
    const canvas = document.querySelector('#world');
    const canvas2D = document.querySelector('#two-plain');
    let expBar = document.getElementById('exp-bar').firstElementChild;
    let hungerBar = document.getElementById('hunger-bar').firstElementChild;
    let happinessBar = document.getElementById('happiness-bar').firstElementChild;
    let buddyLevel = document.getElementById('level');
    let buddyName = document.getElementById('buddy-name');
    let customName = document.getElementById('custom-name');
    let startScreen = document.getElementById('start-screen');
    let bgMusic = document.getElementById('bg-music');
    let eatingSound = document.getElementById('eating-sound');


    function startPageInit(){
        startButton.addEventListener('click', startGame);
        startScreen.addEventListener('click', pickPet);
    }

    function init(){
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        const backgroundColor = 0x81eefc;

        // create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        // scene.fog = new THREE.Fog(backgroundColor, 60, 100);
        scene.fog = new THREE.Fog(0x81eefc, 350, 500);

        // create camera
        camera = new THREE.PerspectiveCamera(50, width/ height, 1, 2000);
        camera.position.x = 150;
        camera.position.y = 100;
        camera.position.z = 300;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // create renderer
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        document.body.appendChild(renderer.domElement);

        // event listeners
        window.addEventListener("resize", onWindowResize, false);
        canvas2D.addEventListener("mousedown", handleMouseDown, false);
        document.addEventListener("mousemove", handleMouseMove, false);
    }

    function toggleScreen(id, toggle){
        let screen = document.getElementById(id);
        let display = (toggle) ? 'flex' : 'none';
        screen.style.display = display;
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
        // color: 0x81eefc
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
        CONSTANTS.HITBOX_TOP = window.innerWidth/2 + 100, 
        CONSTANTS.HITBOX_BOT = window.innerHeight/2 - 100,
        CONSTANTS.HITBOX_LEFT = window.innerWidth/2 - 100,
        CONSTANTS.HITBOX_RIGHT = window.innerWidth/2 + 100,
        spawnFood();
        drawFoods();
    }

    // Refactor for other buddy types
    function createPet() {
        if (petType === 'pig') {
            pet = new Piggy('oinkers');
            scene.add(pet.threegroup);
        } else if (petType === 'sloth') {
            pet = new Slothy('sid');
            scene.add(pet.threegroup);
        } else if (petType === 'duck') {
            pet = new Ducky('quack');
            scene.add(pet.threegroup);
        }
    }
    
    function handleMouseMove(event) {
        mousePos = {x:event.clientX, y:event.clientY};
    }

    function render(){
        renderer.render(scene, camera);
    }
    
    function updateProgressBars(){
        hungerBar.style.width = `${pet.hungerLevel}%` ;
        happinessBar.style.width = `${pet.happyLevel}%`;
        expBar.style.width = `${pet.exp}%`;
        buddyLevel.innerHTML = `Lv. ${pet.level}`;
    }

    function updateBuddyInfo(buddy){
        setInterval(() => {
            buddy.hungerDrain();
            buddy.happyDrain();
            buddy.passiveExpGain();
            buddy.isBuddyDead();
            updateProgressBars();
        }, 200)
        setInterval(() => {
            drawFoods();
        }, 2000)
    }

    function spawnFood(){
        foods = [];
        foods.push(new Apple(window));
        foods.push(new Sushi(window));
        foods.push(new Pizza(window));
        foods.push(new Carrot(window));
        foods.push(new Milk(window));
    }

    function drawFoods(){
        let context = canvas2D.getContext('2d');
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        foods.forEach((el) => {
            el.draw(context);
        })
    }

    function drawFood(food){
        let context = canvas2D.getContext('2d');
        context.clearRect(food.x, food.y, food.width, food.height);
        food.draw(context);
    }

    function handleMouseDown(e){
        for(let i = 0; i < foods.length; i++) {
            if (collisionUtils.pointInRect(e.clientX, e.clientY, foods[i])) {
                selected = foods[i];
                document.body.addEventListener("mousemove", onMouseMove);
                document.body.addEventListener("mouseup", onMouseUp);
                offset.x = e.clientX - selected.x;
                offset.y = e.clientY - selected.y;
            }
        }
        document.body.addEventListener("mousemove", petBuddy);
        document.body.addEventListener("mouseup", removePetBuddy);
    }

    function petBuddy(e) {
        if (mousePos.x > CONSTANTS.HITBOX_LEFT && mousePos.x < CONSTANTS.HITBOX_RIGHT && mousePos.y > CONSTANTS.HITBOX_BOT && mousePos.y < CONSTANTS.HITBOX_TOP && !selected) {
            pet.happyGain(0.3);
            updateProgressBars();
        }
    }

    function removePetBuddy(e) {
        document.body.removeEventListener("mousemove", petBuddy);
        document.body.removeEventListener("mouseup", removePetBuddy);
    }
    function onMouseMove(e){
        drawFood(selected);
        selected.x = e.clientX - offset.x;
        selected.y = e.clientY - offset.y;
    }

    function onMouseUp(e){
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        if (selected.x > CONSTANTS.HITBOX_LEFT && selected.x < CONSTANTS.HITBOX_RIGHT && selected.y > CONSTANTS.HITBOX_BOT && selected.y < CONSTANTS.HITBOX_TOP) {
            console.log('yo eat that shit');
            eatingSound.play();
            pet.hungerGain(selected.nutritionValue);
            updateProgressBars();
            spawnFood();
        }
        selected = null;
        drawFoods();
    }

    function pickPet(e){
        if (e.target.className === 'pet-type') {
            if (!selectedPet) {
                selectedPet = e.target;
                petType = selectedPet.dataset.pettype;
                selectedPet.classList.add("selected");
            } else {
                selectedPet.classList.remove("selected");
                selectedPet = e.target;
                petType = selectedPet.dataset.pettype;
                selectedPet.classList.add("selected");
            }
        }
    }

    function buddyIsDead(){
        if (pet.isBuddyDead()) {
            toggleScreen('end-screen', true);
            bgMusic.pause();
            toggleScreen('header', false)
        }
    }

    function animate(){
        render();
        xTarget = (mousePos.x - window.innerWidth/2);
        yTarget = (mousePos.y - window.innerHeight/2);
        pet.look(xTarget, yTarget);
        requestAnimationFrame( animate );
        buddyIsDead();
    }

    function startGame(){
        if (customName.value && petType) {
            bgMusic.play();
            startButton.removeEventListener('click', startGame);
            startScreen.removeEventListener('click', pickPet);
            buddyName.innerHTML = customName.value;
            console.log('working');
            toggleScreen('header', true);
            toggleScreen('start-screen', false);
            init();
            createLights();
            createFloor();
            createPet();
            updateBuddyInfo(pet);
            updateProgressBars();
            spawnFood();
            drawFoods();
            animate();
        } else {
            alert('Fill in Required Fields');
        }
    }

    startPageInit();
});