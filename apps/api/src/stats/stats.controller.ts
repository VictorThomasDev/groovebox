import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getStats(@Query('userId') userId: string) {
    return this.statsService.getStats(userId);
  }

  @Get('genres')
  getByGenre(@Query('userId') userId: string) {
    return this.statsService.getByGenre(userId);
  }

  @Get('decades')
  getByDecade(@Query('userId') userId: string) {
    return this.statsService.getByDecade(userId);
  }
}
