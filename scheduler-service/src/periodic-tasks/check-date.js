const createCronjob = require('../helpers/cron-cron-creator');
const Email = require('../models/email');
const newDateString = require('../helpers/dates');

// Env variable value OR 30 Seconds
const periodicity = process.env.CRON_PERIODICITY || '*/30 * * * * *';

const isDateExpired = (toBeCompared) => {
    const date = newDateString();
    return date > toBeCompared;
}

const checkPendingEmails = async () => {
    const pendingEmails = await Email.find({ "currStatus": "PENDING" });

    const emailsToSendNow = pendingEmails.filter(email => {
        const dateString = newDateString(email.expireDate);
        return isDateExpired( dateString );
    });

    // TODO: Delete this function and update it with the real 'sender service function'
    function sendEmail(email) {
        console.log("Email sent from: ", email.from);
        return email;
    }

    console.log('\nChecking pending emails...\n');

    console.log("AMMOUNT OF EMAILS TO SEND NOW: ", emailsToSendNow.length);
    emailsToSendNow.forEach(email => sendEmail(email) );

    console.log('\nDone!\n');
}

const job = createCronjob(periodicity, checkPendingEmails);
job.start()
