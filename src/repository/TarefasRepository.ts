import axios from 'axios'
import { BACKEND_BASE_URL } from '../app-config';
import TarefaDto from '../dto/TarefaDto';

export async function getTarefas () {
  const resultado = axios.get(`${BACKEND_BASE_URL}/tarefas/`)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}

export async function getTarefa (id: string) {
  const resultado = axios.get(`${BACKEND_BASE_URL}/tarefas/${id}`)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}

export async function postTarefa (tarefa: TarefaDto) {
  const resultado = axios.post(`${BACKEND_BASE_URL}/tarefas/`, tarefa)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}

export async function deleteTarefa (id: string)  {
  axios.delete(`${BACKEND_BASE_URL}/tarefas/${id}`)
  .then(() => {
    return;
  })
}

export async function updateTarefa (idTarefa: number, tarefa: TarefaDto) {
  axios.put(`${BACKEND_BASE_URL}/tarefas/${idTarefa}`, tarefa)
  .then((res: any) => {
    return res.data;
  })

  return;
}

export async function updateStatusTarefa (idTarefa: number) {
  axios.put(`${BACKEND_BASE_URL}/tarefas/${idTarefa}/alterarStatusCompleta`)
  .then((res: any) => {
    return res.data;
  })

  return;
}