import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../assets/Logo.png';
import colors from '../theme/colors';
import { useUsuario } from '../context/UsuarioContext';

export default function Cabecalho({ navigation }) {
  const { usuario } = useUsuario();
  const nome = usuario?.nome;

  return (
    <View>
      <View style={styles.faixaCentral}>
        <Feather name="phone-call" size={14} color={colors.tealDark} />
        <Text style={styles.faixaTexto}>Central 0800 123 4567</Text>
      </View>

      <View style={styles.cabecalho}>
        <Image source={Logo} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.appNome}>Turismo sem Barreiras</Text>
          <Text style={styles.appSub}>Viagens acessíveis pelo Brasil</Text>
        </View>
        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.botaoEntrarTexto}>
            {nome ? `Olá, ${nome}` : 'Entrar ou cadastrar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  faixaCentral: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44,
    paddingBottom: 8,
    backgroundColor: '#F4F7F7',
  },
  faixaTexto: {
    fontSize: 12,
    color: '#1A1A2E',
    marginLeft: 6,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  appNome: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  appSub: {
    fontSize: 10,
    color: '#6B7280',
  },
  botaoEntrar: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botaoEntrarTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A1A2E',
  },
});