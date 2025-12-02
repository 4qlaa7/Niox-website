import { setupLoader } from '../views/loaderView.js';
import { initParticles } from '../views/particleView.js';
import { initMobileMenu } from '../views/mobileMenuView.js';
import { initSmoothScroll } from '../views/smoothScrollView.js';
import { getContactFormElements } from '../views/contactFormView.js';
import { ContactModel } from '../models/contactModel.js';

export class MainController {
    constructor() {
        this.contactModel = new ContactModel();
    }

    init() {
        // Always try to set up loader / robot (only active on pages that have related DOM)
        setupLoader();

        // DOM-ready initializations
        document.addEventListener('DOMContentLoaded', () => {
            initParticles();
            initMobileMenu();
            initSmoothScroll();
            this._initContactForm();
        });
    }

    _initContactForm() {
        const elements = getContactFormElements();
        if (!elements) return;

        const { form, formMessage, submitButton } = elements;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!submitButton || !formMessage) return;

            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const { success } = await this.contactModel.submit(form);

                if (success) {
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
        });
    }
}


