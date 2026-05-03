import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.collectionService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }

  @Post()
  create(@Body() dto: unknown) {
    return this.collectionService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: unknown) {
    return this.collectionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(id);
  }
}
