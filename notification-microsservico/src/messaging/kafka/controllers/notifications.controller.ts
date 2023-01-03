import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotifiication } from '../../../app/useCases/sendNotification';
interface ISendNotifiicationPayload {
  recipientId: string;
  content: string;
  cotegory: string;
}
@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotifiication) {}
  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { content, cotegory, recipientId }: ISendNotifiicationPayload,
  ) {
    await this.sendNotification.execute({ content, cotegory, recipientId });
  }
}
