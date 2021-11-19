const UserValidationService = require('../services/UserValidatorService')
const ResponseGenerator = require('../services/ResponseGenerator')
const knex = require("../modules/KnexModule")
const jwt = require("jsonwebtoken")
const {secret} = require ("../configs/tokenConfig")

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "12h"})
}

const findUsername = 'SELECT * FROM `users` WHERE `username` = ?';
const findEmail = 'SELECT * FROM `users` WHERE `email` = ?';

exports.login = async (req, res) => {
    const data = {
        isValid: false,
        usernamIsAvalibe: false,
        passwordIsCorrect: false,
        token: '',
        information: {}
    }

    const validate = UserValidationService(req.body, 'login')
    if (!validate.isValid){
        res.status(200).send(data).end()
    }
    else data.isValid = true;

    let user = await knex(findUsername, req.body.username)
    if (user.length === 0){
        data.usernamIsAvalibe = false;
        res.status(200).send(data).end()
    }
    else {
        data.usernamIsAvalibe = true;
    }
    if(user[0].password === req.body.password){
        data.usernamIsAvalibe = true;
        data.passwordIsCorrect = true;
        const token = generateAccessToken(user[0].id)
        data.token = token;
        res.status(200).send(data).end();
    }
    res.status(200).send(data).end();

    // try {
     //     res.json(ResponseGenerator(true, validate.error, validate.fields)).end();
     // }catch (e){
     //     console.log('login ERROR:', e);
     //     res.json(ResponseGenerator(true, 'Something Went Wrong')).end();
     // }
}


exports.register = async (req, res) => {
    const data = {
        isValid: true,
        isUniqeUsername: true,
        isUniqeEmail: true,
        info: {}
    }
    const validate = UserValidationService(req.body, 'register')
    if (!validate.isValid){
        data.isValid = false,
        res.status(200).send(data);
    }
    let username = await knex(findUsername, req.body.username)
    let email = await knex(findEmail, req.body.email)
    if (username.length !== 0){
        data.isUniqeUsername = false;
        res.status(200).send(data)
    }
    if (email.length !== 0){
        data.isUniqeEmail = false;
        res.status(200).send(data)
    }
    await knex("INSERT INTO users (firstName,lastName, email, username, password) VALUES(?,?,?,?,?)", Object.values(req.body))
    res.status(200).send(data)

}
