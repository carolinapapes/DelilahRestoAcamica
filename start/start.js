const configuration = require('../configuration.json');
const crud = require('../repository/crud');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(configuration.mySqlStart);
const bcrypt = require('bcrypt');

let productos = [
	{
		title: 'Ravioles de carne y verdura',
		description: 'Incluye salsa a elección, pan y queso rallado.',
		img: 'https://images.deliveryhero.io/image/pedidosya/products/1131315_2014917164250.jpg?quality=80&width=500',
		price: 300
	},
	{
		title: 'Milanesa de ternera napolitana con papas bastón',
		description: 'Adicional a la guarnición.',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/null_016f9de2-9ec7-419d-b6f6-885b48692798_20171025084410984.jpg?quality=80&width=500',
		price: 460
	},
	{
		title: 'Pascualina de verdura',
		description: 'Porción',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/null_8e3bd169-8dd2-4239-8bd3-0761a3fef9ca_20171025084446628.jpg?quality=80&width=500',
		price: 210
	},
	{
		title: 'Tiramisú',
		description: 'Adicional crema',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/818135-2847292a-d705-4692-82df-22aba5cb2432.jpg?quality=80&width=500',
		price: 95
	},
	{
		title: 'Rabas',
		description: 'Porción',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/null_e8e993fb-230b-4568-b1f4-461be84b0fe8_20171025084533489.jpg?quality=80&width=500',
		price: 420
	},
	{
		title: 'Salmón rosado',
		description: 'Con puré de papas y rúcula al oliva',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/null_523b2182-5adb-4936-8a32-b9380742de20_20171025084542615.jpg?quality=80&width=500',
		price: 720
	},
	{
		title: 'Tarta de cebolla y queso',
		description: 'Porción',
		img: 'https://images.deliveryhero.io/image/pedidosya/products/1131272_2014917164530.jpg?quality=80&width=200',
		price: 195
	},
	{
		title: 'Ensalada clásica',
		description: 'Lechuga, tomate, zanahoria y huevo.',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/null_a81a5b17-8432-4ece-a91e-f842a6db6451_20171025084301223.jpg?quality=80&width=500',
		price: 275
	},
	{
		title: 'Mousse de chocolate',
		description: 'Porción',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/null_5897cc9f-704d-4d57-bb99-4ced3a91b15f_20171025084425346.jpg?quality=80&width=500',
		price: 130
	},
	{
		title: 'Pollo solo',
		description: 'Opción spiedo al mediodia a partir de las 12.00',
		img:
			'https://images.deliveryhero.io/image/pedidosya/products/818139-ee63c72c-971e-40b6-8198-8aed4257e139.jpg?quality=80&width=500',
		price: 390
	}
];
let usuarios = [
	{
		username: 'admin',
		password: 'admin',
		fullname: 'admin',
		adress: 'admin',
		mail: 'admin@gmail.com',
		phone: '3417833992',
		is_admin: '1'
	},
	{
		username: 'anita',
		password: 'anita',
		fullname: 'Ana Perez',
		adress: 'Montevide 1840 Piso 11 Depto 1',
		mail: 'anita@gmail.com',
		phone: '341178907'
	},
	{
		username: 'bren',
		password: 'bren',
		fullname: 'Brenda Lopez',
		adress: 'Santa Fe 1000',
		mail: 'brena@gmail.com',
		phone: '341922883'
	},
	{
		username: 'estefi',
		password: 'estefi',
		fullname: 'Estefania Gonzalez',
		adress: 'Alvear 2002 Piso 3 Depto b',
		mail: 'estefi@gmail.com',
		phone: '341900884'
	},
	{
		username: 'franco',
		password: 'franco',
		fullname: 'Franco Fernandez',
		adress: 'Av. del Huerto 650 Piso 15 Depto c',
		mail: 'francoa@gmail.com',
		phone: '341900337'
	},
	{
		username: 'mara',
		password: 'mara',
		fullname: 'Mara DiMaria',
		adress: 'Dorrego 349 Piso 4 Depto 3',
		mail: 'mara@gmail.com',
		phone: '3410090786'
	},
	{
		username: 'ire',
		password: 'ire',
		fullname: 'Irene Bielsa',
		adress: 'Calle 32 860',
		mail: 'ire@gmail.com',
		phone: '3419903452'
	},
	{
		username: 'mica',
		password: 'mica',
		fullname: 'Micaela Jimenez',
		adress: 'Balcarse 1624 Piso 1',
		mail: 'mica@gmail.com',
		phone: '3416854275'
	},
	{
		username: 'rafa',
		password: 'rafa',
		fullname: 'Rafael Lencina',
		adress: 'San Juan 529 Piso 12 Depto E',
		mail: 'rafa@gmail.com',
		phone: '3419088766'
	},
	{
		username: 'marian',
		password: 'marian',
		fullname: 'Mariano Rodriguez',
		adress: 'Paraguay 2020 Piso 1 Depto 6',
		mail: 'marian@gmail.com',
		phone: '341144202'
	}
];
let pedidos = [
	{
		usuarioId: '10',
		pagoId: '1',
		productos: [
			{
				productos_id: 1,
				cantidad: 3
			},
			{
				productos_id: 4,
				cantidad: 6
			},
			{
				productos_id: 6,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '3',
		pagoId: '2',
		productos: [
			{
				productos_id: 4,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '9',
		pagoId: '2',
		productos: [
			{
				productos_id: 3,
				cantidad: 6
			},
			{
				productos_id: 8,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '5',
		pagoId: '1',
		productos: [
			{
				productos_id: 7,
				cantidad: 3
			}
		]
	},
	{
		usuarioId: '2',
		pagoId: '3',
		productos: [
			{
				productos_id: 4,
				cantidad: 1
			},
			{
				productos_id: 3,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '6',
		pagoId: '2',
		productos: [
			{
				productos_id: 7,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '4',
		pagoId: '3',
		productos: [
			{
				productos_id: 8,
				cantidad: 1
			},
			{
				productos_id: 8,
				cantidad: 1
			},
			{
				productos_id: 2,
				cantidad: 1
			},
			{
				productos_id: 7,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '6',
		pagoId: '2',
		productos: [
			{
				productos_id: 1,
				cantidad: 1
			}
		]
	},
	{
		usuarioId: '8',
		pagoId: '2',
		productos: [
			{
				productos_id: 5,
				cantidad: 1
			}
		]
	}
];

async function agregarProductos(req) {
	try {
		let keys = req.stringKeys();
		let values = req.stringValues();
		const products = await crud.insertDb('productos', keys, values);
	} catch (err) {
		console.log('error');
	}
}

async function agregarUsuarios(req) {
	try {
		let keys = req.stringKeys();
		let values = req.stringValues();
		const users = await crud.insertDb('users', keys, values);
	} catch (err) {
		console.log(401);
	}
}
async function agregarPedidos(req) {
	for (let x = 0; x < req.length; x++)
		try {
			let total = 0;
			for (let i = 0; i < req[x].productos.length; i++) {
				let precio = await crud.findByColumn('productos', 'id', req[x].productos[i].productos_id, 'price');
				req[x].productos[i].precio = precio[0].price;
				total += precio[0].price * parseInt(req[x].productos[i].cantidad);
			}
			const pedido = await crud.insertDb(
				'pedidos',
				'users_id, pagos_id, total',
				`${req[x].usuarioId},
			${req[x].pagoId},${total}`
			);
			for (let i = 0; i < req[x].productos.length; i++) {
				keys = req[x].productos[i].stringKeys() + ', pedidos_id';
				values = req[x].productos[i].stringValues() + `, '${pedido[0]}'`;
				await crud.insertDb('detalle', keys, values);
			}
			console.log(`Se genero pedido por un total de: $${total}`);
		} catch (err) {
			console.log('error');
		}
}
async function Run() {
	await sequelize.query('CREATE DATABASE delilah');
	await sequelize.query('USE delilah');
	await sequelize.query(
		'CREATE TABLE pagos( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, instancia VARCHAR (16) NOT NULL UNIQUE)'
	);
	await sequelize.query(
		'CREATE TABLE estados (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, instancia VARCHAR (16) NOT NULL UNIQUE)'
	);
	await sequelize.query(
		`INSERT INTO estados (instancia) VALUES ('Nuevo'), ('Confirmado'), ('Preparando'), ('Enviado'), ('Entregado');`
	);
	await sequelize.query(`INSERT INTO pagos (instancia) VALUES ('Tarjeta'), ('Efectivo'), ('Mercado Pago');`);

	await sequelize.query(
		'CREATE TABLE users ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR (16) NOT NULL UNIQUE, password VARCHAR (200) NOT NULL, fullname VARCHAR (25) NOT NULL, adress VARCHAR (100) NOT NULL, mail VARCHAR(25) NOT NULL UNIQUE, phone INT UNSIGNED NOT NULL, is_admin BOOLEAN DEFAULT 0)'
	);

	await sequelize.query(
		'CREATE TABLE productos ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, title VARCHAR(200) NOT NULL, description VARCHAR(400) NOT NULL, img VARCHAR(400) NOT NULL, price INT NOT NULL, is_deleted BOOLEAN DEFAULT 0)'
	);

	await sequelize.query(
		'CREATE TABLE pedidos ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, estados_id INT NOT NULL DEFAULT 1, users_id INT NOT NULL, pagos_id INT NOT NULL, total int not null, created_at TIMESTAMP NULL DEFAULT NOW(), FOREIGN KEY(estados_id) REFERENCES estados(id), FOREIGN KEY(users_id) REFERENCES users(id), FOREIGN KEY(pagos_id) REFERENCES pagos(id))'
	);

	await sequelize.query(
		'CREATE TABLE detalle (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, pedidos_id INT NOT NULL, productos_id INT NOT NULL, cantidad int NOT NULL, precio int NOT NULL, FOREIGN KEY(pedidos_id) REFERENCES pedidos(id), FOREIGN KEY(productos_id) REFERENCES productos(id));'
	);

	for (let i = 0; i < productos.length; i++) {
		await agregarProductos(productos[i]);
		console.log('Producto agregado');
	}

	for (let i = 0; i < usuarios.length; i++) {
		let pass = usuarios[i].password;
		usuarios[i].password = await bcrypt.hash(pass, 10);
		await agregarUsuarios(usuarios[i]);
		console.log('Usuario agregado');
	}

	await agregarPedidos(pedidos);
}
Run();
