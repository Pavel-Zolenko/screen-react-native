import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';

const NestedScreen = createStackNavigator();

import { useSelector } from 'react-redux';

const PostsScreen = () => { 
    // const userId = ({ auth }) => auth.userId;
    // const login = ({ auth }) => auth.login;
    const stateChange = ({ auth }) => auth.stateChange;
    
    // const id = useSelector(userId);
    // const loginUser = useSelector(login);
    // console.log(id)
    // console.log(loginUser)
   


    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                 options={{ headerShown: false }}
                name='DefaultPostsScreen'
                component={DefaultPostsScreen}
            />
            <NestedScreen.Screen
                 options={{
                    title: "Мапа",
                    headerTintColor: '#212121',
                    headerTitleStyle: {
                        fontWeight: 500,
                        fontSize: 17,
                    },
                    headerTitleAlign: 'center',
                }}
                name='MapScreen'
                component={MapScreen}
            />
            <NestedScreen.Screen
                options={{
                    title: "Коментарі",
                    headerTintColor: '#212121',
                    headerTitleStyle: {
                        fontWeight: 500,
                        fontSize: 17,
                    },
                    headerTitleAlign: 'center',
                }}
                name='CommentsScreen'
                component={CommentsScreen}
            />
        </NestedScreen.Navigator>
    )
}

export default PostsScreen;