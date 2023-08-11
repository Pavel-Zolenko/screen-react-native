import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../../firebase/config';
import { addDoc, collection, serverTimestamp, onSnapshot  } from "firebase/firestore";
import { useSelector} from 'react-redux';

const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    
    const { login } = useSelector(state => state.auth)

    const { postId, photoRef } = route.params;

    useEffect(() => {
        getAllComments()
      
    }, []);
    

    const createComment = async () => {
        try {
            Keyboard.dismiss()
            
            const commentsCollection = collection(db, `posts/${postId}/comments`);
            await addDoc(commentsCollection, {
                comment,
                login,
                timestamp: serverTimestamp()
            });

            setComment('');
        } catch (error) {
            console.log('Error creating comment:', error);
        }
    };
    

    const getAllComments = async () => {
        onSnapshot(collection(db, `posts/${postId}/comments`), (snapshot) => {
            const commentsList = snapshot.docs.map((doc) => {
                const commentData = doc.data();
                const timestamp = commentData.timestamp ? commentData.timestamp.toDate() : null;
                
                                
                const options = {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                };
     
                const formatter = new Intl.DateTimeFormat('uk-UA', options);
                const formattedDateTime = formatter.format(timestamp);
                const formattedDateTimeWithSeparator = formattedDateTime.replace(',', '|').replace('р.', '');


                return {
                    id: doc.id,
                    date: formattedDateTimeWithSeparator,
                    ...doc.data()
                }
            }
            );

            setAllComments(commentsList);
        })
    };

    const keybordHide = () => {
        Keyboard.dismiss()
    };

    return (
        <TouchableWithoutFeedback
            onPress={keybordHide}
        >
        
            <View style={styles.container}>
            
                <SafeAreaView style={styles.listComments} >
                    <Image
                        style={styles.img}
                        source={{
                            uri: photoRef
                        }}
                    />
                    <FlatList
                        data={allComments}
                        renderItem={({ item }) => (
                        
                            <View style={styles.commentContainer} >
                            
                                <View style={styles.avatarBox}>
                                    <Image
                                        style={styles.avatar}
                                        source={{
                                            uri: 'https://reactnative.dev/img/tiny_logo.png'
                                        }}
                                    />
                                </View>
                                <View style={styles.commentBox}>
                                    <Text style={styles.comment}>{item.comment}</Text>
                                    <Text style={styles.date}>{item.date}</Text>
                                </View>
                            </View>
                                      
                        )}
                        keyExtractor={item => item.id}
                    
                    />
                </SafeAreaView>


                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Коментувати..."
                        placeholderTextColor={'#BDBDBD'}
                        value={comment}
                        onChangeText={setComment}
                    />
                    <MaterialCommunityIcons
                        name="arrow-up-circle"
                        size={34} color={'#FF6C00'}
                        style={styles.iconSend}
                        onPress={createComment}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom:16,
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        marginTop: 30,
    },
    input: {
        fontSize: 16,
        height: 50,
        borderWidth: 1,
        padding: 16,
        paddingRight: 55,
        borderRadius: 100,
        borderColor: '#E8E8E8',
        color: "#212121",
        backgroundColor: '#F6F6F6',
    },
    iconSend: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
    commentContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 24,
    },
    avatarBox: {
        flex: 1/2,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 50,
    },
    listComments: {
        flex: 1,
    },
    commentBox: {
        flex: 3,
        padding: 16,
        backgroundColor: '#F6F6F6',
        borderRadius: 6,
        borderTopLeftRadius: 0,
    },
    comment: {
        fontFamily: 'RobotoR',
        fontSize: 16,
        color: '#212121',
    },
    img: {
        height: 240,
        marginBottom: 32,
        borderRadius: 8,
    },
     
})


export default CommentsScreen;