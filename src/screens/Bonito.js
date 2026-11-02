import DestinoPagina from '../components/DestinoPagina';

// ---------------------------------------------------------------
// IMAGENS (src/assets/assets/...)
// ---------------------------------------------------------------
const FOTO_PASSEIO = require('../assets/assets/BNT-entrada adaptada.jpg');
const FOTO_HOSPEDAGEM = require('../assets/assets/BNT-quarto.png');
const FOTO_TRANSPORTE = require('../assets/assets/transporte-adaptado.jpg');
const FOTO_COMIDA = require('../assets/assets/BNT-comida.jpg');

// ---------------------------------------------------------------
// DADOS DO DESTINO
// ---------------------------------------------------------------
const destino = {
  regiao: 'Pantanal e Serra da Bodoquena',
  cidade: 'Bonito - MS',
  titulo: 'Bonito Natureza Viva',
  duracao: '5 dias / 4 noites',
  descricao: 'Gruta, cachoeiras e rios de águas cristalinas com acessibilidade.',
  preco: 'R$ 3.290,00', // TROQUE pelo valor real
  parcelas: 'Em até 12x no cartão',
  datas: ['12 a 16 de dez', '16 a 20 de jan', '13 a 17 de fev'],
  cancelamento: 'cancele até 7 dias antes da viagem e receba o valor de volta.',

  galeria: [
    require('../assets/assets/BNT-principal.webp'),
    require('../assets/assets/BNT-gruta.jpg'),
    require('../assets/assets/BNT-gruta1.webp'),
    require('../assets/assets/BNT-gruta2.webp'),
    require('../assets/assets/BNT-cachoeira.jpg'),
    require('../assets/assets/BNT-cachoeira1.png'),
    require('../assets/assets/BNT-rio1.jpg'),
    require('../assets/assets/BNT-rio2.jpg'),
    require('../assets/assets/BNT-hotel.jpg'),
    require('../assets/assets/BNT-hotel1.jpg'),
    require('../assets/assets/BNT-hotel2.webp'),
    require('../assets/assets/BNT-quarto.png'),
    require('../assets/assets/BNT-banheiro.png'),
    require('../assets/assets/BNT-restaurante.jpg'),
    require('../assets/assets/BNT-restaurante1.jpg'),
  ],

  acessibilidade: [
    { nome: 'Cadeira de rodas', icone: 'wheelchair-accessibility', nota: 5 },
    { nome: 'Visual', icone: 'eye', nota: 5 },
    { nome: 'Auditiva', icone: 'ear-hearing', nota: 5 },
    { nome: 'Cognitiva', icone: 'brain', nota: 5 },
  ],

  // categoria: 'Passeios', 'Hospedagem', 'Transporte' ou 'Comida'.
  fotos: [
    { categoria: 'Passeios', legenda: 'Cachoeiras com acesso adaptado', imagem: FOTO_PASSEIO },
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
      titulo: 'Dia 2 - Cachoeiras',
      texto: 'Manhã na incríveis cachoeiras de Bonito, com passarela e equipe de suporte qualificada. Almoço em restaurante acessível.',
    },
    {
      titulo: 'Dia 3 - Grutas',
      texto: 'Passeio guiado pelas encantadoras grutas de Bonito, com acompanhamento de uma equipe qualificada e opções de visita adaptadas para proporcionar mais acessibilidade, conforto e segurança a pessoas com mobilidade reduzida.',
    },
    {
      titulo: 'Dia 4 - Retorno',
      texto: 'Café da manhã, check-out e transfer com acompanhamento da equipe.',
    },
  ],

  incluso: [
    'Hospedagem adaptada',
    'Transporte terrestre adaptado',
    'Guia especializado',
    'Seguro-viagem',
    'Alimentação (café da manhã, almoço e jantar)',
  ],
  naoIncluso: ['Passagem até a cidade de saída', 'Gastos pessoais', 'Passeios extras'],

  // Texto da tela branca "Leitura fácil".
  leituraFacil: [
'Este é o pacote para Bonito.',
'A viagem dura 5 dias.',
'O preço começa em R$ 3.290,00 por pessoa.',
'O pacote inclui van adaptada, guia especializado, seguro-viagem, hotel e café da manhã.',
'O hotel se chama Marruá Hotel, fica no bairro Formoso e tem piscina e sauna.',
'O quarto e o banheiro do hotel são adaptados.',
'Você vai visitar o Rio Sucuri, a Gruta do Lago Azul e a Estância Mimosa.',
'Os passeios ficam longe do centro e o transporte é feito de van.',
'Na Gruta do Lago Azul, a escada tem cerca de 300 degraus.',
'A agência avisa como é o acesso de cada local e o guia fica com você o tempo todo.',
'Se precisar de ajuda especial, avise a agência com 7 dias de antecedência.',
'Você pode adicionar ou remover passeios, mas o preço muda e depende da confirmação da agência.',
'O que levar na mala: roupa de banho, toalha, roupa seca para trocar, calçado fechado, chapéu, garrafa de água, seus remédios e documentos.',
'Em Bonito faz calor e chove bastante no verão.',
'No Rio Sucuri, é proibido usar protetor solar ou repelente antes de entrar na água.',
'Em caso de emergência, ligue para Ambulância (192), Bombeiros (193) ou Polícia (190) e avise o guia e a agência.',
'Para falar com a agência, ligue para o telefone 0800 123 4567 ou envie mensagem para o WhatsApp 11 99234-5678.'
],

  midia: {
    libras: require('../assets/libras_bonito1.mp4'),
    audio: require('../assets/audio_bonito.mp3'),
    pdf: require('../assets/pdf_bonito.pdf'),
  },
};

export default function Bonito({ navigation }) {
  return <DestinoPagina navigation={navigation} destino={destino} />;
}