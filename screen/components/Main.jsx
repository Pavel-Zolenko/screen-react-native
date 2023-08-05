import { useState, useEffect } from 'react';
import { } from "react-native";
import { useSelector, useDispatch} from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useRoute } from '../routing';
import { auth } from '../firebase/config';
import { authStateChangeUser } from '../redux/auth/authOperation';

const Main = () => {
    
    const dispatch = useDispatch();

    const stateChange = useSelector(({ auth }) => auth.stateChange)
    
    
    useEffect(() => {
        dispatch(authStateChangeUser())
     }, [])

    
    const routing = useRoute(stateChange);

    return (
        <NavigationContainer>{routing}</NavigationContainer>
    )
};

export default Main;