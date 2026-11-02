import DestinoPagina from '../components/DestinoPagina';

// ---------------------------------------------------------------
// IMAGENS (src/assets/assets/...)
// ---------------------------------------------------------------
const FOTO_PASSEIO = require('../assets/assets/RS-entrada mini-mundo.webp');
const FOTO_HOSPEDAGEM = require('../assets/assets/RS-quarto.jpg');
const FOTO_TRANSPORTE = require('../assets/assets/ônibus adaptado.jpg');
const FOTO_COMIDA = require('../assets/assets/RS-comida.jpg');

// ---------------------------------------------------------------
// DADOS DO DESTINO
// ---------------------------------------------------------------
const destino = {
  regiao: 'Serra Gaúcha',
  cidade: 'Gramado - RS',
  titulo: 'Gramado Cultura Viva',
  duracao: '5 dias / 4 noites',
  descricao: 'Rua Coberta, Mini Mundo, Lago Negro e o Vale dos Vinhedos com acessibilidade.',
  preco: 'R$ 2.290,00',
  parcelas: 'Em até 12x no cartão',
  datas: ['05 a 09 de nov', '10 a 14 de dez', '21 a 25 de dez'],
  cancelamento: 'cancele até 7 dias antes da viagem e receba o valor de volta.',

  galeria: [
    require('../assets/assets/RS-rua coberta.jpg'),
    require('../assets/assets/RS-vinicula1.webp'),
    require('../assets/assets/RS-mini mundo.jpg'),
    require('../assets/assets/RS-cascata.webp'),
    require('../assets/assets/RS-lago negro.jpg'),
    require('../assets/assets/RS-hotel.jpg'),
    require('../assets/assets/RS-hotel3.jpg'),
    require('../assets/assets/RS-restaurante2.jpg'),
    require('../assets/assets/RS-banheiro.webp'),
    require('../assets/assets/RS-quarto.jpg'),
  ],

  acessibilidade: [
    { nome: 'Cadeira de rodas', icone: 'wheelchair-accessibility', nota: 5 },
    { nome: 'Visual', icone: 'eye', nota: 5 },
    { nome: 'Auditiva', icone: 'ear-hearing', nota: 5 },
    { nome: 'Cognitiva', icone: 'brain', nota: 5 },
  ],

  // categoria: 'Passeios', 'Hospedagem', 'Transporte' ou 'Comida'.
  fotos: [
    { categoria: 'Passeios', legenda: 'Estrutura adaptada e equipe de suporte', imagem: FOTO_PASSEIO },
    { categoria: 'Hospedagem', legenda: 'Hospedagem adaptada', imagem: FOTO_HOSPEDAGEM },
    { categoria: 'Transporte', legenda: 'Transporte terrestre adaptado', imagem: FOTO_TRANSPORTE },
    { categoria: 'Comida', legenda: 'Gastronomia da Serra Gaúcha', imagem: FOTO_COMIDA },
  ],

  roteiro: [
    {
      titulo: 'Dia 1 - Chegada',
      texto:
        'Transfer do aeroporto até o hotel. Check-in e recepção da equipe. Tarde livre para descansar e conhecer a região.',
      imagem: FOTO_TRANSPORTE,
    },
    {
      titulo: 'Dia 2 - City Tour',
      texto: 'Rua Coberta, Mini Mundo e Lago Negro (com rampas).',
    },
    {
      titulo: 'Dia 3 - Canela',
      texto: 'Cascata do Caracol via plataforma panorâmica.',
    },
    {
      titulo: 'Dia 4 - Vale dos Vinhedos',
      texto: 'Vinícolas com acesso e degustação assistida.',
    },
    {
      titulo: 'Dia 5 - Retorno',
      texto: 'Café da manhã, check-out e transfer até o aeroporto com acompanhamento da equipe.',
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
    'Este é o pacote para Gramado.',
    'A viagem dura 5 dias.',
    'O preço começa em R$ 2.290,00 por pessoa.',
    'O pacote inclui van adaptada, guia especializado, seguro-viagem, hotel e café da manhã.',
    'O hotel se chama Laghetto Stilo Vita e fica em Gramado.',
    'O quarto e o banheiro do hotel são adaptados.',
    'A Avenida Central fica a 400 metros do hotel e a Rua Coberta fica a 11 minutos a pé.',
    'Você vai visitar a Rua Coberta, o Mini Mundo, o Lago Negro, a Cascata do Caracol em Canela e o Vale dos Vinhedos.',
    'Na Cascata do Caracol, a escada da Perna Bamba tem 700 degraus e é opcional.',
    'A agência avisa como é o acesso de cada local e o guia fica com você o tempo todo.',
    'Se precisar de ajuda especial, avise a agência com 7 dias de antecedência.',
    'Você pode adicionar ou remover passeios, mas o preço muda e depende da confirmação da agência.',
    'O que levar na mala: casaco quente, gorro, luvas, calçado fechado que não escorrega, protetor solar, seus remédios e documentos.',
    'Em Gramado faz frio e pode ter geada no inverno.',
    'Em caso de emergência, ligue para Ambulância (192), Bombeiros (193) ou Polícia (190) e avise o guia e a agência.',
    'Para falar com a agência, ligue para o telefone 0800 123 4567 ou envie mensagem para o WhatsApp 11 99234-5678.',
  ],

  midia: {
    libras: require('../assets/libras_gramado1.mp4'),
    audio: require('../assets/audio_gramado.mp3'),
    pdf: require('../assets/pdf_gramado.pdf'),
  },
};

export default function Gramado({ navigation }) {
  return <DestinoPagina navigation={navigation} destino={destino} />;
}