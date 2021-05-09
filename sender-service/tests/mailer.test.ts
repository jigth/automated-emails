import { Mailer } from "../src/mailer";
import { isJsonString } from './helpers/json-strings-validator';

let mailer: any;

beforeAll( () => {
    mailer = new Mailer();
});

describe("Mailer Tests", () => {
    describe("Client Setup", () => {
        it("Returns a boolean that indicates if the API_KEY is valid", async () => {
            const initializedSuccessfully: boolean = await mailer.initClient();
            expect(initializedSuccessfully).toBeDefined();
        });
    });

    describe("Functions for sending mails", () => {
        describe("sendMessage", () => {
            it("Returns a string", () => {
                expect(typeof mailer.sendMessage()).toBe('string');
            });
        
            it("Returns a JSON formatted string", () => {
                expect( isJsonString(mailer.sendMessage()) ).toBe(true);
            });
        });
    });
});