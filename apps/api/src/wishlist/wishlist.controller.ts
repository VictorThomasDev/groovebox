import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.wishlistService.findAll(userId);
  }

  @Post()
  create(@Body() dto: unknown) {
    return this.wishlistService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
