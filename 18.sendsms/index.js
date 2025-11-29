const express = require('express');
const dotenv = require('dotenv');
const twilio = require("twilio");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Make sure your .env variables match these names
const accountSid = process.env.TWILO_ACCOUNT_SID;
const authToken = process.env.TWILO_AUTH_TOKEN;
const twilioPhone = process.env.TWILO_PHONE_NUMBER; 

const client = new twilio(accountSid, authToken);

app.get('/', (req, res) => {

    res.render('index');
});

app.post('/sendsms', async (req, res) => {
    const { mobileNumber, message } = req.body;

    if (!mobileNumber || !message) {
        return res.status(400).json({ message: "mobileNumber and message are required." });
    }

    try {
        const result = await client.messages.create({
            body: message,
            to: `+91${mobileNumber}`,
            from: twilioPhone,
        });

        return res.status(200).json({
            sid: result.sid,
            message: 'SMS sent successfully'
        });

    } catch (error) {
        console.error("Twilio Error:", error);
        return res.status(500).json({
            message: 'Failed to send SMS',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
