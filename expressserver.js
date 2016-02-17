var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");
var moment = require("moment");
var DbConnector = require("./dbconnector");
var EmployeDao = require('./employe-dao');
var CongeDao = require('./conge-dao');

var connector = new DbConnector();
/*
VAR_DATABASE doit contenir
mysql://[username]:[password]@[hostname]/[databasename]?reconnect=true
*/
connector.parse(process.env.VAR_DATABASE);
console.log(connector);

var dao = new EmployeDao(connector);
var congeDao = new CongeDao(connector);

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());

// Déclaration des web services
app.get('/', function (request, response) {
    response.json({ message: "salut" });
});

app.get('/consultersolde/:idpersonne', function (request, response) {
    dao.findSolde(request.params.idpersonne, function (error, solde) {
        if (!error) {
            response.json({ "ok": true, "soldeconge": solde });
        } else {
            response.status(400).json({ "ok": false, "message": "Mauvais format ou idpersonne inexistant" });
        }
    });
});

app.get('/recupererdemande/:idpersonne/:idperiode', function (request, response) {
    dao.find(request.params.idpersonne, function (error, employes) {
        if (!error) {
            congeDao.find(request.params.idperiode, request.params.idpersonne, function (error, conge) {
                if (!error) {
                    response.json({ "ok": true, "datedebut": moment(new Date(conge.datedebut)).format('DD/MM/YYYY'), "datefin": moment(new Date(conge.datefin)).format('DD/MM/YYYY'), "motif": conge.motif });
                } else {
                    response.status(400).json({ "ok": false, "message": "Mauvais format ou idperiode inexistant pour cette personne" });
                }
            });
        } else {
            response.status(400).json({ "ok": false, "message": "Mauvais format ou idpersonne inexistant" });
        }

    })

});

app.post('/fairesademande/:idpersonne', function (request, response) {
    request.body.id_employe = request.params.idpersonne;
    congeDao.create(request.body, function (error, insertedId) {
        if (!error) {
            response.json({ "ok": true, "message": "congé ok", "solde": "a implémenter" });
        } else {
            response.status(400).json({ "ok": false, "message": "donnees incorrectes" });
        }
    });
});


// Lancement du serveur
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});