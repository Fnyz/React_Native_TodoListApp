import { db } from "../../firebase";
import { Auth } from "../../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth} from 'firebase/auth'
import {doc, setDoc, getDoc} from 'firebase/firestore';


const auth = getAuth();
const user = auth.currentUser;

export const SignUp = (cred) => {
    return (dispatch) => {

        createUserWithEmailAndPassword(Auth,
            cred.email,
            cred.password
        ).then((users) => {
            
              const ref = doc(db, 'users', users.user.uid)

              return setDoc(ref,{
                firstname: cred.firstname,
                lastname: cred.lastname
            })

        }).then((user)=> {
            dispatch({ type:'NEW_USER' });
            
        }).catch((err) => {
            dispatch({ type:'ERROR', err });
        })
    }
}

export const SignIn = (cred) => {
    return (dispatch) => {
        signInWithEmailAndPassword(Auth,
            cred.email,
            cred.password
        ).then((user)=> {
            dispatch({ type:'LOGIN_SUCCESS', loginUser: user });
        }).catch((error) => {
            dispatch({ type:'LOGIN_ERROR', error });
        })
    }
}


export const SignOut = () => {
    return (dispatch) => {
        signOut(Auth).then(()=> {
            dispatch({ type:'SIGN_OUT' });
        }).catch((err) => {
            console.log(err.message);
            dispatch({ type:'SIGN_OUT_ERROR', err });
        })
    }
}


export const getUserData = () => {
    return (dispatch) => {
        const ref = doc(db, 'users', user.uid)

        getDoc(ref)
        .then((userSnap)=>{
            console.log(userSnap.id);
            if(userSnap.exists()){
                dispatch({ type:'GET_LOGIN_USER', user: userSnap.id })
            }
        }).catch(err => {
            console.log('No user found!')
        })
    }
}


