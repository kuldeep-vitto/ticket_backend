import passport from "passport";
import passportJwt from "passport-jwt";

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
    },(jwtPayLoad, done) => {
            try {
                return done(null, jwtPayLoad);
        }
        catch(err) {
            return done(err);
        };
        }
        
    )
);
export default passport;