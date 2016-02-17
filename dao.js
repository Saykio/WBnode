"use strict";

var mysql = require("mysql");
var util = require("util");

/**
 * Accès au SGBD
 */
class Dao {

    /**
     * Constructeur
     */
    constructor(dbConnector, tableName, entityName) {
        this.connect(dbConnector);
        this.tableName = tableName;
        this.entityName = entityName;
    }

    /**
     * Vérifie la validité d'un ID
     */
    checkId(id) {
        let isValid = false;
        let targetId = id;
        if (util.isNumber(id)) {
            isValid = true;
        } else {
            targetId = Number(id);
            if (!isNaN(targetId)) {
                isValid = true;
            }
        }
        return isValid;
    };

    /**
     * Connecte le DAO au SGBD
     */
    connect(dbConnector) {
        this.connection = mysql.createConnection({
            host: dbConnector.hostname,
            user: dbConnector.username,
            password: dbConnector.password,
            database: dbConnector.database,
            timezone: "fr-fr"
        });
        this.connection.connect();
    };

    /**
     * Termine la connexion au SGBD
     */
    close() {
        this.connection.end();
    }
}

// Export en tant que module Node
module.exports = Dao;