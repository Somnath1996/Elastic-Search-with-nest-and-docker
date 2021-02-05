import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { SearchModule } from './search/search.module';
@Module({
  imports: [ConfigModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
