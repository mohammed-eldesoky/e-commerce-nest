import { CustomerRepository, UserRepository } from '@models/index';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const publicRole = this.reflector.get('PUBLIC', context.getHandler());
      // if  public role do not check role pass
      if (publicRole) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization) {
        throw new UnauthorizedException('Authorization header missing');
      }

      // verify token
      const payload = this.jwtService.verify<{
        _id: string;
        email: string;
        role: string;
      }>(authorization, {
        secret: this.configService.get('token').jwt_secret,
      });
      // check if payload exist
      const userExist = await this.userRepository.getOne({
        _id: new Types.ObjectId(payload._id),
      });
      // fail case customer does not exist
      if (!userExist) {
        throw new NotFoundException('user does not exist');
      }
      request.user = userExist;
      return true; // simulate next()
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
