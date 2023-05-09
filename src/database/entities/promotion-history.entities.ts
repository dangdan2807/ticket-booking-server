import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { PromotionLine, Order, OrderRefund } from '.';

@Entity({ name: 'promotion_history' })
export class PromotionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 100, nullable: false })
  code: string;

  @Column({ name: 'amount', type: 'double', nullable: false, default: 0.0 })
  amount: number;

  @Column({ name: 'note', type: 'text' })
  note: string;

  @Column({ name: 'quantity', type: 'int', nullable: false, default: 1 })
  quantity: number;

  @Column({ name: 'type', type: 'varchar', length: 100, nullable: false })
  type: string;

  @Column({
    name: 'promotion_line_code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  promotionLineCode: string;

  @Column({
    name: 'order_code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  orderCode: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  public updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  public deletedAt?: Date;

  // relationship
  @ManyToOne(() => Order, (order) => order.promotionHistories)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => OrderRefund, (orderRefund) => orderRefund.promotionHistories)
  @JoinColumn({ name: 'order_refund_id', referencedColumnName: 'id' })
  orderRefund: OrderRefund;

  @ManyToOne(
    () => PromotionLine,
    (promotionLine) => promotionLine.promotionHistory,
  )
  @JoinColumn({ name: 'promotion_line_id', referencedColumnName: 'id' })
  promotionLine: PromotionLine;
}
