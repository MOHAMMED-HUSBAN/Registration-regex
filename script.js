function validatePassword(password) {
    const length = document.getElementById('length');
    const uppercase = document.getElementById('uppercase');
    const digit = document.getElementById('digit');
    const special = document.getElementById('special');

    length.classList.toggle('valid', /.{8,}/.test(password));
    length.classList.toggle('invalid', !/.{8,}/.test(password));

    uppercase.classList.toggle('valid', /[A-Z]/.test(password));
    uppercase.classList.toggle('invalid', !/[A-Z]/.test(password));

    digit.classList.toggle('valid', /\d/.test(password));
    digit.classList.toggle('invalid', !/\d/.test(password));

    special.classList.toggle('valid', /[!@#$%^&*(),.?":{}|<>]/.test(password));
    special.classList.toggle('invalid', !/[!@#$%^&*(),.?":{}|<>]/.test(password));
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPassword');
    
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

function checkUsernameExists(username) {
    return new Promise(resolve => {
        setTimeout(() => {
            const existingUsernames = ['user1', 'user2', 'user3'];
            resolve(existingUsernames.includes(username));
        }, 1000);
    });
}

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = this.elements.username.value.trim();
    const password = this.elements.password.value;
    const email = this.elements.email.value;
    const phone = this.elements.phone.value;
    const birthday = this.elements.birthday.value;

    validatePassword(password);

    try {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            throw new Error('Username already exists. Please choose another username.');
        }

        if (!isValidEmail(email)) {
            throw new Error('Invalid email format. Please enter a valid email address.');
        }

        if (!isValidPhoneNumber(phone)) {
            throw new Error('Invalid phone number format. Please enter a 10-digit number starting with 07.');
        }

        if (
            /.{8,}/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            alert('Registration successful!');
            this.reset();
        } else {
            throw new Error('Password must meet all criteria: at least 8 characters, one uppercase letter, one digit, and one special character.');
        }
    } catch (error) {
        alert(error.message);
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
}
