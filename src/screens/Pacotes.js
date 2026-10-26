import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Rio from '../assets/Rio.jpg';
import Gramado from '../assets/gramado.webp';
import Salvador from '../assets/salvador.png';
import Bonito from '../assets/bonito.webp';
import Cabecalho from '../components/Cabecalho';
import BottomTabBar from '../components/BottomTabBar';
import colors from '../theme/colors';

// ---------- Dados de exemplo (edite à vontade) ----------
const pacotes = [
  {
    id: 'rio',
    regiao: 'Rio de Janeiro',
    local: 'Rio de Janeiro - RJ',
    titulo: 'Rio de Janeiro Clássico — 4 dias',
    descricao: 'Corcovado, Pão de Açúcar e Copacabana com van adaptada e guia especializado.',
    agencia: 'Roda Livre Turismo',
    selo: 'Selo Ouro',
    imagem: Rio,
    dias: 4,
    saida: '2026-11-20',
    saidaTexto: '20 de nov.',
    preco: 1890,
    nota: 4.8,
    deficiencias: ['Física', 'Visual', 'Auditiva', 'Intelectual'],
    transporte: true,
    hospedagem: true,
    passeio: true,
    guia: true,
  },
  {
    id: 'gramado',
    regiao: 'Rio Grande do Sul',
    local: 'Gramado & Canela - RS',
    titulo: 'Gramado Cultura Viva — 5 dias',
    descricao: 'Ônibus adaptado para os principais pontos, chocolate e vinho para todos.',
    agencia: 'Caminhos Sem Limites',
    selo: 'Selo Ouro',
    imagem: Gramado,
    dias: 5,
    saida: '2026-12-21',
    saidaTexto: '21 de dez.',
    preco: 2290,
    nota: 4.8,
    deficiencias: ['Física', 'Visual', 'Auditiva', 'Intelectual'],
    transporte: true,
    hospedagem: true,
    passeio: true,
    guia: true,
  },
  {
    id: 'salvador',
    regiao: 'Bahia',
    local: 'Salvador - BA',
    titulo: 'Salvador Cultura Viva — 4 dias',
    descricao: 'Pelourinho, Farol da Barra e Elevador Lacerda com transporte adaptado e guia.',
    agencia: 'Bahia Acessível',
    selo: 'Selo Prata',
    imagem: Salvador,
    dias: 4,
    saida: '2026-11-20',
    saidaTexto: '20 de nov.',
    preco: 1690,
    nota: 4.7,
    deficiencias: ['Física', 'Visual', 'Auditiva'],
    transporte: true,
    hospedagem: false,
    passeio: true,
    guia: true,
  },
  {
    id: 'bonito',
    regiao: 'Mato Grosso do Sul',
    local: 'Bonito - MS',
    titulo: 'Bonito Natureza Acessível — 4 dias',
    descricao: 'Passeios de natureza com estrutura adaptada e equipe treinada em cada atividade.',
    agencia: 'Natureza Sem Limites',
    selo: 'Selo Ouro',
    imagem: Bonito,
    dias: 4,
    saida: '2026-12-12',
    saidaTexto: '12 de dez.',
    preco: 3290,
    nota: 4.9,
    deficiencias: ['Física', 'Visual'],
    transporte: true,
    hospedagem: true,
    passeio: true,
    guia: true,
  },
];

const comodidades = [
  { chave: 'transporte', texto: 'Transporte adaptado', icone: 'truck' },
  { chave: 'hospedagem', texto: 'Hospedagem PCD', icone: 'home' },
  { chave: 'passeio', texto: 'Passeio acessível', icone: 'map-pin' },
  { chave: 'guia', texto: 'Guia especializado', icone: 'user-check' },
];

// ---------- Opções dos filtros ----------
const opcoesRegiao = ['Todas', 'Rio de Janeiro', 'Rio Grande do Sul', 'Bahia', 'Mato Grosso do Sul'];
const opcoesDeficiencia = ['Qualquer', 'Física', 'Visual', 'Auditiva', 'Intelectual'];
const opcoesPreco = [
  { label: 'Qualquer', max: null },
  { label: 'Até R$ 2.000', max: 2000 },
  { label: 'Até R$ 3.000', max: 3000 },
  { label: 'Até R$ 4.000', max: 4000 },
];
const opcoesDuracao = ['Qualquer', '4 dias', '5 dias'];
const opcoesOrdem = ['Próxima saída', 'Menor preço', 'Maior preço', 'Melhor avaliação'];

const acessibilidades = [
  { chave: 'transporte', texto: 'Transporte adaptado' },
  { chave: 'hospedagem', texto: 'Hospedagem acessível' },
  { chave: 'passeio', texto: 'Passeio acessível' },
];

