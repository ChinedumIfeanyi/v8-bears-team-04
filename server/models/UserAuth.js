
const { Schema, model } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


const UserSchema = new Schema({
	email: String,
	password: String
}, {
	timestamps: true
})

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

module.exports = model('User', UserSchema)