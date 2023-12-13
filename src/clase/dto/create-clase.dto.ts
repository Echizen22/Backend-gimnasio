import { IsNotEmpty, IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateClaseDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    horario: string;

    @IsNotEmpty()
    @IsNumber()
    duracion: number;

    @IsOptional()
    @IsString()
    instructor: string;

    @IsNotEmpty()
    @IsEnum(['Principiante', 'Intermedio', 'Avanzado'])
    nivelDificultad: string;

}
