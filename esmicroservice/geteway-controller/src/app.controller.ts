import { Controller, Get, Logger, Post, Body, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('Gateway-Controller');

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Map the 'POST /add' route to this method
  @Post('add')
  // Define the logic to be executed
  async accumulate(@Body('data') body) {
    this.logger.log('Adding ' + body.toString()); // Log something on every call
    return this.appService.accumulate(body); // use math service to calc result & return
  }
  //? Health check for elastic search microservice
  @Get('esm-health-check')
  async getEsmHealthCheck() {
    this.logger.log('connecting with es-micro for Health Check');
    return this.appService.getEsmHealthCheck();
  }

  // Map the 'POST /search' route to this method
  @Post('search')
  // Define the logic to be executed
  async search(@Body('query') body) {
    this.logger.log('incoming [search] req');
    return this.appService.search(body);
  }

  @Post('create-index')
  async createIndex(@Body('data') data) {
    this.logger.log('incoming [index] request');
    return this.appService.createIndex(data);
  }

  @Put('update')
  async update(@Body('data') data) {
    this.logger.log('incoming [update] request');
    return this.appService.update(data);
  }
}
