import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Logo from '../assets/Logo.png';
import BottomTabBar from '../components/BottomTabBar';
import Rodape from '../components/Rodape';
import colors from '../theme/colors';
import { useUsuario } from '../context/UsuarioContext';

const opcoes = [
  { titulo: 'Meus dados', icone: 'user' },
  { titulo: 'Preferência de viagem', icone: 'sliders' },
  { titulo: 'Perfil de acessibilidade', icone: 'heart' },
  { titulo: 'Formas de pagamento', icone: 'credit-card' },
];

export default function Perfil({ navigation }) {
  const { usuario } = useUsuario();
  const nome = usuario?.nome;
  const [foto, setFoto] = useState(null);

  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!resultado.canceled) setFoto(resultado.assets[0].uri);
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua câmera.');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!resultado.canceled) setFoto(resultado.assets[0].uri);
  };

  const editarFoto = () => {
    Alert.alert('Foto de perfil', 'Escolha uma opção', [
      { text: 'Galeria', onPress: escolherDaGaleria },
      { text: 'Câmera', onPress: tirarFoto },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Faixa da central */}
        <View style={styles.faixaCentral}>
          <Feather name="phone-call" size={14} color={colors.tealDark} />
          <Text style={styles.faixaTexto}>Central 0800 123 4567</Text>
        </View>

        {/* Cabeçalho */}
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

        <View style={styles.header}>
          <TouchableOpacity onPress={editarFoto}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.foto} />
            ) : (
              <View style={[styles.foto, styles.fotoVazia]}>
                <Feather name="user" size={32} color={colors.white} />
              </View>
            )}
            <View style={styles.iconeCamera}>
              <Feather name="camera" size={12} color={colors.white} />
            </View>
          </TouchableOpacity>

          <Text style={styles.nome}>{nome || 'Usuário'}</Text>

          <TouchableOpacity style={styles.botaoEditar} onPress={editarFoto}>
            <Text style={styles.textoBotaoEditar}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lista}>
          {opcoes.map((item) => (
            <TouchableOpacity key={item.titulo} style={styles.itemLista}>
              <Feather name={item.icone} size={18} color="#1A1A2E" style={{ marginRight: 12 }} />
              <Text style={styles.itemTexto}>{item.titulo}</Text>
              <Feather name="chevron-right" size={18} color={colors.textGray} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.lista}>
          <TouchableOpacity style={styles.itemLista}>
            <Feather name="settings" size={18} color="#1A1A2E" style={{ marginRight: 12 }} />
            <Text style={styles.itemTexto}>Configurações</Text>
            <Feather name="chevron-right" size={18} color={colors.textGray} />
          </TouchableOpacity>
        </View>

        <View style={styles.lista}>
          <TouchableOpacity style={styles.itemLista} onPress={() => navigation.replace('Acesso')}>
            <Feather name="log-out" size={18} color={colors.danger} style={{ marginRight: 12 }} />
            <Text style={[styles.itemTexto, { color: colors.danger }]}>Sair da conta</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <Rodape navigation={navigation} />
      </ScrollView>

      <BottomTabBar navigation={navigation} ativa="Perfil" />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Faixa e cabeçalho (iguais aos da Home)
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

  // Perfil
  header: {
    backgroundColor: colors.teal,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  foto: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: colors.white,
  },
  fotoVazia: {
    backgroundColor: colors.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  nome: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 10,
  },
  botaoEditar: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  textoBotaoEditar: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  lista: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemTexto: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
});