import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema()
export class Usuario extends Document {

    @Prop({ 
        unique: true,
        index: true,
        type: String,
        required: true,
        maxlength: 9,
    })
    dni: string;

    @Prop({
        type: String,
        required: true,
        maxlength: 15,
    })
    nombre: string;

    @Prop({
        type: String,
        required: true,
    })
    apellidos: string;


    @Prop({
        type: String,
        required: true,
        maxlength: 70,
    })
    password: string;

    @Prop({
        type: Date,
    })
    fechaNacimiento: Date;

    @Prop({
        type: String,
        required: true,
    })
    plan: string;
    
    @Prop({
        type: Number,
    })
    telefono: number;

    @Prop({
        type: String,
        required: true,
        maxlength: 50,
    })
    correo: string;

    @Prop({
        type: String,
        required: true,
        maxlength: 50,
    })
    repetirCorreo: string;

    @Prop({
        type: String,
    })
    direccion: string;

    @Prop({
        type: String,
        enum: ['A', 'B'],
        default: 'B'
    })
    estado: string;

    @Prop({
        type: Date,
    })
    fechaIni: Date;

    @Prop({
        type: Date
    })
    fechaFin: Date;

    @Prop({
        type: Boolean,
        default: false,
    })
    superUsuario: boolean;


    @Prop({ type: [{ type: Types.ObjectId, ref: 'Clase'}] })
    clasesReservadas: string[];

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
