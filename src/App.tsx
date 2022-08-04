import './App.css';
import ListaTarefas from './components/ListaTarefas';

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
        <ListaTarefas tarefas={tarefasMocadas}/>
      </div>
    </div>
  );
}

export default App;
