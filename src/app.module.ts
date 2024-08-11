import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceModule } from './resource/service/service.module';
import { OrderModule } from './resource/order/order.module';
import { AuthModule } from './resource/auth/auth.module';
import { UserModule } from './resource/user/user.module';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    MongooseModule.forRoot(appConfig().dbUrl, {
      // useNewUrlParser: true,
      // // useUnifiedTopology: true,

      dbName: appConfig().dbName,
    }),

    AuthModule,
    UserModule,
    ServiceModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
