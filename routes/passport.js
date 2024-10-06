// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
//var bCrypt = require('bcrypt-nodejs');
var passport = require("passport");
var User = require('./users')
var alert = require("alert");
    //const bcrypt = require('bcryptjs');
var md5 = require('md5');
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
});

var mysql = require('mysql2');

var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : 'pl0138026481',
                  database : 'csac-ctrl-db',
                 });


connection.query('USE csac-ctrl-db');


// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session

    passport.serializeUser(function(admin, done) {
		done(null, admin.id);
    });
    // ********************
      // used to deserialize the user
      passport.deserializeUser(function(id, done) {
		connection.query("select * from admin where id = "+id,function(err,rows){
			done(err, rows[0]);
		});
      });
	// ***************

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'



        passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        emailField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, email, password, done) {

		   // find a user whose usernam is the same as the forms usernam
	     	// we are checking to see if the user trying to login already exists
            connection.query("select * from admin where username = '"+username+"'",function(err,rows){
			//console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                 alert("User Name Existed");
                return done(null, false, req.flash('signupMessage', 'That User Name is already taken.'));
             }
            });

           // find a user whose email is the same as the forms email
	    	// we are checking to see if the user trying to login already exists
            connection.query("select * from admin where email = '"+email+"'",function(err,rows){
			//console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                 alert("email already  Existed");
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
             } else {

                 // if there is no user with that email and username
                // create the user
                var newUserMysql = new Object();
				newUserMysql.username = username;
				newUserMysql.email    = email;
                newUserMysql.password = password; // use the generateHash function in our user model
                var md5Password = md5(password+username);
				var insertQuery = "INSERT INTO admin (username, email, password ) values ('" +username+"',  '" + email +"','"+ md5Password +"' )";
					console.log(insertQuery);
        //
				connection.query(insertQuery,function(err,rows){
                   console.log(err);
                   if (err) {
                    return done(err);
                   } else {
                    return done(null, newUserMysql);
                   }



             });
            }
				});

        }

	));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        emailField: 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
     },
     function(req, username, email, password, done) { // callback with email and password from our form
        var md5Password = md5(password+username);
         connection.query("SELECT * FROM `admin` WHERE 'username' = '" + username + "' AND 'password' = '" + md5Password + "'", function(err,rows) {
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);

		});

     }

    ));


};
