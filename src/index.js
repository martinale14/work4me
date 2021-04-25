const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }

});

const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//Aplication Variables
app.set('port', process.env.PORT || 3000);

//Server Configuration
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(morgan('dev'))

//Routes
app.use(cors(), require('./routes/main'));

//Socket Connection
io.on('connection', (socket) => {
    console.log('User Connected');
    socket.emit('FromApi', 'Hola Como Estas?')

});

//Starting Server
http.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});