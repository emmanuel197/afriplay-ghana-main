export const validateEmail = (email) => {
    var regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email)
};