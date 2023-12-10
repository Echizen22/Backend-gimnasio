import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Promocion } from './entities/promocion.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PromocionService {

  constructor(

    @InjectModel( Promocion.name )
    private readonly promocionModel: Model<Promocion>
  ) {}

  async create(createPromocionDto: CreatePromocionDto) {

    try {
      const promocion = await this.promocionModel.create( createPromocionDto );
      return promocion;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    return this.promocionModel.find()
            .select('-__v');
  }

  async findOne(term: string) {

    let promocion: Promocion;

    if( !isNaN(+term) ) {
      promocion = await this.promocionModel.findOne({ codigo: term });
    }

    if( !promocion && isValidObjectId(term) ) {
      promocion = await this.promocionModel.findById( term ).select('-__v');
    }

    if( !promocion ) {
      throw new NotFoundException(`Promoción con id o código "${ term }" no encontrado.`);
    }

    return promocion;
  }

  async update(id: string, updatePromocionDto: UpdatePromocionDto) {
    const promocion = await this.findOne( id );

    try {
      await promocion.updateOne( updatePromocionDto );
      return { ...promocion.toJSON(), ...updatePromocionDto }
    } catch (error) {
      this.handleException( error );
    }
  }

  async remove(id: string) {

    if( isValidObjectId( id ) ) {
      const { deletedCount } = await this.promocionModel.deleteOne({ _id: id });

      if ( deletedCount === 0 ) {
        throw new BadRequestException(`Promoción con "${ id }" no encontrado`)
      }

      return;
    }

    throw new BadRequestException(`Id "${ id }" no es valido`);
  }

  private handleException(error: any ) {

    if( error.code === 11000 ){
      throw new BadRequestException(`Promoción existe en Base de datos ${ JSON.stringify( error.keyValue ) }`)
    }
    console.log(error);
    throw new InternalServerErrorException(`No sé pudo crear la promoción - Check server log `);

  }
}
