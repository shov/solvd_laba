docker run --name local-mongo -v ./mongo_data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 -d mongo
