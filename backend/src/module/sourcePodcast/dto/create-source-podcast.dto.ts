import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSourcePodcastDto {
  
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    description: string;
    
    @IsString()
    url: string;
    
    @IsString()
    thumbnail: string;
}