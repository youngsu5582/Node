const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

const { User } = require('./models/User')
const {auth} = require('./middleware/auth')
const { mongoURI } = require('./config/dev')
const config = require('./config/key');

//app이 bodyParser 사용 가능하게 해줌 (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({extended: true}))

//app이 json 사용 가능하게 해줌
app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect( config.mongoURI ,
    {
        useNewUrlParser : true, useUnifiedTopology : true
    }
).then(()=> console.log('MongoDB connected..'))
.catch(err=>console.log(err))



app.get('/',(req,res) => res.send('Hello world'))

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,doc)=>{
        if(err) return res.json({success : false,err})
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/api/users/login',(req,res)=>{
    
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess : false,
                message : "해당 Email X"

            })
        }
        user.comparePassword(req.body.password , (err,isMatch)=>{
            if(!isMatch)
                return res.json({loginSuccess : false,  message:"비밀번호 틀림"})
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
            res.cookie("x_auth",user.token).status(200)
            .json({loginSuccess:true,userId:user._id})
            })
        })
    })
})



app.get('/api/users/auth',auth,(req,res)=>{
    //여기까지 왔다는건 middleware auth에서 문제가 없었음
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})
app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
        if(err)return res.json({success:false,err});
        return res.status(200).send({
            success:true
        })
    })
})

app.listen(port,()=> console.log(`Example app listening on port ${port}!`))
