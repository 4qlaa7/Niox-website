export class ContactModel {
    /**
     * Submit the contact form using Fetch.
     * Returns an object: { success: boolean }
     */
    async submit(formElement) {
        const formData = new FormData(formElement);

        const response = await fetch(formElement.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        return { success: response.ok };
    }
}


