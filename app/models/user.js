const {model,Schema} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new Schema ({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate:[validator.isEmail,'Please enter valid email'],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'your password must be longer than 6 digits']

    }
    
},
{timestamps:true}
);

userSchema.pre('save',async function (next){
 if(!this.isModified('password')){
     next()
 }
 this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRES
    })

}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = model("User",userSchema)