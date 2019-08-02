import * as THREE from "three";
import Box from "./components/box";
import Camera from "./components/camera";
import Cuphead from "./components/cuphead";
import Portal from "./components/portal";
import HUD from "./components/hud";
import Turntable from "./components/turntable";
import { clean } from "./utils/three";

const scene = new THREE.Scene();
const camera = Camera();

export default async () => {
	clean(scene);
	const ambient = new THREE.AmbientLight(0xffffff, 1);
	const sunlight = new THREE.DirectionalLight(0xffffff, 0.95);

    sunlight.position.set(50, 50, 50);

    scene.add(ambient);
    scene.add(sunlight);

	camera.position.set(0, 2, 6);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	const turntable = Turntable({ parent: scene });

	const entities = {
		scene,
		camera,
		hud: HUD(),
		turntable,
		box: Box({ parent: turntable, z: 3, y: 1 }),
		cuphead: await Cuphead({ parent: turntable, x: 3, y: 1 }),
		portal: await Portal({ parent: turntable, x: -3, y: 1 })
	};

	entities.cuphead.actions.joy();

	return entities;
};