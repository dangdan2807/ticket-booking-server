import { CallbackService } from './callback.service';
export declare class CallbackController {
    private callbackService;
    constructor(callbackService: CallbackService);
    callbackZaloPayV2(dto: any): Promise<{}>;
}
