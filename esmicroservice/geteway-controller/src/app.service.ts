import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  public accumulate(data: number[]) {
    return this.client.send<number, number[]>('add', data);
  }
  public search(data: string) {   
    return this.client.send('search', data);
  }
  public createIndex(data: string) {   
    return this.client.send('create', data);
  }
  public update(data: string) {   
    return this.client.send('update', data);
  }
  public getEsmHealthCheck() {
    return this.client.send('healthcheck', '');
  }
}
