/* //---------------------   MIDDLEWARES   ---------------------//

app.use((req, res, next)=>{
  //your change
  next(); **********IMPORTANT to continue!!
});

router.param('id', (req, res, next, val) => {
  if (Number(req.params.id) > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }
  next();
});

*/
