import { IsString, IsNotEmpty, IsEmail, Length, MaxLength, IsEmpty, IsOptional } from 'class-validator';

export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsOptional()
    @MaxLength(100)
    @IsString()
    description: string;
}