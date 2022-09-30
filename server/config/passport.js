import UserModal from "../models/user.js";
import strategy from "passport-jwt";
import passport from "passport";

const JwtStrategy = strategy.Strategy;
const ExtractJwt = strategy.ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = "S3GA3MHMa1gKdVw7";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    UserModal.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
