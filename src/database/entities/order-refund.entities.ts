import { OrderRefundDetail, Order } from '.';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_refund' })
export class OrderRefund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'note', type: 'text' })
  note: string;

  @Column({ name: 'status', type: 'varchar', length: 100, nullable: true })
  status: string;

  @Column({ name: 'total', type: 'double', nullable: true, default: 0.0 })
  total: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  public createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  public updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  public deletedAt?: Date;

  // relationships
  @OneToOne(() => Order, (order) => order.orderRefund)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(
    () => OrderRefundDetail,
    (orderRefundDetail) => orderRefundDetail.orderRefund,
  )
  @JoinColumn({ name: 'order_refund_detail_id', referencedColumnName: 'id' })
  orderRefundDetails: OrderRefundDetail;
}
