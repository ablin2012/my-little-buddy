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
    }
}