/**
 * Get references to the contact form elements if they exist on the page.
 */
export function getContactFormElements() {
    const form = document.getElementById('contact-form');
    if (!form) return null;

    const formMessage = document.getElementById('form-message');
    const submitButton = form.querySelector('button[type="submit"]');

    return {
        form,
        formMessage,
        submitButton
    };
}


