import TarefaModel from '../model/TarefaModel';
import { getTarefas } from '../repository/TarefasRepository'

export async function getTarefasService () {
    const resultado = getTarefas()
    .then((resultado) => {
        const listaModel = (resultado ?? []).map((itemDto) => { 
            const tarefaModel: TarefaModel = {
                identificacao: itemDto.identificacao,
                descricao: itemDto.descricao,
                prazo: new Date(itemDto.prazo),
                completa: itemDto.completa,
            };

            return tarefaModel;
        });
        return listaModel; })
    .catch(() => { return [] });

    return resultado;
}