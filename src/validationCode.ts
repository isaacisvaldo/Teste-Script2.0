
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
