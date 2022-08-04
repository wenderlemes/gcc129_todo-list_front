import TarefaModel from '../repository/TarefaModel';
import './Tarefa.css';
import Tarefa from './Tarefa';

interface ListaTarefasProps {
    tarefas: TarefaModel[]
}

const ListaTarefas = ({ tarefas }: ListaTarefasProps ) => {
    return (
        <div>
            <div className="Tarefa-container Tarefa-header">
                <div className="Tarefa-campo">Identificação</div>
                <div className="Tarefa-campo">Prazo</div>
                <div className="Tarefa-campo">Completa</div>
                <div className="Tarefa-campo">Opções</div>
            </div>
            {tarefas.map((tarefa) => 
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