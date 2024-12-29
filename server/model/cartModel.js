import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    cartItems: [{
        product_id: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    }]
}, {
    timestamps: true
});

export default mongoose.model("Cart", cartSchema);