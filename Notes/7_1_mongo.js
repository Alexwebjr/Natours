//------------------     MONGODB   -------------------//

/* // =============== COMMANDS ===============  //
use dbname        //use/create db
show dbs          //show all dbs
db.tours.insertOne(Object)        //db = current db, tours = collection/table, id it generate automatically
db.tours.insertMany(Array(Object))
db.tour.find({name: "jasjdjas"})    //shows all/one collections
db.tour.find({price: {$lte: 500}, rating: {$gte:4.8}})    //lte=less than equal  AND gte= greater than equal
db.tour.find({$or:[{price: {$lte: 500}}, {rating: {$gte:4.8}}]})    //lte  OR get
db.tour.find({$or:[...}, {name:1})    // only show id + namefield (Project)
db.tours.updateOne({query}, {$set: {property: value}) //only the first one, many= update all
db.tours.deleteMany({query})

// =============== ENV ===============  //
DATABASE="connection string" (Hosted)
DATABASE_LOCAL=mongodb://localhost:27017/natours (Local)
DATABASE_PASSWORD=*******


// =============== NPM I ===============  //
mongoose@5

*/

/* // =============== TOOLS ===============  //
 * Compass //App for CRUD operations
 * MongoDB Atlas // hosted DB
 */
