import { getTarefas } from '../repository/TarefasRepository'

export async function getTarefasService () {
    const resultado = getTarefas()
    .then((resultado) => {
        const listaDto = resultado ?? [];
        return listaDto; })
    .catch(() => { return [] });

    return resultado;
}