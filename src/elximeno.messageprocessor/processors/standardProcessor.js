class StandardProcessor {
    constructor(queueName) {
      this.queueName = queueName || "com.mycompany.domain.queue";
      this.exchangeName = "com.mycompany.domain";
      this.routingKey = "";
    }
  
    doWork(data, onFinish) {
      console.log(`Processing data for queue '${this.queueName}':`, data);
      onFinish(true); // Call the onFinish callback
    }
  }
  
  module.exports = StandardProcessor;