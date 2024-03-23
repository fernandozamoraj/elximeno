const ProcessorEngine = require('./processorEngine.js');
const StandardProcessor = require('./processors/standardProcessor.js');
const UserUpdatedProcessor = require('./processors/userUpdatedProcessor.js');
const InvalidProcessor = require('./processors/invalidProcessor.js');
const InvalidProcessorRun = require('./processors/invalidProcessorRun.js');
// Example usage
const processorEngine = new ProcessorEngine();

// Configure the processor
processorEngine.configure({ server: 'amqp://localhost'});

//Add processors
processorEngine.addProcessor(new StandardProcessor());
processorEngine.addProcessor(new UserUpdatedProcessor());
processorEngine.addProcessor(new InvalidProcessor());
processorEngine.addProcessor(new InvalidProcessorRun());

// Run the processor engine
processorEngine.run();
