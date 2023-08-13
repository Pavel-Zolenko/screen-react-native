import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { db } from '../../firebase/config';
import { collection, onSnapshot, getDocs } from 'firebase/firestore'; 
import { Feather, Fontisto } from '@expo/vector-icons';



const DefaultPostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
 
       
    useEffect(() => {
        const unsubscribe = getAllPostsFromFirestore()
    }, []);


    const getAllPostsFromFirestore = async () => {
    try {
        const unsubscribe = onSnapshot(collection(db, "posts"),
            (snapshot) => {
                const postList = snapshot.docs.map(async (doc) => {
                    const postData = doc.data();
                    const commentsCollection = collection(db, `posts/${doc.id}/comments`);
                    
                    // Получаем данные из подколлекции комментариев
                    const commentsSnapshot = await getDocs(commentsCollection);
                    const commentsList = commentsSnapshot.docs.map(commentDoc => ({
                        id: commentDoc.id,
                        ...commentDoc.data()
                    }));

                    return {
                        id: doc.id,
                        ...postData,
                        comments: commentsList // Добавляем массив комментариев к данным поста
                    };
                });

                Promise.all(postList).then(resolvedPosts => {
                    setPosts(resolvedPosts);
                });
            }
        )

        return unsubscribe;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

    

    return (
        
        < View style={styles.container}>
            
            <FlatList
                data={posts}
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
                                <Fontisto name="comment" size={22} color="#BDBDBD" />
                                <Text style={styles.countComment}>{ item.comments.length}</Text>     
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
            
    );
};

const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
    },
    container: {
        marginHorizontal: 16,
    },
    itemBox:{
        marginBottom: 10,
        gap:8,
    },
    img: {
        height: 240,
        borderRadius: 8,
    },
    wrapBtn: {
        flexDirection: "row",
        gap: 80,
    },
    commentBtn: {
        flexDirection: "row",
        gap: 6,
    },
    txtTitle: {
        fontSize: 16,
        fontFamily:"RobotoM",
    },
    countComment: {
        fontSize: 16,
        color: '#BDBDBD'
    },
    txtLocation: {
        fontSize: 16,
    },
    locationBtn: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 6,
    },
   
});


export default DefaultPostsScreen;