import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';

const NestedScreen = createStackNavigator();



const PostsScreen = () => { 
    
    const stateChange = ({ auth }) => auth.stateChange;
     


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