import { initClient, sendMessage } from "../src/mailer";
import { isJsonString } from './helpers/json-strings-validator';

describe("Mailer Tests", () => {
    test("The function 'initClient' returns true", () => {
        expect(initClient()).toBe(true)
    });

    test("The function 'sendMessage' returns a string", () => {
        expect(typeof sendMessage()).toBe('string');
    });

    test("The function 'sendMessage' returns a JSON formatted string", () => {
        expect( isJsonString(sendMessage()) ).toBe(true);
    });
});