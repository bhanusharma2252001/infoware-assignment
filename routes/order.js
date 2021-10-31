const { createOrder, getAllOrders, getYourOrders } = require('../controllers/controller');
const router=require('express').Router();
const {verifyToken,verifyTokenAndAdmin}=require('../middlewares/verify');

router.post('/', verifyToken, createOrder);
router.get("/",verifyTokenAndAdmin,getAllOrders)
router.get("/myOrder",verifyToken, getYourOrders);

module.exports=router;