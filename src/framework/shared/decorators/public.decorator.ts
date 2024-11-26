import { SetMetadata } from '@nestjs/common';

import { authConst } from '../lib';

export const Public = () => SetMetadata(authConst.IS_PUBLIC_KEY, true);
