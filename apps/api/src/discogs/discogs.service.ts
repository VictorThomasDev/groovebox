import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscogsService {
  private readonly baseUrl = 'https://api.discogs.com';

  constructor(private readonly config: ConfigService) {}

  private get headers() {
    return {
      'User-Agent': this.config.get('DISCOGS_USER_AGENT', 'Groovebox/1.0'),
      Authorization: `Discogs key=${this.config.get('DISCOGS_CONSUMER_KEY')}, secret=${this.config.get('DISCOGS_CONSUMER_SECRET')}`,
    };
  }

  async search(_query: string, _page: number) {
    // TODO: fetch(`${this.baseUrl}/database/search?q=${query}&page=${page}`, { headers: this.headers })
  }

  async getRelease(_id: string) {
    // TODO: fetch(`${this.baseUrl}/releases/${id}`, { headers: this.headers })
  }

  async getArtist(_id: string) {
    // TODO: fetch(`${this.baseUrl}/artists/${id}`, { headers: this.headers })
  }
}
