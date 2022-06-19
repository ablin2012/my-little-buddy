// FOR REFERENCE ONLY, TO BE DELETED AFTER MODEL COMPLETION

Dragon = function() {
    this.tailAmplitude = 3;
    this.tailAngle = 0;
    this.tailSpeed = .07;
  
    this.wingAmplitude = Math.PI / 8;
    this.wingAngle = 0;
    this.wingSpeed = 0.1
    this.isSneezing = false;
  
    this.threegroup = new THREE.Group(); // this is a sort of container that will hold all the meshes and will be added to the scene;
  
    // Materials
    var greenMat = new THREE.MeshLambertMaterial({
      color: 0x5da683,
      shading: THREE.FlatShading
    });
    var lightGreenMat = new THREE.MeshLambertMaterial({
      color: 0x95c088,
      shading: THREE.FlatShading
    });
  
    var yellowMat = new THREE.MeshLambertMaterial({
      color: 0xfdde8c,
      shading: THREE.FlatShading
    });
  
    var redMat = new THREE.MeshLambertMaterial({
      color: 0xcb3e4c,
      shading: THREE.FlatShading
    });
  
    var whiteMat = new THREE.MeshLambertMaterial({
      color: 0xfaf3d7,
      shading: THREE.FlatShading
    });
  
    var brownMat = new THREE.MeshLambertMaterial({
      color: 0x874a5c,
      shading: THREE.FlatShading
    });
  
    var blackMat = new THREE.MeshLambertMaterial({
      color: 0x403133,
      shading: THREE.FlatShading
    });
    var pinkMat = new THREE.MeshLambertMaterial({
      color: 0xd0838e,
      shading: THREE.FlatShading
    });
  
    // body
    this.body = new THREE.Group();
    this.belly = makeCube(greenMat, 30, 30, 40, 0, 0, 0, 0, 0, Math.PI / 4);
  
    // Wings
    this.wingL = makeCube(yellowMat, 5, 30, 20, 15, 15, 0, -Math.PI / 4, 0, -Math.PI / 4);
    this.wingL.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 10));
    this.wingR = this.wingL.clone();
    this.wingR.position.x = -this.wingL.position.x;
    this.wingR.rotation.z = -this.wingL.rotation.z;
  
    // pike body
    var pikeBodyGeom = new THREE.CylinderGeometry(0, 10, 10, 4, 1);
    this.pikeBody1 = new THREE.Mesh(pikeBodyGeom, greenMat);
    this.pikeBody1.scale.set(.2, 1, 1);
    this.pikeBody1.position.z = 10;
    this.pikeBody1.position.y = 26;
  
    this.pikeBody2 = this.pikeBody1.clone();
    this.pikeBody2.position.z = 0
    this.pikeBody3 = this.pikeBody1.clone();
    this.pikeBody3.position.z = -10;
  
    // tail
    this.tail = new THREE.Group();
    this.tail.position.z = -20;
    this.tail.position.y = 10;
  
    var tailMat = new THREE.LineBasicMaterial({
      color: 0x5da683,
      linewidth: 5
    });
  
    var tailGeom = new THREE.Geometry();
    tailGeom.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 5, -10),
      new THREE.Vector3(0, -5, -20),
      new THREE.Vector3(0, 0, -30)
    );
  
    this.tailLine = new THREE.Line(tailGeom, tailMat);
  
    // pike
    var pikeGeom = new THREE.CylinderGeometry(0, 10, 10, 4, 1);
    pikeGeom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.tailPike = new THREE.Mesh(pikeGeom, yellowMat);
    this.tailPike.scale.set(.2, 1, 1);
    this.tailPike.position.z = -35;
    this.tailPike.position.y = 0;
  
    this.tail.add(this.tailLine);
    this.tail.add(this.tailPike);
  
    this.body.add(this.belly);
    this.body.add(this.wingL);
    this.body.add(this.wingR);
    this.body.add(this.tail);
    this.body.add(this.pikeBody1);
    this.body.add(this.pikeBody2);
    this.body.add(this.pikeBody3);
  
    // head
    this.head = new THREE.Group();
  
    // head face
    this.face = makeCube(greenMat, 60, 50, 80, 0, 25, 40, 0, 0, 0);
    
    
    // head horn
    var hornGeom = new THREE.CylinderGeometry(0, 6, 10, 4, 1);
    this.hornL = new THREE.Mesh(hornGeom, yellowMat);
    this.hornL.position.y = 55;
    this.hornL.position.z = 10;
    this.hornL.position.x = 10;
  
    this.hornR = this.hornL.clone();
    this.hornR.position.x = -10;
  
    // head ears
    this.earL = makeCube(greenMat, 5, 10, 20, 32, 42, 2, 0, 0, 0);
    this.earL.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 5, -10));
    this.earL.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    this.earL.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 4));
  
    this.earR = makeCube(greenMat, 5, 10, 20, -32, 42, 2, 0, 0, 0);
    this.earR.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 5, -10));
    this.earR.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    this.earR.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 4));
  
    // head mouth
    this.mouth = new THREE.Group();
    this.mouth.position.z = 50;
    this.mouth.position.y = 3;
    this.mouth.rotation.x = 0//Math.PI / 8;
  
    // head mouth jaw
    this.jaw = makeCube(greenMat, 30, 10, 30, 0, -5, 15, 0, 0, 0);
    this.mouth.add(this.jaw);
  
    // head mouth tongue
    this.tongue = makeCube(redMat, 20, 10, 20, 0, -3, 15, 0, 0, 0);
    this.mouth.add(this.tongue);
    
    // head smile
    var smileGeom = new THREE.TorusGeometry( 6, 2, 2, 10, Math.PI );
    this.smile = new THREE.Mesh(smileGeom, blackMat);
    this.smile.position.z = 82;  
    this.smile.position.y = 5;
    this.smile.rotation.z = -Math.PI;
    
  
    // head cheek
    this.cheekL = makeCube(lightGreenMat, 4, 20, 20, 30, 18, 55, 0, 0, 0);
    this.cheekR = this.cheekL.clone();
    this.cheekR.position.x = -this.cheekL.position.x;
    
    //head spots
    this.spot1 = makeCube(lightGreenMat, 2, 2, 2, 20, 16, 80, 0, 0, 0);
    
    this.spot2 = this.spot1.clone();
    this.spot2.position.x = 15;
    this.spot2.position.y = 14;
    
    this.spot3 = this.spot1.clone();
    this.spot3.position.x = 16;
    this.spot3.position.y = 20;
    
    this.spot4 = this.spot1.clone();
    this.spot4.position.x = 12;
    this.spot4.position.y = 18;
    
      
    this.spot5 = this.spot1.clone();
    this.spot5.position.x = -15;
    this.spot5.position.y = 14;
    
    this.spot6 = this.spot1.clone();
    this.spot6.position.x = -14;
    this.spot6.position.y = 20;
    
    this.spot7 = this.spot1.clone();
    this.spot7.position.x = -19;
    this.spot7.position.y = 17;
    
    this.spot8 = this.spot1.clone();
    this.spot8.position.x = -11;
    this.spot8.position.y = 17;
    
    
    // head eye
    this.eyeL = makeCube(whiteMat, 10, 22, 22, 27, 34, 18, 0, 0, 0);
    this.eyeR = this.eyeL.clone();
    this.eyeR.position.x = -27;
  
    // head iris
    this.irisL = makeCube(brownMat, 10, 12, 12, 28, 30, 24, 0, 0, 0);
    this.irisR = this.irisL.clone();
    this.irisR.position.x = -this.irisL.position.x;
  
    // head nose
    this.noseL = makeCube(blackMat, 5, 5, 8, 5, 40, 77, 0, 0, 0);
    this.noseR = this.noseL.clone();
    this.noseR.position.x = -this.noseL.position.x;
  
    this.head.position.z = 30;
    this.head.add(this.face);
    this.head.add(this.hornL);
    this.head.add(this.hornR);
    this.head.add(this.earL);
    this.head.add(this.earR);
    this.head.add(this.mouth);
    this.head.add(this.eyeL);
    this.head.add(this.eyeR);
    this.head.add(this.irisL);
    this.head.add(this.irisR);
    this.head.add(this.noseL);
    this.head.add(this.noseR);
    this.head.add(this.cheekL);
    this.head.add(this.cheekR);
    this.head.add(this.smile);
    /*
    this.head.add(this.spot1);
    this.head.add(this.spot2);
    this.head.add(this.spot3);
    this.head.add(this.spot4);
    this.head.add(this.spot5);
    this.head.add(this.spot6);
    this.head.add(this.spot7);
    this.head.add(this.spot8);
    */
    // legs
    this.legFL = makeCube(greenMat, 20, 10, 20, 20, -30, 15, 0, 0, 0);
    this.legFR = this.legFL.clone();
    this.legFR.position.x = -30;
    this.legBL = this.legFL.clone();
    this.legBL.position.z = -15;
    this.legBR = this.legBL.clone();
    this.legBR.position.x = -30;
  
    this.threegroup.add(this.body);
    this.threegroup.add(this.head);
    this.threegroup.add(this.legFL);
    this.threegroup.add(this.legFR);
    this.threegroup.add(this.legBL);
    this.threegroup.add(this.legBR);
    //this.threegroup.add(this.pike);
  
    this.threegroup.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
}
  