import DestinoPagina from '../components/DestinoPagina';

// ---------------------------------------------------------------
// IMAGENS (src/assets/assets/...)
// ---------------------------------------------------------------
const FOTO_PRAIA = require('../assets/assets/SC-praia.jpg');
const FOTO_HOSPEDAGEM = require('../assets/assets/SC-quarto.jpg');
const FOTO_TRANSPORTE = require('../assets/assets/transporte-adaptado.jpg');
const FOTO_COMIDA = require('../assets/assets/SC-comida.webp');

// ---------------------------------------------------------------
// DADOS DO DESTINO
// ---------------------------------------------------------------
const destino = {
  regiao: 'Litoral Nordeste',
  cidade: 'Salvador - BA',
  titulo: 'Salvador Cultura',
  duracao: '4 dias / 3 noites',
  descricao: 'Pelourinho, praias com cadeira anfíbia e gastronomia baiana.',
  preco: 'R$ 1.690,00',
  parcelas: 'Em até 12x no cartão',
  datas: ['12 a 15 de set', '03 a 06 de out', '17 a 20 de nov'],
  cancelamento: 'cancele até 7 dias antes da viagem e receba o valor de volta.',

  // Galeria do topo (a primeira aparece grande). Todas viram miniatura.
  galeria: [
    require('../assets/assets/SC-praia.jpg'),
    require('../assets/assets/SC-praia1.png'),
    require('../assets/assets/SC-praia3.webp'),
    require('../assets/assets/SC-marinho.jpg'),
    require('../assets/assets/SC-marinho1.jpg'),
    require('../assets/assets/SC-rua.jpg'),
    require('../assets/assets/SC-rua1.webp'),
    require('../assets/assets/SC-rua2.png'),
    require('../assets/assets/SC-show.jpg'),
    require('../assets/assets/SC-hotel.jpg'),
    require('../assets/assets/SC-hotel2.jpg'),
    require('../assets/assets/SC-hotel3.jpg'),
    require('../assets/assets/SC-restaurante.jpg'),
    require('../assets/assets/SC-restaurante1.jpg'),
    require('../assets/assets/SC-quarto.jpg'),
    require('../assets/assets/SC-banheiro.webp'),
  ],

  acessibilidade: [
    { nome: 'Cadeira de rodas', icone: 'wheelchair-accessibility', nota: 5 },
    { nome: 'Visual', icone: 'eye', nota: 5 },
    { nome: 'Auditiva', icone: 'ear-hearing', nota: 5 },
    { nome: 'Cognitiva', icone: 'brain', nota: 5 },
  ],

  // "Fotos do passeio". categoria: 'Passeios', 'Hospedagem', 'Transporte' ou 'Comida'.
  fotos: [
    { categoria: 'Passeios', legenda: 'Praia com acesso adaptado', imagem: FOTO_PRAIA },
    { categoria: 'Hospedagem', legenda: 'Hospedagem adaptada', imagem: FOTO_HOSPEDAGEM },
    { categoria: 'Transporte', legenda: 'Transporte terrestre adaptado', imagem: FOTO_TRANSPORTE },
    { categoria: 'Comida', legenda: 'Gastronomia regional', imagem: FOTO_COMIDA },
  ],

  roteiro: [
    {
      titulo: 'Dia 1 - Chegada',
      texto:
        'Transfer do aeroporto até o hotel. Check-in e recepção da equipe. Tarde livre para descansar e conhecer a região.',
      imagem: FOTO_TRANSPORTE,
    },
    {
      titulo: 'Dia 2 - Praia do Sol',
      texto:
        'Manhã na Praia do Sol, com passarela e cadeiras anfíbias disponíveis. Almoço em restaurante acessível.',
    },
    {
      titulo: 'Dia 3 - Centro Histórico',
      texto:
        'Passeio guiado pelo Centro Histórico, com rotas de piso regular e paradas para descanso.',
    },
    {
      titulo: 'Dia 4 - Retorno',
      texto: 'Café da manhã, check-out e transfer até o aeroporto com acompanhamento da equipe.',
    },
  ],

  incluso: [
    'Hospedagem adaptada',
    'Transporte terrestre adaptado',
    'Guia especializado',
    'Alimentação (café da manhã, almoço e jantar)',
  ],
  naoIncluso: ['Passagem até a cidade de saída', 'Gastos pessoais', 'Passeios extras'],

  // Texto da tela branca "Leitura fácil". Troque pelo texto do seu site.
  leituraFacil: [
    'Este é o pacote Salvador Cultura.',
    'A viagem dura 4 dias e 3 noites.',
    'Você vai conhecer o Pelourinho e as praias de Salvador.',
    'Nas praias, tem cadeira anfíbia para quem precisa.',
    'Você vai comer comida típica da Bahia.',
    'O hotel e o transporte são adaptados.',
    'Um guia especializado vai com você o tempo todo.',
    'O preço é a partir de R$ 1.690,00 por pessoa.',
    'Dá para pagar em até 12 vezes no cartão.',
    'Você pode cancelar até 7 dias antes da viagem e receber o dinheiro de volta.',
  ],

  // Estes 3 arquivos estão direto em src/assets
  midia: {
    libras: require('../assets/libras_salvador1.mp4'),
    audio: require('../assets/audio_salvador.mp3'),
    pdf: require('../assets/pdf_salvador.pdf'),
  },
};

export default function Salvador({ navigation }) {
  return <DestinoPagina navigation={navigation} destino={destino} />;
}