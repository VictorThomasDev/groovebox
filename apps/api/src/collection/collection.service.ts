import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(_userId: string) {
    // TODO
  }

  findOne(_id: string) {
    // TODO
  }

  create(_dto: unknown) {
    // TODO
  }

  update(_id: string, _dto: unknown) {
    // TODO
  }

  remove(_id: string) {
    // TODO
  }
}
