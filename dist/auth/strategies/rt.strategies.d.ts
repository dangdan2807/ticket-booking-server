import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces';
declare const RtStrategy_base: new (...args: any[]) => any;
export declare class RtStrategy extends RtStrategy_base {
    private authService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(req: Request, payload: JwtPayload): Promise<{
        refreshToken: string;
        id: string;
        email: string;
        access_token: string;
    }>;
}
export {};
