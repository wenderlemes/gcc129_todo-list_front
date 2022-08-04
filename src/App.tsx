import './App.css';
import ListaTarefas from './components/ListaTarefas';
import NovaTarefa from './components/NovaTarefa';

const tarefasMocadas = [
  {
    identificacao: "T01",
    descricao: "Uma descrição",
    prazo: new Date(),
    completa: true,
  },
  {
    identificacao: "T02",
    descricao: "Uma descrição",
    prazo: new Date(),
    completa: false,
  },
  {
    identificacao: "T03",
    descricao: "Uma descrição",
    prazo: new Date(),
    completa: true,
  },
];

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className="App-grid">
          <NovaTarefa />
          <ListaTarefas tarefas={tarefasMocadas}/>
        </div>
      </div>
    </div>
  );
}

export default App;
