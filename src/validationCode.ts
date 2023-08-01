
import fs from 'fs';
import { Twilio } from 'twilio';
export function gerarCodigoAleatorio(tamanho: number): string {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < tamanho; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}
export function gerarCodigo(tempoValidadeMinutos = 5): string {
  return gerarCodigoAleatorio(6); // Gera um código aleatório com 6 caracteres
}

export function persistData(codigos: any): any {
  const jsonData = JSON.stringify(codigos, null, 2);
  const caminhoArquivo = './dados.json';
  fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:');
    } else {
      let jsonData = [];

      try {
        jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
          jsonData = [];
        }
      } catch (parseError) {
        console.error('Erro ao analisar os dados do arquivo:', parseError);
      }

      // Adiciona o novo objeto ao array
      jsonData.push(codigos);

      // Converte o array atualizado para formato JSON
      const jsonDataString = JSON.stringify(jsonData, null, 2);

      // Escreve o array atualizado no arquivo
      fs.writeFile(caminhoArquivo, jsonDataString, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Erro ao escrever no arquivo:', writeErr);
        } else {
          console.log('Novo objeto adicionado e arquivo atualizado com sucesso.');
        }
      });
    }
  });

}
interface ObjetoComCodigo {
  codigo: string;
  dataExpiracao: string;
  condition: string; 
}
function lerArquivo(caminhoArquivo: string): ObjetoComCodigo[] {
  const conteudoDoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
  return JSON.parse(conteudoDoArquivo) as ObjetoComCodigo[];
}
function pesquisarPorCodigo(codigo: string, listaObjetos: ObjetoComCodigo[]): ObjetoComCodigo | any {
  const objetoEncontrado = listaObjetos.find((objeto) => objeto.codigo === codigo);
  return objetoEncontrado || null;
}
function exemploPesquisa(codigoPesquisado: string) {
  try {
    const caminhoDoArquivo = './dados.json';
    const listaObjetos = lerArquivo(caminhoDoArquivo);

    
    const objetoEncontrado = pesquisarPorCodigo(codigoPesquisado, listaObjetos);

    if (objetoEncontrado) {
      return objetoEncontrado;
     
    } else {
   
      return  'Código não encontrado.'
    }
  } catch (error) {
    console.error('Erro ao executar a pesquisa:', error);
  }
}
function isDataExpirada(dataExpiracao: string): boolean {
  const dataAtual = new Date();
  const dataExpiracaoObj = new Date(dataExpiracao);
  return dataAtual >= dataExpiracaoObj;
}
const objetoRetornado = exemploPesquisa('0Ctnye')
console.log(objetoRetornado)

async function ValidateCode(code: string){
  const objetoRetornado = exemploPesquisa(code)
  if (isDataExpirada(objetoRetornado.dataExpiracao)) {
    console.log('A data de expiração já passou.');
  } else {
    console.log(objetoRetornado)
    console.log('Ainda está dentro do prazo.');
  }
}
ValidateCode('0Ctnye')

interface Objeto {
  codigo: string;
  dataExpiracao: Date;
  condition: string;
}
const codigo = gerarCodigo();
const dataExpiracao = new Date(Date.now() + 5 * 60000); 
const codigoInfo: Objeto = {
  codigo: codigo,
  dataExpiracao: dataExpiracao,
  condition: 'pendente'
};



async function sendSMS(message: string, phone: string) {
  const accountSid = 'ACd1a6312ba5e15eb1d1b855c0c3783eac';
const authToken = 'c71f56c323bc0bc38c575766390d205a';
  const client = new Twilio(accountSid, authToken);
  client.messages
    .create({
  
      from: '+14707458483',
      to: `+244${phone}`,
      body: message
    })
    .then(message => console.log('A seguinte Mensagem foi enviada:')).catch((err) => {
      console.log(err)
    });
}

const message = `Codigo de Validação:${codigo}`
const phone= '930333042'
//persistData(codigoInfo)
//sendSMS(message, phone)


