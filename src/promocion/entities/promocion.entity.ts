import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Promocion extends Document {

    @Prop({ required: true, unique: true })
    codigo: number;

    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    urlImagen: string;

    @Prop()
    descripcion: string;

    @Prop({ required: true })
    descuento: number;

    @Prop({ required: true, type: Date })
    fechaIni: Date;

    @Prop({ required: true, type: Date })
    fechaFin: Date;


}

export const PromocionSchema = SchemaFactory.createForClass(Promocion);
