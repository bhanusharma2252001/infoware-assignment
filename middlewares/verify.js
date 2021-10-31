const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>
{
    if(req.headers.token)
    {
        jwt.verify(req.headers.token,process.env.JWT_KEY,(error,user)=>
        {
            if(error)
            return res.status(401).json("Invalid Token!!")
            req.user=user;
            next();
        })
        
    }
    else
    {
        res.status(401).json("You're not authenticated!!");
    }  
}

const verifyTokenAndAdmin=(req,res,next)=>
{
verifyToken(req,res,()=>
{
    if(req.user.role==="admin")
    next();
    else
    res.status(401).json("you're not authorized to do this!!!");
})
};


module.exports={verifyToken,verifyTokenAndAdmin};