import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import Cabecalho from './Cabecalho';
import BottomTabBar from './BottomTabBar';
import colors from '../theme/colors';

const filtrosFoto = ['Tudo', 'Passeios', 'Hospedagem', 'Transporte', 'Comida'];

function formatarTempo(segundos) {
  const total = Math.floor(segundos || 0);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ---------------------------------------------------------------
// Janelas (modais)
// ---------------------------------------------------------------
function PlayerLibras({ fonte }) {
  const player = useVideoPlayer(fonte, (p) => {
    p.loop = false;
  });
  return (
    <VideoView
      player={player}
      style={styles.video}
      nativeControls
      allowsFullscreen
      allowsPictureInPicture
      contentFit="contain"
    />
  );
}

function ModalLibras({ visivel, onFechar, fonte }) {
  return (
    <Modal visible={visivel} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.modalFundo}>
        <View style={styles.modalCaixa}>
          <View style={styles.modalTopo}>
            <Text style={styles.modalTitulo}>Vídeo em Libras</Text>
            <TouchableOpacity onPress={onFechar}>
              <Feather name="x" size={22} color="#1A1A2E" />
            </TouchableOpacity>
          </View>
          {visivel && <PlayerLibras fonte={fonte} />}
        </View>
      </View>
    </Modal>
  );
}

function PlayerAudio({ fonte }) {
  const player = useAudioPlayer(fonte);
  const status = useAudioPlayerStatus(player);
  const tocando = status.playing;
  const progresso = status.duration > 0 ? (status.currentTime / status.duration) * 100 : 0;

  function alternar() {
    if (tocando) {
      player.pause();
      return;
    }
    if (status.duration > 0 && status.currentTime >= status.duration) {
      player.seekTo(0);
    }
    player.play();
  }

  return (
    <View style={styles.audioArea}>
      <TouchableOpacity style={styles.audioBotao} onPress={alternar} activeOpacity={0.8}>
        <Feather name={tocando ? 'pause' : 'play'} size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.audioBarraFundo}>
        <View style={[styles.audioBarra, { width: `${progresso}%` }]} />
      </View>
      <Text style={styles.audioTempo}>
        {formatarTempo(status.currentTime)} / {formatarTempo(status.duration)}
      </Text>
    </View>
  );
}

function ModalAudio({ visivel, onFechar, fonte }) {
  return (
    <Modal visible={visivel} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.modalFundo}>
        <View style={styles.modalCaixa}>
          <View style={styles.modalTopo}>
            <Text style={styles.modalTitulo}>Ouvir em áudio</Text>
            <TouchableOpacity onPress={onFechar}>
              <Feather name="x" size={22} color="#1A1A2E" />
            </TouchableOpacity>
          </View>
          {visivel && <PlayerAudio fonte={fonte} />}
        </View>
      </View>
    </Modal>
  );
}

