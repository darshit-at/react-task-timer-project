export const checkBlankUserInput = (value) => {
    return value.trim().length === 0 ? true : false
}

export const authErrorHandler = (message) => {
    if(message === "INVALID_PASSWORD") {
        return "Please enter valid password"
    }
    else if(message === "EMAIL_NOT_FOUND") {
        return "Please check your email"
    }
    else {
        return "Too Many attempts please reset your password"
    }
}