// 1890 -> "R$ 1.890"
function formatarPreco(n) {
  return 'R$ ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ---------- Componentes ----------
function Seletor({ rotulo, valor, opcoes, aberto, onToggle, onSelect }) {
  return (
    <View style={styles.bloco}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TouchableOpacity style={styles.seletor} onPress={onToggle} activeOpacity={0.7}>
        <Text style={styles.seletorTexto}>{valor}</Text>
        <Feather name={aberto ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textGray} />
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

function Checkbox({ texto, marcado, onPress }) {
  return (
    <TouchableOpacity style={styles.checkLinha} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkCaixa, marcado && styles.checkCaixaMarcada]}>
        {marcado && <Feather name="check" size={14} color="#FFFFFF" />}
      </View>
      <Text style={styles.checkTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

function CardPacote({ item }) {
  return (
    <View style={styles.card}>
      <View>
        <Image source={item.imagem} style={styles.cardImagem} />

        <View style={styles.seloBadge}>
          <MaterialCommunityIcons name="shield-check" size={12} color="#0C0636" />
          <Text style={styles.seloBadgeTexto}>{item.selo}</Text>
        </View>

        <View style={styles.localTag}>
          <Text style={styles.localTagTexto}>{item.local}</Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.cardLinha}>
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardNota}>★ {item.nota.toFixed(1)}</Text>
        </View>

        <Text style={styles.cardDescricao}>{item.descricao}</Text>
        <Text style={styles.cardAgencia}>Por {item.agencia}</Text>

        <View style={styles.chips}>
          {comodidades
            .filter((c) => item[c.chave])
            .map((c) => (
              <View key={c.chave} style={styles.chip}>
                <Feather name={c.icone} size={12} color={colors.tealDark} />
                <Text style={styles.chipTexto}>{c.texto}</Text>
              </View>
            ))}
        </View>

        <View style={styles.atende}>
          <View style={styles.atendeBolinha} />
          <Text style={styles.atendeTexto}>Atende: {item.deficiencias.join(', ')}</Text>
        </View>

        <View style={styles.cardRodape}>
          <View>
            <Text style={styles.rodapeLabel}>{item.dias} DIAS · PRÓX. SAÍDA</Text>
            <Text style={styles.rodapeValor}>{item.saidaTexto}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.rodapeLabel}>A PARTIR DE</Text>
            <Text style={styles.rodapeValor}>{formatarPreco(item.preco)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botaoDetalhes}>
          <Text style={styles.botaoDetalhesTexto}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------- Tela ----------
export default function Pacotes({ navigation }) {
  const [regiao, setRegiao] = useState('Todas');
  const [deficiencia, setDeficiencia] = useState('Qualquer');
  const [preco, setPreco] = useState('Qualquer');
  const [duracao, setDuracao] = useState('Qualquer');
  const [ordem, setOrdem] = useState('Próxima saída');
  const [acess, setAcess] = useState({ transporte: false, hospedagem: false, passeio: false });
  const [aberto, setAberto] = useState(null);

  function alternar(campo) {
    setAberto(aberto === campo ? null : campo);
  }

  function escolher(setter) {
    return (valor) => {
      setter(valor);
      setAberto(null);
    };
  }

  function limparFiltros() {
    setRegiao('Todas');
    setDeficiencia('Qualquer');
    setPreco('Qualquer');
    setDuracao('Qualquer');
    setOrdem('Próxima saída');
    setAcess({ transporte: false, hospedagem: false, passeio: false });
    setAberto(null);
  }

  // Aplica os filtros
  const precoMax = opcoesPreco.find((o) => o.label === preco)?.max;

  const filtrados = pacotes.filter((p) => {
    if (regiao !== 'Todas' && p.regiao !== regiao) return false;
    if (deficiencia !== 'Qualquer' && !p.deficiencias.includes(deficiencia)) return false;
    if (precoMax && p.preco > precoMax) return false;
    if (duracao !== 'Qualquer' && p.dias !== parseInt(duracao, 10)) return false;
    for (const chave of Object.keys(acess)) {
      if (acess[chave] && !p[chave]) return false;
    }
    return true;
  });

  // Ordena
  const lista = [...filtrados].sort((a, b) => {
    if (ordem === 'Menor preço') return a.preco - b.preco;
    if (ordem === 'Maior preço') return b.preco - a.preco;
    if (ordem === 'Melhor avaliação') return b.nota - a.nota;
    return a.saida.localeCompare(b.saida); // Próxima saída
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cabecalho navigation={navigation} />

        <Text style={styles.titulo}>Pacotes acessíveis</Text>
        <Text style={styles.subtitulo}>
          {lista.length} {lista.length === 1 ? 'pacote encontrado' : 'pacotes encontrados'} com
          acessibilidade auditada
        </Text>

        {/* Filtros */}
        <View style={styles.filtros}>
          <View style={styles.filtrosTopo}>
            <Feather name="sliders" size={16} color="#1A1A2E" />
            <Text style={styles.filtrosTitulo}>Filtros</Text>
          </View>

          <TouchableOpacity style={styles.botaoLimpar} onPress={limparFiltros}>
            <Text style={styles.botaoLimparTexto}>Limpar filtros</Text>
          </TouchableOpacity>

          <Seletor
            rotulo="REGIÃO"
            valor={regiao}
            opcoes={opcoesRegiao}
            aberto={aberto === 'regiao'}
            onToggle={() => alternar('regiao')}
            onSelect={escolher(setRegiao)}
          />

          <Seletor
            rotulo="TIPO DE DEFICIÊNCIA ATENDIDA"
            valor={deficiencia}
            opcoes={opcoesDeficiencia}
            aberto={aberto === 'deficiencia'}
            onToggle={() => alternar('deficiencia')}
            onSelect={escolher(setDeficiencia)}
          />

          <Text style={styles.rotulo}>ACESSIBILIDADE</Text>
          {acessibilidades.map((a) => (
            <Checkbox
              key={a.chave}
              texto={a.texto}
              marcado={acess[a.chave]}
              onPress={() => setAcess({ ...acess, [a.chave]: !acess[a.chave] })}
            />
          ))}

          <View style={{ height: 12 }} />

          <Seletor
            rotulo="PREÇO MÁXIMO (R$)"
            valor={preco}
            opcoes={opcoesPreco.map((o) => o.label)}
            aberto={aberto === 'preco'}
            onToggle={() => alternar('preco')}
            onSelect={escolher(setPreco)}
          />

          <Seletor
            rotulo="DURAÇÃO"
            valor={duracao}
            opcoes={opcoesDuracao}
            aberto={aberto === 'duracao'}
            onToggle={() => alternar('duracao')}
            onSelect={escolher(setDuracao)}
          />
        </View>

        {/* Ordenar */}
        <View style={styles.ordenar}>
          <Seletor
            rotulo="Ordenar por"
            valor={ordem}
            opcoes={opcoesOrdem}
            aberto={aberto === 'ordem'}
            onToggle={() => alternar('ordem')}
            onSelect={escolher(setOrdem)}
          />
        </View>

        {/* Lista de pacotes */}
        <View style={styles.lista}>
          {lista.map((item) => (
            <CardPacote key={item.id} item={item} />
          ))}

          {lista.length === 0 && (
            <View style={styles.vazio}>
              <Feather name="search" size={28} color={colors.textGray} />
              <Text style={styles.vazioTexto}>
                Nenhum pacote encontrado. Tente limpar os filtros.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} ativa="Pacotes" />
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
    marginHorizontal: 20,
    marginTop: 16,
  },
  subtitulo: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },

  // Filtros
  filtros: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  filtrosTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filtrosTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginLeft: 8,
  },
  botaoLimpar: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoLimparTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  bloco: {
    marginBottom: 14,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 6,
  },
  seletor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  seletorTexto: {
    fontSize: 13,
    color: '#1A1A2E',
  },
  opcoes: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
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
  checkLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkCaixa: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkCaixaMarcada: {
    backgroundColor: '#059B9A',
    borderColor: '#059B9A',
  },
  checkTexto: {
    fontSize: 13,
    color: '#1A1A2E',
  },

  ordenar: {
    marginHorizontal: 20,
    marginTop: 16,
  },

  // Lista e cards
  lista: {
    paddingHorizontal: 20,
    marginTop: 4,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
    overflow: 'hidden',
  },
  cardImagem: {
    width: '100%',
    height: 170,
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
  localTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#1B2A6B',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  localTagTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardInfo: {
    padding: 14,
  },
  cardLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitulo: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginRight: 8,
  },
  cardNota: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardDescricao: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 6,
  },
  cardAgencia: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 6,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  chipTexto: {
    fontSize: 11,
    color: '#374151',
    marginLeft: 5,
  },
  atende: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  atendeBolinha: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059B9A',
    marginRight: 6,
  },
  atendeTexto: {
    fontSize: 11,
    color: '#6B7280',
    flex: 1,
  },
  cardRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 14,
  },
  rodapeLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  rodapeValor: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A1A2E',
    marginTop: 2,
  },
  botaoDetalhes: {
    backgroundColor: '#0C0636',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 14,
  },
  botaoDetalhesTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  vazio: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  vazioTexto: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },
});