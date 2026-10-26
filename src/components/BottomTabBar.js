import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

// "id" é o que cada tela manda no prop "ativa" (ex.: ativa="Home").
// "rota" é o nome da tela no App.js. Deixe null enquanto a tela não existir.
const itens = [
  { id: 'Home', titulo: 'Início', icone: 'home', rota: 'Home' },
  { id: 'Pacotes', titulo: 'Pacotes', icone: 'package', rota: 'Pacotes' },
  { id: 'Ajuda', titulo: 'Central de ajuda', icone: 'headphones', rota: null },
  { id: 'Perfil', titulo: 'Perfil', icone: 'user', rota: 'Perfil' },
];

export default function BottomTabBar({ navigation, ativa }) {
  return (
    <View style={styles.container}>
      {itens.map((item) => {
        const selecionado = item.id === ativa;
        const cor = selecionado ? colors.tealDark : colors.textGray;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => item.rota && navigation.navigate(item.rota)}
          >
            <Feather name={item.icone} size={20} color={cor} />
            <Text
              style={[styles.texto, { color: cor }, selecionado && styles.textoAtivo]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.titulo}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    paddingBottom: 14,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  texto: {
    fontSize: 10,
    marginTop: 4,
  },
  textoAtivo: {
    fontWeight: '700',
  },
});