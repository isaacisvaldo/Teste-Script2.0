import cron from 'node-cron';
import schedule from 'node-schedule';
function getHoraAtual(): string {
    const dataAtual = new Date();
    const hora = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
    return `${hora}:${minutos}:${segundos}`;
}
function getDiaSemana(): string {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const dataAtual = new Date();
    const diaSemana = diasDaSemana[dataAtual.getDay()];
    return diaSemana;
}
const diaSemana = getDiaSemana();
console.log(diaSemana);
const horaAtual = getHoraAtual();
console.log(horaAtual);

/*
function tarefaDiaria(): void {
    const horaAtual = getHoraAtual();
    console.log(horaAtual);
    if(horaAtual > '19:59:59') { 
        console.log('Hora de subir A Tabela de Preço')
    }else{ 
        console.log('Devo permanecer a Tabela')
    }
  }
  const tarefaDiariaCron = cron.schedule('* * * * * *', tarefaDiaria);
 
tarefaDiariaCron.start();*/

// Função que será executada somente após as 19h
/*
function tarefaApos19h(): void {
    const horaAtual2 = new Date().getHours();
    if (horaAtual2 >= 19) {
      console.log('Tarefa executada após as 19h.'+horaAtual);
    }
  }
  const regra = new schedule.RecurrenceRule();
  regra.hour = 19; 
  regra.second = new schedule.Range(0, 59); // Executar a cada segundo (0 a 59)
  const job = schedule.scheduleJob(regra, tarefaApos19h);
*/
  // Função que será executada somente após as 19h e antes das 00h
    function tarefaApos19h(): void {
     const horaAtual = new Date().getHours();
    if (horaAtual >= 19 && horaAtual < 24) {
      console.log('Tarefa executada após as 19h e antes das 00h.');
    }
  }
  const job = schedule.scheduleJob('* * 19-23 * * *', tarefaApos19h);