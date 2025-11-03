import { CustomerRepository } from '@models/index';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly customerRepo: CustomerRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    //verify token
    const payload = this.jwtService.verify<{
      _id: string;
      email: string;
      role: string;
    }>(authorization, {
      secret: this.configService.get('token').jwt_secret,
    });
    // check if payload exist
    const customerExist = await this.customerRepo.getOne({ _id: payload._id });
    // fail case customer does not exist
    if (!customerExist) {
      throw new NotFoundException('user does not exist');
    }
    request.user = customerExist;
    return true;// simulate next()
  }
}
