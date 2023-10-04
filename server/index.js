const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const cors = require("cors"); // cors 모듈 추가
app.use(cors({ origin: "*" }));
app.use(cors({ origin: "http://localhost:3000" })); // React 앱의 주소로 설정

// CORS 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인에서 접근 가능하도록 설정 (실제 환경에서는 '*' 대신 특정 도메인을 지정)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
const { Router } = require("express");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello?"));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

app.post("/api/users/register", (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send("success: true");
    })
    .catch((err) => {
      res.send("success: false");
    });
});

app.post("/api/users/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      //요청된 이메일이 데이터베이스에 있다면 비밀번호가 같은지 찾는다.
      user.comparePassword(password, (err, isMath) => {
        //비밀번호가 다르다면 에러 메시지 생성
        if (!isMath)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        //비밀번호까지 같다면 토큰을 생성한다.
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          //토큰을 쿠키, 로컬스토리지에 저장
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch(function (err) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    });
});

// role 1 어드민 role2 특정부서 어드민
// role 0 일반유저 role0이 아니면 관리자

app.get("/auth", auth, (req, res) => {
  //미들웨어를 통과 == Authentication True
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then((user) => {
      return res.status(200).send({
        success: true,
      });
    })
    .catch(function (err) {
      return res.json({ success: false, err });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
