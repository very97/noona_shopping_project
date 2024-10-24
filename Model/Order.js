const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    shipTo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    status: { type: String, default: "pending" }, // 상태: 'pending', 'shipped', 'delivered' 등
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: "Product", required: true },
        qty: { type: Number, default: 1 },
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// JSON 반환 시 민감한 정보 숨기기
orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
