import { Province } from './../../database/entities/vi-address-provide.entities';
import { Pagination } from 'src/decorator';
import { Repository } from 'typeorm';
export declare class ProvinceService {
    private readonly provinceRepository;
    constructor(provinceRepository: Repository<Province>);
    findAll(pagination?: Pagination): Promise<Province[]>;
    findOneById(provinceId: string, option?: any): Promise<Province>;
    findOneByCode(provinceCode: number, option?: any): Promise<Province>;
    findOneByName(provinceName: string, option?: any): Promise<Province>;
    create(province: Province): Promise<Province>;
}
