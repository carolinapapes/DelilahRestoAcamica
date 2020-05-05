const configuration = require('../configuration.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(configuration.mySql);

// methods
Object.prototype.stringKeys = function() {
	return Object.keys(this).join(', ');
};

Object.prototype.stringValues = function() {
	let comillas = "'";
	return comillas + Object.values(this).join("', '") + comillas;
};

Object.prototype.stringSET = function() {
	console.log(1);
	let keys = Object.keys(this);
	let values = Object.values(this);
	let sqlString = '';
	for (var i = 0; i < keys.length; i++) {
		if (i > 0) sqlString += ', ';
		sqlString += keys[i] + ' = ' + "'" + values[i] + "'";
	}
	return sqlString;
};

//*-----------------------Insert1 OK!
async function insertDb(table, keys, values) {
	let result = await sequelize.query(`INSERT INTO ${table} (${keys}) VALUES (${values})`, {});
	return result;
}
//insert tipo 2
async function insertDb2(table, sqlString) {
	let result = await sequelize.query(`INSERT INTO ${table} SET ${sqlString}`);
	return result;
}
//*-----------------------Update OK!
async function updateDb(table, valuesAndKeys, conditionOne, conditionTwo) {
	let result = await sequelize.query(
		`UPDATE ${table} SET ${valuesAndKeys} WHERE  ${conditionOne} = '${conditionTwo}'`
	);
	return result;
}
//*-----------------------Seleccionar OK!
async function findByColumn(table, conditionOne, conditionTwo, columnsToShow = '*') {
	const result = await sequelize.query(
		`SELECT ${columnsToShow} FROM ${table} WHERE ${conditionOne} = '${conditionTwo}';`,
		{
			type: Sequelize.QueryTypes.SELECT
		}
	);
	return result;
}
//*-----------------------Seleccionar todo OK!
async function getAll(table) {
	const products = await sequelize.query(`SELECT * FROM ${table}`, { type: Sequelize.QueryTypes.SELECT });
	return products;
}

module.exports = {
	Object,
	insertDb,
	findByColumn,
	updateDb,
	getAll
};
