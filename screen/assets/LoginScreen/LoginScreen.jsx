import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() { 

    return (
        <View style={styles.form}>
            
            <View style={styles.titleWrap}>
                <Text style={styles.title}>Увійти</Text>
            </View>
          
            <TextInput style={[styles.input, { marginTop: 16 }]} placeholder={'Адреса електронної пошти'} placeholderTextColor={'#BDBDBD'}></TextInput>
            <TextInput style={[styles.input, { marginTop: 16 }]} secureTextEntry={true} placeholder={'Пароль'} placeholderTextColor={'#BDBDBD'}></TextInput>
          
            <TouchableOpacity activeOpacity={0.8} style={styles.button} >
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
