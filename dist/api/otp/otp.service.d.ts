import { ConfigService } from '@nestjs/config';
export declare class OtpService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendMail(to: string, otp: string, otpExpireMinute: any): Promise<void>;
}
