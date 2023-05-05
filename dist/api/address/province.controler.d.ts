import { Province } from './../../database/entities/vi-address-provide.entities';
import { Pagination } from 'src/decorator';
import { ProvinceService } from './province.service';
export declare class ProvinceController {
    private provinceService;
    constructor(provinceService: ProvinceService);
    findAll(pagination?: Pagination): Promise<Province[]>;
    findOne(id: string): Promise<Province>;
    crawData(): Promise<any>;
    create(province: Province): Promise<Province>;
}
