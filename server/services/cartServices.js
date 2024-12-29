import Cart from "../model/cartModel.js";

const getCarts = async () => {
  return Cart.find();
};
// create cart
const createCart = async (cartData) => {
  // check if cart alrady exist
  const checkCart = await Cart.findOne({ user_id: cartData.user_id });
  if (!checkCart) {
    return await Cart.create(cartData);
  }

  return { error: "cart already exist" };
};

const getCart = async (user_id) => {
  return await Cart.findOne({ user_id });
};

const updateCart = async (cartData) => {
  const cartUpdate = await Cart.updateOne(
    { user_id: cartData.user_id },
    {
      $push: {
        cartItems: { $each: cartData.cartItems },
      },
    },
    { new: true }
  );

  console.log("update cart");
  return cartUpdate;
};

export default { createCart, getCart, updateCart };
