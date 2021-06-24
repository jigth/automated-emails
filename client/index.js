function objectFromTwoArrays(keys, values) {
    let theObject = {};
    keys.forEach((key, i) => theObject[key] = values[i]);
    return theObject;
}

function createReqObject() {
    let inputValues = Array.from( document.querySelectorAll('input') )
        .map(input => input.value);
    inputValues = inputValues.slice(0, 3);  // Omit 'input' form control.

    // Construct the object for the request
    const keys = ['from', 'to', 'subject'];
    const requestObject = objectFromTwoArrays(keys, inputValues);

    const message = document.querySelector('#message').value;
    requestObject['text'] = message;
    const htmlMessage = document.querySelector('#html-message').value;
    requestObject['html'] = htmlMessage;
    return requestObject;
};

async function sendEmail(backendURL) {
    const requestObject = createReqObject();
    console.log({requestObject});

    axios.post(`${backendURL}`, requestObject)
        .then(function (response) {
            console.log(response);
            alert(`EMAIL SENT\n${response}`);
        })
        .catch(function (error) {
            console.log(error);
            alert(`OOPS THERE WAS AN ERROR ${error}`);
        });
}

