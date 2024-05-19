import mongoose from "mongoose";

const OrderItem = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantity: Number,
})


const OrderSchema = new mongoose.Schema({
    Customer_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      Order_Item: [ OrderItem ],

      Table_no: {
        type: Number,
      },

      Total_Bill: {
        type: Number,
        required: true
      },
      GST: {
        type: Number,
        required: true
      },
      Bill: {
        type: Number,
        required: true
      }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;