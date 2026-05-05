import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface DiscogsTrack {
  position: string;
  title: string;
  duration: string;
}

export interface DiscogsRelease {
  id: number;
  title: string;
  artists: { name: string; id: number }[];
  labels: { name: string; catno: string }[];
  year: number;
  formats: { name: string; descriptions: string[] }[];
  images: { uri: string; type: string }[];
  tracklist: DiscogsTrack[];
  genres: string[];
  styles: string[];
}

export interface DiscogsArtist {
  id: number;
  name: string;
  profile: string;
  images: { uri: string; type: string }[];
  urls: string[];
}

export interface DiscogsSearchResult {
  id: number;
  title: string;
  type: string;
  year: string;
  label: string[];
  format: string[];
  cover_image: string;
  resource_url: string;
}

export interface DiscogsSearchResponse {
  results: DiscogsSearchResult[];
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
  };
}

@Injectable()
export class DiscogsService {
  private readonly baseUrl = 'https://api.discogs.com';

  constructor(private readonly config: ConfigService) {}

  private get headers(): Record<string, string> {
    const key = this.config.get<string>('DISCOGS_CONSUMER_KEY');
    const secret = this.config.get<string>('DISCOGS_CONSUMER_SECRET');
    const userAgent = this.config.get<string>(
      'DISCOGS_USER_AGENT',
      'Groovebox/1.0',
    );

    const headers: Record<string, string> = { 'User-Agent': userAgent };
    if (key && secret) {
      headers['Authorization'] = `Discogs key=${key}, secret=${secret}`;
    }
    return headers;
  }

  private async fetch<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers,
    });

    if (res.status === 404) {
      throw new NotFoundException(`Discogs resource not found: ${path}`);
    }
    if (!res.ok) {
      throw new InternalServerErrorException(
        `Discogs API error ${res.status}: ${res.statusText}`,
      );
    }

    return res.json() as Promise<T>;
  }

  async search(
    query: string,
    page = 1,
    type?: string,
    format?: string,
  ): Promise<DiscogsSearchResponse> {
    const params = new URLSearchParams({ q: query, page: String(page) });
    if (type) params.set('type', type);
    if (format) params.set('format', format);
    return this.fetch<DiscogsSearchResponse>(
      `/database/search?${params.toString()}`,
    );
  }

  async getRelease(id: string): Promise<DiscogsRelease> {
    return this.fetch<DiscogsRelease>(`/releases/${id}`);
  }

  async getArtist(id: string): Promise<DiscogsArtist> {
    return this.fetch<DiscogsArtist>(`/artists/${id}`);
  }
}
