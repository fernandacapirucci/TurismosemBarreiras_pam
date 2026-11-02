import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/Logo.png';

export default function Rodape({ navigation }) {
  return (
    <View style={styles.rodape}>
      <View style={styles.rodapeMarca}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.rodapeNome}>Turismo sem Barreiras</Text>
      </View>
      <Text style={styles.rodapeTexto}>
        Conectamos viajantes com deficiência a pequenas agências especializadas em turismo
        acessível pelo Brasil.
      </Text>

      <Text style={styles.rodapeTitulo}>EXPLORAR</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Pacotes')}>
        <Text style={styles.rodapeLink}>Pacotes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
        <Text style={styles.rodapeLink}>Central de ajuda</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Text style={styles.rodapeLink}>Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.rodapeTitulo}>FALE CONOSCO</Text>
      <Text style={styles.rodapeLink}>☎ 0800 123 4567</Text>
      <Text style={styles.rodapeLink}>✉ ola@turismosembarreiras.com.br</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rodape: {
    backgroundColor: '#0C0636',
    marginTop: 28,
    padding: 22,
  },
  rodapeMarca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  rodapeNome: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  rodapeTexto: {
    color: '#C7CCE0',
    fontSize: 12,
    lineHeight: 18,
  },
  rodapeTitulo: {
    color: '#8DE04B',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 8,
  },
  rodapeLink: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 8,
  },
});