import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore'; 


const DefaultPostsScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = getAllPostsFromFirestore()
        // return () => unsubscribe()
        
    }, []);
    
    const getAllPostsFromFirestore = async () => {
        try {
 
            const unsubscribe = onSnapshot(collection(db, "posts"),
                (snapshot) => {
                    const postList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setPosts(postList);
                }
            )
        
            return unsubscribe
            
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
                            <Text>{item.description}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("MapScreen", { location: item.location })}>
                            <Text>Go to map</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen", { postId: item.id, photoRef: item.photoRef })}>
                            <Text>Go to comments</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
             
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    itemBox:{
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'red',
    },
    img: {
        height: 240,
    }
   
});


export default DefaultPostsScreen;