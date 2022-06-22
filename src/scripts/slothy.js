import * as THREE from 'three';
import { Buddy } from "./buddy";
import { BuddyUtil } from "./buddy_util";

export class Slothy extends Buddy {
    constructor(name) {
        super(name);
        this.favoriteFood = 'pizza'
        this.threegroup = new THREE.Group();

        // Materials
        let tanMat = new THREE.MeshLambertMaterial({
            color: 0xded162,
        });
        let lightTanMat =new THREE.MeshLambertMaterial({
            color: 0xebe7c3,
        });
        let whiteMat = new THREE.MeshLambertMaterial({
            color: 0xfaf3d7,
        });
        let blackMat = new THREE.MeshLambertMaterial({
            color: 0x403133,
        });
        let purpMat = new THREE.MeshLambertMaterial({
            color: 0x693a70,
        });

        // body
        this.body = new THREE.Group();
        this.torso = BuddyUtil.makeCube(tanMat, 45, 45, 60, 0, 0, 0, 0, 0, 0);
        this.underBelly = BuddyUtil.makeCube(lightTanMat, 40, 43, 61, 0, -1, 0, 0, 0, 0);
        this.body.add(this.torso);
        this.body.add(this.underBelly);

        // head
        this.head = new THREE.Group();
        this.face = BuddyUtil.makeCube(tanMat, 50, 25, 50, 0, 18, 40, 0, 0, 0);
        this.underFace = BuddyUtil.makeCube(lightTanMat, 40, 20, 40, 0, 16, 46, 0, 0, 0);
        this.irisL = BuddyUtil.makeCube(whiteMat, 13, 13, 1, 25, 35, 43, 0, 0, 0);
        this.irisR = BuddyUtil.makeCube(whiteMat, 13, 13, 1, -25, 35, 43, 0, 0, 0);
        this.eyeLidL = BuddyUtil.makeCube(tanMat, 13, 13, 6, 25, 35, 40, 0, 0, 0);
        this.eyeLidR = BuddyUtil.makeCube(tanMat, 13, 13, 6, -25, 35, 40, 0, 0, 0);
        this.eyeL = BuddyUtil.makeCube(blackMat, 5, 5, 1, 25, 35, 44, 0, 0, 0);
        this.eyeR = BuddyUtil.makeCube(blackMat, 5, 5, 1, -25, 35, 44, 0, 0, 0);
        this.nose = BuddyUtil.makeCube(purpMat, 20, 15, 8, 0, 25, 68, 0, 0, 0);
        this.noseHoleL = BuddyUtil.makeCube(blackMat, 4, 4, 1, 3, 27, 72, 0, 0, 0);
        this.noseHoleR = BuddyUtil.makeCube(blackMat, 4, 4, 1, -3, 27, 72, 0, 0, 0);
        this.mouth = BuddyUtil.makeCube(blackMat, 26, 10, 1, 0, 10, 66, 0, 0, 0);
        this.toothL = BuddyUtil.makeCube(whiteMat, 4, 6, 1, 4, 12, 67, 0, 0, 0);
        this.toothR = BuddyUtil.makeCube(whiteMat, 4, 6, 1, -4, 12, 67, 0, 0, 0);
        this.head.add(this.face);
        this.head.add(this.underFace);
        this.head.add(this.irisL);
        this.head.add(this.irisR);
        this.head.add(this.eyeLidL);
        this.head.add(this.eyeLidR);
        this.head.add(this.eyeL);
        this.head.add(this.eyeR);
        this.head.add(this.nose);
        this.head.add(this.noseHoleL);
        this.head.add(this.noseHoleR);
        this.head.add(this.mouth);
        this.head.add(this.toothL);
        this.head.add(this.toothR);

        // legs
        this.legFL = BuddyUtil.makeCube(tanMat, 16, 20, 16, 14.5, -30, 22, 0, 0, 0);
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