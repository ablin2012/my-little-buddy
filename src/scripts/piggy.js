import * as THREE from 'three';
import { Buddy } from "./buddy";
import { BuddyUtil } from "./buddy_util";


export class Piggy extends Buddy {
    constructor(name) {
        super(name);
        this.threegroup = new THREE.Group();

        // Materials
        let pinkMat = new THREE.MeshLambertMaterial({
            color: 0xffb6c1
            // shading: THREE.FlatShading
        })

        // body
        this.body = new THREE.Group();
        this.torso = BuddyUtil.makeCube(pinkMat, 40, 50, 70, 0, 0, 0, 0, 0, 0);
        this.body.add(this.torso);

        // head
        this.head = new THREE.Group();
        this.face = BuddyUtil.makeCube(pinkMat, 60, 60, 60, 0, 10, 20, 0, 0, 0);
        this.head.add(this.face);

        this.threegroup.add(this.body);
        this.threegroup.add(this.head);

        // this.threegroup.traverse(function(object) {
        //     if (object instanceof THREE.Mesh) {
        //       object.castShadow = true;
        //       object.receiveShadow = true;
        //     }
        // });
    }
}