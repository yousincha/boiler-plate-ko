const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//salt를 이용해 암호화
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    //trim은 space를 없애주는 역할
    trim: true,
    //똑같은 이메일을 사용하지 못하도록
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  //관리자인지 일반유저인지 판단 하도록 도와줌
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  // 토큰 유효기간
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  //비밀번호가 변환될 때만
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainpassword가 1234567 암호화된 비밀번호$2b$1481v..가 맞는지 확인
  //복호화 할 수 없음
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    //비밀번호가 다르다면
    if (err) return cb(err);
    //비밀번호가 같다면
    else cb(null, isMatch);
  });
};
userSchema.methods.generateToken = function (cb, res) {
  var user = this;
  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user
    .save()
    .then(() => {
      return cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  //user._id + '' = token
  //토큰을 decode 한다.
  jwt.verify(token, "secretToken", (err, decoded) => {
    //유저 아이디를 이용해서 유저를 찾은 다음
    //클라이언트에서 가져온 token과 DB에 보관된 토근이 일치하는지확인
    user
      .findOne({ _id: decoded, token: token })
      .then((user) => {
        cb(null, user);
      })
      .catch(function (err) {
        return cb(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

//다른 파일에서도 사용할 수 있도록 도와줌
module.exports = { User };
