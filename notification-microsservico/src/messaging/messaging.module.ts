import { Module } from '@nestjs/common';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { SendNotifiication } from '../app/useCases/sendNotification';
import { DatabaseModule } from '../infra/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotifiication],
  controllers: [NotificationsController],
})
export class MessagingModule {}
