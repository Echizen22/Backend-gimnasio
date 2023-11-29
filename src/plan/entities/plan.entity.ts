import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Plan extends Document {

    @Prop({ required: true, unique: true })
    codigo: number;
  
    @Prop({ required: true })
    nombre: string;
  
    @Prop({ required: true })
    precio: number;
  
    @Prop()
    descripcion: string;

}

export const PlanSchema = SchemaFactory.createForClass(Plan);
