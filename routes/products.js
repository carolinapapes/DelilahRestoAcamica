const express = require('express');
const router = express.Router();
const auth = require('../repository/auth');
const crud = require('../repository/crud');

//*-----------------LISTAR PRODUTOS EXISTENTES ok!
router.get('/productos', async function(req, res) {
	try {
		const getProd = await crud.findByColumn('productos', 'is_deleted', 0);
		res.status(200).send(getProd);
	} catch (err) {
		res.status(404);
	}
});
//*----------------CREAR PRODUCTOS ok!
const adminMiddlewares = [ auth.authenticateToken, auth.isAdmin ];
router.post('/productos', adminMiddlewares, async function(req, res) {
	try {
		let keys = req.body.stringKeys();
		let values = req.body.stringValues();
		const user = await crud.insertDb('productos', keys, values);
		res.status(201).send(`Producto registrado con exito`);
	} catch (err) {
		res.status(400).send('error');
	}
});
//*---------------Producto por id OK!
router.get('/productos/:id', async function(req, res) {
	try {
		const producto = await crud.findByColumn('productos', 'id', req.params.id);
		let result;
		if (producto[0].is_deleted == 1) result = 'El producto ha sido eliminado';
		else result = producto;
		res.status(200).send(result);
	} catch (err) {
		res.status(400).send('error');
	}
});
//*---------------Modificar productos OK!
router.put('/productos/:id', adminMiddlewares, async function(req, res) {
	try {
		const string = req.body.stringSET();
		await crud.updateDb('productos', string, 'id', req.params.id);
		res.status(201).send(`Cambio realizado ${string}`);
	} catch (err) {
		res.status(404).send('error');
	}
});

//*---------------Eliminar productos OK!
router.delete('/productos/:id', adminMiddlewares, async function(req, res) {
	try {
		const string = 'is_deleted = 1';
		await crud.updateDb('productos', string, 'id', req.params.id);
		res.status(201).send(`Se elimino el producto`);
	} catch (err) {
		res.status(404).send('error');
	}
});

module.exports = router;
