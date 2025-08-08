import express from 'express';
import { upload } from '../configs/multer.js'; // ✅ Only once
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// Also fix this line 👇
productRouter.post('/add', authSeller, upload.array('images', 4), addProduct); // ✅ Put authSeller first
productRouter.get('/list', productList); // ✅ Was './list', should be '/list'
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
