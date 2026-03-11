import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchArtistsQueryDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  limit?: number;
}