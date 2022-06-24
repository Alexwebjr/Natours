/* //------------------     ENV   -------------------//
1. npm run dev: "SET NODE_ENV=development&&nodemon server.js"
2. config.env | dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

console.log(process.env.PORT);

*/
