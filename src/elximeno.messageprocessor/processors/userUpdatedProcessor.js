class UserUpdatedProcessor {
    constructor(queueName) {
      this.queueName = queueName || "com.mycompany.domain.userchanged";
    }
  
    doWork(data, onFinish) {
      console.log(`Processing data for queue '${this.queueName}':`, data);
      onFinish(true); // Call the onFinish callback
    }
  }
  
  module.exports = UserUpdatedProcessor;