import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';

import { authSignOutUser } from '../../redux/auth/authOperation';

import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';

const NestedScreen = createStackNavigator();



const PostsScreen = () => { 
       const dispatch = useDispatch();
  
     const signOut = () => {
        dispatch(authSignOutUser());
    };
    
    
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                options={{
                    title: 'Публікації',
                    headerShown: true,
                    headerTintColor: '#212121',
                    headerTitleStyle: {
                        fontWeight: 500,
                        fontSize: 17,
                    },
                    headerTitleAlign: 'center',
                    headerRightContainerStyle: { paddingRight: 20 },
                    headerRight: () => (
                        <MaterialIcons name="logout" size={24} color="#BDBDBD" onPress={signOut} />
                    ),

                }}
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
          
    );
}


export default PostsScreen;