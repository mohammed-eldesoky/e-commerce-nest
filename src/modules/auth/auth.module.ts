import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongoModule } from '@shared/index';


@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
