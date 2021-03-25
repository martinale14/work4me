const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
const path = require('path');

//Aplication Variables
app.set('port', process.env.PORT || 3000);

//Server Configuration
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(morgan('dev'))

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

//Socket Connection
io.on('connection', (socket) => {
    console.log('User Connected');
});

//Starting Server
http.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});