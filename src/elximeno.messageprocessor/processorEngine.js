const amqp = require('amqplib');

class ProcessorEngine {
    constructor() {
      this.processors = [];
      this.config = {};
    }
  
    addProcessor(processor) {
      this.processors.push(processor);
    }

    async _createQueueAndBind(channel, processor) {
      try {
        

        const exchangeName = processor.exchangeName;
        const queueName = processor.queueName;
        const routingKey = processor.routingKey;

        // Check if the exchange exists
        await channel.checkExchange(exchangeName);

        // Check if the queue exists
        const queueInfo = await channel.checkQueue(queueName);

        // If the queue already exists, don't recreate it
        if (!queueInfo.queue) {
          // Assert the queue
          await channel.assertQueue(queueName, { durable: true });

          console.log(`Queue '${queueName}' created`);
        } else {
          console.log(`Queue '${queueName}' already exists`);
        }

        // Bind the queue to the exchange if the queue exists
        if (queueInfo.queue) {
          await channel.bindQueue(queueName, exchangeName, routingKey);
          console.log(`Queue '${queueName}' bound to exchange '${exchangeName}' with routing key '${routingKey}'`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }



  
    async run() {
      const connection = await amqp.connect(this.config.server || 'amqp://localhost'); // Replace 'localhost' with your RabbitMQ server address
    
      for (const processor of this.processors) {
        try {
          let channel = await connection.createChannel();
          this._createQueueAndBind(channel, processor);
          await channel.assertQueue(processor.queueName, { durable: true });
          console.log(`Waiting for messages on queue: ${processor.queueName}`);
      
          channel.consume(processor.queueName, (message) => {
              if (message !== null) {

                  try{
                    const content = message.content.toString();
                    console.log('Received message:', content);
            
                    // Process the message here...
                    processor.doWork({queue: processor.queueName, content : content},
                        (ackMessage) => {
                            if(ackMessage) channel.ack(message);
                        }    
                    );
                  }
                  catch(error){
                    try{
                      console.error(`Error processing for queue dowork: ${processor.queueName}`, error);
                    }
                    catch(error){
                      console.error("error with processor", error);
                    }
                    console.log("skipping processor");
                  }
              }
          });
        } catch (error) {
          try{
            console.error(`Error processing for queue: ${processor.queueName}`, error);
          }
          catch(error){
            console.error("error with processor", error);
          }
        }
      }
      console.log(`Listening for messages on ${this.config.server || 'amqp://localhost'}`);
    }
  
    configure(config) {
      this.config = config;
    }
  }
  
  module.exports = ProcessorEngine;
  