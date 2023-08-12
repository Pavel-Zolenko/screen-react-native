import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';

import PostsScreen from './screens/main/PostsScreen';
import CreatePosts from './screens/main/CreatePosts';
import ProfileScreen from './screens/main/ProfileScreen';




const AuthStack = createStackNavigator(); 
const MainTabs = createBottomTabNavigator();


export const useRoute = (isAuth) => {
   
    

    if (!isAuth) {
        return <AuthStack.Navigator initialRouteName="LoginScreen">
            <AuthStack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
            <AuthStack.Screen name="RegistrationScreen" options={{ headerShown: false }} component={RegistrationScreen} />
        </AuthStack.Navigator>
    }

    return <MainTabs.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: { height: 60, padding: 10 }, }}>
        <MainTabs.Screen
            options={{
                headerShown: false,
                tabBarActiveTintColor: '#FF6C00',
                tabBarIcon: ({ focused, color, size }) => <Octicons name="apps" size={size} color={color} />
            }}
            name="PostsScreen"
            component={PostsScreen} />
        <MainTabs.Screen
            options={{
                title: "Створити публікацію",
                headerTintColor: '#212121',
                headerTitleStyle: {
                    fontWeight: 500,
                    fontSize: 17,
                },
                tabBarIcon: ({ focused, color, size }) => <Feather name="plus" size={size} color={'#FFFFFF'} />,
                tabBarItemStyle: { backgroundColor: '#FF6C00', borderRadius: 50, maxWidth: 100 }
            }}
            name="CreatePosts"
            component={CreatePosts} />
        <MainTabs.Screen
            options={{
                headerShown: false,
                tabBarActiveTintColor: '#FF6C00',
                tabBarIcon: ({ focused, color, size }) => <Ionicons name="person-outline" size={size} color={color} />
            }}
            name="ProfileScreen"
            component={ProfileScreen} />

        </MainTabs.Navigator>
       
};

