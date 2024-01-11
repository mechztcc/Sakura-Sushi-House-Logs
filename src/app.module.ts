import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProduceLogsService } from './logs/producer/producer-logs/producer-logs.service';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
          ],
          queue: 'logs_queue',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ProduceLogsService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly producer: ProduceLogsService) {}
  onModuleInit() {
    this.producer.connect();
  }
}
