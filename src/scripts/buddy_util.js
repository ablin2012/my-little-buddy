import * as THREE from 'three';

export const BuddyUtil = {
    makeCube: (material, width, height, depth, posX, posY, posZ, rotX, rotY, rotZ) => {
        let geom = new THREE.BoxGeometry(width, height, depth);
        let mesh = new THREE.Mesh(geom, material);
        mesh.position.x = posX;
        mesh.position.y = posY;
        mesh.position.z = posZ;
        mesh.rotation.x = rotX;
        mesh.rotation.y = rotY;
        mesh.rotation.z = rotZ;
        return mesh;
    },

    rule3: (v,vmin,vmax,tmin, tmax) => {
        let nv = Math.max(Math.min(v,vmax), vmin);
        let dv = vmax-vmin;
        let pc = (nv-vmin)/dv;
        let dt = tmax-tmin;
        let tv = tmin + (pc*dt);
        return tv; 
    },

    // getFoodStartPos: (width, height) => {
    //     let mid = [width/2, height * 0.8]
    //     let allPos = [mid];
    //     for (let i = 0; i < 2; i++) {
    //         allPos.push([mid[0] - i * width/4, mid[1]])
    //         allPos.push([mid[0] - i * width/4, mid[1]])
    //     }
    //     return allPos;
    // }
}