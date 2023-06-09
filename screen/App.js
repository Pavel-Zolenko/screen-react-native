import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import bgImage from './assets/images/bg-image.jpg';
import RegistrationScreen from './components/RegistrationScreen/RegistrationScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
          {/* <RegistrationScreen/> */}
          <LoginScreen />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 66,
    position: 'relative',
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
