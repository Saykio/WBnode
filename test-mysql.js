'use strict';

/**
 * Test du DAO
 */

var process = require("process");
var moment = require("moment");

var EmployeDao = require("./employe-dao");
var CongeDao = require("./conge-dao");
var DbConnector = require("./dbconnector");

console.log('VAR_DATABASE=' + process.env.VAR_DATABASE);

if (process.env.VAR_DATABASE) {
    var connector = new DbConnector();
    connector.parse(process.env.VAR_DATABASE);
    console.log(connector);
    /*
        var dao = new EmployeDao(connector);
        
        dao.findSolde(1, function (error, entite) {
            console.log(error);
            console.log(entite);
        });
    
        dao.close();
        */

    var congeDao = new CongeDao(connector);
    /*
        congeDao.find(3, 2, function (error, entite) {
            console.log(error);
            console.log(entite);
        });
    */

    congeDao.create({ datedebut: moment("2016-02-16").toDate(), datefin: moment("2016-02-17").toDate(), motif: "test", id_employe: 2 },
     function (error, insertedId) {
        console.log("congé #" + insertedId);
    })

    congeDao.close();

} else {
    console.log("Variable d'environnement VAR_DATABASE non définie");
}