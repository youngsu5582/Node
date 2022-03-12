const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name:{
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1 
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname: {
        type : String,
        maxlength:50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})
const saltRounds = 10
userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err) return next(arr);
        bcrypt.hash(user.password,salt,function(err,hash){
            user.password = hash
            next()
        });
    });
}
else {next()}
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, (err,isMatch)=>{
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(this._id.toHexString(),'secretToken')
    user.token = token
    
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    }) 
} 
userSchema.statics.findByToken = function(token,cb){
    
    jwt.verify(token , 'secretToken',function(err,decoded){
        //User Id 를 이용하여 User 찾은 후,
        //Client에 가져온 token과 DB에 보관된 토근에 일치하는지 확인
        if(err)return cb(err);
        User.findOne({"_id":decoded,"token":token},function(err,user){
            if(err)return cb(err);
            cb(null,user)
        })
    })   
}

const User = mongoose.model('User',userSchema)

module.exports = {User}