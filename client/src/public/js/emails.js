function objectFromTwoArrays(keys, values) {
    let theObject = {};
    keys.forEach((key, i) => theObject[key] = values[i]);
    return theObject;
}

function createEmail() {
    let inputValues = Array.from( document.querySelectorAll('input') )
        .map(input => input.value);
    inputValues = inputValues.slice(0, 3);  // Omit 'input' form control.

    // Construct the email for the request
    const keys = ['from', 'to', 'subject'];
    const email = objectFromTwoArrays(keys, inputValues);

    const message = document.querySelector('#message').value;
    email['message'] = message;
    const htmlMessage = document.querySelector('#html-message').value;
    email['htmlMessage'] = htmlMessage;
    
    return email;
};

function getSelectedRadioOption() {
    const radioOptions = document.getElementsByName('sendOptions');
    let selectedOption = 'NOT A VALID VALUE';
    radioOptions.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });
    return selectedOption;
}

// Not a pure function (it modifies 'email' parameter)
function addExpireDate(email, expireDate) {
    email['expireDate'] = expireDate;
}

async function processEmail(senderServiceURL, schedulerServiceURL) {
    const radioOption = getSelectedRadioOption();
    const email = createEmail();

    if (radioOption === 'One') {
        alert('One email detected, sending it!!');
        await sendEmail(senderServiceURL, email);
    } else if (radioOption === 'ThreeMin') {
        alert('Scheduling 3 emails, 1 each minute');
        await schedule3minEmails(schedulerServiceURL, email);
    } else if (radioOption === 'ThreeHours') {
        alert('Scheduling 3 emails, 1 each hour');
        await schedule3hoursEmails(schedulerServiceURL, email);
    } else {
        alert('No options selected, please select a valid option');
    }
}

async function sendEmail(senderServiceURL, email) {
    axios.post(senderServiceURL, email)
        .then(function (res) {
            console.log(res);
            alert('EMAIL SENT');
        })
        .catch(function (error) {
            console.log(error);
            alert(`Oops there was an error while sending the email ${error}`);
        });
}

async function scheduleEmail(schedulerServiceURL, email, scheduleDate) {
    // Email is modified here
    addExpireDate(email, scheduleDate);

    axios.post(schedulerServiceURL, email)
        .then(function (res) {
            console.log(`Email scheduled sucesfully\n${res}`);
            alert('Email scheduled sucesfully');
        })
        .catch(function (error) {
            console.log(error);
            alert('Oops there was an error while scheduling the email (please see the console)');
        });
}

/** 
 * Get the dates where the emails will be scheduled.
 *
 * Params:
 * minutesDistance: Indicates the time elapsed between one email and the next
 *                  in minutes.
 *
 * numberOfDates: number of dates to generate (each one separated by 'minutesDistance')
 *
 */
function getScheduledDates(minutesDistance, numberOfDates) {
    const currentDateUTC = getCurrentDateUTC();
    
    const scheduledDates = [];
    let dateModified = currentDateUTC;
    for (let i = 0; i < numberOfDates; i++) {
        scheduledDates.push(dateModified);
        dateModified = addMinutesToDate(dateModified, minutesDistance);
    }

    return scheduledDates;
}

async function schedule3minEmails(schedulerServiceURL, email) {
    const scheduledDates = getScheduledDates(1, 3);

    scheduledDates.forEach(async scheduledDate => {
        try {
            await scheduleEmail(schedulerServiceURL, email, scheduledDate);
        } catch (error) {
            console.error(error);
            alert('Error scheduling the email (please see the console)');
        }
    });
}

async function schedule3hoursEmails(schedulerServiceURL, email) {
    const scheduledDates = getScheduledDates(60, 3);

    scheduledDates.forEach(async scheduledDate => {
        try {
            await scheduleEmail(schedulerServiceURL, email, scheduledDate);
        } catch (error) {
            console.error(error);
            alert('Error scheduling the email (please see the console)');
        }
    });
}