// Tela branca de Leitura fácil
function ModalLeituraFacil({ visivel, onFechar, linhas }) {
  return (
    <Modal visible={visivel} animationType="slide" onRequestClose={onFechar}>
      <View style={styles.facilContainer}>
        <View style={styles.facilTopo}>
          <Text style={styles.facilTitulo}>Leitura fácil</Text>
          <TouchableOpacity onPress={onFechar}>
            <Feather name="x" size={26} color="#1A1A2E" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.facilConteudo}>
          {linhas.map((linha) => (
            <Text key={linha} style={styles.facilTexto}>
              {linha}
            </Text>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.facilBotao} onPress={onFechar}>
          <Text style={styles.facilBotaoTexto}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ---------------------------------------------------------------
// Pedaços da tela
// ---------------------------------------------------------------
function LinhaAcao({ icone, tipo, cor, texto, onPress }) {
  return (
    <TouchableOpacity style={styles.acao} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.acaoIcone, { backgroundColor: cor }]}>
        {tipo === 'material' ? (
          <MaterialCommunityIcons name={icone} size={18} color="#FFFFFF" />
        ) : (
          <Feather name={icone} size={18} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.acaoTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

function ListaItens({ itens, icone, cor }) {
  return itens.map((item) => (
    <View key={item} style={styles.itemLinha}>
      <Feather name={icone} size={13} color={cor} />
      <Text style={styles.itemTexto}>{item}</Text>
    </View>
  ));
}

// ---------------------------------------------------------------
// Página de destino (recebe os dados pelo prop "destino")
// ---------------------------------------------------------------
export default function DestinoPagina({ navigation, destino }) {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [filtroFoto, setFiltroFoto] = useState('Tudo');
  const [dataSel, setDataSel] = useState(0);
  const [diasAbertos, setDiasAbertos] = useState({ 0: true });
  const [modal, setModal] = useState(null); // 'libras' | 'audio' | 'facil' | null
  const [aviso, setAviso] = useState('');
  const [reserva, setReserva] = useState('');

  const total = destino.galeria.length;
  const fotosFiltradas = destino.fotos.filter(
    (f) => filtroFoto === 'Tudo' || f.categoria === filtroFoto
  );

  function anterior() {
    setFotoAtual((fotoAtual - 1 + total) % total);
  }
  function proxima() {
    setFotoAtual((fotoAtual + 1) % total);
  }

  function alternarDia(i) {
    setDiasAbertos({ ...diasAbertos, [i]: !diasAbertos[i] });
  }

  async function abrirPdf() {
    setAviso('');
    try {
      const asset = Asset.fromModule(destino.midia.pdf);
      await asset.downloadAsync();

      if (Platform.OS === 'web') {
        await Linking.openURL(asset.uri);
        return;
      }
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(asset.localUri ?? asset.uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Guia completo do destino',
        });
      } else {
        setAviso('Não foi possível abrir o PDF neste aparelho.');
      }
    } catch (erro) {
      setAviso('Não foi possível abrir o PDF.');
    }
  }

  function reservar() {
    setReserva(
      `Reserva iniciada para ${destino.datas[dataSel]}! Em breve você poderá concluir o pagamento.`
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cabecalho navigation={navigation} />

        {/* Título */}
        <View style={styles.bloco}>
          <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={18} color={colors.tealDark} />
            <Text style={styles.voltarTexto}>Voltar para pacotes</Text>
          </TouchableOpacity>

          <View style={styles.localLinha}>
            <Feather name="map-pin" size={14} color="#6B7280" />
            <Text style={styles.localTexto}>
              {destino.regiao} • {destino.cidade}
            </Text>
          </View>

          <Text style={styles.titulo}>{destino.titulo}</Text>

          <View style={styles.duracaoLinha}>
            <Feather name="calendar" size={15} color="#374151" />
            <Text style={styles.duracaoTexto}>{destino.duracao}</Text>
          </View>

          <Text style={styles.descricao}>{destino.descricao}</Text>
        </View>

        {/* Galeria */}
        <View style={styles.bloco}>
          <View>
            <Image
              source={destino.galeria[fotoAtual]}
              style={styles.fotoPrincipal}
              resizeMode="cover"
            />

            <TouchableOpacity style={[styles.seta, { left: 10 }]} onPress={anterior}>
              <Feather name="chevron-left" size={18} color="#1A1A2E" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.seta, { right: 10 }]} onPress={proxima}>
              <Feather name="chevron-right" size={18} color="#1A1A2E" />
            </TouchableOpacity>

            <View style={styles.badgeAcessivel}>
              <Feather name="check-circle" size={13} color="#3F8F5A" />
              <Text style={styles.badgeAcessivelTexto}>Destino acessível</Text>
            </View>
          </View>

          <View style={styles.miniaturas}>
            {destino.galeria.map((img, i) => (
              <TouchableOpacity key={i} onPress={() => setFotoAtual(i)} activeOpacity={0.8}>
                <Image
                  source={img}
                  style={[styles.miniatura, i === fotoAtual && styles.miniaturaAtiva]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preço e data */}
        <View style={[styles.bloco, styles.cardPreco]}>
          <Text style={styles.precoLabel}>A partir de</Text>
          <Text style={styles.preco}>{destino.preco}</Text>
          <Text style={styles.precoLabel}>por pessoa</Text>

          <View style={styles.parcelas}>
            <Feather name="credit-card" size={14} color="#6B7280" />
            <Text style={styles.parcelasTexto}>{destino.parcelas}</Text>
          </View>

          <Text style={styles.subtitulo}>Escolha a sua data</Text>
          {destino.datas.map((data, i) => (
            <TouchableOpacity
              key={data}
              style={[styles.data, i === dataSel && styles.dataSelecionada]}
              onPress={() => setDataSel(i)}
              activeOpacity={0.8}
            >
              <Feather name="calendar" size={16} color={i === dataSel ? '#3F8F5A' : '#6B7280'} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.dataTexto}>{data}</Text>
                <Text style={styles.dataDisponivel}>(Disponível)</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.botaoReservar} onPress={reservar} activeOpacity={0.85}>
            <Text style={styles.botaoReservarTexto}>Reservar viagem</Text>
            <Feather name="arrow-right" size={16} color="#FFFFFF" />
          </TouchableOpacity>

          {reserva !== '' && <Text style={styles.reservaMsg}>{reserva}</Text>}

          <View style={styles.cancelamento}>
            <Feather name="check-circle" size={15} color="#3F8F5A" />
            <Text style={styles.cancelamentoTexto}>
              <Text style={{ fontWeight: '700' }}>Cancelamento flexível: </Text>
              {destino.cancelamento}
            </Text>
          </View>
        </View>

        {/* Nível de acessibilidade */}
        <View style={[styles.bloco, styles.cardAcess]}>
          <View style={styles.acessTopo}>
            <View style={styles.acessIcone}>
              <MaterialCommunityIcons name="human-handsup" size={22} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.acessTitulo}>Nível de acessibilidade</Text>
              <Text style={styles.acessTexto}>
                O destino conta com estrutura e serviços adaptados para garantir uma experiência
                segura e confortável.
              </Text>
            </View>
          </View>

          <View style={styles.acessGrade}>
            {destino.acessibilidade.map((a) => (
              <View key={a.nome} style={styles.acessItem}>
                <MaterialCommunityIcons name={a.icone} size={26} color="#3F8F5A" />
                <Text style={styles.acessNome}>{a.nome}</Text>
                <Text style={styles.acessNota}>{a.nota}/5</Text>
                <Text style={styles.estrelas}>
                  {'★'.repeat(a.nota)}
                  {'☆'.repeat(5 - a.nota)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Fotos do passeio */}
        <View style={styles.bloco}>
          <View style={styles.fotosTopo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="camera" size={18} color="#1A1A2E" />
              <Text style={styles.secaoTitulo}>Fotos do passeio</Text>
            </View>
            <Text style={styles.verTodas}>Ver todas ({destino.fotos.length})</Text>
          </View>

          <View style={styles.filtros}>
            {filtrosFoto.map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filtro, filtroFoto === f && styles.filtroAtivo]}
                onPress={() => setFiltroFoto(f)}
              >
                <Text style={[styles.filtroTexto, filtroFoto === f && styles.filtroTextoAtivo]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {fotosFiltradas.map((foto, i) => (
            <View key={`${foto.legenda}-${i}`} style={styles.fotoCard}>
              <Image source={foto.imagem} style={styles.fotoCardImagem} resizeMode="cover" />
              <Text style={styles.fotoLegenda}>{foto.legenda}</Text>
            </View>
          ))}
        </View>

        {/* Guia completo */}
        <View style={styles.bloco}>
          <View style={styles.guia}>
            <View style={styles.guiaIcone}>
              <Feather name="file-text" size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.guiaTitulo}>Guia completo do destino</Text>
            <Text style={styles.guiaTexto}>
              Acesse o roteiro detalhado, informações sobre o clima, o que levar e contatos de
              emergência para viajar com mais segurança.
            </Text>
          </View>

          <LinhaAcao icone="download" cor="#2E8BD0" texto="Baixar PDF" onPress={abrirPdf} />
          <LinhaAcao
            icone="headphones"
            cor="#3F8F5A"
            texto="Ouvir em áudio"
            onPress={() => setModal('audio')}
          />
          <LinhaAcao
            icone="hand-wave"
            tipo="material"
            cor="#2E8BD0"
            texto="Vídeo em Libras"
            onPress={() => setModal('libras')}
          />
          <LinhaAcao
            icone="book-open"
            cor="#2E8BD0"
            texto="Leitura fácil"
            onPress={() => setModal('facil')}
          />
          {aviso !== '' && <Text style={styles.aviso}>{aviso}</Text>}
        </View>

        {/* Roteiro */}
        <View style={styles.bloco}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Feather name="calendar" size={18} color="#1A1A2E" />
            <Text style={styles.secaoTitulo}>Roteiro dia a dia</Text>
          </View>

          {destino.roteiro.map((dia, i) => {
            const aberto = !!diasAbertos[i];
            return (
              <View key={dia.titulo} style={styles.dia}>
                <TouchableOpacity
                  style={styles.diaTopo}
                  onPress={() => alternarDia(i)}
                  activeOpacity={0.7}
                >
                  <Feather name="calendar" size={15} color="#374151" />
                  <Text style={styles.diaTitulo}>{dia.titulo}</Text>
                  <Feather
                    name={aberto ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>

                {aberto && (
                  <View style={styles.diaCorpo}>
                    {dia.imagem && <Image source={dia.imagem} style={styles.diaImagem} />}
                    <Text style={styles.diaTexto}>{dia.texto}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Incluso / Não incluso */}
        <View style={styles.bloco}>
          <View style={styles.cardIncluso}>
            <View style={styles.inclusoTitulo}>
              <Feather name="check-circle" size={17} color="#3F8F5A" />
              <Text style={[styles.inclusoTituloTexto, { color: '#2F6B45' }]}>
                Incluso no pacote
              </Text>
            </View>
            <ListaItens itens={destino.incluso} icone="check" cor="#3F8F5A" />
          </View>

          <View style={styles.cardNaoIncluso}>
            <View style={styles.inclusoTitulo}>
              <Feather name="x-circle" size={17} color="#C0392B" />
              <Text style={[styles.inclusoTituloTexto, { color: '#A93226' }]}>Não incluso</Text>
            </View>
            <ListaItens itens={destino.naoIncluso} icone="x" cor="#C0392B" />
          </View>
        </View>

        <View style={styles.bloco}>
          <TouchableOpacity
            style={styles.botaoReservarGrande}
            onPress={reservar}
            activeOpacity={0.85}
          >
            <Feather name="calendar" size={16} color="#FFFFFF" />
            <Text style={styles.botaoReservarTexto}>Reservar viagem</Text>
            <Feather name="arrow-right" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      <ModalLibras
        visivel={modal === 'libras'}
        onFechar={() => setModal(null)}
        fonte={destino.midia.libras}
      />
      <ModalAudio
        visivel={modal === 'audio'}
        onFechar={() => setModal(null)}
        fonte={destino.midia.audio}
      />
      <ModalLeituraFacil
        visivel={modal === 'facil'}
        onFechar={() => setModal(null)}
        linhas={destino.leituraFacil}
      />

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
  bloco: {
    marginHorizontal: 20,
    marginTop: 16,
  },

  // Título
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  voltarTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059B9A',
  },
  localLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  localTexto: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A6B',
    marginTop: 6,
  },
  duracaoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  duracaoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  descricao: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 8,
  },

  // Galeria
  fotoPrincipal: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  seta: {
    position: 'absolute',
    top: 95,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeAcessivel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeAcessivelTexto: {
    fontSize: 11,
    color: '#374151',
    marginLeft: 5,
  },
  miniaturas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  miniatura: {
    width: 46,
    height: 46,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  miniaturaAtiva: {
    borderColor: '#3F8F5A',
  },

  // Preço
  cardPreco: {
    backgroundColor: '#F1F5F4',
    borderRadius: 16,
    padding: 18,
  },
  precoLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  preco: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B3A6B',
    marginVertical: 2,
  },
  parcelas: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  parcelasTexto: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  subtitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 18,
    marginBottom: 8,
  },
  data: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  dataSelecionada: {
    borderColor: '#3F8F5A',
  },
  dataTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  dataDisponivel: {
    fontSize: 11,
    color: '#6B7280',
  },
  botaoReservar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F8F5A',
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: 6,
  },
  botaoReservarTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 8,
  },
  reservaMsg: {
    fontSize: 12,
    color: '#2F6B45',
    backgroundColor: '#E3F1E8',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    lineHeight: 17,
  },
  cancelamento: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  cancelamentoTexto: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    lineHeight: 17,
    marginLeft: 8,
  },

  // Acessibilidade
  cardAcess: {
    backgroundColor: '#E8F2EC',
    borderRadius: 16,
    padding: 16,
  },
  acessTopo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  acessIcone: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3F8F5A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  acessTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  acessTexto: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginTop: 3,
  },
  acessGrade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  acessItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 14,
  },
  acessNome: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
  },
  acessNota: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  estrelas: {
    fontSize: 12,
    color: '#3F8F5A',
    letterSpacing: 1,
  },

  // Fotos
  fotosTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secaoTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A1A2E',
    marginLeft: 8,
  },
  verTodas: {
    fontSize: 12,
    color: '#6B7280',
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 6,
  },
  filtro: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  filtroAtivo: {
    backgroundColor: '#3F8F5A',
  },
  filtroTexto: {
    fontSize: 12,
    color: '#374151',
  },
  filtroTextoAtivo: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  fotoCard: {
    marginBottom: 14,
  },
  fotoCardImagem: {
    width: '100%',
    height: 170,
    borderRadius: 12,
  },
  fotoLegenda: {
    fontSize: 12,
    color: '#374151',
    marginTop: 6,
  },

  // Guia
  guia: {
    backgroundColor: '#2E8BD0',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  guiaIcone: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  guiaTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  guiaTexto: {
    fontSize: 12,
    color: '#EAF4FB',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  acaoIcone: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  acaoTexto: {
    fontSize: 13,
    color: '#1A1A2E',
  },
  aviso: {
    fontSize: 12,
    color: '#C0392B',
    marginTop: 2,
  },

  // Roteiro
  dia: {
    backgroundColor: '#F1F5F4',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  diaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  diaTitulo: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A2E',
    marginLeft: 10,
  },
  diaCorpo: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  diaImagem: {
    width: 80,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  diaTexto: {
    flex: 1,
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },

  // Incluso / não incluso
  cardIncluso: {
    backgroundColor: '#E8F2EC',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardNaoIncluso: {
    backgroundColor: '#FBEBE9',
    borderRadius: 14,
    padding: 16,
  },
  inclusoTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inclusoTituloTexto: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  itemLinha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  itemTexto: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    marginLeft: 8,
    lineHeight: 17,
  },
  botaoReservarGrande: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F8F5A',
    borderRadius: 26,
    paddingVertical: 15,
  },

  // Modais
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalCaixa: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    paddingBottom: 30,
  },
  modalTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000000',
    borderRadius: 12,
  },
  audioArea: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  audioBotao: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#3F8F5A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  audioBarraFundo: {
    alignSelf: 'stretch',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  audioBarra: {
    height: 6,
    backgroundColor: '#3F8F5A',
  },
  audioTempo: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },

  // Leitura fácil (tela branca)
  facilContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  facilTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  facilTitulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  facilConteudo: {
    padding: 22,
  },
  facilTexto: {
    fontSize: 20,
    lineHeight: 30,
    color: '#1A1A2E',
    marginBottom: 18,
  },
  facilBotao: {
    backgroundColor: '#0C0636',
    margin: 22,
    borderRadius: 26,
    paddingVertical: 15,
    alignItems: 'center',
  },
  facilBotaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});