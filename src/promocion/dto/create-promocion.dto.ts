import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Matches, Min } from "class-validator";

export class CreatePromocionDto {

    @IsNumber()
    @Min(1)
    codigo: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    @Matches(/\.(jpg|jpeg|png|svg)$/i, { message: 'La URL debe ser una URL de imagen válida.' })
    urlImagen: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber()
    @Min(0)
    descuento: number;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    fechaIni: Date;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    fechaFin: Date;

}


