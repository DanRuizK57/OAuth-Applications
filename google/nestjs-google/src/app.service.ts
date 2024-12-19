import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): Object {
    return { 'message': 'User deleted successfully' };
  }
}
