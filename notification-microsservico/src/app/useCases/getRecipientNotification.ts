import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';

import { Notification } from '../entities/notification';
interface IGetNotficationRequest {
  recipientId: string;
}

interface IGetNotifiicationReponse {
  notifications: Notification[];
}
@Injectable()
export class GetRecipientNotifiication {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    recipientId,
  }: IGetNotficationRequest): Promise<IGetNotifiicationReponse> {
    const notifications =
      await this.notificationRepository.findManyByRecepientId(recipientId);

    return {
      notifications,
    };
  }
}
