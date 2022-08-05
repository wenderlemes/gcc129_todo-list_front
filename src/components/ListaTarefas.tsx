import React, { useEffect, useState } from 'react';
import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import Tarefa from './Tarefa';
import { getTarefasService } from '../service/TarefaService';

const ListaTarefas = () => {
    const [lista, setLista] = useState<TarefaModel[]>([]);

    useEffect(() => {
        async function obterTarefas() {
            const resultado = await getTarefasService();
            setLista(resultado);
        };

        obterTarefas();
    }, []);

    return (
        <div>
            <div className="Tarefa-container Header">
                <div className="Campo">Identificação</div>
                <div className="Campo">Prazo</div>
                <div className="Campo">Completa</div>
                <div className="Campo">Opções</div>
            </div>
            {lista.map((tarefa) => 
                <Tarefa 
                    tarefa={tarefa}
                    acaoDetalhes={() => alert("Abrir detalhes")} 
                    acaoEditar={() => alert("Abrir edição")} 
                    acaoCompletar={() => alert("Completar tarefa")} 
                    acaoExcluir={() => alert("Excluir tarefa")}
                    key={tarefa.identificacao}
                />
            )}
        </div>
    );
}

export default ListaTarefas;