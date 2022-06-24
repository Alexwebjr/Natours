const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'An user must have a name'],
    trim: true,
    maxlength: [40, 'An user must have less o equal than 40 characters'],
    minlenght: [4, 'An user must have more o equal than 4 characters'],
  },
  email: {
    type: String,
    require: [true, 'An user must have a email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user',
  },
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    trim: true,
    minlenght: [8, 'Password must have more o equal than 4 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm your password'],
    trim: true,
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//Encript Password before save
userSchema.pre('save', async function (next) {
  //only run is psw was actually modified
  if (!this.isModified('password')) return next();

  //Hash the psw with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete psw confirm
  this.passwordConfirm = undefined;
  next();
});

//After reset password
userSchema.pre('save', function (next) {
  if (!this.isModified('passowrd') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //-1000 to avoid token be create before psw changed
  next();
});

//Filter users
userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

//Instant Method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); //get in seconds
    return JWTTimestamp < changedTimestamp;
  }
  //Means NOT change
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  //encrypt random token
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //now + 10min
  return resetToken;
};

//Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
