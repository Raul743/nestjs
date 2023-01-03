import { Module } from '@nestjs/common';
import { SendNotifiication } from 'src/app/useCases/sendNotification';
import { CancelNotifiication } from 'src/app/useCases/cancelNotifification';
import { CountNotifiication } from 'src/app/useCases/countRecipientNotification';
import { GetRecipientNotifiication } from 'src/app/useCases/getRecipientNotification';
import { ReadNotifiication } from 'src/app/useCases/readNotification';
import { UnReadNotifiication } from 'src/app/useCases/unreadNotification';

import { NotificationController } from './controller/notification.controller';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotifiication,
    UnReadNotifiication,
    ReadNotifiication,
    GetRecipientNotifiication,
    CountNotifiication,
    CancelNotifiication,
  ],
})
export class NotificationModule {}
