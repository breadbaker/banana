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

