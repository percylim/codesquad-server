var env = process.env;
var mysql = require('mysql');
var req;
var pool  = mysql.createPool({
      connectionLimit : 1000,
      'host': env.DB_HOST,
      'user':'centra55_codesquaddb',
      'password': 'Z3@Xn^DIu_(i',
      'database':'centra55_codesquaddb',
    });


    function setupMysqlConnection(req, res, next){

      log.debug("Setting up sql connection.");
      req = req || {};

      //https://github.com/felixge/node-mysql#pooling-connections
      //SQL Connection pooling code.

      log.debug("Setting up sql connection.");

      pool.getConnection(function(err, connection) {
        if(err)
          log.warn("Error getting pool connection: ", err);
        req.sqlConnection = connection;
        next();
      });

      pool.on('connection', function (connection) {
        log.debug('Connected with threadId: ', connection.threadId);
      });

      pool.on('enqueue', function () {
        log.info('Waiting for available connection slot');
      });

      req.on('end', function(){
          //Give some time to process outstanding async sql queries, then close connection
          setTimeout(function(){
            var connectionId = this.sqlConnection.threadId;
            log.info("Releasing connectionId: ", connectionId);
            this.sqlConnection.release(function(err){
              if(err)
                log.warn("Error releasing sql connection: ", err);
              else
                log.debug('Sql connection released for threadId: ' + connectionId);
            });
          }.bind(this), 5000);
      });
    };

    module.exports = req;
