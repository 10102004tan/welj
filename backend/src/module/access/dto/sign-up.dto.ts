import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class SignUpDto {
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

    @IsString({
        message: 'Fullname must be a string',
    })
    @IsNotEmpty({
        message: 'Fullname is required',
    })
    @Length(3, 50, {
        message: 'Fullname must be between 3 and 50 characters',
    })
    fullname: string;
}