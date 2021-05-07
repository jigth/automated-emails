import { ok, ko } from "../src/index";

describe("test suite 1", () => {
    
    it("Checks that 'ok' function returns 'OK'", () => {
        expect( ok() ).toBe('OK')
    })
    
    it("Checks that 'ko' function returns 'K.O >>>'", () => {
        expect( ko() ).toBe('K.O >>>')
    })
    
})
