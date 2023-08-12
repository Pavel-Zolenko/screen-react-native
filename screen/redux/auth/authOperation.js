import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

import { db } from '../../firebase/config';
import { auth } from '../../firebase/config';
import { storage } from '../../firebase/config';

import { authSlice } from './authReducer';



export const authSignUpUser = ({ email, password, login }) =>
  async (dispatch, getState) => {
  
    try {
      // создаем юзера
      await createUserWithEmailAndPassword(auth, email, password);
      // используем метод auth для запроса в базу, берем currentUser
      const currentUser =  auth.currentUser;
      // обновляем в currentUser свойство displayName
      await updateProfile(currentUser, { displayName: login });
      // делаем новый запрос с обновленным displayName
      const { displayName, uid } = auth.currentUser;
      // отправляем в стейт login и uid
      dispatch(authSlice.actions.updateUserProfile({
        login: displayName,
        userId: uid,
      }))
    
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
    
export const authSignInUser = ({ email, password }) => async (dispatch, getState) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};
    


export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {

       const currentUser =  auth.currentUser;
     
      updateProfile(currentUser, { displayName: user.displayName});
      
      const { displayName, uid } = auth.currentUser;
      
      
      dispatch(authSlice.actions.updateUserProfile({
        login: displayName,
        userId: uid,
      }))
      dispatch(authSlice.actions.authStateChange({ stateChange: true }))
    }
  })
};
    
export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSlice.actions.authSignOut())
};






