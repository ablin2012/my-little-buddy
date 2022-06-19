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
    floor;



    function init(){
        const canvas = document.querySelector('#bg');
        const backgroundColor = "rgb(132, 219, 250)";

        // create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        // scene.fog = new THREE.Fog(backgroundColor, 60, 100);

        // create camera
        camera = new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight, 0.1, 1000);
        camera.position.x = -300;
        camera.position.y = 300;
        camera.position.z = 100;

        // create renderer
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // event listeners
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
        color: 0X652e37
        }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -36;
        floor.receiveShadow = true;
    
        env.add(floor);
        scene.add(env);
    }

    // Refactor for other buddy types
    function createPiggy() {
        let piggy = new Piggy('oinkers');
        scene.add(piggy.threegroup);
    }

    function render(){
        renderer.render(scene, camera);
    }

    function animate(){
        requestAnimationFrame( animate );
        render();
    }
    
    init();
    createLights();
    createFloor();
    createPiggy();
    animate();

});