import { RoleEnum } from './../enums';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { JwtPayload } from './interfaces';
import { Customer, Staff } from '../database/entities';
export declare class AuthService {
    private readonly configService;
    private dataSource;
    private jwtService;
    private twilioClient;
    constructor(configService: ConfigService, dataSource: DataSource);
    validateUser(email: string, password: string): Promise<Customer | Staff>;
    comparePassword(data: string, encrypted: string): Promise<unknown>;
    validateUserByJwt(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        access_token: string;
    }>;
    hashData(data: string): Promise<any>;
    createTokens(user: Customer | Staff, type: RoleEnum): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    sendPhoneCodeOtp(phoneNumber: string, code: string): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
    sendEmailCodeOtp(email: string, otp: string, otpExpireMinute: any): Promise<void>;
}
