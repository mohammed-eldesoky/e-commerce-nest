import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongoModule } from '@shared/index';
import { AuthFactory } from './factory/auth.factory';


@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService,AuthFactory],
})
export class AuthModule {}
