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
'Este é o pacote para Salvador.',
'A viagem dura 4 dias.',
'O preço começa em R$ 1.890,00 por pessoa.',
'O pacote inclui van adaptada, guia especializado, seguro-viagem, hotel e café da manhã.',
'O hotel se chama The Hotel e fica no bairro da Barra.',
'O quarto e o banheiro do hotel são adaptados.',
'A praia fica a 400 metros do hotel.',
'Você vai visitar o Pelourinho e a praia da Barra.',
'Os passeios têm acesso para cadeira de rodas, mas o Pelourinho tem ladeiras e chão de pedra.',
'Um guia especializado fica com você o tempo todo.',
'Se precisar de ajuda especial, avise a agência com 7 dias de antecedência.',
'Você pode adicionar ou remover passeios, mas o preço muda e depende da confirmação da agência.',
'O que levar na mala: roupa leve, capa de chuva, protetor solar, chapéu, garrafa de água, calçado fechado e confortável, seus remédios e documentos.',
'Em Salvador faz calor e pode chover, com mais chuvas entre abril e junho.',
'Em caso de emergência, ligue para Ambulância (192), Bombeiros (193) ou Polícia (190) e avise o guia e a agência.',
'Para falar com a agência, ligue para o telefone 0800 123 4567 ou envie mensagem para o WhatsApp 11 99234-5678.'
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