const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yuyoungsu5582:!Phantom0308@cluster0.sdw69.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser : true, useUnifiedTopology : true
    }
).then(()=> console.log('MongoDB connected..'))
.catch(err=>console.log(err))



app.get('/',(req,res) => res.send('Hello world'))


app.listen(port,()=> console.log(`Example app listening on port ${port}!`))
