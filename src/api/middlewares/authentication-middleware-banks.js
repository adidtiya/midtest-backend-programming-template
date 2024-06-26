const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { banks } = require('../../models');


// Authenticate user based on the JWT token
passport.use(
  'banks',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      const banks = await User.findOne({ id: payload.user_id });
      return banks ? done(null, banks) : done(null, false);
    }
  )
);

module.exports = passport.authenticate('banks', { session: false });
