import { Controller, Get, Param, Query } from '@nestjs/common';
import { DiscogsService } from './discogs.service';

@Controller('discogs')
export class DiscogsController {
  constructor(private readonly discogsService: DiscogsService) {}

  @Get('search')
  search(@Query('q') query: string, @Query('page') page = '1') {
    return this.discogsService.search(query, Number(page));
  }

  @Get('release/:id')
  getRelease(@Param('id') id: string) {
    return this.discogsService.getRelease(id);
  }

  @Get('artist/:id')
  getArtist(@Param('id') id: string) {
    return this.discogsService.getArtist(id);
  }
}
