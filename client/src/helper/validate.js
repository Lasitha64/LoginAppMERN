import toast from 'react-hot-toast';

// validate login page username
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
} 


// validate username
function usernameVerify(error = {}, values) {
    if(!values.username)
        error.username = toast.error('Username must be provided');
    else if(values.username.includes(" "))
        error.username = toast.error('Username Invalid');

    return error;
}