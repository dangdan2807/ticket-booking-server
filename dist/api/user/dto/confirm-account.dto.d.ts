import { ActiveOtpTypeEnum } from './../../../enums';
export declare class ConfirmAccountDto {
    phone: string;
    email: string;
    otp: string;
    type: ActiveOtpTypeEnum;
}
