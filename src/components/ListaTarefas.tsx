import React, { useEffect, useState } from 'react';
import TarefaModel from '../repository/TarefaModel';
import './Styles.css';
import Tarefa from './Tarefa';
import TarefasRepository from '../repository/TarefasRepository';
import axios from 'axios';

interface ListaTarefasProps {
    tarefas: TarefaModel[]
}

const ListaTarefas = ({ tarefas }: ListaTarefasProps ) => {

    const [lista, setLista] = useState<TarefaModel[]>([]);    

    const requisicao = async () => {
        axios.get(`http://192.168.103.14:3000/tarefas`, { 'headers': { 'Access-Control-Allow-Origin': '*' } })
      .then((res: any) => {
        setLista(res.data);
      })    
    }


    useEffect(() => {
        requisicao();
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