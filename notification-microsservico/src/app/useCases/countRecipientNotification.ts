import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
interface ICountRecipientNotficationRequest {
  recipientId: string;
}

interface ICountRecipientNotifiicationReponse {
  count: number;
}
@Injectable()
export class CountNotifiication {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    recipientId,
  }: ICountRecipientNotficationRequest): Promise<ICountRecipientNotifiicationReponse> {
    const count = await this.notificationRepository.countManyByRecepientId(
      recipientId,
    );
    return {
      count,
    };
  }
}
