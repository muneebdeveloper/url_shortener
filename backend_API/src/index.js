const createServer = require('./createServer');
require('dotenv').config({path:".env"});

const server = createServer();

// Server starts here
server.start({
    cors:{
        credentials:true,
        origin:process.env.FRONTEND_URL
    }
},
deets=>console.log(`server is running on http://localhost:${deets.port}`)
);