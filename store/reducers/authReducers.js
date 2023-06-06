
const initialize = {
    authuError: null,
    loading: true,
    loginUser: false,
    isRegister: false,
    userId: null,
    success: null,
}
const authReducers = (state =  initialize, action) => {

    switch(action.type){
        case 'NEW_USER':
            console.log('New user created');
            return {
                ...state,
                authuError: null,
                loading:false,
                isRegister: true,
                success:'Sign up successfully!'
            }
        case 'ERROR':
            console.log('There was an error!' + action.error.message);
            return {
                ...state,
                authuError: action.error.message,
                isRegister: false,
                success:null
        }
        case 'LOGIN_SUCCESS':
            console.log('Login Successfully! ' + action.loginUser);
            return {
                ...state,
                authuError: null,
                loginUser: true,
            }
        case 'LOGIN_ERROR':
            // console.log(action.error.code);
            return {
                ...state,
                authuError: action.error,
                loginUser: false,
        }
        case 'SIGN_OUT':
            console.log('Sign out!, successs');
            return {
                ...state,
                authuError: null,
                loading:false,
                loginUser: false,
            }
        case 'SIGN_OUT_ERROR':
            console.log('There was an error!');
            return {
                ...state,
                authuError:'There was an error' + action.error,
        }
        case 'GET_LOGIN_USER':
            console.log('There is a user!');
            return {
                ...state,
                authuError:null,
                userdata: action.user,
        }

        default:
            return state;
    }
}

export default authReducers;

