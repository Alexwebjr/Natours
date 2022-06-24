/* CAP 8
1. Connect DB
2. Install/import mongoose
3. Inicialice DB:

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD); connection string
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con =>{
  console.log(con.connection)
});

4. Create schema:

const tourSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: Number,
  price: :{
    type: String,
    required: [true, 'A tour must have a price']
  }

  or-----------JUST
  rating: Number

});

5. Create model:

const Tour = mongoose.model('Tour', tourSchema);

6. Using mongoose

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 498
});

testTour.save().then(doc => {
  console.log(doc);
}).catch(err => console.log('ERROR 💥!', err));


UPDATE
Tour.findByIdAndUpdate(req.params.id, req.body,{
  new: true, //return the newObj
  runValidators: true //validate the model
});

DELETE

*/
