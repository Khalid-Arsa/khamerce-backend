import mysql from "mysql2"
import { config } from "../config";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
})

module.exports = pool.promise()
