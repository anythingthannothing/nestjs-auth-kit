import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserDomain } from '../../../../core/domain';

@Entity('user')
export class UserEntity implements UserDomain {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true, unique: true })
  nickname: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  thumbnailUrl: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
