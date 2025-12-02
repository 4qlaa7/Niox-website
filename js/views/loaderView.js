import { initRobot } from './robotView.js';

/**
 * Handle the loading screen and robot initialization.
 * - If a loading screen exists, wait a bit then hide it and show the robot.
 * - If no loading screen but a robot canvas exists, show the robot immediately.
 */
export function setupLoader() {
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
}


