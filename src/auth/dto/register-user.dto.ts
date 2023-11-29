import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {

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

}