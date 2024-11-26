import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { RefreshTokenDomain } from '../../../../core/domain';
import { UserEntity } from '../user';

@Entity('refresh_token')
@Unique(['userId', 'token'])
export class RefreshTokenEntity implements RefreshTokenDomain {
  @PrimaryGeneratedColumn({
    name: 'refresh_token_id',
    type: 'bigint',
    unsigned: true,
  })
  refreshTokenId: string;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ name: 'token', type: 'char', length: 12 })
  token: string;

  @Column({ name: 'expires_at', type: 'int', unsigned: true, nullable: false })
  expiresAt: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
