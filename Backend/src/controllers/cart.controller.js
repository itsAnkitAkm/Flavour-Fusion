import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Food } from "../models/food.model.js";

const createOrUpdateCart = asyncHandler(async (req, res) => {
    const customerId = req.user?._id;
   // console.log(customerId);
    const { Order_id, quantity } = req.body;

    if(!Order_id || !quantity){
        throw new ApiError(400, "Please provide all the required fields");
    }

    // Find existing cart or create a new one
    let cart = await Cart.findOne({ Customer_ID: customerId });
    if (!cart) {
      cart = new Cart({ Customer_ID: customerId, Order_Item: [] });
    }

    // Update or create order item
    const existingOrderItem = cart.Order_Item.find(item => item.order.equals(Order_id));
    if (existingOrderItem) {
      existingOrderItem.quantity += quantity;
    } else {
      const food = await Food.findOne({ _id: Order_id });
      cart.Order_Item.push({
        order: Order_id,
        name: food.Name,
        quantity,
        thumbnail: food.image, // Assuming `image` is a field in the Food model
        totalAmmount: food.Unit_Price * quantity,
      });
    }

    // Calculate the overall bill
    cart.Bill = cart.Order_Item.reduce((total, item) => total + item.totalAmmount, 0);

    // Save the cart
    await cart.save();

    return res
      .status(201)
      .json(new ApiResponse(200, cart, "Added to cart"));
});

const getCartById = asyncHandler( async(req, res) => {
    const customerId = req.user?._id;
    if(!customerId){
        throw new ApiError(400, "Please Sign Up");
    }
    const cart = await Cart.findOne({ Customer_ID: customerId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
        }
        return res
        .status(200)
        .json(new ApiResponse(200, cart, "Cart found"));
        
});


export { createOrUpdateCart,
         getCartById };

