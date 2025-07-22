import mysql from 'mysql';
import util from 'util';

// Retrieve environment variables
const { BASE_URL, LOCALHOST_PASSWORD, LOCALHOST_DB, DB_USER, NODE_ENV } = process.env;

const connectionPoolConfig = {
  development: {
    connectionLimit: 10,
    host: BASE_URL,
    user: DB_USER,
    password: LOCALHOST_PASSWORD,
    database: LOCALHOST_DB,
  },
};

// Determine the current environment
const environment = NODE_ENV || 'development';

// Create the connection pool
const connectionPool = mysql.createPool(connectionPoolConfig[environment]);

// Promisify the query function
connectionPool.query = util.promisify(connectionPool.query);

// Export the connection pool
export default connectionPool;
