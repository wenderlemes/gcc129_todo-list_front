import axios from 'axios'
import TarefaDto from '../dto/TarefaDto';

export async function getTarefas () {
  const resultado = axios.get(`http://localhost:4000/tarefas/`)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}

export async function getTarefa (id: string) {
  const resultado = axios.get(`http://localhost:4000/tarefas/${id}`)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}

export async function postTarefa (tarefa: TarefaDto) {
  const resultado = axios.post(`http://localhost:4000/tarefas/`, tarefa)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}

export async function deleteTarefa (id: string)  {
  axios.delete(`http://localhost:4000/tarefas/${id}`)
  .then(() => {
    return;
  })
}

export async function updateTarefa (idTarefa: number, tarefa: TarefaDto) {
  axios.put(`http://localhost:4000/tarefas/${idTarefa}`, tarefa)
  .then((res: any) => {
    return res.data;
  })

  return;
}

export async function updateStatusTarefa (idTarefa: number) {
  axios.put(`http://localhost:4000/tarefas/${idTarefa}/alterarStatusCompleta`)
  .then((res: any) => {
    return res.data;
  })

  return;
}