import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Cabecalho from '../components/Cabecalho';
import BottomTabBar from '../components/BottomTabBar';
import colors from '../theme/colors';

const TELEFONE = '08001234567';
const TELEFONE_TEXTO = '0800 123 4567';
const EMAIL = 'ola@turismosembarreiras.com.br';

const duvidas = [
  {
    pergunta: 'Como encontro um pacote acessível?',
    resposta:
      'Acesse a página de Pacotes e utilize os filtros de região, tipo de deficiência, acessibilidade, preço e duração.',
  },
  {
    pergunta: 'Como saber se um pacote possui acessibilidade?',
    resposta:
      'Os pacotes apresentam informações sobre transporte adaptado, hospedagem acessível, passeios e outros recursos disponíveis.',
  },
  {
    pergunta: 'Como entrar em contato com uma agência?',
    resposta:
      'Na página de Pacotes, abra o pacote desejado e toque em Ver detalhes para ver os contatos da agência responsável.',
  },
  {
    pergunta: 'Posso pedir ajuda para encontrar uma viagem?',
    resposta:
      'Sim. Fale com a nossa central pelo telefone ou e-mail e a equipe ajuda você a escolher a melhor viagem.',
  },
];

function ligar() {
  Linking.openURL(`tel:${TELEFONE}`).catch(() =>
    Alert.alert('Não foi possível ligar', `Ligue para ${TELEFONE_TEXTO}.`)
  );
}

function enviarEmail() {
  Linking.openURL(`mailto:${EMAIL}`).catch(() =>
    Alert.alert('Não foi possível abrir o e-mail', `Escreva para ${EMAIL}.`)
  );
}

function verOpcoes() {
  Alert.alert('Atendimento', 'Como você prefere falar com a gente?', [
    { text: 'Ligar', onPress: ligar },
    { text: 'Enviar e-mail', onPress: enviarEmail },
    { text: 'Cancelar', style: 'cancel' },
  ]);
}

function CardContato({ icone, titulo, texto, botao, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardIcone}>
        <Feather name={icone} size={22} color={colors.tealDark} />
      </View>
      <Text style={styles.cardTitulo}>{titulo}</Text>
      <Text style={styles.cardTexto}>{texto}</Text>
      <TouchableOpacity style={styles.botao} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.botaoTexto}>{botao}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ItemDuvida({ item, aberto, onPress }) {
  return (
    <View style={[styles.duvida, aberto && styles.duvidaAberta]}>
      <TouchableOpacity style={styles.duvidaTopo} onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.duvidaPergunta, aberto && styles.duvidaPerguntaAberta]}>
          {item.pergunta}
        </Text>
        <Feather
          name={aberto ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={aberto ? colors.tealDark : colors.textGray}
        />
      </TouchableOpacity>
      {aberto && <Text style={styles.duvidaResposta}>{item.resposta}</Text>}
    </View>
  );
}

export default function Ajuda({ navigation }) {
  const [aberta, setAberta] = useState(0); // a primeira já começa aberta

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cabecalho navigation={navigation} />

        <Text style={styles.titulo}>Central de Ajuda</Text>
        <Text style={styles.subtitulo}>
          Precisa de ajuda? Estamos aqui para facilitar sua experiência com o Turismo sem
          Barreiras.
        </Text>

        <Text style={styles.secao}>Fale com a gente</Text>
        <View style={styles.lista}>
          <CardContato
            icone="phone"
            titulo="Telefone"
            texto="Entre em contato com nossa central de atendimento."
            botao={`Ligar para ${TELEFONE_TEXTO}`}
            onPress={ligar}
          />
          <CardContato
            icone="mail"
            titulo="E-mail"
            texto="Envie sua dúvida para nossa equipe."
            botao="Enviar e-mail"
            onPress={enviarEmail}
          />
          <CardContato
            icone="message-circle"
            titulo="Atendimento"
            texto="Acesse as opções de atendimento disponíveis."
            botao="Ver opções"
            onPress={verOpcoes}
          />
        </View>

        <Text style={styles.secao}>Dúvidas frequentes</Text>
        <View style={styles.lista}>
          {duvidas.map((item, i) => (
            <ItemDuvida
              key={item.pergunta}
              item={item}
              aberto={aberta === i}
              onPress={() => setAberta(aberta === i ? null : i)}
            />
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} ativa="Ajuda" />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitulo: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
    marginHorizontal: 28,
    marginTop: 8,
  },
  secao: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 14,
  },
  lista: {
    paddingHorizontal: 20,
  },

  // Cards de contato
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  cardIcone: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  cardTexto: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 14,
  },
  botao: {
    alignSelf: 'stretch',
    backgroundColor: '#0C0636',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Dúvidas frequentes
  duvida: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  duvidaAberta: {
    borderColor: '#059B9A',
  },
  duvidaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  duvidaPergunta: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginRight: 10,
  },
  duvidaPerguntaAberta: {
    color: '#059B9A',
  },
  duvidaResposta: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});