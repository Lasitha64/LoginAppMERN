import toast from 'react-hot-toast';

// =========================== Export functions ===============================================================

// validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
} 

// validate password
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
} 

// validate reset password
export async function resetPasswordValidate(values) {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_password)
        errors.exist = toast.error('Password not match');

    return errors;
} 


// ================================= Internal functions ======================================================

// special characters pattern for password
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// validate username
function usernameVerify(error = {}, values) {
    if(!values.username)
        error.username = toast.error('Username must be provided');
    else if(values.username.includes(" "))
        error.username = toast.error('Username Invalid');

    return error;
}

// verify password
function passwordVerify(error = {}, values) {
    if(!values.password)
        error.password = toast.error('Password must be provided');
    else if(values.password.includes(" "))
        error.password = toast.error('Password Invalid');
    else if(values.password.length < 4)
        error.password = toast.error('Password must be more than 4 characters');
    else if(!specialChars.test(values.password))
        error.password = toast.error('Password must have special characters');

    return error;
}

