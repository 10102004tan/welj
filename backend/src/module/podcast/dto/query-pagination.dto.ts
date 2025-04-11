import {
    IsOptional,
    IsInt,
    Min,
    IsIn,
    IsString
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class QueryPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;
  
    @IsOptional()
    @IsString()
    sortBy?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc'], { message: 'sortOrder must be either asc or desc' })
    sortOrder?: 'asc' | 'desc';
  }
  