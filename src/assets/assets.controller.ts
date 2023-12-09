import { Body, Controller, Get, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('/api/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets;
  }

  @Post()
  async create(@Body() body: { id: string; symbol: string }) {
    const asset = await this.assetsService.create(body);
    return asset;
  }
}
