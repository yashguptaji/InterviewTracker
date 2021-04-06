const mongoose= require('mongoose');
const {isEmail}= require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Pls enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail,"Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true,"Pls enter ur password"],
        minlength: [6,"minimum password length is 6 characters"]
    },
});

//hash the password
userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//static method to login user
userSchema.statics.login =async function(email,password){
    const user = await this.findOne({email:email});
    if(user){
       const auth = await bcrypt.compare(password,user.password);   //assigns a boolean value
       if(auth)
       {
           return user;
       }
       throw Error('incorrect password');
    }
    throw Error('incorrect email');
};
const User = mongoose.model('user',userSchema);

module.exports= User;