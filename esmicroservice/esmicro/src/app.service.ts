import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public accumulate(data: number[]): number {
    console.log(data);
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }
}
