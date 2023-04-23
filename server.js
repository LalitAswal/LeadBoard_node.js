const http = require('http');
const app = require('./app');
const connection = require('./config/mongodbConnection');
require('./config/redisConnection');


const server = http.createServer(app);

const PORT = 4001;


server.listen(PORT, ()=>{
    console.log(`PORT is listening at ${PORT}`)
})
