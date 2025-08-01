import mongoose from "mongoose";


const productSchema =new mongoose.Schema(
 {
    name: { type: String, required: true },
    description: { type: Array, required: true },
    password: { type: String, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: Array, required: true },
    // Make catItems optional with default value
    inStock: { type: Boolean, default: true },
  },
  {timestamps:true}
);

// Prevent model overwrite during hot reload in dev
const Product = mongoose.models.product || mongoose.model("Product", productSchema);

export default Product;