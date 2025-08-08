import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

// ADD Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    console.log("Product upload request received.");
    
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    console.log("Parsed product data:", productData);
    console.log("Number of images uploaded:", images.length);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });

    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


//Get Product :/api/product/list

export const productList = async( req, res)=>{
    try {

        const products = await Product.find({})
        res.json({success: true,products})
        
    } catch (error) {
        console,log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

//Get single Product :/api/product/id

export const productById = async( req, res)=>{

    try {
        const {id} = req.body
        const product= await Product.findById(id)
        res.json({success: true, product})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

//Change Product in stock :/api/product/id

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body; // ✅ Fix key name here
    await Product.findByIdAndUpdate(id, { inStock }); // ✅ Use the correct field
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


