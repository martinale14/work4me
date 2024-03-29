const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

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
app.use('/api', require('./routes/main.routes'));
app.use('/api', require('./routes/authentications.routes'));
app.use('/api/register/candidate', require('./routes/registerApplicant.routes'));
app.use('/api/register/company', require('./routes/registerCompany.routes'));
app.use('/api/vacancies', require('./routes/vacancies.routes'));
app.use('/api/applications', require('./routes/applications.routes'));
app.use(require('./routes/browser.routes'));

//Starting Server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});