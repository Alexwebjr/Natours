/* //--------------------     API METHODS   ---------------------//

 // ===============  #1 ===============  //

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
  //.send('Hello from the server side');
});

// ===============  #2 ===============  //
 app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// ===============  #3 ===============  //
const userRouter = express.Router();
app.use('/api/v1/users', userRouter); //middleware
userRouter.route('/').get(getAllUsers).post(createUser);
 */
