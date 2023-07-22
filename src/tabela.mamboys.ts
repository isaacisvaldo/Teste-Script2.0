import Holidays from 'date-holidays';
const acronymcountry = new Holidays('AO');

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
    return acronymcountry.isHoliday(data)
}
const dataFormatada = getDataAtual();
const horaAtual = getHoraAtual();
const Holiday = getHoliday(dataFormatada)
console.log(dataFormatada);
console.log(horaAtual);
if (Holiday){// caso for feriado
    console.log('É feriado em Angola!');
    //O Sistema pode alterar a tabela de Ganho do Mamboys apartir das 10h ate o fim da Operação Por feriado;
    if (horaAtual > '09:59:59') {
        console.log('Tarefa executada Apartir das 10h' + horaAtual);
    }else{
        console.log('Tarefa Normal a ser executado Porque ainda não são 10h ' + horaAtual);
    }
   }else{// caso Não for feriado
    console.log('Não é feriado em Angola.');
    //O Sistema pode alterar a tabela de Ganho do Mamboys apartir das 20h ate o fim da Operação;

    if(horaAtual > '19:59:59') {
        console.log('Tarefa executada após as 19h.' + horaAtual);
    }else{
        console.log('Tarefa Normal a ser executado Antes das 20h em um dia Normal ' + horaAtual);
    }
}
