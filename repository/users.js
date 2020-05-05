const bcrypt = require('bcrypt');
const crud = require('../repository/crud');

//*-----------------------VALIDA SI EXISTE USERNAME Y PASS OK!
async function validateExistingUser(req, res, next) {
	try {
		const userExists = await crud.findByColumn('users', 'username', req.body.username);
		if (userExists[0]) return res.status(409).json('El nombre de usuario ya existe');
		const mailExists = await crud.findByColumn('users', 'mail', req.body.mail);
		if (mailExists[0]) res.status(409).json('El mail ya existe');
		else next();
	} catch (err) {
		res.status(400).send('error');
	}
}

//*-----------------------VALIDA QUE USERNAME Y PASS OK!
async function validateUser(req, res) {
	try {
		const userExists = await crud.findByColumn('users', 'username', req.body.username);
		if (userExists != '') {
			const pass = await bcrypt.compare(req.body.password, userExists[0].password);
			if (pass === true) {
				return { status: true, id: userExists[0].id, is_admin: userExists[0].is_admin };
			}
		}
		return { status: false };
	} catch (err) {
		res.status(400).send('error');
	}
}

module.exports = {
	validateUser,
	validateExistingUser
};
