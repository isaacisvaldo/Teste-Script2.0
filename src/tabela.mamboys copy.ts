import Holidays from 'date-holidays';
const acronymcountry = new Holidays('AO');


const feriadosAngola: string[] = [
    '01-04', // Dia da Paz
    '04-02', // Dia do Início da Luta Armada
    '08-03', // Dia Internacional da Mulher
    '04-04', // Dia da Paz
    '25-05', // Dia de África
    '01-06', // Dia da Criança
    '17-09', // Dia do Herói Nacional
    '14-02', // Dia dos Namorados
    '02-11', // Dia dos Finados
    '05-12'  // Natal
  ];
  function formatarData(data: string): string {
    const partesData: string[] = data.includes('-') ? data.split('-') : data.split('/');
    const ano: string = partesData[0];
    const mes: string = partesData[1];
    const dia: string = partesData[2];
    return `${dia}-${mes}`;
  }
export function  Holiday_Nao_Nacional(dataDesejada: string): any {
    const dataFormatada: string = formatarData(dataDesejada);
    console.log(dataFormatada);
    return feriadosAngola.includes(dataFormatada) 
}
    

export function getDataAtual(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}
export function getHoraAtual(): string {
    const dataAtual = new Date();
    const hora = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
    return `${hora}:${minutos}:${segundos}`;
}
export function getHoliday(data: string): unknown {
    if(Holiday_Nao_Nacional(data)|| acronymcountry.isHoliday(data)){
        return true;
    }else{
        return false;
    }
    
}
 export function getDiaSemana(): string {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const dataAtual = new Date();
    const diaSemana = diasDaSemana[dataAtual.getDay()];
    return diaSemana;
}
const dataFormatada = getDataAtual();
const horaAtual = getHoraAtual();
const diaSemana = getDiaSemana()
const Holiday = getHoliday(dataFormatada)
console.log(Holiday)

if (Holiday){// caso for feriado    
    console.log('É feriado em Angola!');
    //O Sistema pode alterar a tabela de Ganho do Mamboys apartir das 10h ate o fim da Operação Por feriado;
        console.log('Sofrerá Atualização da Tabela de preços de ganho sera conssiderada distancia maxima quando exceder os 5km');
  
   }else{// caso Não for feriado
    console.log('Não é feriado em Angola.');
    //O Sistema pode alterar a tabela de Ganho do Mamboys apartir das 20h ate o fim da Operação;
      console.log(diaSemana)
      if(diaSemana =='Domingo'||diaSemana=='Sexta-feira'||diaSemana=='Sábado'){
        //Esta nos dias que deve ser alterada a Tabela de preçario ! Ou seja seja será considerada distancia Maxima quando esceder os 5km

        if(horaAtual > '19:59:59') {
            console.log('A Tabela de preços de ganho agora esta ser considerado distancia Maxima quando exceder os 5km' + horaAtual);

        }else{
            console.log(`A tabela de preços de ganho sofrera atualização dentre a Qualquer momento de Distancia Maxima deixara de ser considerada 8km passara a ser 5km ${horaAtual} `);
        }
        
      }else{
        console.log('Não Sofrerá Atualização, a Tabela de preços de ganho continuara a ser distancia maxima quando exceder os 8km')
      }
}