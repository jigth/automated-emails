export class SendgridMailer {
    emailClient: any;
    apiKey: string;

    constructor(emailClient: any) {
            this.apiKey = process.env.API_KEY || "No api key was provided!";
            this.emailClient = emailClient;
            this.emailClient.setApiKey(this.apiKey);
    }

    
    async sendMessageSendgrid(fromEmail: string, toEmail: string, subject: string, 
                      messagePlainText: string, messageHTML?: string): Promise<void> {

        const msg = {
            to: toEmail,
            from: fromEmail,
            subject,
            text: messagePlainText,
            html: messageHTML
        };

        try {
            await this.emailClient.send(msg);
            console.log("Email sent");
        } catch (error) {
            console.error(error);
            throw Error("Message could not be sent due to an internal error");
        }
    }
}
