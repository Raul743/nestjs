const { Kafka } = require('kafkajs')
 

 const { randomUUID} = require('node:crypto')
async function booststrap() {
  const kafka = new Kafka({
    brokers: ['alive-vervet-13306-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'YWxpdmUtdmVydmV0LTEzMzA2JG3jwraHmahXvqC-rep1d_1dKW8TFTiLqWd7Wes',
      password: 'Om7qwepbnTBEi6osGOyFUtv6_1x8F5ly9ZeXo4AjgGwFGsPILB_g9qgABK8xAWn-Luo_ng==',
    },
    ssl: true,
  })
  
  
  const producer = await kafka.producer()

  await producer.connect()

  await producer.send({
    topic:'notifications.send-notification',
    messages:[{
      value:JSON.stringify({
         content:"fjdknjknfdkjdfvnkjngfkgnkmsfgmnf",
         cotegory:"social",
         recipientId:randomUUID()
      })
    }]
  })

  await producer.disconnect()
}

booststrap()