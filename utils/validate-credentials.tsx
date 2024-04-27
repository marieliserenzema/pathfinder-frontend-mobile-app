const validatePassword = (password: string): boolean => {
    return password.length > 8;
};

const validateEmail = (email: string): boolean => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
}

const validateUsername = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
}

export default { validatePassword, validateEmail, validateUsername };