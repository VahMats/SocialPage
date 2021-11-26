require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const Routes = require("./router")
const knex = require("./modules/KnexModule")
const jwt = require("jsonwebtoken")
const {secret} = require ("./configs/tokenConfig")
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get("/", async (req,res)=>{
    res.send("Hello i am you'r backend")
})

app.post("/token", async (req,res)=>{
    const token = req.headers['x-access-token'];
    const decodetData = jwt.verify(token,secret);
    const user = await knex("SELECT * FROM users WHERE Id = ?", [decodetData.Id])
    if (user[0].isAdmin){
        const allUsers = await knex('SELECT * FROM users');
        const notDeletedUseres = allUsers.filter(el => !el.deleted)
        res.status(200).send({isAdmin:true, data:notDeletedUseres});
    }else {res.status(200).send({isAdmin:false, data:user[0]});}
})

app.use("/api", Routes)
app.listen(process.env.PORT, ()=>{console.log("Server has been started on port 5000" )})
