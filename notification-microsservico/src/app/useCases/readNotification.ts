import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
interface IReadNotficationRequest {
  notificationId: string;
}

type ReadNotifiicationReponse = void;
@Injectable()
export class ReadNotifiication {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute({
    notificationId,
  }: IReadNotficationRequest): Promise<ReadNotifiicationReponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();
    this.notificationRepository.save(notification);
  }
}
