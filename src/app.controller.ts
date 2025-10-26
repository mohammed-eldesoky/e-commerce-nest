import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('/') // decorator 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): { message: string; success: boolean; data: string } {
    const result = this.appService.getHello();
    return { message: "done", success: true, data: result };

    
  }
}
