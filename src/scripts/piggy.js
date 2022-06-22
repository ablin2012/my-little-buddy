import * as THREE from 'three';
import { Buddy } from "./buddy";
import { BuddyUtil } from "./buddy_util";


export class Piggy extends Buddy {
    constructor(name) {
        super(name);
        this.favoriteFood = 'carrot'
        this.threegroup = new THREE.Group();

        // Materials
        let pinkMat = new THREE.MeshLambertMaterial({
            color: 0xffb6c1,
        })
        let whiteMat = new THREE.MeshLambertMaterial({
            color: 0xfaf3d7,
        });
        let blackMat = new THREE.MeshLambertMaterial({
            color: 0x403133,
        });
        let darkPinkMat = new THREE.MeshLambertMaterial({
            color: 0xf0909e,
        });

        // body
        this.body = new THREE.Group();
        this.torso = BuddyUtil.makeCube(pinkMat, 45, 45, 60, 0, 0, 0, 0, 0, 0);
        this.body.add(this.torso);

        // head
        this.head = new THREE.Group();
        this.face = BuddyUtil.makeCube(pinkMat, 50, 50, 50, 0, 18, 40, 0, 0, 0);
        this.earL = BuddyUtil.makeCube(pinkMat, 16, 15, 8, 17, 48, 35, 0, 0, 0);
        this.earR = BuddyUtil.makeCube(pinkMat, 16, 15, 8, -17, 48, 35, 0, 0, 0);
        this.earBendL = BuddyUtil.makeCube(pinkMat, 16, 6, 14, 17, 53, 38, 0, 0, 0);
        this.earBendR = BuddyUtil.makeCube(pinkMat, 16, 6, 14, -17, 53, 38, 0, 0, 0);
        this.eyeL = BuddyUtil.makeCube(blackMat, 7, 11, 1, 12, 25, 65, 0, 0, 0);
        this.eyeR = BuddyUtil.makeCube(blackMat, 7, 11, 1, -12, 25, 65, 0, 0, 0);
        this.nose = BuddyUtil.makeCube(darkPinkMat, 22, 17, 8, 0, 11, 68, 0, 0, 0);
        this.noseHoleL = BuddyUtil.makeCube(blackMat, 3, 6, 1, 3, 13, 72, 0, 0, 0);
        this.noseHoleR = BuddyUtil.makeCube(blackMat, 3, 6, 1, -3, 13, 72, 0, 0, 0);
        this.head.add(this.face);
        this.head.add(this.earL);
        this.head.add(this.earR);
        this.head.add(this.earBendL);
        this.head.add(this.earBendR);
        this.head.add(this.eyeL);
        this.head.add(this.eyeR);
        this.head.add(this.nose);
        this.head.add(this.noseHoleL);
        this.head.add(this.noseHoleR);

        // legs
        this.legFL = BuddyUtil.makeCube(pinkMat, 16, 20, 16, 14.5, -30, 22, 0, 0, 0);
        this.legFR = this.legFL.clone();
        this.legFR.position.x = -14.5;
        this.legBL = this.legFL.clone();
        this.legBL.position.z = -22;
        this.legBR = this.legBL.clone();
        this.legBR.position.x = -14.5;

        this.threegroup.add(this.body);
        this.threegroup.add(this.head);
        this.threegroup.add(this.legFL);
        this.threegroup.add(this.legFR);
        this.threegroup.add(this.legBL);
        this.threegroup.add(this.legBR);

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
        this.head.position.x += (this.tHeadPosX - this.head.position.x) / speed; 
        this.head.position.y += (this.tHeadPosY - this.head.position.y) / speed; 
        this.head.position.z += (this.tHeadPosZ - this.head.position.z) / speed;
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