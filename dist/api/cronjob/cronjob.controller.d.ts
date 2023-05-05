import { CronjobService } from './cronjob.service';
import { CronjobOrderPaymentDto } from './dto';
export declare class CronjobController {
    private cronjobService;
    constructor(cronjobService: CronjobService);
    createOrder(dto: CronjobOrderPaymentDto): Promise<void>;
}
