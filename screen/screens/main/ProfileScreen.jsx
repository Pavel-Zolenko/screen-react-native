import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config';
import bgImage from '../../assets/images/bg-image.jpg';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { MaterialIcons, Feather, Fontisto } from '@expo/vector-icons';


const ProfileScreen = ({ navigation }) => {
    const [allUserPosts, setAllUserPosts] = useState([]);
    
    const { userId, login } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    
   
    useEffect(() => {
        getUserPosts()
    }, []);


    const signOut = () => {
        dispatch(authSignOutUser());
    };


    const getUserPosts = async () => {
        try {
            const q = query(collection(db, "posts"), where("userId", "==", userId));
    
            const unsubscribe = onSnapshot(q, snapshot => {
                const updatedPostsList = snapshot.docs.map(async doc => {
                    const post = doc.data();

                    // Получение комментариев для текущего поста
                    const commentsCollection = collection(db, `posts/${doc.id}/comments`);
                    const commentsSnapshot = await getDocs(commentsCollection);
                    const comments = commentsSnapshot.docs.map(commentDoc => commentDoc.data());

                    // Включение комментариев в структуру поста
                    return {
                        ...post,
                        id: doc.id,
                        comments: comments
                    };
                });

                // Ожидание завершения всех Promise
                Promise.all(updatedPostsList).then(updatedPosts => {
                    setAllUserPosts(updatedPosts);
                });
            });

            // Возвращаем функцию отписки
            return unsubscribe;
            
        } catch (error) {
            console.log(error);
            throw error;
        }      
    };



    return (
        < View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imageBg}>
                
                <View style={styles.boxPosts}>
                    <View style={styles.avatar}></View>
                    <MaterialIcons name="logout" size={24} color="#BDBDBD" onPress={signOut} style={styles.svgSingOut } />

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
                                    <Text style={ styles.txtTitle}>{item.description}</Text>
                                </View>

                                   <View style={ styles.wrapBtn}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("CommentsScreen", { postId: item.id, photoRef: item.photoRef })}
                                style={styles.commentBtn}
                            >
                                <Fontisto name="comment" size={22} color={item.comments.length ? '#FF6C00' : "#BDBDBD" } />
                                        <Text style={[styles.countComment, item.comments.length && styles.blackText ]}>{item.comments.length }</Text>     
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("MapScreen", { location: item.location })}
                                style={styles.locationBtn}
                            >
                                <Feather name="map-pin" size={24} color="#BDBDBD" />
                                <Text style={styles.txtLocation}>{item.descriptionLocation }</Text>
                            </TouchableOpacity>
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
    svgSingOut: {
        position: 'absolute',
        top: 24,
        right: 16,
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
    avatar: {        
        position: 'absolute',
        left: '50%',
        transform: [ {translateX: -50},  { translateY: -50 }],        
        height: 120,
        width: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
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
        marginBottom: 10,
        gap:8,
    },
    img: {
        height: 240,
        borderRadius: 8,
    },
    txtTitle: {
        fontSize: 16,
        fontFamily:"RobotoM",
    },
    wrapBtn: {
        flexDirection: "row",
        gap: 80,
    },
    commentBtn: {
        flexDirection: "row",
        gap: 6,
    },
    countComment: {
        fontSize: 16,
        color: '#BDBDBD'
    },
     locationBtn: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 6,
    },
      txtLocation: {
          fontSize: 16,
          textDecorationLine: 'underline',
    },
      blackText: {
        color: '#212121'
    },
   
   
});



export default ProfileScreen;