import React, { useEffect, useState } from 'react';
import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import Tarefa from './Tarefa';
import { getTarefasService } from '../service/TarefaService';
import ModalCadastro from './ModalCadastro';
import { Plus } from 'react-feather';

const ListaTarefas = () => {
    const [lista, setLista] = useState<TarefaModel[]>([]);
	const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
    const [modalVisualizacaoAberto, setModalVisualizacaoAberto] = useState(false);
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

    const handleExclusao = (indiceTarefa: number) => {
        const novaLista = [...lista];
        novaLista.splice(indiceTarefa, 1)
        
        setLista(novaLista);
    }

    const handleAdicao = () => {
        const novaTarefa: TarefaModel = {
            identificacao: '',
            descricao: descricao,
            prazo: prazo || new Date(),
            completa: false
        }

        setLista([...lista, novaTarefa]);
        limparCampos();
        setModalCadastroAberto(false);
    }

    return (
        <div>
            <div className="Titulo-container Header">
                <div className="Campo">Cadastro de Tarefas</div>
                <div className="Campo Adicionar">
                    <Plus cursor="pointer" size={50}  onClick={() => setModalCadastroAberto(true)}/>
                </div>
            </div>
            <div className="Tarefa-container Header">
                <div className="Campo">Identificação</div>
                <div className="Campo">Prazo</div>
                <div className="Campo">Completa</div>
                <div className="Campo">Opções</div>
            </div>
            {lista.length ? 
                lista.map((tarefa, indiceTarefa) => 
                    <Tarefa 
                        tarefa={tarefa}
                        acaoDetalhes={() => {
                            setModalVisualizacaoAberto(true);
                            setTarefaSelecionada(tarefa.identificacao);
                            setDescricao(tarefa.descricao);
                            setPrazo(tarefa.prazo);
                        }} 
                        acaoEditar={() => {
                            setModalEdicaoAberto(true);
                            setTarefaSelecionada(tarefa.identificacao);
                            setDescricao(tarefa.descricao);
                            setPrazo(tarefa.prazo);
                        }} 
                        acaoCompletar={() => alert("Completar tarefa")} 
                        acaoExcluir={() => handleExclusao(indiceTarefa)}
                        key={tarefa.identificacao}
                    />
                ) : 
                <div className="Tarefa-container">
                    <div className="Campo" style={{gridColumn: '1 / -1'}}>Nenhuma tarefa cadastrada</div>
                </div>
            }
            
            <ModalCadastro 
                aberto={modalCadastroAberto} 
                handleCancelar={() => { 
                    setModalCadastroAberto(false);
                    limparCampos();
                }} 
                handleConfirmar={() => handleAdicao()}
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
                titulo={`Edição da tarefa ${tarefaSelecionada}`}
                prazo={prazo}
                setPrazo={setPrazo}
                descricao={descricao}
                setDescricao={setDescricao}
            />
            <ModalCadastro 
                aberto={modalVisualizacaoAberto} 
                handleCancelar={() => { 
                    setModalVisualizacaoAberto(false);
                    limparCampos();
                }} 
                handleConfirmar={() => console.log()}
                titulo={`Visualização da tarefa ${tarefaSelecionada}`}
                prazo={prazo}
                setPrazo={setPrazo}
                descricao={descricao}
                setDescricao={setDescricao}
                modoVisualizacao
            />
        </div>
    );
}

export default ListaTarefas;