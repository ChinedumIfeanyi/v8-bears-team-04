const User = require('../models/UserAuth')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
let config = require('../config/utils')


class UserCtrl {

	static Login(req,res) {
		
		passport.authenticate('local')(req,res, ()=>{
			const payload = {
				id: req.user._id,
				email: req.user.email
			}
			jwt.sign(payload, config.secret, (err,token) =>{
				if(err) {
					throw err
				}else{
					return res.json({
						message: "Login Success",
						token
					})
				}
			})
		
		})

	}


	static Register(req,res) {

		User.findOne({email: req.body.email}, (err,user)=>{
			if(err){
				throw err
			}
			if(user) {
				res.json({message: 'user already exists'})
			}else{
				User.register(new User({
					email: req.body.email
				}), req.body.password, (err,user)=>{
					if(err) {
						throw err
					}else{
						passport.authenticate('local')(req,res,()=>{
							return res.json({
								message: "User registered"
							})
						})
					}
				})
			}
		})
		
	}

}


module.exports = UserCtrl