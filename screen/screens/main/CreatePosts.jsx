import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { AntDesign } from '@expo/vector-icons';


const  CreatePosts = () => { 
    return (
        <View style={styles.container}>

            <View style={styles.img}></View>  
            <Text style={styles.titleAddFoto}>Завантажте фото</Text>
            <TextInput
                style={styles.input}
                placeholder="Назва"
                placeholderTextColor={'#BDBDBD'}
            ></TextInput>

            <TextInput
                style={styles.input}
                placeholder="Місцевість..."
                placeholderTextColor={'#BDBDBD'}
            ></TextInput>

            <TouchableOpacity 
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => { }}
            >
              <Text style={styles.btnTxt}>Опубліковати</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}  style={styles.deleteIcon}>
                <AntDesign name="delete" size={24} color="#DADADA" />
            </TouchableOpacity>

        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: '#FFFFFF',
    },
    img: {
        height: 240,
        backgroundColor: '#E8E8E8'
    },
    titleAddFoto: {
        fontFamily: 'RobotoR',
        fontSize: 16,
        marginTop: 8,
        color: '#BDBDBD',
    },
    input: {
        fontFamily: 'RobotoR',
        fontSize: 16,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        paddingVertical: 15,
        color: "#212121",
    },
    button: {
        borderWidth: 1,
        height: 50,
        borderRadius: 100,
        borderColor: 'transparent',
        backgroundColor: '#FF6C00',
        marginTop: 32,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'RobotoR',
        color: '#FFFFFF',
    },
    deleteIcon: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        marginTop: 150,
        borderRadius: 20,
        backgroundColor: '#F6F6F6',
},
    
})
 
export default CreatePosts;