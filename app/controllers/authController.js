const User = require('../models/user');
const sendToken = require('../utils/jwtToken')
//register
exports.register=async(req,res)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

   sendToken(user,200,res);
 

}
//login
exports.login = async (req,res,next) =>{
 const {email,password} =req.body;

 if(!email || !password){
     return next('please enter email and password',400)
 }
 const user = await User.findOne({email}).select('+password')

 if(!user){
     return next('invalid email or password',401);

 }
 const isPassword = await user.comparePassword(password);

 if(!isPassword){
     return next('invalid email or password',401);

 }
 sendToken(user,200,res);
}
//logout
exports.logout=async(req,res,next)=>{

    res.cookie('token',null, {
        exprires:new Date(Date.now())
    })

    res.status(200).json({
        success:true,
        message:'logout successfully'
    })

}
