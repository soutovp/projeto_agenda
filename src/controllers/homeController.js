// const HomeModel = require('../models/HomeModel');

// HomeModel.create({ titulo: 'Hello World', descricao: 'Hello World' })
// 	.then((dados) => console.log(dados))
// 	.catch((erro) => console.log(erro));

exports.paginaInicial = (req, res) => {
	const variaveis = {
		titulo: 'Este será o título da página',
		numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		content: 'content',
	};
	//Mensagem exibida somente uma vez e ela deixa de existir.
	// req.flash('info', 'olá mundo!');
	// req.flash('error', 'asdagasd');
	// req.flash('success', 'blaaaaa');
	//Adiciona informações a sessão do usuário.
	// req.session.usuario = { nome: 'Luiz', logado: true };
	// console.log(req.session.usuario);
	res.render('index', variaveis);
	return;
};
exports.trataPost = (req, res) => {
	console.log(req.body);
	res.send(req.body);
	return;
};
