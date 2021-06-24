const createCronjob = require('../helpers/cron-creator');
const Email = require('../models/email');
const newDateString = require('../helpers/dates');
const axios = require('axios');

// Env variable value OR 30 Seconds
const periodicity = process.env.CRON_PERIODICITY || '*/30 * * * * *';

const isDateExpired = (toBeCompared) => {
    const date = newDateString();
    return date > toBeCompared;
}

const sendEmail = async (email) => {
    try {
        const emailAPI = `${process.env.SENDER_SERVICE_API}/send`;
        await axios.post(emailAPI, email);
        console.log("Email sent from: ", email.from);
        return true;
    } catch(error) {
        console.error(error);
        return false;
    }
}

// Maps an array of emails in a format understood by 'sender service'.
const mapEmails  = (emails) => {
    return emails.map(email => {
        const { from, to, subject, _id } = email;
        const mappedEmail = {
            _id,
            from,
            to,
            subject,
            'text': email.message,
            'html': email.htmlMessage
        }

        return mappedEmail;
    });
}

const getEmailsToSendNow = async () => {
    const pendingEmails = await Email.find({ "currStatus": "PENDING" });

    const emailsToSendNow = pendingEmails.filter(email => {
        const dateString = newDateString(email.expireDate);
        return isDateExpired( dateString );
    });

    return mapEmails(emailsToSendNow);
}

const updateEmailStatus = async (emailId, emailStatus) => {
    try {
        await Email.findOneAndUpdate(
            { '_id': emailId }, 
            { $set: { 'currStatus': emailStatus } });
    } catch(error) {
        console.error(error);
    }
}

// Act as a 'transaction', either do both actions or none of them.
const sendEmailAndUpdateStatus = async (email, emailId, emailStatus) => {
    const wasSent = await sendEmail(email);
    if (wasSent) {
        await updateEmailStatus(emailId, 'SENT');
    } else {
        console.error(`Email was not sent. ` +
            `Please check that 'Email Sender Service' is working OK`);
    }
}

const sendPendingEmails = async () => {
    try {
        const emailsToSendNow = await getEmailsToSendNow();
        console.log('\nChecking pending emails...\n');
        console.log("AMMOUNT OF EMAILS TO SEND NOW: ", emailsToSendNow.length);
        emailsToSendNow.forEach(async (email) => {
            await sendEmailAndUpdateStatus(email, email._id, 'SENT');
        });
        console.log('\nDone!\n');
    } catch (error) {
        console.error(error);
    }
}

const job = createCronjob(periodicity, sendPendingEmails);
job.start()
