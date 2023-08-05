import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from "react-native";
import { useSelector} from 'react-redux';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import bgImage from '../../assets/images/bg-image.jpg';

const ProfileScreen = () => {
    const [allUserPosts, setAllUserPosts] = useState([]);

    const { userId, login } = useSelector(state => state.auth);
    
    
   
    useEffect(() => {
        getUserPosts()
    }, []);

    const getUserPosts = async () => {
        const q = query(collection(db, "posts"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);

        const postsList = querySnapshot.docs.map(doc => {
            return {
                ...doc.data()
            }
        })

        setAllUserPosts(postsList)
    };
    

    return (
        < View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imageBg}>
                
                <View style={styles.boxPosts}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{login}</Text>
                    </View>

                    <FlatList
                        data={allUserPosts}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemBox}>
                                <Image source={{ uri: item.photoRef }} style={styles.img} />

                                <View>
                                    <Text>{item.description}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>
             
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBg: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    boxPosts: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 92,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 100,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: 'RobotoM',
    },
    itemBox: {
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'red',
    },
    img: {
        height: 240,
    },
   
});



export default ProfileScreen;