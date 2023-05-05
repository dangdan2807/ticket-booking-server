import { UserService } from './user.service';
import { ConfirmAccountDto, UpdateCustomerDto, UserResetPasswordDto, UserUpdatePasswordDto } from './dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getCustomerStatus(): Promise<any[]>;
    profile(user: any): Promise<import("../../database/entities").Customer>;
    confirmAccount(dto: ConfirmAccountDto): Promise<{
        customer: {
            id: string;
        };
        message: string;
    }>;
    resetPassword(dto: UserResetPasswordDto): Promise<import("../../database/entities").Customer>;
    updateUser(user: any, dto: UpdateCustomerDto): Promise<import("../../database/entities").Customer>;
    updatePassword(user: any, dto: UserUpdatePasswordDto): Promise<import("../../database/entities").Customer>;
}
