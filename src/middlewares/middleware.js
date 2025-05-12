exports.middlewareGlobal = (req, res, next) => {
	res.locals.umaVariavelLocal = 'Este é o valor da variável local';
	next();
};

exports.checkCsrfError = (err, req, res, next) => {
	if (err && 'EBADCSRFTOKEN' === err.code) {
		const variaveis = {
			titulo: 'Error',
			error_message: 'Bad CSRF.',
			content: '404',
		};
		return res.render('index', variaveis);
		// return res.send('BAD CSRF.');
	}
};
exports.csrfMiddleware = (req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};
