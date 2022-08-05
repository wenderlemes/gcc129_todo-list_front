//---------------------------

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//	extended: true
//}));
app.use(cors())

app.listen(3000);

//---------------------------

// Lista de carros
var tarefas = [
  { identificacao: '1', descricao: 'Jetta', prazo: '1995-08-09T01:01:01.123Z', completa: true },
  { identificacao: '2', descricao: 'Outra', prazo: '1995-08-09T02:02:02.456Z', completa: false },
];

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
	if (id >= 0 && id < carros.length)
		res.json(carros[id]);
	else
		res.status(500).json({status: 'erro', message: "id invalido"});
})

app.post('/carros', function (req, res) {
	var carro = req.body;
	carros[carros.length] = carro;
	res.json(carros[carros.length-1]);  
})

app.delete('/carros/:id', function(req, res) {
	var id = req.params.id;
	if (id >= 0 && id < carros.length) {
		carros.splice(id, 1)
		res.json(carros);
	}
	else
		res.status(500).json({status: 'erro', message: "id invalido"});
})

app.get('/carros/count', function (req, res) {
	res.end(carros.length.toString());
})

app.get('/carros/menorpreco', function (req, res) {
	var menorID = 0;
	var menorPreco = carros[0].preco;
	for (i = 0; i < carros.length; i++) { 
    	if (carros[i].preco < menorPreco) {
    		menorID = i;
    		menorPreco = carros[i].preco;
    	}
	}
	res.json(carros[menorID]);
})



