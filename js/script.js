// Loading screen initialization (only on pages with loading screen)
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const robotCanvas = document.getElementById('robot-canvas');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            if (robotCanvas) {
                robotCanvas.classList.add('visible');
                initRobot();
            }
        }, 3000);
    } else if (robotCanvas) {
        // If no loading screen but has robot canvas, initialize immediately
        robotCanvas.classList.add('visible');
        initRobot();
    }
});

// Create particles for background animation
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Initialize particles on page load
createParticles();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Contact form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formMessage = document.getElementById('form-message');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
            formMessage.className = 'mt-4 p-4 rounded-lg success';
            formMessage.classList.remove('hidden');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at contact@niox.ai';
        formMessage.className = 'mt-4 p-4 rounded-lg error';
        formMessage.classList.remove('hidden');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// 3D Robot with Three.js
function initRobot() {
    const canvas = document.getElementById('robot-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
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

