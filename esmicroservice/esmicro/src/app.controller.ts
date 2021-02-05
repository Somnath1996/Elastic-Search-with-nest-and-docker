import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { SearchService } from './search/search.service';

@Controller()
export class AppController {
  //? Create a logger instance
  private logger = new Logger('AppController');
  private start: number;
  //?inject the service
  constructor(
    private readonly appService: AppService,
    private readonly searchService: SearchService,
  ) {
    this.start = Date.now();
  }

  //? HEALTH Check for the Micro-Service
  // Define the message pattern for this method
  @MessagePattern('healthcheck')
  // Define the logic to be executed
  async healthcheck() {
    const now = Date.now();
    this.logger.log('Health Check requested STATUS:UP');
    return {
      status: 'es-micro Online',
      uptime: `${Number((now - this.start) / 1000).toFixed(0)} seconds`,
      esStatus: 'UP',
    };
  }

  //!!!!!!!!!
  // Define the message pattern for this method
  @MessagePattern('add')

  // Define the logic to be executed
  async accumulate(data: number[]) {
    this.logger.log('Adding ' + data.toString()); // Log something on every call
    return this.appService.accumulate(data); // use math service to calc result & return
  }

  //!!!!!!!!!

  // Define the message pattern for this method
  @MessagePattern('search')
  // Define the logic to be executed
  async search(data: string) {
    this.logger.log('search request received');
    return this.searchService.search(data);
  }

  // Define the message pattern for this method
  @MessagePattern('create')
  // Define the logic to be executed
  async createIndex(data: any) {
    this.logger.log('create request received');
    return this.searchService.createIndex(data.id, data.body);
  }

  @MessagePattern('update')
  async update(data: any) {
    this.logger.log('update request received');
    return this.searchService.updateDocument(data.id, data.body);
  }
}
