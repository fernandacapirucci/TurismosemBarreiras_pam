// Conserta imagens cuja extensão não combina com o formato real.
// Uso (na raiz do projeto):  node converter-imagens.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PASTA = path.join(__dirname, 'src', 'assets', 'assets');
const BACKUP = path.join(__dirname, 'src', 'assets', '_backup-imagens');
const EXTENSOES = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

// Lê o começo do arquivo e descobre o formato de verdade
function detectar(arquivo) {
  const fd = fs.openSync(arquivo, 'r');
  const buf = Buffer.alloc(16);
  fs.readSync(fd, buf, 0, 16, 0);
  fs.closeSync(fd);

  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return '.png';
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return '.jpg';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return '.webp';
  if (buf.toString('ascii', 0, 3) === 'GIF') return '.gif';
  return null; // outro formato (AVIF, HEIC...) -> será convertido para JPG
}

function normalizar(ext) {
  ext = ext.toLowerCase();
  return ext === '.jpeg' ? '.jpg' : ext;
}

function guardarBackup(arquivo) {
  fs.mkdirSync(BACKUP, { recursive: true });
  const destino = path.join(BACKUP, path.basename(arquivo));
  if (!fs.existsSync(destino)) fs.copyFileSync(arquivo, destino);
}

async function main() {
  if (!fs.existsSync(PASTA)) {
    console.log('Pasta não encontrada: ' + PASTA);
    console.log('Rode este comando na raiz do projeto (onde fica o App.js).');
    return;
  }

  const arquivos = fs.readdirSync(PASTA).filter((n) => EXTENSOES.includes(path.extname(n).toLowerCase()));
  let ok = 0;
  const mudancas = [];
  const falhas = [];

  for (const nome of arquivos) {
    const caminho = path.join(PASTA, nome);
    const extAtual = normalizar(path.extname(nome));
    const base = path.basename(nome, path.extname(nome));
    const real = detectar(caminho);

    if (real === extAtual) {
      ok++;
      continue;
    }

    try {
      if (real) {
        // Formato conhecido com extensão errada: só renomeia
        const novo = base + real;
        const destino = path.join(PASTA, novo);
        if (fs.existsSync(destino)) {
          falhas.push(`${nome}: já existe ${novo}, não mexi`);
          continue;
        }
        guardarBackup(caminho);
        fs.renameSync(caminho, destino);
        mudancas.push(`${nome}  ->  ${novo}`);
      } else {
        // Formato desconhecido: converte para JPG
        const novo = base + '.jpg';
        const destino = path.join(PASTA, novo);
        if (fs.existsSync(destino)) {
          falhas.push(`${nome}: já existe ${novo}, não mexi`);
          continue;
        }
        await sharp(caminho)
          .flatten({ background: '#ffffff' })
          .jpeg({ quality: 90 })
          .toFile(destino);
        guardarBackup(caminho);
        fs.unlinkSync(caminho);
        mudancas.push(`${nome}  ->  ${novo}  (convertido)`);
      }
    } catch (erro) {
      falhas.push(`${nome}: não consegui converter (${erro.message})`);
    }
  }

  console.log(`\nJá estavam certos: ${ok}`);
  console.log(`Corrigidos: ${mudancas.length}`);
  mudancas.forEach((m) => console.log('  ' + m));
  if (falhas.length) {
    console.log(`\nCom problema: ${falhas.length}`);
    falhas.forEach((f) => console.log('  ' + f));
  }
  console.log('\nOs originais foram copiados para src/assets/_backup-imagens');
}

main();