import { Pagination } from './../../decorator';
import { FilterUserDto } from './dto';
import { UsersService } from './user.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    findAll(dto: FilterUserDto, pagination?: Pagination): Promise<{
        dataResult: import("./../../database/entities").Customer[];
        pagination: Pagination;
        total: number;
    }>;
    findCustomerOneById(id: string): Promise<import("./../../database/entities").Customer>;
}
