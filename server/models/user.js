const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_I = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    token:{
        type:String
    }
})
// run before SAVE is executed

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();  
    }
})
userSchema.methods.comparePassword = function(candidatePassword,cb){

    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    })
}
userSchema.methods.generateToken = function (cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'supersecret');
// supersecret must be put ouside the sourcecode, maybe some config file, put manualy inside our DB

user.token = token;
user.save(function(err,user){
    if(err) return cb(err);
    cb(null,user)
})

}
userSchema.statics.findByToken = function(token,cb){
const user = this;
jwt.verify(token,'supersecret',function(err,decode){
    
    user.findOne({"_id":decode,"token":token},function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
})
}

const User = mongoose.model('User',userSchema)

module.exports = { User }