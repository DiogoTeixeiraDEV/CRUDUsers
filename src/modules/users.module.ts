import { Module } from '@nestjs/common';
import { AppController } from '../controllers/users.controller';
import { AppService } from '../services/users.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
