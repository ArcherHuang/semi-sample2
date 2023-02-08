function main() {
    // let isOpenMenu = false;
    // console.log(`1_isOpenMenu: ${isOpenMenu}`);
    // document.getElementById("property").style.display = "none";
    
    const canvas = document.getElementById("renderCanvas");
  
    const engine = new BABYLON.Engine(canvas);

    // Drag & Drop - Start
    let pointerDragBehavior = new BABYLON.PointerDragBehavior();
    pointerDragBehavior.useObjectOrientationForDragging = false;
    pointerDragBehavior.onDragStartObservable.add((event)=>{
        console.log("dragStart");
        // console.log(event);
    })
    pointerDragBehavior.onDragObservable.add((event)=>{
        console.log("drag");
        // console.log(event);
    })
    pointerDragBehavior.onDragEndObservable.add((event)=>{
        console.log("dragEnd");
        // console.log(event);
    })
    // Drag & Drop - End

    function setClickTrigger(meshName) {  
        // console.log(`setClickTrigger__meshName: ${meshName}`);            
        scene.getMeshByName(meshName).actionManager = new BABYLON.ActionManager(scene);
        scene.getMeshByName(meshName).actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger, 
            function (evt) {
                console.log(`${meshName} is clicked.`);
                // window.open('https://javascript.info');
                // console.log(`2_isOpenMenu: ${isOpenMenu}`);
                // if (!isOpenMenu) {
                //     document.getElementById("property").style.display = "block";
                //     isOpenMenu = true;
                // } else {
                //     document.getElementById("property").style.display = "none";
                //     isOpenMenu = false;
                // }
            }
        ));
    }

    function setColor(meshName, r=5, g=20) {
        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(r, g, 0);
        scene.getMeshByName(meshName).material = material;
        setInterval(function(){
            scene.getMeshByName(meshName).material = null;
        }, 10000);
    }

    function move(meshName, x=2, z=-2) {
        // scene.getMeshByName(meshName).position = new BABYLON.Vector3(0, 0, 0);
        scene.getMeshByName(meshName).position.x = x;
        scene.getMeshByName(meshName).position.y = 0.4;
        scene.getMeshByName(meshName).position.z = z;
        // scene.getMeshByName(meshName).position = new Vector3(1, 1, 0.4);
        // scene.getMeshByName(meshName).position.x += 1;
        // scene.getMeshByName(meshName).position.y += 1;
    //     // scene.getMeshByName(meshName).position.z += 4;
    //     scene.getMeshByName(meshName).setPositionWithLocalVector(new BABYLON.Vector3(2, 3, 4));
    }
  
    function createScene() {
  
        const scene = new BABYLON.Scene(engine);
        // scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
        scene.clearColor = new BABYLON.Color3(192, 221, 255);

        const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 10, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, false);
        // camera.invertRotation = true;
    
        const light = new BABYLON.HemisphericLight();
    
        //   BABYLON.SceneLoader.Append("https://ft-lab.github.io/gltf/apple/", "apple.glb", scene, 
        // BABYLON.SceneLoader.Append("./", "room-obj-v1.glb", scene, 
        BABYLON.SceneLoader.Append("./", "semi-v1.glb", scene, 
            function (newMeshes) {
                // const mesh = scene.meshes[0];
                // for (var k = 0; k < scene.meshes.length; k++) {
                //     let meshtmp = scene.meshes[k];
                //     console.log(`${k}: ${meshtmp.name}`);
                // }

                // Drag & Drop - Start
                // mesh.addBehavior(pointerDragBehavior);
                // Drag & Drop - End

                // Monkey: Suzanne
                
                // Set Click Trigger Event - Start
                // for (let i = 1; i < 9; i++) {
                //     setClickTrigger(`Cube.00${i}`);
                // }
                // setClickTrigger('Cylinder')
                // Set Click Trigger Event - End

                // Set Color - Start
                // setColor('Cube.001');
                // setInterval(function(){
                //     setColor('Cube.001', 255, 0);
                // }, 10000);
                // Set Color - End

                // Move - Start
                // move('Cylinder');
                // setInterval(function(){
                //     move('Cylinder', 3, -1);
                // }, 10000);
                // Move - End

                // Hide - Start
                // setInterval(function(){
                //     scene.getMeshByName('Cylinder').setEnabled(false);
                //     document.getElementById("property").style.display = "none";
                //     setInterval(function(){
                //         scene.getMeshByName('Cylinder').setEnabled(true);
                //         document.getElementById("property").style.display = "block";
                //     }, 5000);
                // }, 10000);
                // Hide - End

                scene.activeCamera = null;
                scene.createDefaultCameraOrLight(true);
                // scene.createDefaultCameraOrLight(true, true, true);
                scene.createDefaultEnvironment();
                scene.activeCamera.attachControl(canvas, false);
            },
        );
    
        return scene;
    }
  
    const scene = createScene();
  
    engine.runRenderLoop(() => {
      scene.render();
    });
  
    window.addEventListener("resize", () => {
      engine.resize();
    });
  }
  
  window.addEventListener("DOMContentLoaded", main);