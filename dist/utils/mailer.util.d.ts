export declare class MailerUtil {
    private mailHost;
    private mailPort;
    sendMail(email: string, password: string, to: string, subject: string, htmlContent: any): Promise<any>;
}
