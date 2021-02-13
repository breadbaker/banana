cp -r dist welcome
mv welcome dist/
aws s3 sync dist s3://logflights --delete  --acl public-read