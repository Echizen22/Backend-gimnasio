import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PromocionModule } from './promocion/promocion.module';
import { PlanModule } from './plan/plan.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsuarioModule,
    AuthModule,
    PromocionModule,
    PlanModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
