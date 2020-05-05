const express = require('express');
const router = express.Router();
const repository = require('../repository/users');
const authRepo = require('../repository/auth');
const crud = require('../repository/crud');

//*-----------------------Register OK!
const validateReg = [ repository.validateExistingUser, authRepo.hashedPassword ];
router.post('/register', validateReg, async (req, res) => {
	try {
		let keys = req.body.stringKeys();
		let values = req.body.stringValues();
		const user = await crud.insertDb('users', keys, values);
		res.status(201).send(`Usuario registrado con exito`);
	} catch (err) {
		res.status(400).send('error');
	}
});
//*-----------------------Login OK!
router.post('/login', async (req, res) => {
	try {
		const userData = await repository.validateUser(req);
		if (userData.status == true) {
			let tk = await authRepo.token(req, userData);
			res.status(200).send(tk);
		} else res.status(409).json('Usuario o constraseña inválidos');
	} catch (err) {
		res.status(400).send('error');
	}
});
//*----------------------- UserData OK!
router.get('/misDatos', authRepo.authenticateToken, async (req, res) => {
	try {
		const user = await crud.findByColumn('users', 'id', req.auth.id, 'username, adress, mail, phone');
		res.status(200).send(user);
	} catch (err) {
		res.status(400).send('error');
	}
});
//*-----------------------cambiar datos de usuario OK!
router.put('/misDatos', authRepo.authenticateToken, async (req, res) => {
	try {
		let string = req.body.stringSET();
		await crud.updateDb('users', string, 'id', req.auth.id);
		res.status(200).send(`Cambio realizado ${string}`);
	} catch (err) {
		res.status(400).send('error');
	}
});
//*----------------------- Get all users OK!
const adminMiddlewares = [ authRepo.authenticateToken, authRepo.isAdmin ];
router.get('/admin/users', adminMiddlewares, async (req, res) => {
	try {
		const users = await crud.getAll('users');
		res.status(200).send(users);
	} catch (err) {
		res.status(400).send('error');
	}
});
//*----------------------- Create admin user OK!
const newAdmin = [
	authRepo.authenticateToken,
	authRepo.isAdmin,
	repository.validateExistingUser,
	authRepo.hashedPassword
];
router.post('/admin/register', newAdmin, async (req, res) => {
	try {
		req.body.is_admin = 1;
		let keys = req.body.stringKeys();
		let values = req.body.stringValues();
		const user = await crud.insertDb('users', keys, values);
		res.status(201).send(`Usuario registrado con exito`);
	} catch (err) {
		res.status(400).send('error');
	}
});
module.exports = router;
