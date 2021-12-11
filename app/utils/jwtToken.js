const sendToken = (user,statusCode,res) =>{
    const token = user.getJwtToken();

    const options ={
        expires:new Date(
            Date.now() + process.env.COOKEI_EXPIRES 
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user
    })
   

}
module.exports = sendToken;