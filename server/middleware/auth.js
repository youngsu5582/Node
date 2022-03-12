const {User} = require('../models/User')

let auth = (req,res,next)=>{
    //인증 처리

    //Client에서 쿠키 가져옴
    let token = req.cookies.x_auth;
    //토큰 복호화 한후 유저 찾음
    User.findByToken(token,(err,user)=>{
        
        if(err)throw err;
        if(!user)return res.json({isAuth:false,error:true})
        req.token=token;
        req.user = user;
        next();
    })
}
module.exports = {auth};