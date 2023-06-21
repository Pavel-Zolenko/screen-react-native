import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const DefaultPostsScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    
    
    useEffect(() => {
        if (route.params) { 
            setPosts(prevState => [...prevState, route.params])  
        } 
    }, [route.params])


    return (
        < View style={ styles.container }>
            <FlatList
                data={posts}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style = { styles.itemBox}>
                        <Image source={{ uri: item.photo }} style={ styles.img } />
                    </View>
                )}
                
            />
           
                <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
                 <Text>Go to map</Text>   
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen")}>
                 <Text>Go to comments</Text>   
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    itemBox:{
        marginBottom: 10,
    },
    img: {
        height: 240,

    }
   
});


export default DefaultPostsScreen;