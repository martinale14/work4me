const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    // Cross Origin Resource Sharing
    cors: {
        origin: '*',
    }
});
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');


//Aplication Variables
app.set('port', process.env.PORT || 3000);

//Server Configuration
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(morgan(':method :url :status'));
app.use(cors());

//Routes
app.use(require('./routes/main'));

//Socket Connection
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    socket.emit('FromApi', 'Hola Como Estas?')

});

//Starting Server
http.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});