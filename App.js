import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UsuarioProvider } from './src/context/UsuarioContext';

import IntroducaoScrens from './src/screens/Introducao';
import AcessoScreen from './src/screens/Acesso';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import PerfilScreen from './src/screens/Perfil';
import PacotesScreen from './src/screens/Pacotes';
import AjudaScreen from './src/screens/Ajuda';
import SalvadorScreen from './src/screens/Salvador';
import RioScreen from './src/screens/Rio';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <UsuarioProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Introdução" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Introdução" component={IntroducaoScrens} />
          <Stack.Screen name="Acesso" component={AcessoScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="Pacotes" component={PacotesScreen} />
          <Stack.Screen name="Ajuda" component={AjudaScreen} />
          <Stack.Screen name="Salvador" component={SalvadorScreen} />
          <Stack.Screen name="Rio" component={RioScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsuarioProvider>
  );
}

export default App;