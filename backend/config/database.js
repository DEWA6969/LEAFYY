const mysql = require('mysql2');
require('dotenv').config({ path: './config.env' });

// Konfigurasi koneksi dasar
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306
};

// Nama database
const dbName = process.env.DB_NAME || 'leafyy';

// 1️⃣ Pastikan database ada (jika belum, buat baru)
const bootstrap = mysql.createConnection({ ...dbConfig });
bootstrap.query(
  `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
  (err) => {
    if (err) {
      console.error('❌ Database bootstrap error:', err.message);
    } else {
      console.log(`✅ Database '${dbName}' verified or created.`);
    }
    bootstrap.end();
  }
);

// 2️⃣ Buat connection pool global
const pool = mysql.createPool({
  ...dbConfig,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 3️⃣ Tes koneksi
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Database connected successfully!');
    connection.release();
  }
});

// 4️⃣ Ekspor pool promise agar bisa digunakan di controller
module.exports = pool.promise();
