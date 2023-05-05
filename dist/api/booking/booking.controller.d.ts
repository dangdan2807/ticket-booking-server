import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    booking(dto: CreateBookingDto, user: any): Promise<import("../../database/entities").Order>;
    getZaloPayPaymentUrl(orderCode: string, user: any): Promise<any>;
}
