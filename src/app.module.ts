import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[devConfig],
      isGlobal:true,
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],//to access ConfigService inside useFactory
      useFactory: (configService:ConfigService) => ({
        uri:configService.get('db').url,
    })
  }),
    AuthModule, 
    BrandModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
