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
const session = require('express-session');
const passport = require('passport');
const { database } = require('./keys');

require('./lib/passport');

//Aplication Variables
app.set('port', process.env.PORT || 4000);

//Server Configuration
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(morgan(':method :url :status'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(session({
    secret: 'work4meSession',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//Routes
app.use(require('./routes/main.routes'));
app.use(require('./routes/authentications.routes'));
app.use('/register/candidate', require('./routes/registerApplicant.routes'));
app.use('/register/company', require('./routes/registerCompany.routes'));
app.use('/vacancies', require('./routes/vacancies.routes'));

//Socket Connection
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
});

//Starting Server
http.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});