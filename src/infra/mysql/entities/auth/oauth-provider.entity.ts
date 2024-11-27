import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { OauthProviderDomain, OauthProviderEnum } from '../../../../core';
import { AccountEntity } from './account.entity';

@Entity('oauth_provider')
export class OauthProviderEntity implements OauthProviderDomain {
  @PrimaryColumn({
    name: 'oauth_provider_type',
    type: 'enum',
    enum: OauthProviderEnum,
  })
  oauthProviderType: OauthProviderEnum;

  @PrimaryColumn({ name: 'oauth_provider_id', type: 'bigint', unsigned: true })
  oauthProviderId: string;

  @Column({ name: 'account_id', type: 'int', unsigned: true, nullable: false })
  accountId: number;

  @ManyToOne(() => AccountEntity, (account) => account.oauthProviders)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
}
