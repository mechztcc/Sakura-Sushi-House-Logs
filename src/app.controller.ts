import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PrismaService } from './shared/prisma/services/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('product_created')
  async handleProductCreated({ content }: Record<string, unknown>) {
    const data = String(content);
    await this.prisma.log.create({ data: { content: data } });
    console.log(data);
  }

  @EventPattern('product_updated')
  async handleProductUpdated({ content }: Record<string, unknown>) {
    const data = String(content);
    await this.prisma.log.create({ data: { content: data } });
    console.log(data);
  }
}
