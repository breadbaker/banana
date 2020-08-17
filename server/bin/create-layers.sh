aws lambda create-layer \
  --stack-id lambda \
  --type nodejs-app \
  --name aeouae \
  --shortname aoeueaou


aws opsworks create-stack \
  --service-role-arn arn:aws:iam::100844542342:role/lambdaflightrole2 \
  --default-instance-profile-arn arn:aws:iam::100844542342:role/lambdaflightrole2 \
  --stack-region us-east-1 \
  --name danlambdastack

