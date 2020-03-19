# istio-poc

Here via this repository we want to check if distributed logging is provided by istio. we are checking below mentioned flows

## FlowOne - A(success)-B(success)-C(success)-D(success) - output = 200
## FlowTwo - B(success)-D(success)-C(success)-A(success) - output = 200
## FlowThree - D(success)-C(success)-B(success)-A(success) - output = 200
## FlowFour - A(success)-B(fail)-C(success)-D(fail)- output = 200
## FlowFive - A(success)-B(fail)-C(fail)-D(fail)- output = 500

# Goals
A tracing chart showing spans from all the MiS showing which microservices took how much time and what was the response code.
If any microservice failed to serve the request then it should be shown in the tracing chart spans.
Ability to find span using request id