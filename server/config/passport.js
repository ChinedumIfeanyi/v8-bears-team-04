const passport = require('passport')
const User = require('../model/user')
const LocalStrategy = require('passport-local')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy


let config = require('./utils')


passport.serializeUser(User.serializeUser() )
passport.deserializeUser(User.deserializeUser() )

passport.use(User.createStrategy() )



// passport.use(new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password'
// },
// 	function(email, password, done) {
// 		return User.findOne({email})
// 			.then(user => {
// 				if(!user) {
// 					return done(null, false, {message: 'incorrect user and password'})
// 				}

// 				return done(null, user, {
// 					message: 'login success'
// 				})
// 			})
// 			.catch(err => {
// 				return done(err)
// 			})
// 	}
// ))





exports.verifyUser = passport.authenticate('jwt', {session: false})

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secret




exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
	User.findById(jwt_payload.id, (err,user)=>{
		if(err){
			throw err
		}else if(!user) {
			done(null, false)
		}else{
			done(null, user)
		}
	})

}))
