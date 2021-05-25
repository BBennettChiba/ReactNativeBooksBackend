require('dotenv').config()

// console.log(process.env)
module.exports = {
   "type": "postgres",
   "host": process.env.NODE_ENV==='DEVELOPMENT' ? process.env.DEV_HOST : process.env.RDS_HOSTNAME,
   "port": process.env.NODE_ENV==='DEVELOPMENT' ? process.env.DEV_PORT : process.env.RDS_PORT,
   "username": "postgres",
   "password": process.env.NODE_ENV==='DEVELOPMENT' ? process.env.DEV_PASSWORD : process.env.RDS_PASSWORD,
   "database": process.env.NODE_ENV==='DEVELOPMENT' ? process.env.DEV_DATABASE : "",
   "synchronize": true,
   "logging": false,
   "entities": ["./src/entity/*{.js,.ts}"],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   },
   "migrationsRun": true
}