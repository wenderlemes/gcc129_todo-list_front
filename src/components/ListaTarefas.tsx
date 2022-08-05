import React, { useEffect, useState } from 'react';
import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import Tarefa from './Tarefa';
import { getTarefas } from '../repository/TarefasRepository';
import axios from 'axios';
import { getTarefasService } from '../service/TarefaService';

interface ListaTarefasProps {
    tarefas: TarefaModel[]
}

const ListaTarefas = ({ tarefas }: ListaTarefasProps ) => {
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
            <div className="Tarefa-container Tarefa-header">
                <div className="Tarefa-campo">Identificação</div>
                <div className="Tarefa-campo">Prazo</div>
                <div className="Tarefa-campo">Completa</div>
                <div className="Tarefa-campo">Opções</div>
            </div>
            {lista.map((tarefa) => 
                <Tarefa 
                    tarefa={tarefa}
                    acaoDetalhes={() => console.log(tarefas)} 
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