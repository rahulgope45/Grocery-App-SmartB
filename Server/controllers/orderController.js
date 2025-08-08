import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Invalid product" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//Get Orders By User ID : /api/order/user
// Get Orders By User ID : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIXED: use ID from token

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 }); // ✅ Typo fix from "createAt" to "createdAt"

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//Get All Orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}