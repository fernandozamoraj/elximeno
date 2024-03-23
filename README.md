# elximeno (El-Chee-mae-no)
A rabbit message processor in node js.

This project is an example of how to configure a queue message processor engine in node that listens to messages and dispatches them to processor objects.

TODO:
    Create a publisher engine
    Create a way to auto create the queues but not exchanges from the processor code



### Setup Rabbit
-- Make sure that you have docker (desktop or otherwise the engine)
-- from the terminal run the following commands
1. docker pull rabbitmq:management
*there are two port mappings. One is for the rabbit message and the 
*other is for the management console
2. docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

Access rabbit management console at http://localhost:15672
user/pwd is guest/guest
