import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import { Switch } from '@mui/material';
import { Edit, Search, Trash } from 'react-feather';

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
            <div className="Campo">{tarefa.identificacao}</div>
            <div className="Campo">{tarefa.prazo.toLocaleString()}</div>
            <div className="Campo"><Switch checked={tarefa.completa} color={'default'} onChange={acaoCompletar} /></div>
            <div className="Campo">
                <Search cursor={'pointer'} onClick={acaoDetalhes}/>
                <Edit cursor={'pointer'} onClick={acaoEditar}/>
                <Trash cursor={'pointer'} onClick={acaoExcluir}/>
            </div>
        </div>
    );
}

export default Tarefa;