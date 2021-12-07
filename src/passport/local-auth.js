const passport = require('passport');
var bCrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
//local singup
passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({
        where: {
          email: email
        }
      }).then(function(user) {
        if (user) {
          return done(null, false, {message: 'Ya existe un usuario con ese email'});
        } else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
            name: req.body.name,
          };
          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false, {message: 'Te has registrado correctamente, por favor inicia sesión'});
            }
            if (newUser) {
              return done(null, newUser, {message: 'You are now registered and logged in!'});
            }
          });
        }
      });
    }
  ));

//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {

      if (!user) {
        return done(null, false, {message: 'Email no existe'});
      }

      if (!isValidPassword(user.password, password)) {

        return done(null, false, {message: 'Contraseña incorrecta'});
      }

      var userinfo = user.get();

      return done(null, userinfo);

    }).catch(function(err) {

      console.log("Error:", err);

      return done(null, false, {message: 'Algo ha fallado'});

    });

  }
));