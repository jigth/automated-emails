// TODO: Implement the API routes and make them use the functions of the mailer component
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4550;

import { SendgridMailer } from "./mailer";

// Middleware
app.use(express.json());


// Functions
const sendMessage = async (from: string, to: string, subject: string,  
                           text: string, html: string ) => {

    const sgMail = require('@sendgrid/mail')
    const mailer: SendgridMailer = new SendgridMailer(sgMail);

    await mailer.sendMessageSendgrid(from, to, subject, text, html);
}


// Server Init
app.listen(PORT, () => {
    console.log(`Working correctly!\n\nRunning on port ${PORT}`);
});


// Routes
app.post('/send', async (req: any, res: any) => {
    const { from, to, subject, text, html } = req.body;
    try {
        await sendMessage(from, to, subject, text, html);
        res.json({ "message": "Message sent succesfully" });
    } catch(error) {
        console.error(error);
        res.json
    }
});

app.get('/', (req: any, res: any) => {
    res.json({ "message": "Welcome to Sender Service!" });
});

