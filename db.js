const pg = require ('pg');
const {Pool} = pg;

let localPoolConfig = {
    user:'postgres',
    password:'furqan',
    host:'localhost',
    port:'5432',
    database:'jwt'
};

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
} : localPoolConfig;

const pool = new Pool(poolConfig);
module.exports = pool;
