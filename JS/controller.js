let kiemTraSoLuong = (cart, id) => {
  let quality = 0;
  if (cart.length != 0) {
    let index = 0;
    for (; index < cart.length; index++) {
      if (cart[index].id == id) {
        quality = cart[index].quality;
        break;
      }
    }
  }
  return quality;
};
let thayDoiSoLuong = (cart, cartItem) => {
  if (cartItem.quality == 0) {
    cart.push(cartItem);
    cartItem.quality = 1;
  } else {
    let index = cart.map((e) => e.id).indexOf(cartItem.id);
    cart[index].quality = cartItem.quality + 1;
  }
};
let totalItemCart = (cart) => {
  let totalItem = 0;
  cart.forEach((item) => {
    totalItem += item.quality;
  });
  return totalItem;
};
