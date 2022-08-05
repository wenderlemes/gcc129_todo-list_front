import './App.css';
import ListaTarefas from './components/ListaTarefas';
import NovaTarefa from './components/NovaTarefa';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className="App-grid">
          <NovaTarefa />
          <ListaTarefas />
        </div>
      </div>
    </div>
  );
}

export default App;
