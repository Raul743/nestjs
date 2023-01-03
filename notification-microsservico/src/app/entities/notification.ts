import { Replace } from 'src/helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';
export interface INotificationProps {
  recipientId: string;
  content: Content;
  cotegory: string;
  readAt?: Date | null;
  cancelAt?: Date | null;
  createAt: Date;
}

export class Notification {
  private props: INotificationProps;
  private _id: string;

  constructor(
    props: Replace<INotificationProps, { createAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(),
    };
  }
  public get id(): string {
    return this._id;
  }
  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }
  public get recipientId(): string {
    return this.props.recipientId;
  }
  public set content(content: Content) {
    this.props.content = content;
  }
  public get content(): Content {
    return this.props.content;
  }

  public set cotegory(cotegory: string) {
    this.props.cotegory = cotegory;
  }
  public get cotegory(): string {
    return this.props.cotegory;
  }

  public unread() {
    this.props.readAt = null;
  }
  public read() {
    this.props.readAt = new Date();
  }
  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }
  public cancel() {
    this.props.cancelAt = new Date();
  }
  public get createAt(): Date {
    return this.props.createAt;
  }
  public get cancelAt(): Date | null | undefined {
    return this.props.cancelAt;
  }
}
