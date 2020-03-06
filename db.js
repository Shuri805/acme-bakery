const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme-bakery');

client.connect();

const sync = async()=>{
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS chefs;
  DROP TABLE IF EXISTS recipes;
  CREATE TABLE chefs(
    id UUID PRIMARY KEY default
    uuid_generate_v4(),
    name VARCHAR(225) NOT NULL UNIQUE
    CHECK (char_length(name) > 0)
  );
  CREATE TABLE recipes(
    id UUID PRIMARY KEY default
    uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    CHECK (char_length(name) > 0)
  );
  `;
  await client.query(SQL);
}

// const createChef = async(chef) => {
//   const SQL = 'insert into chefs(name) values ($1)';
//}


module.exports = {
  sync
}
