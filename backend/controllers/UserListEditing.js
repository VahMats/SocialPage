const knex = require("../modules/KnexModule")
const UserValidationService = require('../services/UserValidatorService')

exports.userAdd = async (req,res)=>{
    try{
        const sqlFindUsername = 'SELECT * FROM `users` WHERE `username` = ?';
        const sqlFindEmail = 'SELECT * FROM `users` WHERE `email` = ?';
        const data = {
            isValid: false,
            isUniqeUsername: false,
            isUniqeEmail: false,
            information: {}
        }
        const {firstName, lastName, email, username, dateOfBirth, gender, password} = req.body

        const validate = UserValidationService(req.body, 'register')
        if (!validate.isValid) {
            data.isValid = false;
                res.status(200).send(data);
        }
        else data.isValid = true;

        let findUsername = await knex(sqlFindUsername, req.body.username)
        let findEmail = await knex(sqlFindEmail, req.body.email)
        if (findUsername.length !== 0) {
            data.isUniqeUsername = false;
            res.status(200).send(data)
        }
        else data.isUniqeUsername = true;
        if (findEmail.length !== 0) {
            data.isUniqeEmail = false;
            res.status(200).send(data)
        }
        else data.isUniqeEmail = true;
        if (data.isValid && data.isUniqeUsername && data.isUniqeEmail){
            await knex("INSERT INTO users (firstName,lastName, email, username, password, dateOfBirth, gender) VALUES(?,?,?,?,?,?,?)", [firstName, lastName, email, username, password, dateOfBirth, gender])
            data.information = await knex("SELECT * FROM users");
        }



        res.status(200).send(data).end();
    }catch (e) {
        console.log(e)
    }
}

exports.userEdit = async (req,res)=>{
    try
    {
        const {Id, firstName, lastName, email, username, dateOfBirth, gender, team} = req.body
        console.log(req.body)
        data = {
            isExist: false,
            information: {}
        }

        const editingUser = await knex("SELECT * FROM users WHERE id = ?", Id)
        if (editingUser.length === 0) {
            res.status(200).send(data).end();
        }
        else data.isExist = true;

        await knex('UPDATE `users` SET `firstName` = ?, `lastName` = ?, `email` = ?, `username` = ?, `dateOfBirth` = ?, `gender` = ?, `team` = ? WHERE id = ?', [firstName, lastName, email, username, dateOfBirth, gender, team, Id])
        data.information = await knex("SELECT * FROM users")
        res.status(200).send(data).end();
    }catch (e) {
        console.log(e)
    }

}

exports.userDelete = async (req,res)=>{
    try
    {
        data = {
            isExist: false,
            information: {}
        }

        const deletingUser = await knex(`SELECT * FROM users WHERE id = ?`, [req.body.Id])
        if (deletingUser.length === 0) {
            res.status(200).send(data).end();
        }
        else data.isExist = true;

        await knex('UPDATE `users` SET `deleted`= ? WHERE Id = ?', [1, req.body.Id])
        data.information = await knex("SELECT * FROM users")
        res.status(200).send(data).end()

    }catch (e) {
        console.log(e)
    }

}
