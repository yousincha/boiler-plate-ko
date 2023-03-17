const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/',(req, res) => res.send('Hello World! ~~기분 거지같네~~'))
    

app.post("/register", function(req, res){
    const user = new User(req.body)

    user.save().then(()=>{
        res.send("success: true");
    }).catch((err)=>{
        res.send("success: false");
    })
});
/*
app.post('/register',(req, res)=>{

    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))