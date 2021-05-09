const SibApiV3Sdk = require('sib-api-v3-typescript');

export class Mailer {
    apiInstance: any;
    apiKey: string;

    constructor() {
        this.apiKey = process.env.API_KEY || "No api key was provided!";
        console.log(this.apiKey);
    }

    async initClient() {
        this.apiInstance = new SibApiV3Sdk.AccountApi();
    
        // Configure API key authorization: apiKey
        let apiKey = this.apiInstance.authentications['apiKey'];
        apiKey.apiKey = this.apiKey;
    
        try {
            const data: string = await this.apiInstance.getAccount();
            return true;    
        } catch (error) {
            return false;
        }
    }
    
    // TODO: Implement this function to send a mail to a specific contact (or maybe a list of them)
    sendMessage(): string {
        return "{}";
    }
}