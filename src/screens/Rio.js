import DestinoPagina from '../components/DestinoPagina';

// ---------------------------------------------------------------
// IMAGENS (src/assets/assets/...)
// ---------------------------------------------------------------
// "Fotos do passeio": confira se cada foto é a mesma do site e troque se precisar
const FOTO_PASSEIO = require('../assets/assets/bondinho-acessivel.webp'); // Bondinho acessível
const FOTO_HOSPEDAGEM = require('../assets/assets/RJ-hotel2.jpg'); // Hospedagem adaptada
const FOTO_TRANSPORTE = require('../assets/assets/carro-adaptado.jpg'); // TROQUE pela foto da van do Rio
const FOTO_COMIDA = require('../assets/assets/RJ-restaurante.jpg'); // Gastronomia regional

// ---------------------------------------------------------------
// DADOS DO DESTINO
// ---------------------------------------------------------------
const destino = {
  regiao: 'Litoral Sudeste',
  cidade: 'Rio de Janeiro - RJ',
  titulo: 'Rio de Janeiro',
  duracao: '4 dias / 3 noites',
  descricao: 'Corcovado, Pão de Açúcar e Copacabana com van adaptada e guia especializado.',
  preco: 'R$ 1.890,00',
  parcelas: 'Em até 12x no cartão',
  datas: ['12 a 15 de set', '03 a 06 de out', '17 a 20 de nov'],
  cancelamento: 'cancele até 7 dias antes da viagem e receba o valor de volta.',

  // Galeria do topo (a primeira aparece grande). Todas viram miniatura.
  galeria: [
    require('../assets/assets/RJ-principal.jpg'),
    require('../assets/assets/RJ.jpg'),
    require('../assets/assets/RJ1.jpg'),
    require('../assets/assets/RJ2.jpg'),
    require('../assets/assets/RJ3.jpg'),
    require('../assets/assets/RJ4.jpg'),
    require('../assets/assets/RJ-hotel.jpg'),
    require('../assets/assets/RJ-hotel1.jpg'),
    require('../assets/assets/RJ-hotel2.jpg'),
    require('../assets/assets/RJ-hotel-rest.jpg'),
    require('../assets/assets/RJ-hotel-rest1.jpg'),
    require('../assets/assets/RJ-quarto.png'),
    require('../assets/assets/RJ-banheiro.jpg'),
    require('../assets/assets/RJ-restaurante.jpg'),
  ],

  acessibilidade: [
    { nome: 'Cadeira de rodas', icone: 'wheelchair-accessibility', nota: 5 },
    { nome: 'Visual', icone: 'eye', nota: 5 },
    { nome: 'Auditiva', icone: 'ear-hearing', nota: 5 },
    { nome: 'Cognitiva', icone: 'brain', nota: 5 },
  ],

  // "Fotos do passeio". categoria: 'Passeios', 'Hospedagem', 'Transporte' ou 'Comida'.
  fotos: [
    { categoria: 'Passeios', legenda: 'Bondinho acessível', imagem: FOTO_PASSEIO },
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
        'Passeio de bondinho e visita ao Cristo Redentor com suporte especializado e acessibilidade adaptada para pessoas com mobilidade reduzida, proporcionando uma experiência turística confortável, segura e inclusiva.',
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
    'Este é o pacote Rio de Janeiro.',
    'A viagem dura 4 dias e 3 noites.',
    'Você vai conhecer o Pão de Açúcar, o Cristo Redentor e a praia de Copacabana.',
    'O passeio de bondinho tem acesso adaptado.',
    'A van que leva você é adaptada.',
    'O hotel é adaptado.',
    'Um guia especializado vai com você o tempo todo.',
    'O preço é a partir de R$ 1.890,00 por pessoa.',
    'Dá para pagar em até 12 vezes no cartão.',
    'Você pode cancelar até 7 dias antes da viagem e receber o dinheiro de volta.',
  ],

  // Estes 3 arquivos estão direto em src/assets. TROQUE pelos nomes reais.
  midia: {
    libras: require('../assets/libras_rio1.mp4'),
    audio: require('../assets/audio_rio.mp3'),
    pdf: require('../assets/pdf_rio.pdf'),
  },
};

export default function Rio({ navigation }) {
  return <DestinoPagina navigation={navigation} destino={destino} />;
}