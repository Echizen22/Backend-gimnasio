import { IsOptional, IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePlanDto {

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    codigo: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

}
