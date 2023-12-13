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


}


export const ClaseSchema = SchemaFactory.createForClass(Clase);