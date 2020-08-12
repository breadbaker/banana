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


aws lambda  create-function  \
    --function-name flight-signup \
    --zip-file fileb://upload.zip \
    --runtime nodejs12.x \
    --timeout 8 \
    --environment Variables={ENV=STAGING} \
    --role arn:aws:iam::100844542342:role/lambdaflightrole2 \
    --handler handlers.signup 

aws lambda  create-function  \
    --function-name flight-login \
    --zip-file fileb://upload.zip \
    --runtime nodejs12.x \
    --timeout 8 \
    --environment Variables={ENV=STAGING} \
    --role arn:aws:iam::100844542342:role/lambdaflightrole2 \
    --handler handlers.login

{
    "AWS_REGION_NAME": "us-east-1",
    "COGNITO_POOL_ID": "us-east-1_O5Y5OyLuS",
    "COGNITO_POOL_CLIENT_ID": "2srv9j9ehlevbr27hmav8aen3g"
}

    --environment 
    
    Variables={KeyName1=string,KeyName2=string}
    Variables={AWS_REGION_NAME=us-east-1,COGNITO_POOL_ID=us-east-1_O5Y5OyLuS,COGNITO_POOL_CLIENT_ID=2srv9j9ehlevbr27hmav8aen3g} \


{WS_REGION=us-east-1,COGNITO_POOL_ID=us-east-1_O5Y5OyLuS,COGNITO_POOL_CLIENT_ID=2srv9j9ehlevbr27hmav8aen3g}
aws lambda delete-function --function-name flight-renew
aws lambda  create-function  \
    --function-name flight-renew \
    --zip-file fileb://upload.zip \
    --runtime nodejs12.x \
    --timeout 8 \
    --role arn:aws:iam::100844542342:role/lambdaflightrole2 \
    --handler handlers.renew

aws lambda  create-function  \
    --function-name flight-export-records \
    --zip-file fileb://upload.zip \
    --runtime nodejs12.x \
    --timeout 8 \
    --role arn:aws:iam::100844542342:role/lambdaflightrole2 \
    --handler handlers.exportRecords \
    --profile default \
    --region us-east-1





rm upload.zip 
zip -r upload.zip .
aws lambda  update-function-code  \
    --function-name create-flight \
    --zip-file fileb://upload.zip
aws lambda  update-function-code  \
    --function-name get-flights \
    --zip-file fileb://upload.zip
aws lambda  update-function-code  \
    --function-name flight-renew \
    --zip-file fileb://upload.zip
aws lambda  update-function-code  \
    --function-name flight-signup \
    --zip-file fileb://upload.zip
aws lambda  update-function-code  \
    --function-name flight-login \
    --zip-file fileb://upload.zip
aws lambda flight-export-records \
    --function-name flight-export-records \
    --zip-file fileb://upload.zip



aws apigateway update-gateway-response --rest-api-id "b9bovtjtgj" --response-type "DEFAULT_4XX" --patch-operations op="add",path="/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin",value='"'"'*'"'"'

aws apigateway  create-deployment --rest-api-id b9bovtjtgj --stage-name prod