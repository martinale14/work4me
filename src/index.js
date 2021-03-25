const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan')

app.set('PORT', process.env.PORT || 3000);

app.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log('User Connected');
});

app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo</h1>');
});

http.listen(app.get('PORT'), () => {
    console.log('Server on port ' + app.get('PORT'));
});