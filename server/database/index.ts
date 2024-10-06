import mysql2 from "mysql2/promise"

const sql = await  mysql2.createPool({
    host : "localhost",
    user : "root",
    database : "pricetracker",
    password : "carlos15",
    port : 3306,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
})



export default sql