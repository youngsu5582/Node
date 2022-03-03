const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const { mongoURI } = require('./config/dev')
const config = require('./config/key');

//app이 bodyParser 사용 가능하게 해줌 (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({extended: true}))

//app이 json 사용 가능하게 해줌
app.use(bodyParser.json());

mongoose.connect( config.mongoURI ,
    {
        useNewUrlParser : true, useUnifiedTopology : true
    }
).then(()=> console.log('MongoDB connected..'))
.catch(err=>console.log(err))



app.get('/',(req,res) => res.send('Hello world'))

app.post('/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,doc)=>{
        console.log(err)
        if(err) return res.json({success : false,err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port,()=> console.log(`Example app listening on port ${port}!`))
