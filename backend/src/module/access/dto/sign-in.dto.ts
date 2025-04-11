import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
    @IsString({
        message: 'Email must be a string',
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    @IsEmail()
    email: string;

    @IsString({
        message: 'Password must be a string',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    password: string;
}