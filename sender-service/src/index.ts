// TODO: Implement the API routes and make them use the functions of the mailer component

require('dotenv').config();

import { Mailer } from "./mailer";


const doSomething = async () => {
    const mailer: Mailer = new Mailer();

    const conectedSuccessfully: boolean = await mailer.initClient();

    console.log({conectedSuccessfully})
}

doSomething()