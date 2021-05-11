const jwt=require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth, checkUser } = require("./authMiddleware");

// add a feature to import this from the net
const admins= ['y@y.com'];


// being admin is necessary to edit, else redirects if user is not Admin
const requireAdmin = (req,res,next) =>{

    const token=req.cookies.jwt; //grabbing the token from cookie
    var found = false;
    //check json web token exists and is verified
     if(token)
     {
        jwt.verify( token,'yash is op', async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                const user = await User.findById(decodedToken.id);
                admins.forEach((admin)=>{
                    if(admin===user.email)
                    {
                        found = true;
                    
                    return next();}
                });
                if(!found)
                {
                    return res.redirect('/login');
                }
            }

        });
     }
     else{
         res.redirect('/login');
     }

};



// checks if admin or not
const checkAdmin = (req,res,next) =>{

    const token=req.cookies.jwt; //grabbing the token from cookie
    var found = false;
    //check json web token exists and is verified
     if(token)
     {
        jwt.verify( token,'yash is op', async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                const user = await User.findById(decodedToken.id);
                admins.forEach((admin)=>{
                    if(admin===user.email)
                    {
                        found = true;
                        res.locals.admin = user;
                    
                    return next();}
                });
                if(!found)
                {
                    res.locals.admin = null;
                    return next();
                }
            }

        });
     }
     else{
        res.locals.admin = null;
        return next();
     }

};


module.exports = {requireAdmin,checkAdmin};

