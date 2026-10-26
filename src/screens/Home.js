import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/Logo.png';
import Rio from '../assets/Rio.jpg';
import Gramado from '../assets/gramado.webp';
import Salvador from '../assets/salvador.png';
import Bonito from '../assets/bonito.webp';
import BottomTabBar from '../components/BottomTabBar';
import colors from '../theme/colors';
import { useUsuario } from '../context/UsuarioContext';

const opcoesDestino = ['Bonito', 'Gramado', 'Salvador', 'Rio de Janeiro'];
const opcoesViajantes = ['1 viajante', '2 viajantes', '3 viajantes', '4 viajantes', '5 viajantes'];
const opcoesNecessidade = [
  'Qualquer necessidade',
  'Acessibilidade motora',
  'Acessibilidade visual',
  'Acessibilidade auditiva',
];

const destinos = [
  { nome: 'Rio de Janeiro', local: 'RJ · Brasil', preco: 'R$ 1.890', selo: 'Selo Ouro', imagem: Rio },
  { nome: 'Gramado', local: 'RS · Brasil', preco: 'R$ 2.290', selo: 'Selo Ouro', imagem: Gramado },
  { nome: 'Salvador', local: 'BA · Brasil', preco: 'R$ 1.690', selo: 'Selo Prata', imagem: Salvador },
  { nome: 'Bonito', local: 'MS · Brasil', preco: 'R$ 3.290', selo: 'Selo Ouro', imagem: Bonito },
];

const passos = [
  {
    icone: 'map-pin',
    titulo: '1. Escolha o destino',
    texto: 'Filtre por necessidade e encontre pacotes com transporte adaptado e hospedagem acessível.',
  },
  {
    icone: 'check-circle',
    titulo: '2. Reserve com segurança',
    texto: 'A agência confirma vagas, guia especializado e detalhes da viagem.',
  },
  {
    icone: 'smile',
    titulo: '3. Aproveite sem preocupação',
    texto: 'Do embarque ao passeio, equipe treinada acompanha todo o roteiro.',
  },
];

// Coloca as barras sozinho enquanto a pessoa digita: 25122026 -> 25/12/2026
function mascaraData(texto) {
  const n = texto.replace(/\D/g, '').slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
}

