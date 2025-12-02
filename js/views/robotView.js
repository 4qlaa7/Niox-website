/**
 * Initialize the 3D robot using Three.js.
 * Assumes THREE is available globally.
 */
export function initRobot() {
    const canvas = document.getElementById('robot-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 5;

    // Create robot head
    const headGeometry = new THREE.BoxGeometry(2, 2, 2);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d9ff,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.5,
        shininess: 100
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x00d9ff,
        emissiveIntensity: 1
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 0.3, 1);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 0.3, 1);
    scene.add(leftEye, rightEye);

    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x00d9ff });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = 1.5;
    scene.add(antenna);

    // Antenna bulb
    const bulbGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const bulbMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d9ff,
        emissive: 0x00d9ff,
        emissiveIntensity: 2
    });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.y = 2;
    scene.add(bulb);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d9ff, 2, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        head.rotation.y += 0.005;
        head.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;

        leftEye.position.z = 1 + Math.sin(Date.now() * 0.003) * 0.1;
        rightEye.position.z = 1 + Math.sin(Date.now() * 0.003) * 0.1;

        bulb.material.emissiveIntensity = 2 + Math.sin(Date.now() * 0.005);

        renderer.render(scene, camera);
    }
    animate();

    // Responsive handling
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}


