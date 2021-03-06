CREATE DATABASE delilah;
USE delilah;
CREATE TABLE pagos( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, instancia VARCHAR (16) NOT NULL UNIQUE);
CREATE TABLE estados (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, instancia VARCHAR (16) NOT NULL UNIQUE);
INSERT INTO estados (instancia) VALUES ('Nuevo'), ('Confirmado'), ('Preparando'), ('Enviado'), ('Entregado'), ('Cancelado');
INSERT INTO pagos (instancia) VALUES ('Tarjeta'), ('Efectivo'), ('Mercado Pago');
CREATE TABLE users ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR (16) NOT NULL UNIQUE, password VARCHAR (200) NOT NULL, fullname VARCHAR (25) NOT NULL, adress VARCHAR (100) NOT NULL, mail VARCHAR(25) NOT NULL UNIQUE, phone INT UNSIGNED NOT NULL, is_admin BOOLEAN DEFAULT 0);
CREATE TABLE productos ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, title VARCHAR(200) NOT NULL, description VARCHAR(400) NOT NULL, img VARCHAR(400) NOT NULL, price INT NOT NULL, is_deleted BOOLEAN DEFAULT 0);
CREATE TABLE pedidos ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, estados_id INT NOT NULL DEFAULT 1, users_id INT NOT NULL, pagos_id INT NOT NULL, total int not null, created_at TIMESTAMP NULL DEFAULT NOW(), is_deleted INT NOT NULL DEFAULT 0, FOREIGN KEY(estados_id) REFERENCES estados(id), FOREIGN KEY(users_id) REFERENCES users(id), FOREIGN KEY(pagos_id) REFERENCES pagos(id));
CREATE TABLE detalle (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, pedidos_id INT NOT NULL, productos_id INT NOT NULL, cantidad int NOT NULL, precio int NOT NULL, FOREIGN KEY(pedidos_id) REFERENCES pedidos(id), FOREIGN KEY(productos_id) REFERENCES productos(id));
