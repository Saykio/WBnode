"use strict";

var mysql = require("mysql");
var Dao = require('./dao');

class CongeDao extends Dao {

    constructor(dbConnector) {
        super(dbConnector, 'conge', 'Congé');
    }
        
    /**
     * Cherche un congé en fonction de son ID pour un employé donné.
     * La méthode de callback doit recevoir l'erreur et le contenu de la première occurence en base.
     */
    find(idConge, idPersonne, callback) {
        let self = this;
        if (this.checkId(idConge) && this.checkId(idPersonne)) {
            this.connection.query('select * from ' + this.tableName + ' where idconge=? and id_employe=?', [idConge, idPersonne],
                function (err, rows, fields) {
                    var error;
                    if (!err) {
                        if (rows.length === 0) {
                            error = self.entityName + " #" + idConge + " not found !";
                        }
                        callback(error, rows[0]);
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
    
    /**
     * Dépose une demande de congé
     * La méthode de callback doit recevoir l'erreur et l'id attribué à la demande (ou -1 si l'insertion n'a
     * pu se faire)
     */
    create(conge, callback) {
        this.connection.query('insert into ' + this.tableName + ' set ?', conge,
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, -1);
                } else {
                    callback(err, result.insertId);
                }
            });
    };

}

module.exports = CongeDao;