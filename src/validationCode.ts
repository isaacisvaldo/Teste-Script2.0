
import fs from 'fs';
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
   
      return  'Código não encontrado na lista.'
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
const objetoRetornado = exemploPesquisa('lyXJdn')
if (isDataExpirada(objetoRetornado.dataExpiracao)) {
  console.log('A data de expiração já passou.');
} else {
  console.log('Ainda está dentro do prazo.');
}
interface Objeto {
  codigo: string;
  dataExpiracao: Date;
  condition: string;
}
const codigo = gerarCodigo();
const dataExpiracao = new Date(Date.now() + 5 * 60000); // Adiciona 5 minutos à data atual
const codigoInfo: Objeto = {
  codigo: codigo,
  dataExpiracao: dataExpiracao,
  condition: 'pendente'
};
persistData(codigoInfo)


