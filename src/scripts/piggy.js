import * as THREE from 'three';
import { Buddy } from "./buddy";
import { BuddyUtil } from "./buddy_util";


export class Piggy extends Buddy {
    constructor(name) {
        super(name);
        this.threegroup = new THREE.Group();

        // Materials
        let pinkMat = new THREE.MeshLambertMaterial({
            color: 0xffb6c1,
            shading: THREE.FlatShading
        })

        // body
        this.body = new THREE.Group();
        this.torso = BuddyUtil.makeCube(pinkMat, 40, 50, 60, 0, 0, 0, 0, 0, 0);
        this.body.add(this.torso);

        // head
        this.head = new THREE.Group();
        this.face = BuddyUtil.makeCube(pinkMat, 50, 50, 50, 0, 20, 40, 0, 0, 0);
        this.head.add(this.face);

        this.threegroup.add(this.body);
        this.threegroup.add(this.head);

        this.threegroup.traverse(function(object) {
            if (object instanceof THREE.Mesh) {
              object.castShadow = true;
              object.receiveShadow = true;
            }
        });
    }

    updateBody(speed){
        this.head.rotation.y += (this.tHeadRotY - this.head.rotation.y) / speed;
        this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
        this.head.position.x += (this.tHeadPosX-this.head.position.x) / speed; 
        this.head.position.y += (this.tHeadPosY-this.head.position.y) / speed; 
        this.head.position.z += (this.tHeadPosZ-this.head.position.z) / speed;
    }

    look(xTarget, yTarget){
        this.tHeadRotY = BuddyUtil.rule3(xTarget, -200, 200, -Math.PI/4, Math.PI/4);
        this.tHeadRotX = BuddyUtil.rule3(yTarget, -200, 200, -Math.PI/4, Math.PI/4);
        this.tHeadPosX = BuddyUtil.rule3(xTarget, -200, 200, 0, 0);
        this.tHeadPosY = BuddyUtil.rule3(yTarget, 0, 260, 0, 0);
        this.tHeadPosZ = 0;
        this.updateBody(10);
    }
}