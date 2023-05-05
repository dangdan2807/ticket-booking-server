import { ConfigService } from '@nestjs/config';
import { RoleEnum } from './../../enums';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces';
declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    private authService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(req: any, payload: JwtPayload): Promise<{
        id: string;
        email: string;
        type: RoleEnum;
    }>;
}
export {};
