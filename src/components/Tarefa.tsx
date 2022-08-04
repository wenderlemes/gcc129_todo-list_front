import TarefaModel from '../repository/TarefaModel';
import './Tarefa.css';
import { CheckCircle, Edit, Search, ThumbsUp, Trash, X } from 'react-feather';

interface TarefaProps {
    tarefa: TarefaModel
    acaoDetalhes: () => void;
    acaoEditar: () => void;
    acaoCompletar: () => void;
    acaoExcluir: () => void;
}

const Tarefa = ({ tarefa, acaoDetalhes, acaoEditar, acaoCompletar, acaoExcluir }: TarefaProps ) => {
    return (
        <div className="Tarefa-container">
            <div className="Tarefa-campo">{tarefa.identificacao}</div>
            <div className="Tarefa-campo">{tarefa.prazo.toLocaleDateString()}</div>
            <div className="Tarefa-campo">{tarefa.completa ? <CheckCircle /> : <X /> }</div>
            <div className="Tarefa-campo">
                <Search cursor={'pointer'} onClick={acaoDetalhes}/>
                <Edit cursor={'pointer'} onClick={acaoEditar}/>
                <ThumbsUp cursor={'pointer'} onClick={acaoCompletar}/>
                <Trash cursor={'pointer'} onClick={acaoExcluir}/>
            </div>
        </div>
    );
}

export default Tarefa;