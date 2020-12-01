require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
// yarn add pg pg-hstore
// para instalar o postgres : docker run --name database -e POSTGRES_PASSAWORD=docker -p 5432:5432 -d postgres:11
