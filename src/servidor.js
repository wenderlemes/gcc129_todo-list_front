var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(bodyParser.json());

app.use(cors())
	// Lista de carros

var tarefas = [
	{ identificacao: '1', descricao: 'Jetta', prazo: '1995-08-09T01:01:01.123Z', completa: true },
	{ identificacao: '2', descricao: 'Outra', prazo: '1995-08-09T02:02:02.456Z', completa: false },
];
var urlencodedParser = bodyParser.urlencoded({ extended: false }) ;

app.listen(3000);

//---------------------------


// exemplo de um carro no formato JSON
//{ "fabricante": "Ford", "modelo": "Ka", "ano": 2010, "automatico": false, "preco": 11000}

//---------------------------

app.get('/', function (req, res) {
	res.end('Bem vindo API de tarefas!');
})

app.get('/tarefas', function (req, res) {
	res.json(tarefas);
})

app.get('/tarefas/:id', function(req, res) {
	var id = req.params.id;
	if (id >= 0 && id < tarefas.length)
	res.json(tarefas[id]);
	else
	res.status(500).json({status: 'erro', message: "id invalido"});
})

app.post('/tarefas/add', urlencodedParser,function (req, res) {
	var tarefa = {
		identificacao: req.body.identificacao,
		descricao: req.body.descricao,
		prazo: req.body.prazo,
		completa: req.body.completa
	};
	tarefas.push(tarefa);
	console.log(tarefa);
	res.json(tarefas);  
})

app.put('/tarefas/update/:id', urlencodedParser,function (req, res) {
	var id = req.params.id;
	var tarefa = {
		identificacao: req.body.identificacao,
		descricao: req.body.descricao,
		prazo: req.body.prazo,
		completa: req.body.completa
	};
	tarefas[id]= tarefa
	console.log(tarefa);
	res.json(tarefas);  
})

app.delete('/tarefas/delete/:id', function (req, res) {
	var id = req.body.id;
	tarefas.splice(id,1);
	res.json(tarefas);
})



