import { Order } from './order.entities';
import { Customer } from './customer.entities';
import { Staff } from './staff.entities';
import { OrderRefund } from './order-refund.entities';
export declare class PaymentHistory {
    id: string;
    code: string;
    note: string;
    amount: number;
    status: string;
    orderCode: string;
    customerCode: string;
    staffCode: string;
    paymentMethod: string;
    transId: string;
    createAppTime: Date;
    zaloTransId: string;
    paymentTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
    order: Order;
    customer: Customer;
    staff: Staff;
    orderRefund: OrderRefund;
}
