import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { SendNotifiication } from '../../app/useCases/sendNotification';
import { CancelNotifiication } from '../../app/useCases/cancelNotifification';
import { CountNotifiication } from '../../app/useCases/countRecipientNotification';
import { GetRecipientNotifiication } from '../../app/useCases/getRecipientNotification';
import { ReadNotifiication } from '../../app/useCases/readNotification';
import { UnReadNotifiication } from '../../app/useCases/unreadNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { PrismaService } from '../database/prisma.service';
@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotifiication,
    private cancelNotifification: CancelNotifiication,
    private readNotifification: ReadNotifiication,
    private unreadNotifification: UnReadNotifiication,
    private countRecipientNotifification: CountNotifiication,
    private getRecipientNotifification: GetRecipientNotifiication,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotifification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotifification.execute({ notificationId: id });
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifification.execute({ notificationId: id });
  }

  @Get('count/form/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifification.execute({
      recipientId,
    });

    return {
      count,
    };
  }
  @Get('count/:recipientId')
  async countRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifification.execute({
      recipientId,
    });

    return {
      notifications,
    };
  }
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, cotegory, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      cotegory,
      content,
    });

    return { notification };
  }
}
