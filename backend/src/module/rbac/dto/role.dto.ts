import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsEnum, Max, MaxLength, ValidateNested, Matches, IsOptional } from 'class-validator';


class Grant {
    @IsString()
    @IsNotEmpty()
    resource: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(create|read|update|delete):(own|any)$/, {
        message: 'Actions must follow the format "action:scope" where action is one of [create, read, update, delete] and scope is one of [own, any]',
    })
    actions: string;

    @IsString()
    @IsNotEmpty()
    attributes: string;
}

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['active', 'inactive'], {
        message: 'status must be either active or inactive',
    })
    status: string;

    @IsNotEmpty({ each: true })
    @ValidateNested({ each: true })
    @Type(() => Grant)
    grants: Grant[];
}

export class UpdateRoleDto extends CreateRoleDto {
}