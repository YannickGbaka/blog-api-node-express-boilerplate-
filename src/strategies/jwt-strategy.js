const passport = require("passport");
const User = require("../mongoose/schemas/user");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
