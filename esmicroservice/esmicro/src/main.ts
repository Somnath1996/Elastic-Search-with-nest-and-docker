import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from './config/config.service';

//? Create a logger instance
const logger = new Logger('esmicro');

//? Create the microservice options object
//todo migrate to config later
const configService = new ConfigService('.env'); //?extract env vars

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: configService.get('HOST'),
    port: configService.get('PORT'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  await app.listen(() => {
    logger.log('Elastic-Search is Up and listining on 8877');
  });
}
bootstrap();
