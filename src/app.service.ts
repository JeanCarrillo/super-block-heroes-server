import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AppService {
  dbCredentials: { login: string; password: string };
  constructor() {}
  getHello() {
    return 'Hello';
  }
  // constructor(config: ConfigService) {
  //   // Please take note that this check is case sensitive!
  //   this.dbCredentials = {
  //     login: config.get('db-login'),
  //     password: config.get('db-password'),
  //   };
  // }
}