function CampoSelect({ icone, tipo, placeholder, valor, opcoes, aberto, onToggle, onSelect }) {
  return (
    <View style={styles.campoBloco}>
      <TouchableOpacity style={styles.campo} onPress={onToggle} activeOpacity={0.7}>
        {tipo === 'material' ? (
          <MaterialCommunityIcons name={icone} size={20} color={colors.tealDark} />
        ) : (
          <Feather name={icone} size={18} color={colors.tealDark} />
        )}
        <Text style={[styles.campoTexto, valor ? styles.campoTextoPreenchido : null]}>
          {valor || placeholder}
        </Text>
        <Feather
          name={aberto ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textGray}
        />
      </TouchableOpacity>

      {aberto && (
        <View style={styles.opcoes}>
          {opcoes.map((op) => (
            <TouchableOpacity key={op} style={styles.opcao} onPress={() => onSelect(op)}>
              <Text style={[styles.opcaoTexto, op === valor ? styles.opcaoSelecionada : null]}>
                {op}
              </Text>
              {op === valor && <Feather name="check" size={16} color={colors.tealDark} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function CardDestino({ item }) {
  return (
    <View style={styles.cardDestino}>
      {item.imagem ? (
        <Image source={item.imagem} style={styles.destinoImagem} />
      ) : (
        <View style={[styles.destinoImagem, styles.destinoSemImagem]}>
          <Feather name="image" size={32} color="#FFFFFF" />
        </View>
      )}

      <View style={styles.seloBadge}>
        <MaterialCommunityIcons name="shield-check" size={12} color="#0C0636" />
        <Text style={styles.seloBadgeTexto}>{item.selo}</Text>
      </View>

      <View style={styles.destinoInfo}>
        <View style={styles.destinoLinha}>
          <Text style={styles.destinoNome}>{item.nome}</Text>
          <Text style={styles.destinoNota}>★ 4.8</Text>
        </View>
        <Text style={styles.destinoLocal}>{item.local}</Text>

        <View style={styles.destinoRodape}>
          <View>
            <Text style={styles.destinoApartir}>A partir de</Text>
            <Text style={styles.destinoPreco}>{item.preco}</Text>
          </View>
          <TouchableOpacity style={styles.botaoPacotes}>
            <Text style={styles.botaoPacotesTexto}>Ver pacote</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Home({ navigation }) {
  const { usuario } = useUsuario();
  const nome = usuario?.nome;

  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [viajantes, setViajantes] = useState('1 viajante');
  const [necessidade, setNecessidade] = useState('Qualquer necessidade');
  const [aberto, setAberto] = useState(null); // qual lista está aberta

  function alternar(nomeCampo) {
    setAberto(aberto === nomeCampo ? null : nomeCampo);
  }

  function escolher(setter) {
    return (valor) => {
      setter(valor);
      setAberto(null);
    };
  }

  function buscar() {
    console.log({ destino, data, viajantes, necessidade });
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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

        {/* Hero */}
        <ImageBackground source={Rio} style={styles.hero} imageStyle={styles.heroImagem}>
          <LinearGradient
            colors={['rgba(12,6,54,0.55)', 'rgba(12,6,54,0.92)']}
            style={styles.heroOverlay}
          >
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeTexto}>✦ Turismo acessível pelo Brasil</Text>
            </View>

            <Text style={styles.heroTitulo}>Viaje pelo Brasil</Text>
            <Text style={[styles.heroTitulo, styles.heroTituloVerde]}>sem barreiras</Text>

            <Text style={styles.heroTexto}>
              Pacotes terrestres com transporte adaptado, hospedagem acessível e equipe
              especializada para acompanhar cada passeio.
            </Text>
          </LinearGradient>
        </ImageBackground>

        {/* Busca */}
        <View style={styles.cardBusca}>
          <Text style={styles.cardBuscaTitulo}>Encontre a próxima viagem acessível</Text>

          <CampoSelect
            icone="map-pin"
            tipo="feather"
            placeholder="Para onde vamos?"
            valor={destino}
            opcoes={opcoesDestino}
            aberto={aberto === 'destino'}
            onToggle={() => alternar('destino')}
            onSelect={escolher(setDestino)}
          />

          <View style={styles.campoBloco}>
            <View style={styles.campo}>
              <Feather name="calendar" size={18} color={colors.tealDark} />
              <TextInput
                style={styles.campoInput}
                placeholder="dd/mm/aaaa"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                maxLength={10}
                value={data}
                onChangeText={(t) => setData(mascaraData(t))}
                onFocus={() => setAberto(null)}
              />
            </View>
          </View>

          <CampoSelect
            icone="users"
            tipo="feather"
            placeholder="Viajantes"
            valor={viajantes}
            opcoes={opcoesViajantes}
            aberto={aberto === 'viajantes'}
            onToggle={() => alternar('viajantes')}
            onSelect={escolher(setViajantes)}
          />

          <CampoSelect
            icone="wheelchair-accessibility"
            tipo="material"
            placeholder="Qualquer necessidade"
            valor={necessidade}
            opcoes={opcoesNecessidade}
            aberto={aberto === 'necessidade'}
            onToggle={() => alternar('necessidade')}
            onSelect={escolher(setNecessidade)}
          />

          <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
            <Feather name="search" size={16} color="#FFFFFF" />
            <Text style={styles.botaoBuscarTexto}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Selo */}
        <View style={styles.cardSelo}>
          <View style={styles.iconeSelo}>
            <MaterialCommunityIcons name="shield-check-outline" size={22} color={colors.tealDark} />
          </View>
          <Text style={styles.seloTitulo}>Selo Turismo sem Barreiras</Text>
          <Text style={styles.seloTexto}>
            Toda agência e pacote passam por auditoria de acessibilidade. Escolha entre Bronze,
            Prata ou Ouro conforme o nível verificado.
          </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Saiba mais ›</Text>
          </TouchableOpacity>
        </View>

        {/* Destinos populares */}
        <Text style={styles.secaoTitulo}>Destinos populares</Text>
        <View style={styles.listaDestinos}>
          {destinos.map((item) => (
            <CardDestino key={item.nome} item={item} />
          ))}
        </View>

        {/* 3 passos */}
        <Text style={[styles.secaoTitulo, { textAlign: 'center' }]}>Sua viagem em 3 passos</Text>
        <Text style={styles.secaoSub}>
          A gente cuida de cada detalhe — passagem, hospedagem, transporte adaptado e equipe de
          apoio.
        </Text>
        <View style={styles.listaPassos}>
          {passos.map((p) => (
            <View key={p.titulo} style={styles.cardPasso}>
              <View style={styles.iconePasso}>
                <Feather name={p.icone} size={20} color={colors.tealDark} />
              </View>
              <Text style={styles.passoTitulo}>{p.titulo}</Text>
              <Text style={styles.passoTexto}>{p.texto}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.frase}>Acessibilidade auditada em cada detalhe</Text>


        {/* Rodapé */}
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
          <Text style={styles.rodapeLink}>Pacotes</Text>
          <Text style={styles.rodapeLink}>Agências parceiras</Text>
          <Text style={styles.rodapeLink}>Como funciona</Text>

          <Text style={styles.rodapeTitulo}>INSTITUCIONAL</Text>
          <Text style={styles.rodapeLink}>Sobre nós</Text>
          <Text style={styles.rodapeLink}>Central de ajuda</Text>

          <Text style={styles.rodapeTitulo}>FALE CONOSCO</Text>
          <Text style={styles.rodapeLink}>☎ 0800 123 4567</Text>
          <Text style={styles.rodapeLink}>✉ ola@turismosembarreiras.com.br</Text>
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} ativa="Home" />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Faixa e cabeçalho
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

  // Hero
  hero: {
    marginHorizontal: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroImagem: {
    borderRadius: 20,
  },
  heroOverlay: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 70,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#8DE04B',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  heroBadgeTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0C0636',
  },
  heroTitulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 38,
  },
  heroTituloVerde: {
    color: '#8DE04B',
  },
  heroTexto: {
    fontSize: 13,
    color: '#E5E7EB',
    lineHeight: 19,
    marginTop: 12,
  },

  // Busca
  cardBusca: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 18,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardBuscaTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  campoBloco: {
    marginBottom: 10,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  campoTexto: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 10,
  },
  campoTextoPreenchido: {
    color: '#1A1A2E',
  },
  campoInput: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A2E',
    marginLeft: 10,
    padding: 0,
  },
  opcoes: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginTop: 6,
    overflow: 'hidden',
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F2',
  },
  opcaoTexto: {
    fontSize: 13,
    color: '#1A1A2E',
  },
  opcaoSelecionada: {
    fontWeight: '700',
    color: '#059B9A',
  },
  botaoBuscar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0636',
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: 4,
  },
  botaoBuscarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },

  // Selo
  cardSelo: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  iconeSelo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6F4F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  seloTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  seloTexto: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 4,
  },
  link: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B4FA8',
    marginTop: 8,
  },

  // Seções
  secaoTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  secaoSub: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 14,
    lineHeight: 18,
  },

  // Destinos
  listaDestinos: {
    paddingHorizontal: 20,
  },
  cardDestino: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
  },
  destinoImagem: {
    width: '100%',
    height: 150,
  },
  destinoSemImagem: {
    backgroundColor: '#059B9A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seloBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8DE04B',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  seloBadgeTexto: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0C0636',
    marginLeft: 4,
  },
  destinoInfo: {
    padding: 14,
  },
  destinoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinoNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  destinoNota: {
    fontSize: 12,
    color: '#6B7280',
  },
  destinoLocal: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  destinoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 14,
  },
  destinoApartir: {
    fontSize: 11,
    color: '#6B7280',
  },
  destinoPreco: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  botaoPacotes: {
    backgroundColor: '#0C0636',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  botaoPacotesTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Passos
  listaPassos: {
    paddingHorizontal: 20,
  },
  cardPasso: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconePasso: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6F4F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  passoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  passoTexto: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 4,
  },
  frase: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
  },

  // Agência
  cardAgencia: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
  },
  agenciaTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  agenciaTexto: {
    fontSize: 13,
    color: '#D1D9F0',
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 16,
  },
  botaoAgencia: {
    backgroundColor: '#8DE04B',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
  },
  botaoAgenciaTexto: {
    color: '#0C0636',
    fontWeight: '700',
    fontSize: 13,
  },

  // Rodapé
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