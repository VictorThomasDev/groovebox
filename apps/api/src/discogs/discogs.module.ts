import { Module } from '@nestjs/common';
import { DiscogsController } from './discogs.controller';
import { DiscogsService } from './discogs.service';

@Module({
  controllers: [DiscogsController],
  providers: [DiscogsService],
})
export class DiscogsModule {}
