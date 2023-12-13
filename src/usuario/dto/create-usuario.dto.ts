import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    dni: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellidos: string;

    @IsString()
    @IsNotEmpty()
    password: string;


    @IsDate()
    @Type(() => Date)
    fechaNacimiento: Date;

    @IsString()
    @IsNotEmpty()
    plan: string;

    @IsNumber()
    @Type(() => Number)
    telefono: number;

    @IsEmail()
    correo: string;

    @IsEmail()
    repetirCorreo: string;
    
    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsIn(['A', 'B'])
    estado: string;

    @IsDate()
    @Type(() => Date)
    fechaIni: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    fechaFin?: Date

    @IsBoolean()
    @IsOptional()
    superUsuario?: boolean;

    @IsOptional()
    @IsArray()
    readonly clasesReservadas?: string[];


}
