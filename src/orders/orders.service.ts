import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  async create(data: { asset_id: string; price: number }) {
    const exists = await this.prismaService.asset.findFirst({
      where: {
        id: data.asset_id,
      },
    });

    if (!exists) {
      throw new HttpException(
        'Asset não existe',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const response = await this.prismaService.order.create({
      data: {
        ...data,
        status: OrderStatus.PENDING,
      },
    });

    return response;
  }

  findAll() {
    return this.prismaService.order.findMany({
      include: {
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
    });
  }
}
