/* //? History
1. Create User model
2. Create method: singup, add to route, and create a user
3. Validate schema: passwor confirm. //validate only on save
4. Encrip Psw with Mongoose Mdd (npm i bcryptjs)
5. Install jsonwebtoken
6. Generate token and function correctPassword
7. Create method: protect and set token header. Promisity
8. Set JWTerror handler
9. Protecting Routes
10. Advanced postman setup
11. Auth roles/permissions
12. Reset/forgot password
13. npm i nodemailer
14. Reset Password
15. Updating Current User
16.Delete / Query Middelware
17.Cookie
18.Expres-rate-limit / Security HTTP Headers
19.Data Sanitization / Parameter Pollution

*/

/* //?========== VALIDATE ENCRYPT PASSWORD CONFIRM ==============
 //* Password Confirm
 validate: {
      *This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
    },

------------npm i bcryptsjs
 userSchema.pre('save', async function (next) {
  //* only run is psw was actually modified
  if (!this.isModified('password')) return next();

  //*Hash the psw with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //*Delete psw confirm
  this.passwordConfirm = undefined;
  next();
});

 */

/*============= JWT ===========
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  //* jwt.sign(payload, secret, config)
  //* payload = obj.id
  //* secre = custom string
  //* config = expiresIn: 90d|5h|3m|2s

*/

/*============ correctPassword ==============
//*Model
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//*Auth controller
if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

*/

/*============ Verify Token ============

exports.protect = catchAsync(async (req, res, next) => {
  //? 1) Getting token and check
  let token;
  if (req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('Your are not logged in! Please log in to get access.', 401)
    );
  }
  //? 2) Verification token
  //*Use promisify to use promises as an async func
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //? 3) Check if user still exists
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The token belonging to this user does no longer exist.',
        401
      )
    );
  }

  //? 4) Check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

*/

/*=========== JWTError handler ============

//* errorController
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);


...
if (error.name === 'JsonWebTokenError') error = handleJWTError();
if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

*/

/*=========== POSTMAN ENV ================ 
//? 1. Set Env
{{URL}} to print

//? 2. Set jwt default
pm.environment.set("jwt", pm.response.json().token);
*/

/*=========== Restrict Route =========== 
//* Controller
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    //roles['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };

  //*Route
  router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
*/

/*=========== Nodemailer ============
//? email.js:

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1. Create a transporter
  const transporter = nodemailer.createTransport({
    //service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2. Define the email options
  const mailOptions = {
    from: 'Alex Web <mail@alexwebjr.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  //3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;


//? Controller func

 const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and
  passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;


await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

*/

/*=========== Cookie ============

const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

*/

/*=========== Expres Rare Limit / Security HTTP Headers ============
npm i helmet
npm i express-rate-limit

app.use(helmet());


const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //time
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

*/

/*=========== Data Sanitization / Parameter Pollution ============
npm i express-mongo-sanitize
npm i xss-clean
npm i hpp

app.use(mongoSanitize());
app.use(xss());
app.use(hpp()); Or

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ], //allowList
  })
);

*/
