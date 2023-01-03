import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notificationRepository';
import { PrismaService } from '../../prisma.service';
import { PrismaNotificationMappers } from './mappers/prismaNotificationMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    if (!notification) {
      return null;
    }
    return PrismaNotificationMappers.toDomain(notification);
  }
  async countManyByRecepientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });
    return count;
  }
  async findManyByRecepientId(recipientId: string): Promise<Notification[]> {
    const notification = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notification.map(PrismaNotificationMappers.toDomain);
  }
  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        cotegory: notification.cotegory,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createAt,
      },
    });
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMappers.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
