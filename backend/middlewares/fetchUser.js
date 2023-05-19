const jwt = require("jsonwebtoken");
const JWT_SECRET  = 'goodboi'

const fetchUser = (req,res,next)=>{
    //get the user from authToken and add id to request object
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }

    try {
        const data   = jwt.verify( token,JWT_SECRET); 
        console.log(data);
        req.user = data.user 
        next();

    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    
}
module.exports = fetchUser;