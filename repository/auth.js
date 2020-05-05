const configuration = require('../configuration.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSign = configuration.jwtSecret;
//*----------------------- Hash passwords
async function hashedPassword(req, res, next) {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	req.body.password = hashedPassword;
	next();
}
//*----------------------- Generar token
function token(req, user) {
	const data = {
		username: req.body.username,
		id: user.id,
		is_admin: user.is_admin
	};
	const token = jwt.sign(data, jwtSign);
	return `Tu token es: ${token}`;
}
//*-----------------------Valida token
function authenticateToken(req, res, next) {
	const autHeader = req.headers.authorization;
	if (autHeader === undefined) res.status(401).json({ error: 'Token invalido' });
	else {
		const token = autHeader.split(' ')[1];
		jwt.verify(token, jwtSign, (err, data) => {
			if (err) {
				res.status(401).json({ error: 'Token invalido' });
			} else {
				req.auth = {
					username: data.username,
					id: data.id,
					is_admin: data.is_admin
				};
				next();
			}
		});
	}
}
//*-----------------------Valida si es admin
function isAdmin(req, res, next) {
	if (req.auth.is_admin === 1) {
		next();
		return true;
	} else res.status(401).json({ error: 'Token invalido' });
}
module.exports = {
	authenticateToken,
	token,
	hashedPassword,
	isAdmin
};
