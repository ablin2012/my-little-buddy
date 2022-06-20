import * as THREE from 'three';
import {Piggy} from './scripts/piggy';

document.addEventListener('DOMContentLoaded', function(event) {
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
    floor;

    // DOM elements
    let expBar = document.getElementById('exp-bar').firstElementChild;
    let hungerBar = document.getElementById('hunger-bar').firstElementChild;
    let happinessBar = document.getElementById('happiness-bar').firstElementChild;
    let buddyLevel = document.getElementById('level');
    let foodHotbad = document.getElementById('food-hotbar');


    function init(){
        console.log(expBar);
        const buddy = document.querySelector('#buddy');
        const backgroundColor = 0x81eefc;

        // create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        // scene.fog = new THREE.Fog(backgroundColor, 60, 100);
        scene.fog = new THREE.Fog(0x81eefc, 350, 500);

        // create camera
        camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 1, 2000);
        camera.position.x = 150;
        camera.position.y = 100;
        camera.position.z = 300;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // create renderer
        renderer = new THREE.WebGLRenderer({canvas: buddy, antialias: true, alpha: true});
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);
        document.body.appendChild(renderer.domElement);

        // event listeners
        window.addEventListener("resize", function(){
            console.log('lol xd');
        });
        buddy.addEventListener("click", function(){
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
        color: 0x81eefc
        }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -36;
        floor.receiveShadow = true;
    
        env.add(floor);
        scene.add(env);
    }

    function handleMouseMove(event) {
        mousePos = {x:event.clientX, y:event.clientY};
    }

    // Refactor for other buddy types
    function createPiggy() {
        piggy = new Piggy('oinkers');
        console.log(piggy);
        scene.add(piggy.threegroup);
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
        console.log(piggy.exp);
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
        
    }

    init();
    createLights();
    createFloor();
    createPiggy();
    updateProgressBars();
    updateBuddyInfo(piggy);
    animate();

});