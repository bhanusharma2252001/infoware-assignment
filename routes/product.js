const { addProduct, getAllProduct } = require('../controllers/controller');
const router=require('express').Router();
const {verifyToken,verifyTokenAndAdmin}=require('../middlewares/verify');

router.post('/', verifyTokenAndAdmin,addProduct)
router.get("/", verifyToken,getAllProduct);

module.exports=router;