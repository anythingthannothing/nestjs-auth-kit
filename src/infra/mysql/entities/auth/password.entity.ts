import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PasswordDomain } from '../../../../core/domain';
import { AccountEntity } from './account.entity';

@Entity('password')
export class PasswordEntity implements PasswordDomain {
  @PrimaryGeneratedColumn({ name: 'password_id', type: 'int', unsigned: true })
  passwordId: number;

  @Column({ name: 'account_id', type: 'int', unsigned: true, nullable: false })
  accountId: number;

  @OneToOne(() => AccountEntity, (account) => account.password)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
