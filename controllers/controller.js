const User=require('../models/User');
const Product=require('../models/Product');
const Order=require('../models/Order');
const JWT=require('jsonwebtoken');
const cryptoJS=require('crypto-js');
const {verifyToken,verifyTokenAndAdmin}=require('../middlewares/verify');


exports.register=async (req,res)=>
{
    const newUser=new User(
        {
            username:req.body.username,
            email:req.body.email,
            password:cryptoJS.AES.encrypt(req.body.password,process.env.ENC_KEY).toString(),
            role:req.body.role
        }
    )
try {
    const savedUser=await newUser.save();
    res.status(200).json(savedUser);
} catch (err) {
    res.status(401).json(err);
}   
}


exports.login=async(req,res)=>
{
    try {
        const foundedUser=await User.findOne({username:req.body.username});
        
        const hashedPassword= cryptoJS.AES.decrypt(foundedUser.password, process.env.ENC_KEY);
        const originalPassword=hashedPassword.toString(cryptoJS.enc.Utf8);
         if(originalPassword===req.body.password)
         {
             const acessToken=JWT.sign(
                 {
                     username:foundedUser.username,
                     role:foundedUser.role
                 },
                 process.env.JWT_KEY,
                 {
                     expiresIn:"3d"
                 }
             )
             const {password,...others}=foundedUser._doc;
            res.status(200).json({others,acessToken});
         }
         else
         {
             res.status(401).json("Invalid Credentials!!")
         }
        
    } catch (error) {
        res.status(500).json(error);
    }}


// Add Product    
exports.addProduct=async (req,res)=>
    {
    const newProduct=new Product(req.body);
    
    try {
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error);
    }
    }

// Get All Products

exports.getAllProduct=async (req,res)=>
{
    try {
        
           const  products=await Product.find()
             res.status(200).json({products});   
    } catch (error) {
        res.status(401).json(error)
    }
}

//Create Order
exports.createOrder=async (req,res)=>
{
const newOrder=new Order(req.body);

try {
    const savedOrder=await newOrder.save();
    res.status(200).json(savedOrder)
} catch (error) {
    res.status(500).json(error);
}
}

//Get All orders
exports.getAllOrders= async (req,res)=>
{
    try {
        const orders=await Order.find();
        res.status(200).json(orders)
    } catch (error) {
     res.status(500).json(error);   
    }
};

exports.getYourOrders=async(req,res)=>
{
    try {
        JWT.verify(req.headers.token,process.env.JWT_KEY, async (error,user)=>
        {
            console.log(user);
            const orders=await Order.find({username:user.username});
            res.status(200).json(orders);
        })
        
    } catch (error) {
        console.log(error);
     res.status(500).json(error);   
    }
}