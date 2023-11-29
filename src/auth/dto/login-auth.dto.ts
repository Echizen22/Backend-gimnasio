import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class LoginAuthDto {

    @IsString()
    @MaxLength(9)
    @IsNotEmpty()
    dni: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    password: string;


}