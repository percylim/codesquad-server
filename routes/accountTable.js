var env = process.env;
var mysql = require('mysql');
var completed = false;

module.exports.CreateTable = function (e) { 
    console.log(e);
    this.db = e;
};

return completed;