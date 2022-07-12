const express = require("express")
const feedback = require("./feedback")
const sslRedirect = require("heroku-ssl-redirect")
const app = express()
const bodyParser = require("body-parser")
const { measureMemory } = require("vm")

app.use(sslRedirect)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    const mail = req.body.email
    const pass = req.body.pass
    const message = feedback.start(mail,pass)
    console.log(message)
    res.sendFile(__dirname+"/reply.html")
    // res.send("check ERP after few minute, if the feedback is not updated then : there might be an error in username and password pls check them")
})

app.listen(process.env.PORT || 3000)