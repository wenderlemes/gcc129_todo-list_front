import TarefaModel from '../model/TarefaModel';
import TarefaDto from '../dto/TarefaDto';
import { getTarefas, postTarefa, deleteTarefa, updateTarefa, updateStatusTarefa, getTarefa } from '../repository/TarefasRepository'

export async function getTarefasService () {
    const resultado = getTarefas()
    .then((resultado) => {
        const listaModel = (resultado ?? []).map((itemDto: TarefaDto) => { 
            const tarefaModel: TarefaModel = {
                identificacao: itemDto.identificacao,
                descricao: itemDto.descricao,
                prazo: new Date(itemDto.prazo),
                completa: !!itemDto.completa,
            };

            return tarefaModel;
        });
        return listaModel; })
    .catch(() => { return [] });

    return resultado;
}

export async function getTarefaIndividualService (idTarefa: string) {
    const resultado = getTarefa(idTarefa)
    .then((resultado) => {
        const tarefaModel: TarefaModel = {
            identificacao: resultado.identificacao,
            descricao: resultado.descricao,
            prazo: new Date(resultado.prazo),
            completa: !!resultado.completa,
        };

        return tarefaModel; })
    .catch(() => { return null });

    return resultado;
}

export async function addTarefaService (tarefa: TarefaModel) {
    const tarefaDto = {
        identificacao: '',
        descricao: tarefa.descricao,
        prazo: tarefa.prazo.toString(),
        completa: tarefa.completa,
    }

    const resultado = postTarefa(tarefaDto)
    .then((resultado) => { return resultado; })
    .catch(() => { return '' });

    return resultado;
}

export async function deleteTarefaService (id: string) {
    const resultado = deleteTarefa(id)
    .then(() => { return true; })
    .catch(() => { return false });
    
    return resultado;
}

export async function updateTarefaService (idTarefa: number, tarefa: TarefaModel) {
    const tarefaDto = {
        identificacao: '',
        descricao: tarefa.descricao,
        prazo: tarefa.prazo.toString(),
        completa: tarefa.completa,
    }

    const resultado = updateTarefa(idTarefa, tarefaDto)
    .then(() => { return true; })
    .catch(() => { return false });

    return resultado;
}

export async function updateStatusTarefaService (idTarefa: number) {
    const resultado = updateStatusTarefa(idTarefa)
    .then(() => { return true; })
    .catch(() => { return false });

    return resultado;
}