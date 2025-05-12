require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose
	.connect(process.env.NEWCONNECTION)
	.then(() => {
		app.emit('pronto');
	})
	.catch((e) => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // Mensagens auto destrutivas, não ocupa espaço de memória.

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
	secret: 'glkjierisdjm dsa sdas3ee',
	store: MongoStore.create({ mongoUrl: process.env.NEWCONNECTION }),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	},
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);
app.on('pronto', () => {
	app.listen(8000, () => {
		console.log('Acessar \x1b[34mhttp://localhost:8000\x1b[0m');
		console.log('Servidor executando na porta \x1b[34m3000\x1b[0m');
	});
});
