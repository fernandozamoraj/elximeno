//even though the queue for this processor does not exist the engine 
//has no problem starting
class InvalidProcessor {
    constructor(queueName) {
      this.queueName = queueName || "com.mycompany.domain.doesnotexist";
    }
  
    doWork(data, onFinish) {
      console.log(`Processing data for queue '${this.queueName}':`, data);
      onFinish(true); // Call the onFinish callback
    }
  }
  
  module.exports = InvalidProcessor;