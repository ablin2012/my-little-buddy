import * as THREE from 'three';
import { Buddy } from "./buddy";
import { BuddyUtil } from "./buddy_util";

export class Ducky extends Buddy {
    constructor(name) {
        super(name);
        this.threegroup = new THREE.Group();

        // Materials
        let yellowMat = new THREE.MeshLambertMaterial({
            color: 0xf7d83e,
        });
        let greenMat = new THREE.MeshLambertMaterial({
            color: 0x196311,
        });
        let whiteMat = new THREE.MeshLambertMaterial({
            color: 0xfaf3d7,
        });
        let blackMat = new THREE.MeshLambertMaterial({
            color: 0x403133,
        });
        let brownMat = new THREE.MeshLambertMaterial({
            color: 0x4a2f26,
        });
        let lightBrownMat = new THREE.MeshLambertMaterial({
            color: 0x785347,
        });
        let orangeMat = new THREE.MeshLambertMaterial({
            color: 0xdb4a1a,
        });

        // body
        this.body = new THREE.Group();
        this.torso = BuddyUtil.makeCube(brownMat, 40, 25, 60, 0, 17, 0, 0, 0, 0);
        this.underBelly = BuddyUtil.makeCube(lightBrownMat, 40, 10, 60, 0, 0, 0, 0, 0, 0);
        this.wingL = BuddyUtil.makeCube(brownMat, 10, 20, 30, 20, 15, 0, 0, 0, 0);
        this.wingR = BuddyUtil.makeCube(brownMat, 10, 20, 30, -20, 15, 0, 0, 0, 0);
        this.body.add(this.torso);
        this.body.add(this.underBelly);
        this.body.add(this.wingL);
        this.body.add(this.wingR);

        // head
        this.head = new THREE.Group();
        this.face = BuddyUtil.makeCube(greenMat, 35, 35, 35, 0, 45, 32, 0, 0, 0);
        this.neck = BuddyUtil.makeCube(whiteMat, 35, 6, 35, 0, 25, 32, 0, 0, 0);
        this.eyeL = BuddyUtil.makeCube(blackMat, 5, 5, 1, 8, 47, 50, 0, 0, 0);
        this.eyeR = BuddyUtil.makeCube(blackMat, 5, 5, 1, -8, 47, 50, 0, 0, 0);
        this.bill = BuddyUtil.makeCube(yellowMat, 16, 6, 20, 0, 39, 52, 0, 0, 0);
        this.head.add(this.face);
        this.head.add(this.neck);
        this.head.add(this.eyeL);
        this.head.add(this.eyeR);
        this.head.add(this.bill);

        // legs
        this.legL = new THREE.Group();
        this.legR = new THREE.Group();
        this.longL = BuddyUtil.makeCube(orangeMat, 5, 30, 5, 12, -15, 0, 0, 0, 0);
        this.longR = this.longL.clone();
        this.longR.position.x = -12;
        this.footL = BuddyUtil.makeCube(orangeMat, 12, 5, 12, 12, -30, 5, 0, 0, 0);
        this.footR = this.footL.clone();
        this.footR.position.x = -12;
        this.legL.add(this.longL);
        this.legL.add(this.footL);
        this.legR.add(this.longR);
        this.legR.add(this.footR);

        this.threegroup.add(this.body);
        this.threegroup.add(this.head);
        this.threegroup.add(this.legL);
        this.threegroup.add(this.legR);

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