import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Artist } from './spotify.types';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable()
export class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

   async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.accessToken && this.tokenExpiresAt && now < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const clientId = this.config.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.config.get<string>('SPOTIFY_CLIENT_SECRET');
    const tokenUrl =
      this.config.get<string>('SPOTIFY_TOKEN_URL') ??
      'https://accounts.spotify.com/api/token';

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const response$ = this.http.post<SpotifyTokenResponse>(
      tokenUrl,
      new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    try {
      const { data } = await firstValueFrom(response$);
      this.accessToken = data.access_token;
      this.tokenExpiresAt = now + data.expires_in * 1000 - 30_000;
      return this.accessToken;
    } catch (e) {
      throw new InternalServerErrorException('Failed to get Spotify token');
    }
  }

  async searchArtists(query: string, limitNum = 10): Promise<Artist[]> {
    //Würde normalerweise nach Login gespeichert werden im LocalStorage
    const token = await this.getAccessToken();
    // Max. 10 Suchergebnisse möglich
    const limit = Math.max(1, Math.min(10, isNaN(limitNum) ? 10 : limitNum));
    const baseUrl =
      this.config.get<string>('SPOTIFY_API_BASE_URL') ??
      'https://api.spotify.com/v1';

    const response$ = this.http.get(`${baseUrl}/search`, {
      params: { q: query, type: 'artist', limit },
      headers: { Authorization: `Bearer ${token}` },
    });

    try {
      const { data } = await firstValueFrom(response$);
      const items = data?.artists?.items ?? [];

      const artists: Artist[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        genres: item.genres ?? [],
        imageUrl: item.images?.[0]?.url ?? null,
        popularity: item.popularity ?? null,
        followers: item.followers?.total ?? null,
      }));

      return artists;
    } catch (e) {
      throw new InternalServerErrorException('Failed'+e?.message);
    }
  }
}
