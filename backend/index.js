require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const Routes = require("./router")
// const mysqlConfig = require("./configs/mysql")
// const knex = require("knex")(mysqlConfig)
const knex = require("./modules/KnexModule")

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get("/", async (req,res)=>{
    res.send("Hello i am you'r backend")
})

app.use("/api", Routes)
app.listen(process.env.PORT, ()=>{console.log("Server has been started on port 5000" )})
