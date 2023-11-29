import { Module } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promocion, PromocionSchema } from './entities/promocion.entity';

@Module({
  controllers: [PromocionController],
  providers: [PromocionService],
  imports: [
    MongooseModule.forFeature([{ name: Promocion.name, schema: PromocionSchema }])
  ]
})
export class PromocionModule {}
