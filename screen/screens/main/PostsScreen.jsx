import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from "react-native";

import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';

const NestedScreen = createStackNavigator();



const PostsScreen = () => { 
       
  
    
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


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     }
// })


export default PostsScreen;