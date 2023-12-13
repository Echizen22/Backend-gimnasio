import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clase } from './entities/clase.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class ClaseService {

  constructor(
    @InjectModel(Clase.name) private readonly claseModel: Model<Clase>
  ) {}

  async create(createClaseDto: CreateClaseDto): Promise<Clase> {
    const nuevaClase = await this.claseModel.create(createClaseDto);
    return nuevaClase;
  }

  async findAll(): Promise<Clase[]> {
    return this.claseModel.find()
      .select('-__v');
  }

  async findOne(id: string): Promise<Clase> {
    
    let clase: Clase;
    if ( isValidObjectId( id ) ) {
      clase = await this.claseModel.findById( id )
        .select('-__v');
    }

    if (!clase) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }

    return clase;

  }

  async update(id: string, updateClaseDto: UpdateClaseDto) {
    const claseActualizada = await this.claseModel
      .findByIdAndUpdate(id, updateClaseDto, { new: true })
      .exec();

    if (!claseActualizada) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }

    return claseActualizada;
  }

  async remove(id: string): Promise<Clase> {

    if( isValidObjectId( id ) ) {
      const { deletedCount } = await this.claseModel.deleteOne({ _id: id });
  
      if ( deletedCount === 0 ) {
        throw new BadRequestException(`Clase con ID ${ id } no encontrado`)
      }
      return;
    }

    throw new BadRequestException(`Id "${ id }" no es valido`);
  }
}
