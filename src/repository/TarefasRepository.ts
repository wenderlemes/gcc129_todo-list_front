import axios from 'axios'

export async function getTarefas () {
  const resultado = axios.get(`http://192.168.103.14:3000/tarefas`)
  .then((res: any) => {
    return res.data;
  })

  return resultado;
}