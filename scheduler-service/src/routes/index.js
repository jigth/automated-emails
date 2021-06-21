const express = require('express');
const router = express.Router();
const Email = require('../models/email');


router.get('/scheduled-emails', async (req, res) => {
    const emails = await Email.find();
    res.send(emails);
});

router.route('/schedule-email')
    .get( (req, res) => {
        res.json({
            'message': 'You can schedule your emails using this endpoint'
        });
    })
    .post(async (req, res) => {
        console.log(req.body);
        const { from, to, subject, message, htmlMessage } = req.body;

        // Schedule email
        try {
            const newEmail = await Email.create({
                from,
                to,
                subject,
                message,
                htmlMessage,
                currStatus: 'PENDING'  // Default: 'PENDING'. 'SENT' when it's sent.
            });
            res.json({ newEmail });
        } catch(error) {
            console.error('There was an error while scheduling email', error);
        }
            
    });


module.exports = router;
