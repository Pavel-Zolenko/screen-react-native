import React from "react";
import { StyleSheet} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';

import PostsScreen from './screens/main/PostsScreen';
import CreatePosts from './screens/main/CreatePosts';
import ProfileScreen from './screens/main/ProfileScreen';


import { Octicons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';



const AuthStack = createStackNavigator(); 
const MainTabs = createBottomTabNavigator();


export const useRoute = (isAuth) => {
    if (!isAuth) {
        return <AuthStack.Navigator initialRouteName="RegistrationScreen">
            <AuthStack.Screen name="RegistrationScreen" options={{ headerShown: false }} component={RegistrationScreen} />
            <AuthStack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
        </AuthStack.Navigator>
    }

    return <MainTabs.Navigator screenOptions={{ tabBarShowLabel: false,  tabBarStyle: { height: 60, padding: 10 }, }}>
        <MainTabs.Screen
            options={{
                title: "Публікації",
                headerTintColor: '#212121',
                headerTitleStyle: {
                    fontWeight: 500,
                    fontSize: 17,
                },
                headerTitleAlign: 'center',
                headerRightContainerStyle: {paddingRight: 20},
                 headerRight: () => (
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
                ),
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
                tabBarActiveTintColor: '#FF6C00',
                tabBarIcon: ({ focused, color, size }) => <Ionicons name="person-outline" size={size} color={color} />
            }}
            name="ProfileScreen"
            component={ProfileScreen} />

    </MainTabs.Navigator>
};


const styles = StyleSheet.create({
    plus: {

    }
})