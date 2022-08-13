import React, { useEffect, useState } from 'react';
import TarefaModel from '../model/TarefaModel';
import './Styles.css';
import Tarefa from './Tarefa';
import { getTarefasService, addTarefaService, deleteTarefaService, updateTarefaService, updateStatusTarefaService, getTarefaIndividualService } from '../service/TarefaService';
import ModalCadastro from './ModalCadastro';
import { Plus } from 'react-feather';

const ListaTarefas = () => {
    const [lista, setLista] = useState<TarefaModel[]>([]);
	const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
    const [modalVisualizacaoAberto, setModalVisualizacaoAberto] = useState(false);
	const [prazo, setPrazo] = useState<Date | null>(null);
	const [descricao, setDescricao] = useState<string>('');
	const [completa, setCompleta] = useState<boolean>(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState<string>('');

    async function obterTarefas() {
        const resultado = await getTarefasService();
        setLista(resultado);
    };

    useEffect(() => {
        obterTarefas();
    }, []);

    const limparCampos = () => {
        setPrazo(null);
        setDescricao('');
        setTarefaSelecionada('');
    };

    const handleAdicao = async () => {
        const novaTarefa: TarefaModel = {
            identificacao: '',
            descricao: descricao,
            prazo: prazo || new Date(),
            completa: false
        }

        const idResultante = await addTarefaService(novaTarefa);
        
        if (idResultante) {
            setLista([...lista, { ...novaTarefa, identificacao: idResultante }]);
            limparCampos();
            setModalCadastroAberto(false);
        }

    }

    const handleExclusao = async (idTarefa: string) => {
        const conseguiuDeletar = await deleteTarefaService(idTarefa);

        if (conseguiuDeletar) {
            const novaLista = [...lista];
            novaLista.splice(novaLista.findIndex((tarefa) => {return tarefa.identificacao === idTarefa}), 1)
            
            setLista(novaLista);
        }
    }

    const handleEdicao = async (idTarefa: string) => {
        const tarefaAtual: TarefaModel = {
            identificacao: idTarefa,
            descricao: descricao,
            prazo: prazo || new Date(),
            completa: completa
        }

        const conseguiuEditar = await updateTarefaService(+idTarefa, tarefaAtual);

        if (conseguiuEditar) {
            const listaAtualizada = lista.map((tarefa) => {
                if (tarefa.identificacao === idTarefa) {
                    return {...tarefa, descricao: descricao, prazo: prazo || new Date(), completa: completa}
                } else {
                    return tarefa;
                }
            });
            
            setLista(listaAtualizada);
            limparCampos();
            setModalEdicaoAberto(false);
        }
    }

    const handleTrocarStatusCompleta = async (idTarefa: string) => {
        const conseguiuTrocar = await updateStatusTarefaService(+idTarefa);

        if (conseguiuTrocar) {
            const listaAtualizada = lista.map((tarefa) => {
                if (tarefa.identificacao === idTarefa) {
                    return {...tarefa, completa: !tarefa.completa}
                } else {
                    return tarefa;
                }
            });
            
            setLista(listaAtualizada);
            setModalEdicaoAberto(false);
        }
    }

    const obterDetalhesTarefa = async (idTarefa: string) => {
        const detalhes = await getTarefaIndividualService(idTarefa);

        if (detalhes) {
            setTarefaSelecionada(detalhes.identificacao);
            setDescricao(detalhes.descricao);
            setPrazo(detalhes.prazo);
            setCompleta(detalhes.completa);
        }
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
                lista.map((tarefa) => 
                    <Tarefa 
                        tarefa={tarefa}
                        acaoDetalhes={() => {
                            setModalVisualizacaoAberto(true);
                            obterDetalhesTarefa(tarefa.identificacao);
                        }} 
                        acaoEditar={() => {
                            setModalEdicaoAberto(true);
                            setTarefaSelecionada(tarefa.identificacao);
                            setDescricao(tarefa.descricao);
                            setPrazo(tarefa.prazo);
                            setCompleta(tarefa.completa);
                        }} 
                        acaoCompletar={() => handleTrocarStatusCompleta(tarefa.identificacao)} 
                        acaoExcluir={() => handleExclusao(tarefa.identificacao)}
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
                handleConfirmar={() => handleEdicao(tarefaSelecionada)}
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