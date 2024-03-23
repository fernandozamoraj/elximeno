const amqp = require('amqplib');

class ProcessorEngine {
    constructor() {
      this.processors = [];
      this.config = {};
    }
  
    addProcessor(processor) {
      this.processors.push(processor);
    }
  
    async run() {
    
      const connection = await amqp.connect(this.config.server || 'amqp://localhost'); // Replace 'localhost' with your RabbitMQ server address
    
      for (const processor of this.processors) {
        try {
          let channel = await connection.createChannel();

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
            
                    //TODO: remove this
                    //channel.ack(message); // Acknowledge that the message has been processed
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
  