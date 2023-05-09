import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entities';
import { Customer } from './customer.entities';
import { Staff } from './staff.entities';
import { OrderRefund } from './order-refund.entities';

@Entity({ name: 'payment_history' })
export class PaymentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 100, nullable: false })
  code: string;

  @Column({ name: 'note', type: 'text' })
  note: string;

  @Column({ name: 'amount', type: 'double', nullable: true, default: 0.0 })
  amount: number;

  @Column({ name: 'status', type: 'varchar', length: 100, nullable: true })
  status: string;

  @Column({
    name: 'order_code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  orderCode: string;

  @Column({
    name: 'customer_code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  customerCode: string;

  @Column({
    name: 'staff_code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  staffCode: string;

  @Column({
    name: 'payment_method',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  paymentMethod: string;

  @Column({
    name: 'trans_Id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  transId: string;

  @Column({ name: 'create_app_time', type: 'timestamp', nullable: false })
  createAppTime: Date;

  @Column({
    name: 'zalo_trans_Id',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  zaloTransId: string;

  @Column({ name: 'zalo_trans_time', type: 'timestamp', nullable: false })
  paymentTime: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  public updatedAt?: Date;

  // relations
  @OneToOne(() => Order, (order) => order.paymentHistory)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Customer, (customer) => customer.paymentHistories)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @ManyToOne(() => Staff, (staff) => staff.paymentHistories)
  @JoinColumn({ name: 'staff_id', referencedColumnName: 'id' })
  staff: Staff;

  @OneToOne(() => OrderRefund, (orderRefund) => orderRefund.paymentHistory)
  @JoinColumn({ name: 'order_refund_id', referencedColumnName: 'id' })
  orderRefund: OrderRefund;
}
