import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import {authSignUpUser} from '../../redux/auth/authOperation';

import bgImage from '../../assets/images/bg-image.jpg';

const initialState = {
  login: '',
  email: '',
  password: '',
};


export default function RegistrationScreen() { 
  const [state, setState] = useState(initialState);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const dispath = useDispatch();
  const navigation = useNavigation();
 

  const keybordHide = () => {
    setIsShowKeybord(false)
    Keyboard.dismiss()
  };

  const handleSubmit = () => {
    setIsShowKeybord(false)
    Keyboard.dismiss()
    dispath(authSignUpUser(state))
    setState(initialState)
  };
  
  
  return (
    <TouchableWithoutFeedback
      onPress={keybordHide}
    >
        
      <View style={styles.container}>
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>

          <View style={{
            ...styles.form,
            paddingBottom: isShowKeybord ? 20 : 66
          }}>
      
            <View style={styles.avatar}></View>
      
            <View style={styles.titleWrap}>
              <Text style={styles.title}>Реєстрація</Text>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keybord}>
      
              <TextInput
                style={[styles.input, {  marginBottom: 16, fontFamily: 'RobotoR' }]}
                placeholder={'Логін'}
                placeholderTextColor={'#BDBDBD'}
                value={state.login}
                onChangeText={(value) => setState(prevState => ({ ...prevState, login: value }))}
                onFocus={(event) => {
                  setIsShowKeybord(true)
                  event.target.setNativeProps({
                    style: {
                      ...styles.input,
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FF6C00",
                    }
                  });
                }}
                 onBlur={(event) =>
                    event.target.setNativeProps({
                      style: {
                        ...styles.input,
                      },
                    })
                  }
              />

              <TextInput
                style={[styles.input, {marginBottom: 16, fontFamily: 'RobotoR' }]}
                placeholder={'Адреса електронної пошти'}
                placeholderTextColor={'#BDBDBD'}
                value={state.email}
                onChangeText={(value) => setState(prevState => ({ ...prevState, email: value }))}
                onFocus={(event) => {
                  setIsShowKeybord(true)
                  event.target.setNativeProps({
                    style: {
                      ...styles.input,
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FF6C00",
                    }
                  });
                }}
                 onBlur={(event) =>
                    event.target.setNativeProps({
                      style: {
                        ...styles.input,
                      },
                    })
                  }
              ></TextInput>

              <View style={styles.inputPassWrap}>
              <TextInput
                style={[styles.input, { fontFamily: 'RobotoR' }]}
                secureTextEntry={true}
                placeholder={'Пароль'}
                placeholderTextColor={'#BDBDBD'}
                value={state.password}
                onChangeText={(value) => setState(prevState => ({ ...prevState, password: value }))}
                onFocus={(event) => {
                  setIsShowKeybord(true)
                  event.target.setNativeProps({
                    style: {
                      ...styles.input,
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FF6C00",
                    }
                  });
                }}
                 onBlur={(event) =>
                    event.target.setNativeProps({
                      style: {
                        ...styles.input,
                      },
                    })
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsHiddenPassword(!isHiddenPassword)}
                  style={ styles.passwordBtn}
                >
                  <Text>
                     {isHiddenPassword ? "Показати" : "Приховати"}
                  </Text>
              </TouchableOpacity>
                
                </View>
        
            </KeyboardAvoidingView>
          
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={
                handleSubmit 
              }

            >
              <Text style={styles.btnTxt}>Зареєструватися</Text>
            </TouchableOpacity>

            <View  style={styles.titleWrapQuestion}>
              <Text style={styles.titleQuestion} onPress={() => navigation.navigate("LoginScreen")}>Вже є акаунт? Увійти</Text>
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
    position: 'relative',
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginHorizontal: 0,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 66,
  },
  avatar: {
    position: 'absolute',
    top: -60,
    left: 135,
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: 33,
  },
  title: {
    fontFamily: 'RobotoM',
    fontSize: 30,
    fontWeight: '500',
    color: '#212121',
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    height: 50,
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6', 
    color: "#212121",
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
    fontWeight: '400',
    fontFamily: 'RobotoR',
    color: '#FFFFFF',
  },
  titleWrapQuestion: {
    alignItems: 'center',
    marginTop: 16,
  },
  titleQuestion: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'RobotoR',
    color: '#1B4371',
  },
  inputPassWrap: {
    position: 'relative',
  },
  passwordBtn: {
    position: 'absolute',
    top: 0,
    right: 16,
    justifyContent: "center",
    height: "100%",
  },
});
