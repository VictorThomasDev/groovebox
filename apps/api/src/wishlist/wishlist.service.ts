import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(_userId: string) {
    // TODO: return this.prisma.wishlistItem.findMany({ where: { userId } })
    return [];
  }

  create(_dto: unknown) {
    // TODO: return this.prisma.wishlistItem.create({ data: dto })
  }

  remove(_id: string) {
    // TODO: return this.prisma.wishlistItem.delete({ where: { id } })
  }
}
