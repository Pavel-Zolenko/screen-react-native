import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import { useState } from 'react';


export default function LoginScreen() { 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onLogin = () => {
    console.log(`Компонент Login - email: ${email}, password: ${password}`);
  };
  
  return (
    <View style={styles.form}>
            
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Увійти</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        
        <TextInput
          style={styles.input}
          placeholder={'Адреса електронної пошти'}
          placeholderTextColor={'#BDBDBD'}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        
        <TextInput
          style={[styles.input, { marginTop: 16 }]}
          secureTextEntry={true}
          placeholder={'Пароль'}
          placeholderTextColor={'#BDBDBD'}
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </KeyboardAvoidingView>
          
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onLogin} >
        <Text style={styles.btnTxt}>Увійти</Text>
      </TouchableOpacity>
      <View style={styles.titleWrapQuestion}>
        <Text style={styles.titleQuestion}>Немає акаунту? Зареєструватися</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginHorizontal: 0,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 144,
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
