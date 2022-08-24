import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import {URL} from 'url'
import ejs from 'ejs'

dotenv.config()
//--------------------------
const {MAIL_FROM, GMAIL_PASSWORD} = process.env
const app = express()


//----------------------------
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs');


//---------------------------
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: MAIL_FROM,
        pass: GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

transporter.verify().then(() => console.log('Ready to send mails'))

//-------------------------------------------------------------
app.get('/', (req, res) => res.send("works"))

app.post('/register', async(req, res) => {

    const {username, email, password} = req.body

    ejs.renderFile('./views/register.ejs', {username, email, password}, (err, data) => {
        if(err) console.log(err)
        else{

            transporter.sendMail({
                from: MAIL_FROM,
                to: email,
                subject: 'Welcome to Cakes & Bases',
           /*      html: `
                    <h2>Cakes & Bases</h2>
                    <p>Welcome</p>
                    <p>You have been register with: </p>
                    <p>Username: ${username}</p>
                    <p>Password: ${password}</p>
                ` */
                html: data
            }, (err, result ) => {
                if(err) console.log(err)
                else console.log(result)
            })
        }
    })
    // send mail with defined transport object

 
})
//---------------------------------
app.listen(process.env.PORT || 3001, () => console.log('Server Running on Port 3001'))