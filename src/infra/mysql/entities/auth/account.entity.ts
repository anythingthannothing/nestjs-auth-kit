import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccountDomain } from '../../../../core';
import { UserEntity } from '../user';
import { OauthProviderEntity } from './oauth-provider.entity';
import { PasswordEntity } from './password.entity';

@Entity({ name: 'account' })
export class AccountEntity implements AccountDomain {
  @PrimaryGeneratedColumn({ name: 'account_id', type: 'int', unsigned: true })
  accountId: number;

  @OneToOne(() => UserEntity, { cascade: ['insert'] })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 254, nullable: false, unique: true })
  email: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;

  @OneToOne(() => PasswordEntity, (password) => password.account, {
    cascade: ['insert'],
  })
  password: PasswordEntity;

  @OneToMany(
    () => OauthProviderEntity,
    (oauthProvider) => oauthProvider.account,
    { cascade: ['insert'] },
  )
  oauthProviders: OauthProviderEntity[];
}
