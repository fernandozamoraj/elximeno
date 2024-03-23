//even though the queue for this processor does not exist the engine 
//has no problem starting
class InvalidProcessorRun {
    constructor(queueName) {
      this.queueName = queueName || "com.mycompany.domain.norunner";
      this.exchangeName = "com.mycompany.domain.user";
      this.routingKey = "";
    }
  
    run(data, onFinish) {
      console.log(`Processing data for queue '${this.queueName}':`, data);
      onFinish(true); // Call the onFinish callback
    }
  }
  
  module.exports = InvalidProcessorRun;