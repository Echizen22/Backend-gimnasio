import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './entities/plan.entity';

@Module({
  controllers: [PlanController],
  providers: [PlanService],
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }])
  ]
})
export class PlanModule {}
