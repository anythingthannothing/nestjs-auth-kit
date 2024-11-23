import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IHashProvider } from '../../../core';

@Injectable()
export class HashProvider implements IHashProvider, OnModuleInit {
  private bcrypt: typeof bcrypt;

  onModuleInit() {
    this.bcrypt = bcrypt;
  }

  public async hash(value: string): Promise<string> {
    return this.bcrypt.hash(value, 10);
  }

  public async compare(value: string, hashedValue: string): Promise<boolean> {
    return await this.bcrypt.compare(value, hashedValue);
  }
}
