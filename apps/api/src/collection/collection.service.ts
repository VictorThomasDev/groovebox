import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(_userId: string) {
    // TODO: return this.prisma.record.findMany({ where: { userId } })
    return [];
  }

  findOne(_id: string) {
    // TODO: return this.prisma.record.findUniqueOrThrow({ where: { id } })
  }

  create(_dto: unknown) {
    // TODO: return this.prisma.record.create({ data: dto })
  }

  update(_id: string, _dto: unknown) {
    // TODO: return this.prisma.record.update({ where: { id }, data: dto })
  }

  remove(_id: string) {
    // TODO: return this.prisma.record.delete({ where: { id } })
  }
}
