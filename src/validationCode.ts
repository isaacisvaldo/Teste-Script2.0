
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
export async function lerArquivo(caminhoArquivo: string): Promise<string>{
  return new Promise((resolve, reject) => {
    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        return data;
      }
    });
  });
}
async function pesquisarPorCodigo(codigo: string) {
  try {
    const caminhoArquivo = './dados.json';
    const frutas: string[] = [];
    const data =lerArquivo(caminhoArquivo);
    const presentes =[
      { "codigo": "ZYkENw", "dataExpiracao": "2023-07-28T18:10:58.878Z", "condição": "pendente" },
      { "codigo": "K9ef4N", "dataExpiracao": "2023-07-28T18:11:31.328Z", "condição": "pendente" },
      { "codigo": "O7Zskz", "dataExpiracao": "2023-07-28T18:11:40.735Z", "condição" : "pendente" },
      { "codigo": "5JDZ1T", "dataExpiracao": "2023-07-28T18:11:45.470Z", "condição": "pendente" },
      { "codigo": "G2m8PD", "dataExpiracao": "2023-07-28T18:13:39.446Z", "condição":"pendente" },
      { "codigo": "WLmiGt", "dataExpiracao": "2023-07-28T18:13:46.579Z", "condição": "pendente" },
      { "codigo": "mZsKfF", "dataExpiracao": "2023-07-28T18:13:54.953Z", "condição": "pendente" }
    ];
  console.log(frutas)
    const presente =  presentes.find(p => p.codigo === codigo);
  
    if (presente) {
      return presente;
    } else {
      return "Código de presente não encontrado.";
    }
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return undefined;
  }
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
pesquisarPorCodigo('')
console.log(pesquisarPorCodigo('ZYkENw'))

