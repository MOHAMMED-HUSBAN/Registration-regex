function validatePassword(password) {
    const criteria = [
        { id: 'length', regex: /.{8,}/ },
        { id: 'uppercase', regex: /[A-Z]/ },
        { id: 'digit', regex: /\d/ },
        { id: 'special', regex: /[!@#$%^&*(),.?":{}|<>]/ }
    ];

    criteria.forEach(item => {
        const element = document.getElementById(item.id);
        element.classList.toggle('valid', item.regex.test(password));
        element.classList.toggle('invalid', !item.regex.test(password));
    });
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = document.getElementById('showPassword').checked ? 'text' : 'password';
}

function checkUsernameExists(username) {
    return new Promise(resolve => {
        setTimeout(() => {
            const existingUsernames = ['user1', 'user2', 'user3']; // Example existing usernames
            resolve(existingUsernames.includes(username));
        }, 1000); // Simulate delay
    });
}

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = this.elements.username.value.trim();
    const password = this.elements.password.value;

    validatePassword(password);

    try {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            throw new Error('Username already exists. Please choose another username.');
        }

        alert('Registration successful!');
        this.reset();
    } catch (error) {
        alert(error.message);
    }
});
