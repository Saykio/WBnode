'use strict';

var url = require('url');

/**
 * Représente une connexion SGBD construite à partir d'une URI
 */
class DbConnector {

    constructor() {
        this.username = "";
        this.password = "";
        this.hostname = "";
        this.database = "";
    }

    parse(dbUri) {
        /*
        mysql://root:root@localhost/heroku_0d3bcca37c58950?reconnect=true
        */
        let mysqlDbUri = url.parse(dbUri);
        console.log(mysqlDbUri);
        if (mysqlDbUri.protocol === 'mysql:') {
            let authentication = mysqlDbUri.auth.split(':');
            this.hostname = mysqlDbUri.hostname;
            this.username = authentication[0];
            this.password = authentication[1];
            this.database = mysqlDbUri.pathname.substring(1);
        } else {
            console.log("Bad URI !");
        }
    }
}

// Export en tant que module Node
module.exports = DbConnector;

