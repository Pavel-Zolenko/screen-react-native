import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import { db } from '../../firebase/config';
import { storage } from '../../firebase/config';
import { useSelector} from 'react-redux';


const CreatePosts = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [photoRef, setPhotoRef] = useState(null);
    const [description, setDescription] = useState('');
    const [descriptionLocation, setDescriptionLocation] = useState('');
    const [location, setLocation] = useState(null);

    
    const { userId, login } = useSelector((state) => state.auth)
    

    useEffect(() => {
        (async () => {
            const data = await Camera.requestCameraPermissionsAsync();
            let { status } = await Location.requestForegroundPermissionsAsync();
            const location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        setLocation(coords);
            
        })();
    }, []);

     
    

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync()
        setPhoto(photo.uri)
    };



    const sendPhoto = () => {
        
       uploadPostToServer()
        
        navigation.navigate('DefaultPostsScreen')

    };

    const uploadPostToServer = async () => {
        const metadata = {
            contentType: 'image/jpeg',
        };
        const uniquePostId = Date.now().toString()
        
        const response = await fetch(photo);
        const blob = await response.blob();

        const storageRef = ref(storage, `postImage/${uniquePostId}`);
          
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    addDoc(collection(db, 'posts'), {
                        userId: userId,
                        photoRef: downloadURL,
                        description: description,
                        descriptionLocation: descriptionLocation,
                        login: login,
                        location: location,
                    })
                });
            }
        ); 
    };


    const keybordHide = () => {
        Keyboard.dismiss()
    };



    const uploadPhotoToStorage = async (photoUri) => {
    
  try {
    // Создаем ссылку на файл в Firebase Storage
    const storageRef = ref(storage, 'photos/' + Date.now().toString());

    // Загружаем фотографию в Firebase Storage
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);

    // Получаем URL загруженного файла
    const downloadURL = await storageRef.getDownloadURL();
                   

    // Возвращаем URL загруженной фотографии
    return downloadURL;
  } catch (error) {
    console.error('Ошибка при загрузке фотографии:', error);
    throw error;
  }
};


    
    
    return (
        <TouchableWithoutFeedback
            onPress={keybordHide}
        >
            <KeyboardAwareScrollView>

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
                            value={description}
                            onChangeText={setDescription}
                        
                        />

                        <View style={styles.inputWrap}>
                            <Feather name="map-pin" size={24} color="#DADADA" style={styles.svgLocation} />
                            <TextInput
                                style={[styles.input, { borderBottomWidth: 0 }]}
                                placeholder="Місцевість..."
                                placeholderTextColor={'#BDBDBD'}
                                value={descriptionLocation}
                                onChangeText={setDescriptionLocation}
                            />
                        </View>
                
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
            </KeyboardAwareScrollView>
            
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
    inputWrap: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 30,
        // borderWidth: 1,
        // borderColor: 'red',
         borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    svgLocation: {
        position: 'absolute',

    },

})

export default CreatePosts;




