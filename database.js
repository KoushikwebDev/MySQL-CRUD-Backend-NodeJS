import mysql from "mysql2";

//? Create Pool 🚀🚀🚀

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "New_Demo_Schema",
//   password: "Kmysql@123",
// });

// export default pool.promise();

//? Create Connection 🚀🚀🚀

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "New_Demo_Schema",
  password: "Kmysql@123",
});

export default db;
