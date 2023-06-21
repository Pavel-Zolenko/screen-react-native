import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';

const CreatePosts = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);

    const [location, setLocation] = useState(null);
    


    useEffect(() => {
        (async () => {
            const data = await Camera.requestCameraPermissionsAsync();
            let { status } = await Location.requestForegroundPermissionsAsync();
        })();
    }, []);
    

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync()
        setPhoto(photo.uri)
       
        const location = await Location.getCurrentPositionAsync();
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setLocation(coords);
    };
    

    const sendPhoto = () => {
        navigation.navigate('DefaultPostsScreen', { photo })
    };

    const keybordHide = () => {
        Keyboard.dismiss()
    };

    return (
        <TouchableWithoutFeedback
            onPress={keybordHide}
        >

            <View style={styles.container}>
                

                <Camera style={styles.camera} ref={setCamera}>
                    {photo && <View style={styles.photoContainer}>
                        <Image source={{ uri: photo }} style={{ width: 150, height: 150 }} />
                    </View>}
                    <TouchableOpacity onPress={takePhoto} activeOpacity={0.5} style={styles.cameraBtn} >
                        <FontAwesome name="camera" size={24} color="#DADADA" />
                    </TouchableOpacity>
                </Camera>

                <Text style={styles.titleAddFoto}>Завантажте фото</Text>

                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >

                    <TextInput
                        style={styles.input}
                        placeholder="Назва"
                        placeholderTextColor={'#BDBDBD'}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Місцевість..."
                        placeholderTextColor={'#BDBDBD'}
                    >
                        <Feather name="map-pin" size={24} color="#DADADA" />
                    </TextInput>
                
                </KeyboardAvoidingView>
                
                    
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={sendPhoto}
                >
                    <Text style={styles.btnTxt}>Опубліковати</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={styles.deleteIcon}>
                    <AntDesign name="delete" size={24} color="#DADADA" />
                </TouchableOpacity>
                    
            </View>
            
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 32,
        backgroundColor: '#FFFFFF',
    },
    camera: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBtn: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
    },
    photoContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        borderColor:'#fff',
        borderWidth: 1,
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
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        paddingVertical: 15,
        color: "#212121",
        justifyContent: 'center',
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


