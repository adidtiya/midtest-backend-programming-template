const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { transaksi } = require('../../models');


// Authenticate user based on the JWT token
passport.use(
  'Transaksi',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      const user = await User.findOne({ id: payload.user_id });
      return user ? done(null, user) : done(null, false);
    }
  )
);

module.exports = passport.authenticate('Transaksi', { session: false });
