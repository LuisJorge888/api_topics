const mariadb = require('mariadb');

const db = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

async function testConnection() {

  let conn;

  try {

	conn = await db.getConnection();
	const rows = await conn.query("SELECT 1 as val");
    console.table(rows);
  } finally {
	if (conn) conn.release(); //release to pool
  }
}

module.exports = {
    testConnection,
    db
}