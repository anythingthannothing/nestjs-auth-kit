import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import {
  OauthProviderDomain,
  oauthProviderEnum,
} from '../../../../core/domain';
import { AccountEntity } from './account.entity';

@Entity('oauth_provider')
export class OauthProviderEntity implements OauthProviderDomain {
  @PrimaryColumn({
    name: 'oauth_provider_type',
    type: 'enum',
    enum: oauthProviderEnum,
  })
  oauthProviderType: oauthProviderEnum;

  @PrimaryColumn({ name: 'oauth_provider_id', type: 'bigint', unsigned: true })
  oauthProviderId: bigint;

  @Column({ name: 'account_id', type: 'int', unsigned: true, nullable: false })
  accountId: number;

  @ManyToOne(() => AccountEntity, (account) => account.oauthProviders)
  account: AccountEntity;
}
