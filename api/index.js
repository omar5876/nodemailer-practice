import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'

dotenv.config()
//--------------------------
const {MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_USERNAME, MAIL_PORT} = process.env
const app = express()

//----------------------------
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

//---------------------------
app.get('/', (req, res) => res.send(process.env.WORK))

app.post('/register', async(req, res) => {

    const {username, email, password} = req.body

    const testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    // send mail with defined transport object

    await transporter.sendMail({
        from: MAIL_FROM,
        to: email,
        subject: 'Welcome to Cakes & Bases',
        html: `
            <h2>Cakes & Bases</h2>
            <p>Welcome</p>
            <p>You have been register with: </p>
            <p>Username: ${username}</p>
            <p>Password: ${password}</p>
        `
    }, (err, result ) => {
        if(err) console.log(err)
        else console.log(result)
    })
 
})
//---------------------------------
app.listen(process.env.PORT || 3001, () => console.log('Server Running on Port 3001'))