import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { NotificationModule } from './infra/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [NotificationModule, DatabaseModule, MessagingModule],
  providers: [],
})
export class AppModule {}
