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

    makeBase: (imgPath, context, posX, posY) => {
        let base_image = new Image();
        console.log(context);
        base_image.src = imgPath;
        base_image.onload = function(){
            context.drawImage(base_image, posX, posY);
        }
    }
}