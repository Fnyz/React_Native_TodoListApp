import { db } from "../../firebase";
import {doc, setDoc, collection, addDoc, serverTimestamp, onSnapshot, where, query, getDoc, orderBy, limit, deleteDoc, querySnapshot} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Toast from 'react-native-toast-message';


const auth = getAuth();


export const addNewlist = (cred) => {
    return (dispatch) => {

        const ref = collection(db, 'todolist');
        addDoc(ref, {
            todo: cred.todo,
            userId: cred.uid,
            createdAt: serverTimestamp(),
        }).then(()=>{
            setTimeout(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Item is successfully added 👋',
                    position:'top',
                });
            }, 2000);
            dispatch({type:'ADD_NEW_DOCS', })
        }).catch((err)=>{
            dispatch({type:'ADD_ERROR', err}); 
        })
    }
}

export const getDataList = (uid) => {
    return (dispatch) => {
        const docs = collection(db, 'todolist');
        const ref = query(docs, where('userId', '==', uid), orderBy('createdAt', 'desc'));
    
        onSnapshot(ref, (list)=>{
            let value = [];
            list.docs.forEach(element => {
                value.push({...element.data(), id: element.id});
            });
            dispatch({type:'GET_DATA_LIST', listing: value})
           
        })
        
       
    }
}






