import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clase, ClaseSchema } from './entities/clase.entity';

@Module({
  controllers: [ClaseController],
  providers: [ClaseService],
  imports: [MongooseModule.forFeature([{ name: Clase.name, schema: ClaseSchema }])]
})
export class ClaseModule {}
