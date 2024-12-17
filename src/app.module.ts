import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
