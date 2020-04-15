# ISTIO - Request tracing in microservices architecture

Here via this repository we want to check if distributed logging/tracing is provided by istio. we are checking below mentioned flows

1. FlowOne - A(success)-B(success)-C(success)-D(success) - output = 200
2. FlowTwo - B(success)-D(success)-C(success)-A(success) - output = 200
3. FlowThree - D(success)-C(success)-B(success)-A(success) - output = 200
4. FlowFour - A(success)-B(fail)-C(success)-D(fail)- output = 200
5. FlowFive - A(success)-B(fail)-C(fail)-D(fail)- output = 500

# Goals
1. A tracing chart showing spans from all the MiS showing which microservices took how much time and what was the response code.
2. If any microservice failed to serve the request then it should be shown in the tracing chart spans.
3. Ability to find span using request id

## docker-compose URL's
MISA :- http://localhost:3000
MISB :- http://localhost:3001
MISC :- http://localhost:3002
MISD :- http://localhost:3003
Fortio:- http://localhost:8080/fortio/

