var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var server = http.createServer(app);
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = new sqlite3.Database('./Tarefas.db');
db.run('CREATE TABLE IF NOT EXISTS TAREFAS (identificacao INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, prazo DATE, completa BOOLEAN)');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.post('/tarefas', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO TAREFAS(descricao, prazo,completa) VALUES(?,?,?)',  [req.body.descricao,req.body.prazo,req.body.completa],function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New task has been added");
      res.send(this.lastID.toString());
    });
  });
  ;}
);

app.get('/tarefas', function(req,res){
  db.serialize(()=>{
    db.all('SELECT * FROM TAREFAS ', function(err,rows){     
      if(err){
        return console.error(err.message);
      }
      console.log(rows.length);
      res.send(rows);
      console.log("Entry displayed successfully");
    });
  });
});

app.delete('/tarefas/:id', function(req,res){
  db.serialize(()=>{
    db.all('DELETE FROM TAREFAS WHERE IDENTIFICACAO = ?',[req.params.id], function(err,rows){     
      if(err){
        res.send(err.message);
        return console.error(err.message);
      }
      console.log(rows.length);
      res.send("Task deleted successfully");
      console.log("Entry displayed successfully");
    });
  });
});

app.get('/tarefas/:id', function(req,res){
  db.serialize(()=>{
    db.each('SELECT * FROM TAREFAS WHERE IDENTIFICACAO = ? ',[req.params.id], function(err,rows){     
      if(err){
        res.send(err.message);
        return console.error(err.message);
      }
      console.log(rows.length);
      res.send(rows);
      console.log("Entry displayed successfully");
    });
  });
});

app.put('/tarefas/:id', function(req,res){
  console.log(req.body);
  db.serialize(()=>{
    db.run('UPDATE TAREFAS SET descricao = ?, prazo = ?, completa = ?  WHERE identificacao = ?',[req.body.descricao,req.body.prazo,req.body.completa,req.params.id],function(err){
      if(err){
        res.send("Error encountered while updating");
        return console.error(err.message);
      }
      res.send("Entry updated successfully");
      console.log("Entry updated successfully");
    });
  });
});

app.listen(4000);
