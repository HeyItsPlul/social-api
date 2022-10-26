const express = require('express')
const router = express.Router()
const userSchema = require('../Models/userSchema')
const nodemailer = require('nodemailer')


router.post('/create', async function(request, response) {
    // await userSchema.deleteMany({})
    // return
    const requestBody = await request.body
    const Key =  Math.ceil(Math.random() * 9999)
    let checkAccount = await userSchema.find({email: request.body.email})

    if (checkAccount[0] == undefined){
    console.log('No Account With This Email')
    const createUser = new userSchema({
        "email": requestBody.email,
        "key": Key
    })

    sendEmail(requestBody.email, Key)

    const uploadSave = await createUser.save()
    response.json('The Email Was Sent')
    console.log(`New User Created at ${Date.now()}`) 
    
    return } 

    if (checkAccount[0].email == request.body.email) {
        response.send({"Message":'Another Account Is Already Using This Email!', "status":218})
        return
    }
})

router.get('/verification', async function(req, res) {

    let findVerificationCode = await userSchema.find({email: req.body.email})
    console.log(findVerificationCode)
    res.send(findVerificationCode)

})


async function sendEmail(emailADD, key) {
    return new Promise((resolve, reject) => {
        
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user:process.env.GMAIL_ACC,
                pass:process.env.APP_PASS
            }
        })

        const mail_config = {
            from: process.env.GMAIL_ACC,
            to: emailADD,
            subject:'Verification Key',
            text: '',
            html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./style.css"><title>Login</title><style>@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@600;900&display=swap');* {padding: 0%;margin: 0% 0%;outline: none;}.container {height: fit-content;width: 50vh;background-color: rgb(46, 46, 46);margin-top: 10vh;border-radius: 2vh;display: grid;grid-template-rows: repeat(3, 1fr);}body {display: flex;align-items: center;justify-content: center;background-color: rgb(5, 5, 5);font-family: 'Kanit';color: aliceblue;font-size: 3vh ;}.container h1 {color: aliceblue;text-align: center;font-weight: bolder;}.container input {height: 9vh;width: 39vh;background-color: rgba(0, 0, 0, 0);border: none ;color: aliceblue;font-weight: bolder;font-size: large;}.container .input {width: 45vh;display: flex;align-items: center;height: 8vh;margin-top: 3vh;background-color: rgb(5, 5, 5);margin-left:auto;margin-right:auto;overflow: hidden;border-radius: 1.25vh;padding-left: 0.5vh;}.container p {margin-top: 15vh;}.container span {margin-left: auto;margin-right: 1vh;color: aliceblue;}.container button {width: 21vh;height: 7vh;color: aliceblue;font-weight: bolder;font-size: 3vh;background-color: rgb(5, 5, 5);cursor: pointer;border: none;}.container a {color: rgb(97, 97, 97);font-size: 3vh;}.buttonsDiv {display: flex ;align-items: center;margin-top: 14.5vh;justify-content:space-evenly ;}.bottomStuff {text-align: center;}</style></head><body><div class="container"><div><h1>SignUp-Code</h1><div class="bottomStuff" style="font-size:4vh;"><span style="color:white;">${emailADD}</span></div><div class="bottomStuff" style="font-size:4vh;"><span>${key}</span></div><div class="bottomStuff"><a href=" ">Not You?? <span style="margin: none;">Ignore</span></a></div></div></body></html>    `        
        }

     transporter.sendMail(mail_config)
    })
} 

module.exports = router