module.exports.validateRegisterInput = (
    username, email, password, confirmPassword
) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = 'Username Must Not be Empty';
    }

    if (email.trim() === "") {
        errors.email = 'Email Must Not be Empty';
    } else {
        const regEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        if (!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        }
    }

    if (password.trim() === "") {
        errors.password = "Password must not empty";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = 'Username Must Not be Empty';
    }

    if (password.trim() === "") {
        password.username = 'password Must Not be Empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}