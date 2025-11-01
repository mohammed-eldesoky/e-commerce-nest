import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongoModule } from '@shared/index';
import { AuthFactory } from './factory/auth.factory';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '@models/token/token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '@models/token/token.schema';
import { GoogleAuth } from 'google-auth-library';


@Module({
  imports: [UserMongoModule,
    MongooseModule.forFeature([{name:Token.name,schema:TokenSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthFactory,JwtService,TokenRepository,GoogleAuth],
})
export class AuthModule {}
