const bcrypt = require('bcryptjs');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// bcrypt.genSalt(10,(err,salt)=>{
//     if(err) return next(err);

//     bcrypt.hash('kosmeic', salt, (err,hash)=>{
//         if(err) return next(err);
//         console.log(hash)
//     })
// })

// const secret = 'mysecretpassword';
// const secretSalt = 'sdadsdadsdasdasdasdsad';

//  const user = {
//      id:1,
//      token:MD5('dsdsdssd').toString() + secretSalt
//  }
//  const receivedToken = '53f11f14c1190f0b6e857fc8e4110f6fsdadsdadsdasdasdasdsad'

//  if(receivedToken === user.token){
//     console.log('move forward')
//  }
//  console.log(user)

const id = '1000';
const secret = 'supersecret';
const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const token = jwt.sign(id,secret);

const decodeToken = jwt.verify(receivedToken,secret);
console.log(decodeToken)