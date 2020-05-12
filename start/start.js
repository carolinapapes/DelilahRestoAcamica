const express = require('express');
const router = express.Router();
const crud = require('../repository/crud');
const authRepo = require('../repository/auth');
const configuration = require('../configuration.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(configuration.mySql);

router.post('/nuevoPedido', authRepo.authenticateToken, async function(req, res) {
	try {
		let total = 0;
		let productos = req.body.productos;
		for (let elem of productos) {
			let precio = await crud.findByColumn('productos', 'id', elem.productos_id, 'price');
			elem.precio = precio[0].price;
			total += precio[0].price * parseInt(elem.cantidad);
		}
		const pedido = await crud.insertDb(
			'pedidos',
			'users_id, pagos_id, total',
			`${req.auth.id},
			${req.body.pagoId},
			${total}`
		);
		for (let elem of productos) {
			keys = elem.stringKeys() + ', pedidos_id';
			values = elem.stringValues() + `, '${pedido[0]}'`;
			await crud.insertDb('detalle', keys, values);
		}
		res.status(201).send(`Se genero pedido por un total de: $${total}`);
	} catch (err) {
		res.status(400).send('error');
	}
});
const adminMiddlewares = [ authRepo.authenticateToken, authRepo.isAdmin ];
router.get('/pedidos', authRepo.authenticateToken, async function(req, res) {
	let where = 'WHERE pedidos.is_deleted = 0';

	if (req.auth.is_admin == 0) {
		where = `WHERE users.id = ${req.auth.id} AND pedidos.is_deleted = 0`;
	}

	try {
		let result = await sequelize.query(
			`SELECT estados.instancia AS 'estado', pedidos.created_at AS 'hora y dia', pedidos.id AS 'numero' ,  group_concat(CONCAT(detalle.cantidad,'x',SUBSTRING(REPLACE(productos.title,' ',""), 1,7)) SEPARATOR " " ) AS 'detalle', pagos.instancia AS 'pago', pedidos.total, users.username AS 'usuario', users.adress AS 'direccion' FROM pedidos JOIN estados ON estados.id = pedidos.estados_id JOIN detalle ON detalle.pedidos_id = pedidos.id JOIN productos ON productos.id = detalle.productos_id JOIN pagos ON pagos.id = pedidos.pagos_id JOIN users ON users.id=pedidos.users_id  ${where} GROUP BY pedidos.id; `,
			{
				type: Sequelize.QueryTypes.SELECT
			}
		);
		for (let i = 0; i < result.length; i++) {
			id = result[i].numero;
			prod = await sequelize.query(
				`SELECT productos.title, detalle.precio, cantidad FROM detalle JOIN productos on productos.id = detalle.productos_id WHERE detalle.pedidos_id = ${id};`,
				{
					type: Sequelize.QueryTypes.SELECT
				}
			);
			user = await sequelize.query(
				`SELECT users.phone, users.mail, users.fullname FROM users JOIN pedidos on users.id = pedidos.users_id WHERE pedidos.id = ${id};`,
				{
					type: Sequelize.QueryTypes.SELECT
				}
			);
			result[i].detalleProd = prod;
			result[i].detalleUser = user;
		}

		res.status(200).send(result);
	} catch (error) {
		res.status(404).send('error');
	}
});
router.put('/admin/pedidos/:id', adminMiddlewares, async function(req, res) {
	try {
		await crud.updateDb('pedidos', `estados_id = '${req.body.status}'`, 'id', req.params.id);

		res.status(201).send('cambio exitoso');
	} catch (err) {
		res.status(400).send('error');
	}
});

router.put('/admin/pedidos/:id/delete', adminMiddlewares, async function(req, res) {
	try {
		const string = 'is_deleted = 1';
		await crud.updateDb('pedidos', string, 'id', req.params.id);
		res.status(201).send(`Se elimino el pedido`);
	} catch (err) {
		res.status(404).send('error');
	}
});

module.exports = router;
