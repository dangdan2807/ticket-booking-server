import { Staff } from './staff.entities';
import { Customer } from './customer.entities';
import { PassengerCarCompany } from './passenger-car-company.entities';
import { Station } from './station.entities';
export declare class Ward {
    constructor();
    id: number;
    name: string;
    type: string;
    nameWithType: string;
    code: number;
    parentCode: number;
    customers?: Customer[];
    staffs?: Staff[];
    passengerCarCompanies: PassengerCarCompany[];
    station: Station;
}
