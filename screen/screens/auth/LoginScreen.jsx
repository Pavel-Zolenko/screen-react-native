import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import bgImage from '../../assets/images/bg-image.jpg';

const initialState = {
  email: '',
  password: '',
};


export default function LoginScreen() { 
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [state, setState] = useState(initialState);
  
  const navigation = useNavigation();
  
  const onLogin = () => {
    setIsShowKeybord(false)
    Keyboard.dismiss()
    setState(initialState)
    console.log(state)
  };

  const keybordHide = () => {
    setIsShowKeybord(false)
    Keyboard.dismiss()
  };
  
  return (
    <TouchableWithoutFeedback
      onPress={keybordHide}
    >

      <View style={styles.container}>
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
      
          <View style={{ ...styles.form, paddingBottom: isShowKeybord ? 30 : 144 }}>
            
            <View style={styles.titleWrap}>
              <Text style={[styles.title, { fontFamily: 'RobotoM' }]}>Увійти</Text>
            </View>
      
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboard}>
        
              <TextInput
                style={[styles.input, { fontFamily: 'RobotoR' }]}
                placeholder={'Адреса електронної пошти'}
                placeholderTextColor={'#BDBDBD'}
                value={state.email}
                onChangeText={(value) => setState(prevState => ({ ...prevState, email: value }))}
                onFocus={() => setIsShowKeybord(true)}
              ></TextInput>
        
              <TextInput
                style={[styles.input, { marginTop: 16, fontFamily: 'RobotoR' }]}
                secureTextEntry={true}
                placeholder={'Пароль'}
                placeholderTextColor={'#BDBDBD'}
                value={state.password}
                onChangeText={(value) => setState(prevState => ({ ...prevState, password: value }))}
                onFocus={() => setIsShowKeybord(true)}
              ></TextInput>
            </KeyboardAvoidingView>
      
          
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate("Home")} >
              <Text style={[styles.btnTxt, { fontFamily: 'RobotoR' }]}>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.titleWrapQuestion}>
              <Text style={[styles.titleQuestion, { fontFamily: 'RobotoR' }]} onPress={() => navigation.navigate("RegistrationScreen")}>Немає акаунту? Зареєструватися</Text>
            </View>
          </View>
           
        </ImageBackground>
      </View>
      
    </TouchableWithoutFeedback>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
   form: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginHorizontal: 0,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: 33,
  },
  title: {
    color: '#212121',
    fontSize: 30,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    color: "#212121",
    backgroundColor: '#F6F6F6',
  },

  button: {
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    borderColor: 'transparent',
    backgroundColor: '#FF6C00',
    marginTop: 43,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  titleWrapQuestion: {
    alignItems: 'center',
    marginTop: 16,
  },
  titleQuestion: {
    fontSize: 16,
    color: '#1B4371',
  },
});