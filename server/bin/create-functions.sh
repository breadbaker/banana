#build package
./bin/package.sh



aws lambda delete-function --function-name get-flights
aws lambda  create-function  \
    --function-name get-flights \
    --zip-file fileb://upload.zip \
    --runtime nodejs12.x \
    --timeout 8 \
    --environment Variables={ENV=STAGING} \
    --role arn:aws:iam::100844542342:role/lambdaflightrole2 \
    --handler handlers.retrieveFlights



rm upload.zip 
zip -r upload.zip .
aws lambda  update-function-code  \
    --function-name create-flight \
    --zip-file fileb://upload.zip




aws apigateway update-gateway-response --rest-api-id "b9bovtjtgj" --response-type "DEFAULT_4XX" --patch-operations op="add",path="/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin",value='"'"'*'"'"'

aws apigateway  create-deployment --rest-api-id b9bovtjtgj --stage-name prod