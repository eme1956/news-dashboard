const expressHandlebars = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routing = require('./routes'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session);
require('dotenv').config();

const redisOptions = {
    url: process.env.REDIS_URL
};

// Server mit Express anlegen
const server = express();

//body-parser verwenden --> Middleware
server.use(
    bodyParser.urlencoded({
        extended: false
    })
);

//body-parser für json
server.use(bodyParser.json());

//URL loggen --> eigene Middleware
const logUrlMiddleware = (req, res, next) => {
    console.log(req.url);
    next();
};
server.use(logUrlMiddleware); //Middleware benutzen

//Middleware express-session benutzen
server.use(
    session({
        store: new RedisStore(redisOptions),
        secret: process.env.SESSION_SECRET || 'Please_SET_session_SeCreT',
        resave: false,
        saveUninitialized: true
    })
);

//Middleware für locals Objekt
server.use((req, res, next) => {
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn;
    res.locals.user = req.session && req.session.user;
    next();
});

// wo sind die Templates, welche Engine
server.set('viewDir', 'views'); // Ort der Templates
server.engine(
    'html',
    expressHandlebars({
        //Engine mit dem Konfig...
        extname: 'html', //..objekt
        partialsDir: 'views/partials/' //kann weggelassen werden da default
    })
);
// Standard-Dateiendung für Templates gemäss server.engine Nr. 15
server.set('view engine', 'html');

// statische Dateien einbinden (public-Verzeichnis) --> Middleware
server.use(express.static('public'));

//Middleware Router einbinden
server.use('/', routing);

// server starten und an den entsprechenden Port binden
server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});
