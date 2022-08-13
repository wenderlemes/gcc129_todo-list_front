import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import { Switch, Tooltip } from '@mui/material';
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
            <div className="Campo">
                <Tooltip title={tarefa.completa ? "Desmarcar tarefa completa" : "Completar tarefa"}>
                    <Switch checked={tarefa.completa} color={'default'} onChange={acaoCompletar} />
                </Tooltip>
            </div>
            <div className="Campo">
                <Tooltip title="Abrir detalhes">
                    <Search cursor={'pointer'} onClick={acaoDetalhes}/>
                </Tooltip>
                <Tooltip title="Editar tarefa">
                    <Edit cursor={'pointer'} onClick={acaoEditar}/>
                </Tooltip>
                <Tooltip title="Excluir tarefa">
                    <Trash cursor={'pointer'} onClick={acaoExcluir}/>
                </Tooltip>
            </div>
        </div>
    );
}

export default Tarefa;