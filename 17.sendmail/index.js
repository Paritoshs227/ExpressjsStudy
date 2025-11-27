const express = require('express');
const nodemailer = require('nodemailer');
const fs =require("fs");
const path = require('path');
const app = express();
const port = 3000;


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, //STARTTLS FOR SSL CERTIFIATE USER
    auth: {
        user: 'paritoshs227@gmail.com',
        pass: 'ybijnfeuwtmfdmjy'

    }

});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
});

app.post('/sendemail', async (req, res) => {
    const { email, subject, txtmsg } = req.body;
    
    try {
        // const template=fs.readFile('./views/index.ejs')
        // const html =ejs.render(template,{name:'jhon'})
        const info = transporter.sendMail({
            from: '"Paritosh" <paritoshs227@gmail.com>',
            to: email,
            subject: subject,
             text: txtmsg,
            //html:`<b>hello</b>`,
            // html:html,
            attachments:[
                {
                    filename:"data.pdf",
                    path: path.join(__dirname,"files","data.pdf")
                }
            ]
        })
        res.json({ messsage: `email sent successfully`, info })
      

    } catch (error) {
        res.status(500).json({ message: `failed to send mail` }, error)
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

