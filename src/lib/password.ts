export function validatePassword(password: string): boolean {
    const number = /[0-9]/;
    const upper = /[A-Z]/;
    const special = /[!@#$%^&*]/;

    if (password.length < 6) {
        return false;
    }

    if (!number.test(password)) {
        return false;
    }

    if (!upper.test(password)) {
        return false;
    }

    if (!special.test(password)) {
        return false;
    }

    return true;

}