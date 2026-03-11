
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { SpotifyService } from './spotify.service';
import { SearchArtistsQueryDto } from './dto/search-artists.dto';
import { ExportArtistsDto } from './dto/export-artists.dto';
import { artistsToCsv } from './spotify.csv';
import { Artist } from './spotify.types';

@Controller('api/spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('artists')
  async searchArtists(
    @Query() queryDto: SearchArtistsQueryDto,
  ): Promise<Artist[]> {
    const { query, limit } = queryDto;
    const finalLimit = limit ?? 10;
    return this.spotifyService.searchArtists(query, finalLimit);
  }

   @Post('artists/export')
  async exportArtists(
    @Body() body: ExportArtistsDto,
    @Res() res: Response,
  ) {
    const artists = body.artists || [];

    if (!artists.length) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Keine Artists zum Exportieren erhalten' });
    }

    const csv = artistsToCsv(artists);

    const filename = `artists_export_${new Date()
      .toISOString()
      .replace(/[:.]/g, '-')}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"`,
    );

    // Optional: UTF-8 BOM für Excel
    const bom = '\uFEFF';

    res.status(HttpStatus.OK);
    res.write(bom + csv);
    res.end();
  }
}



