let kiemTraSoLuong = (cart, id) => {
  let quality = 1;
  if (cart.length != 0) {
    let index = 0;
    for (; index < cart.length; index++) {
      if (cart[index].id == id) {
        quality = cart[index].quality + 1;
        break;
      }
    }
  }
  return quality;
};
let thayDoiSoLuong = (cart, cartItem) => {
  if (cartItem.quality == 1) {
    cart.push(cartItem);
  } else {
    let index = cart.map((e) => e.id).indexOf(cartItem.id);
    cart[index].quality = cartItem.quality;
  }
};
let totalItemCart = (cart) => {
  let totalItem = 0;
  cart.forEach((item) => {
    totalItem += item.quality;
  });
  return totalItem;
};
renderCartNumber = (number, className) => {
  let cartNumberEl = document.getElementsByClassName(className);
  let index = 0;
  for (; index < cartNumberEl.length; index++) {
    cartNumberEl[index].innerText = number;
  }
};
