import { render } from "@testing-library/react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { ObjectSpaceNormalMap } from "three";

class App extends Component {
    componentDidMount() {
        let camera, scene, rendere;
        let plane;
        let pointer, raycaster, isShiftDown = false;

        let rollOverMesh, rollOverMaterial;
        let cubeGeo, cubeMaterial;

        const objects = [];
        init();
        render();

        function init() {
            camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                1,
                10000
            );

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);

            // roll-over helpers

            const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
            rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
            rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
            scene.add(rollOverMesh);

            // cubes

            cubeGeo = new THREE.BoxGeometry(50, 50, 50);
            cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xfeb74c, map: new THREE.TextureLoader().load('images/square-outline-textured.png') })

            // grid

            const gridHelper = new THREE.PolarGridHelper(1000, 20);
            scene.add(gridHelper);

            //

            raycaster = new THREE.Raycaster();// Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over)
            pointer = new THREE.Vector2();

            const geometry = new THREE.PlaneGeometry(1000, 1000);
            geometry.rotateX(- Math.PI / 2);

            plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
            scene.add(plane);

            objects.push(plane);

            // lights

            const ambientLight = THREE.AmbientLight(0x606060);
            scene.add(ambientLight);

            const directionalLight = THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 0.75, 0.5).normalize();
            scene.add(directionalLight);

            rendere = new THREE.WebGLRenderer({antialias:true});
            rendere.setPixelRatio(window.devicePixelRatio);
            rendere.setSize(window.innerWidth,window.innerHeight);
            document.body.appendChild(rendere.domElement);

            document.addEventListener('pointermove',onPointerMove);
            document.addEventListener('pointerdown',onPointerDown);
            document.addEventListener('keydown',onDocumentKeyDown);
            document.addEventListener('keyup',onDocumentKeyUp);

            //

            window.addEventListener('resize',onWindowResize);

            function onWindowResize(){
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                rendere.setSize(window.innerWidth,window.innerHeight);
                
                render();
            }


        }
    }

    render() {
        return (
            <>
                <h1>Hello</h1>
            </>
        )
    }
}
export default App;