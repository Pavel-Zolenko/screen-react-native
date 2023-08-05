import 'react-native-gesture-handler';
import { Provider} from 'react-redux';
import { useFonts } from 'expo-font';
import { store } from './redux/store';

import Main from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoR': require('./assets/fonts/Roboto-Regular.ttf'),
    'RobotoM': require('./assets/fonts/Roboto-Medium.ttf'),
  });
  

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
