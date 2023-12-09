import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async listAll() {
    const orders = await this.ordersService.findAll();
    return orders;
  }

  @Post()
  async create(@Body() body: { asset_id: string; price: number }) {
    const order = await this.ordersService.create(body);
    return order;
  }
}
