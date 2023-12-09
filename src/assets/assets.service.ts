import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.asset.findMany();
  }

  async create(data: { id: string; symbol: string }) {
    const exists = await this.prismaService.asset.findFirst({
      where: { id: data.id },
    });

    if (exists) {
      throw new HttpException(
        'Asset já existe',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.prismaService.asset.create({
      data,
    });
  }
}
