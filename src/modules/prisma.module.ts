import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
