import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['alive-vervet-13306-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'YWxpdmUtdmVydmV0LTEzMzA2JG3jwraHmahXvqC-rep1d_1dKW8TFTiLqWd7Wes',
          password:
            'Om7qwepbnTBEi6osGOyFUtv6_1x8F5ly9ZeXo4AjgGwFGsPILB_g9qgABK8xAWn-Luo_ng==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
