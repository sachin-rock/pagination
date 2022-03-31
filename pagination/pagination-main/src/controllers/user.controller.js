const express = require("express")
const transporter = require("../configs/mailer.js")
const app = express();
const users = require("../models/user.model")

app.get("/",async(req,res)=>{
    try{
       const page = req.query.page || 1
       const pagesize = req.query.pagesize || 5
       const skip = (page-1) * pagesize

       const data = await users.find({}).skip(skip).limit(pagesize).lean().exec()
       return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
app.post("/",async function(req,res){
    try{
    const data = await users.create(req.body)
    transporter.sendMail({
        from: '"Fred Foo 👻" <sender@athismail.com>', // sender address
        to: data.email, // list of receivers
        subject: `Welcome to ABC system ${data.name}`, // Subject line
        text: `Hi ${data.name}, Please confirm your email address`, // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      transporter.sendMail({
        from: '"Fred Foo 👻" <sender@athismail.com>', // sender address
        to: "admin1@email,admin2@email,admin3@email,admin4@email,admin5@email", // list of receivers
        subject: `${data.name} has registered with us`, // Subject line
        text: `Please welcome ${data.name}`, // plain text body
        html: "<b>Hello world?</b>", // html body
      });

       return res.status(201).send(data)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
module.exports = app;