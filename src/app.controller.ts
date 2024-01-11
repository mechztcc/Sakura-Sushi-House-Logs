import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PrismaService } from './shared/prisma/services/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('product_created')
  async handleUserCreated({ content }: Record<string, unknown>) {
    const data = String(content);
    await this.prisma.log.create({ data: { content: data } });
  }
}
