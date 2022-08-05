import axios from 'axios'
import TarefaDto from '../dto/TarefaDto';

const tarefasMocadas: TarefaDto[] = [
  {
    identificacao: "T01",
    descricao: "Uma descrição",
    prazo: "2022-07-20T01:30:00.000-05:00",
    completa: true,
  },
  {
    identificacao: "T02",
    descricao: "Uma descrição",
    prazo: "2022-08-05T01:30:00.000-05:00",
    completa: false,
  },
  {
    identificacao: "T03",
    descricao: "Uma descrição",
    prazo: "2022-07-29T01:30:00.000-05:00",
    completa: true,
  },
];

export async function getTarefas () {
  // TODO: Descomentar quando for fazer a comunicação com o back
  // const resultado = axios.get(`http://192.168.103.14:3000/tarefas`)
  // .then((res: any) => {
  //   return res.data;
  // })

  // return resultado;
  return tarefasMocadas;
}