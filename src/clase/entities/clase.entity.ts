import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, } from 'mongoose';

@Schema()
export class Clase extends Document {

    @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  horario: string;

  @Prop({ required: true })
  duracion: number; // En minutos

  @Prop()
  instructor: string;

  @Prop({ enum: ['Principiante', 'Intermedio', 'Avanzado'] })
  nivelDificultad: string;

//   @Prop({ required: true })
//   capacidadMaxima: number;

//   @Prop()
//   ubicacion: string;

//   @Prop()
//   equipamientoNecesario: string;

//   @Prop()
//   imagen: string;

//   @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }] })
//   participantes: string[]; 

//   @Prop({ type: Number, default: 0 })
//   precio: number; 


}


export const ClaseSchema = SchemaFactory.createForClass(Clase);