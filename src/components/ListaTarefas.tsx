import React, { useEffect, useState } from 'react';
import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import Tarefa from './Tarefa';
import { getTarefasService } from '../service/TarefaService';
import ModalCadastro from './ModalCadastro';

const ListaTarefas = () => {
    const [lista, setLista] = useState<TarefaModel[]>([]);
	const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
	const [prazo, setPrazo] = useState<Date | null>(null);
	const [descricao, setDescricao] = useState<string>('');
    const [tarefaSelecionada, setTarefaSelecionada] = useState<string>('');

    useEffect(() => {
        async function obterTarefas() {
            const resultado = await getTarefasService();
            setLista(resultado);
        };

        obterTarefas();
    }, []);

    const limparCampos = () => {
        setPrazo(null);
        setDescricao('');
        setTarefaSelecionada('');
    };

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
                    acaoDetalhes={() => setModalCadastroAberto(true)} 
                    acaoEditar={() => {
                        setModalEdicaoAberto(true);
                        setTarefaSelecionada(tarefa.identificacao);
                        setDescricao(tarefa.descricao);
                        setPrazo(tarefa.prazo);
                    }} 
                    acaoCompletar={() => alert("Completar tarefa")} 
                    acaoExcluir={() => alert("Excluir tarefa")}
                    key={tarefa.identificacao}
                />
            )}
            
            <ModalCadastro 
                aberto={modalCadastroAberto} 
                handleCancelar={() => { 
                    setModalCadastroAberto(false);
                    limparCampos();
                }} 
                handleConfirmar={() => console.log()}
                titulo="Cadastrar nova tarefa"
                prazo={prazo}
                setPrazo={setPrazo}
                descricao={descricao}
                setDescricao={setDescricao}
            />
            <ModalCadastro 
                aberto={modalEdicaoAberto} 
                handleCancelar={() => { 
                    setModalEdicaoAberto(false);
                    limparCampos();
                }} 
                handleConfirmar={() => console.log()}
                titulo={`Editar a tarefa ${tarefaSelecionada}`}
                prazo={prazo}
                setPrazo={setPrazo}
                descricao={descricao}
                setDescricao={setDescricao}
            />
        </div>
    );
}

export default ListaTarefas;