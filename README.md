Run locally

docker run -d --name chat-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=chat_db mongo

docker exec -it chat-mongo /bin/bash
mongo
use admin
db.auth("admin", "password")
use chat_db
db.createUser({ user: "chat_user", pwd: "chat_password", roles: [] })
exit
mongo --port 27017 -u chat_user -p chat_password --authenticationDatabase chat_db

mongoose.connect('mongodb://chat_user:chat_password@127.0.0.1:27017/chat_db?authSource=admin', {
            useNewUrlParser    : true,
            useUnifiedTopology : true
});