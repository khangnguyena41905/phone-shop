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
let tinhTien = (price, quality) => {
  let totalPrice = 0;
  let index = price.indexOf("$");
  if (index != -1) {
    let priceConverted = price.replace(/\D/g, "");
    totalPrice = priceConverted * 23000 * quality;
  } else {
    totalPrice = price * 1 * quality;
  }
  return totalPrice;
};
let filterProduct = (ProductList, listCheckedValue) => {
  let filterProductList = [];
  if (listCheckedValue.length == 0) {
    return ProductList;
  }
  ProductList.forEach((item) => {
    for (let index = 0; index < listCheckedValue.length; index++) {
      if (item.type == listCheckedValue[index]) {
        filterProductList.push(item);
        break;
      }
    }
  });
  return filterProductList;
};
