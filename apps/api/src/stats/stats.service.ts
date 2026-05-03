import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(_userId: string) {
    // TODO: aggregate count, total value, most common genre
    return { totalRecords: 0, totalWishlist: 0, estimatedValue: 0 };
  }

  async getByGenre(_userId: string) {
    // TODO: prisma.record.groupBy({ by: ['genre'], where: { userId } })
    return [];
  }

  async getByDecade(_userId: string) {
    // TODO: group records by decade (year / 10 * 10)
    return [];
  }
}
