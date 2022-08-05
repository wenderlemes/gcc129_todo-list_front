import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import { Switch } from '@mui/material';
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
            <div className="Tarefa-campo">{tarefa.prazo.toLocaleString()}</div>
            <div className="Tarefa-campo"><Switch checked={tarefa.completa} color={'default'} onChange={acaoCompletar} /></div>
            <div className="Tarefa-campo">
                <Search cursor={'pointer'} onClick={acaoDetalhes}/>
                <Edit cursor={'pointer'} onClick={acaoEditar}/>
                <Trash cursor={'pointer'} onClick={acaoExcluir}/>
            </div>
        </div>
    );
}

export default Tarefa;