"use strict";

var mysql = require("mysql");
var Dao = require('./dao');

class EmployeDao extends Dao {

    constructor(dbConnector) {
        super(dbConnector, 'employe', 'Employé');
        // this.updateStategy = ["nom", "longueur", "idPays"];
    }
   /**
    * Cherche un employé en fonction de son ID.
    * La méthode de callback doit recevoir l'erreur et la liste des lignes en base correspondant à l'ID.
    */ 
   find(id, callback) {
        let self = this;
        if (this.checkId(id)) {
            this.connection.query('select * from ' + this.tableName + ' where id_employe=?', id,
                function (err, rows, fields) {
                    if (!err) {
                        var error;
                        if (rows.length === 0) {
                            error = self.entityName + " #" + id + " not found !";
                        }
                        callback(error, rows);
                    } else {
                        console.log('Error while performing Query : ' + err);
                    }
                });
        } else {
            var error = "Bad id format !";
            callback(error, {});
        }
    };
    
    /**
     * Cherche le solde de congé d'un employé.
     * La méthode de callback doit recevoir l'erreur et le solde.
     */
    findSolde(idEmploye, callback) {
        let self = this;
        if (this.checkId(idEmploye)) {
            this.connection.query('select solde_conge from ' + this.tableName + ' where id_employe=?', idEmploye,
                function (err, rows, fields) {
                    var error;
                    if (!err) {
                        if (rows.length === 0) {
                            error = self.entityName + " #" + idEmploye + " not found !";
                            callback(error, undefined);
                        } else {
                            callback(error, rows[0].solde_conge);
                        }
                    } else {
                        error = 'Error while performing Query : ' + err;
                        console.log(error);
                        callback(error, {});
                    }
                });
        } else {
            var error = "Bad id format !";
            callback(error, {});
        }
    };

}

module.exports = EmployeDao;