import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model, isValidObjectId } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

  constructor(

    @InjectModel( Usuario.name )
    private readonly usuarioModel: Model<Usuario>,

  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    
    try {

      const { password, ...userData } = createUsuarioDto;

      const usuario = await this.usuarioModel.create({
        password: bcrypt.hashSync( password, 10),
        ...userData
      });

      const { password:_, ...user } = usuario.toJSON();

      return user;
    } catch (error) {
      this.handleException(error);
    }



  }

  async findAll() {

    let usuarios: Usuario[];
    usuarios = await this.usuarioModel.find<Usuario>()
                .select('-__v')
                .select('-password');

    usuarios = usuarios.filter((user) => user.superUsuario !== true);


    return usuarios;
  }

  async findOne(term: string) {
    let usuario: Usuario;

    if ( isValidObjectId( term ) ) {
      usuario = await this.usuarioModel.findById( term )
        .select('-__v')
        .select('-password');
    }

    if ( !usuario ) {
      usuario = await this.usuarioModel.findOne({ dni: term })
        .select('-__v');
    }

    if ( !usuario ) {
      usuario = await this.usuarioModel.findOne({ correo: term })
        .select('-__v');
    }

    if( !usuario )
      throw new NotFoundException(`Usuario con id, dni o correo "${ term }" no encontrado.`);
    
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    
    const usuario = await this.findOne( id );


    if ( usuario.password )
      usuario.password = bcrypt.hashSync( usuario.password, 10);

    try {

      await usuario.updateOne( updateUsuarioDto );
      return {  ...usuario.toJSON(), ...updateUsuarioDto }
    } catch (error) {
      this.handleException( error );
    }


  }

  async remove(id: string) {

    if( isValidObjectId( id ) ) {
      const { deletedCount } = await this.usuarioModel.deleteOne({ _id: id });
  
      if ( deletedCount === 0 ) {
        throw new BadRequestException(`Usuario con ID ${ id } no encontrado`)
      }
      return;
    }

    throw new BadRequestException(`Id "${ id }" no es valido`);
  }

  private handleException( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Usuario existe en Base de datos ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`No sé pudo crear el usuario - Check server log `);
  }
  
}
