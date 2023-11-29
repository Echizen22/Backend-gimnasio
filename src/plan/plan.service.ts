import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './entities/plan.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PlanService {

  constructor(

    @InjectModel( Plan.name )
    private readonly planModel: Model<Plan>,

  ) {}

  async create(createPlanDto: CreatePlanDto) {

    try {
      const plan = await this.planModel.create( createPlanDto );
      return plan;
    } catch (error) {
      this.handleException(error);
    }

  }

  async findAll() {
    return await this.planModel.find();
  }


  async findOne(term: string) {

    let plan: Plan;

    if( !isNaN(+term) ){
      plan = await this.planModel.findOne({ codigo: +term});
    }

    if( !plan && isValidObjectId(term) ) {
      plan = await this.planModel.findById( term );
    }
      
    if( !plan ){
      throw new NotFoundException(`Plan con id o código "${ term }" no encontrado`);
    }

    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.findOne( id );

    try {
      await plan.updateOne( updatePlanDto );
      return { ...plan.toJSON(), ...updatePlanDto }
    } catch (error) {
      this.handleException( error );
    }
  }

  async remove(id: string) {

    if( isValidObjectId( id ) ) {
      const { deletedCount } = await this.planModel.deleteOne({ _id: id });

      if ( deletedCount === 0 ) {
        throw new BadRequestException(`Plan con "${ id }" no encontrado`)
      }

      return;
    }

    throw new BadRequestException(`Id "${ id }" no es valido`);


  }

  private handleException(error: any ) {

    if( error.code  === 11000 )
      throw new BadRequestException(`Plan existe en Base de datos ${ JSON.stringify( error.keyValue ) }`)

    throw new InternalServerErrorException('No sé pudo crear el plan - Check server log')

  }
}
