var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongojs('contactlist', ['contactlist']);       //Replace contactlist with name of database

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){             //Replace contactlist with name of database
    console.log("I recieved a get request")
    
    db.contactlist.find(function(err,docs) {            //Replace contactlist with name of database
        console.log(docs);
        res.json(docs);
    })
});

app.post('/contactlist', function(req, res) {            //Replace contactlist with name of database
    console.log(req.body);
    
    db.contactlist.insert(req.body, function(err, doc) { //Replace contactlist with name of database
        res.json(doc);
    })
})

app.delete('/contactlist/:id', function(req, res) {        //Replace contactlist with name of database
    var id = req.params.id;
    console.log("delete id; ", id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
        
    })
});

app.get('/contactlist/:id', function (req, res) {           //Replace contactlist with name of database
    var id = req.params.id;
    console.log("edit id ",id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) { //Replace contactlist with name of database
        res.json(doc);
    })
});

app.put('/contactlist/:id', function (req, res) {           //Replace contactlist with name of database
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({                          //Replace contactlist with name of database
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, //Replace fields with current fields
        new: true}, function (err, doc) {
            res.json(doc);      
    });
});

app.listen(3000);

console.log("Server running on port 3000")