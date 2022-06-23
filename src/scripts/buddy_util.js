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

    pointInRect: function(x, y, rect) {
		return BuddyUtil.inRange(x, rect.x, rect.x + rect.width) &&
		       BuddyUtil.inRange(y, rect.y, rect.y + rect.height);
	},

	inRange: function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	}
}