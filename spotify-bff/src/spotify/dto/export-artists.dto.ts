import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Artist } from '../spotify.types';

export class ArtistExportItem implements Artist {
  id: string;
  name: string;
  genres: string[];
  imageUrl: string | null;
  popularity: number | null;
  followers: number | null;
}

export class ExportArtistsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArtistExportItem)
  artists: ArtistExportItem[];
}
