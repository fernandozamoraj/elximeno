const amqp = require('amqplib');

async function consumeQueue() {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server address
    const channel = await connection.createChannel();
    
    await channel.assertQueue('com.mycompany.domain.queue', { durable: true });

    console.log('Waiting for messages...');

    channel.consume('com.mycompany.domain.queue', (message) => {
      if (message !== null) {
        const content = message.content.toString();
        console.log('Received message:', content);

        // Process the message here...

        channel.ack(message); // Acknowledge that the message has been processed
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

consumeQueue();
