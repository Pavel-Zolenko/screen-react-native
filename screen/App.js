import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from './routing';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoR': require('./assets/fonts/Roboto-Regular.ttf'),
    'RobotoM': require('./assets/fonts/Roboto-Medium.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(true);
   
  return (
    
    <NavigationContainer>
      { routing}
    </NavigationContainer>
  
  );
}
