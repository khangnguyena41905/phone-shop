let ProductList = [];
let BASE_URL = "https://62f8b755e0564480352bf411.mockapi.io";
let cart = [];
let cartLocalStorage = localStorage.getItem("CART");
let saveLocalStorage = () => {
  let cartJson = JSON.stringify(cart);
  localStorage.setItem("CART", cartJson);
};
let renderProductList = (ProductList) => {
  let contentHTML = "";
  ProductList.forEach((element) => {
    let content = `<div class="item col-md-3 col-6">
    <div class="item_frame">
      <div class="item_img">
        <img
          src="${element.img}"
          alt=""
        />
      </div>
      <div class="item_content">
        <div class="title">
          <p>${element.name}</p>
          <p>${element.price}</p>
        </div>
        <div class="icon">
        <button><i class="fa fa-heart"></i></button>
        <button onclick="addCart(${element.id})" ><i class="fa fa-shopping-bag"></i></button>
      </div>
      </div>
    </div>
  </div>`;
    contentHTML += content;
  });
  document.getElementById("list_item").innerHTML = contentHTML;
};
let renderCartNumber = (number, className) => {
  let cartNumberEl = document.getElementsByClassName(className);
  let index = 0;
  for (; index < cartNumberEl.length; index++) {
    cartNumberEl[index].innerText = number;
  }
};
let renderCart = (cart) => {
  let content = "";
  let contentHTML = "";
  let totalPrice = 0;
  cart.forEach((item, index) => {
    content = `
    <tr>
    <td>${index + 1}</td>
    <td>${item.name}</td>
    <td><img src="${item.img}" style="width: 40px; height: 40px;"  alt=""></td>
    <td>
    <button id="buttonGiam" onclick="buttonGiam('${
      item.id
    }')" type="button" class="btn btn-dark btn-sm"><</button>
    <span>${item.quality}</span>
    <button id="buttonTang"  onclick="buttonTang('${
      item.id
    }')" type="button" class="btn btn-dark btn-sm">></button>
    </td>
    <td>${tinhTien(item.price, item.quality)}</td>
    </tr>
    `;
    contentHTML += content;
    totalPrice += tinhTien(item.price, item.quality);
  });
  document.getElementById("tBody_cart_model").innerHTML = contentHTML;
  document.getElementById("tongTienTrongGio").innerText = totalPrice;
  saveLocalStorage();
};

let addCart = (id) => {
  axios({
    url: `${BASE_URL}/Products/${id}`,
    method: "GET",
    data: ProductList,
  })
    .then((res) => {
      let quality = kiemTraSoLuong(cart, id);
      let cartItem = { ...res.data, quality };
      thayDoiSoLuong(cart, cartItem);
      let totalQuality = totalItemCart(cart);
      renderCartNumber(totalQuality, "cart_number");
      renderCart(cart);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
let buttonTang = (id) => {
  let quality = kiemTraSoLuong(cart, id);
  let index = cart.map((e) => e.id).indexOf(id);
  cart[index].quality = quality + 1;
  let totalQuality = totalItemCart(cart);
  renderCartNumber(totalQuality, "cart_number");
  renderCart(cart);
};
let buttonGiam = (id) => {
  let quality = kiemTraSoLuong(cart, id);
  if (quality <= 1) {
    document.getElementById("buttonGiam").disabled = true;
  } else {
    let index = cart.map((e) => e.id).indexOf(id);
    cart[index].quality = quality - 1;
  }
  let totalQuality = totalItemCart(cart);
  renderCartNumber(totalQuality, "cart_number");
  renderCart(cart);
};

// render web
axios({
  url: `${BASE_URL}/Products`,
  method: "GET",
})
  .then((res) => {
    ProductList = res.data;
    console.log("ProductList: ", ProductList);
    renderProductList(ProductList);
    if (JSON.parse(cartLocalStorage)) {
      cart = JSON.parse(cartLocalStorage);
      let totalQuality = totalItemCart(cart);
      renderCartNumber(totalQuality, "cart_number");
      renderCart(cart);
    }
  })
  .catch((err) => {});

// menu filter
let submitFilter = () => {
  let checkedValue = null;
  let listCheckedValue = [];
  let inputElements = document.getElementsByClassName("form-check-input");
  for (let i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      listCheckedValue.push(checkedValue);
    }
  }
  console.log("listCheckedValue: ", listCheckedValue);
  let filterProductList = filterProduct(ProductList, listCheckedValue);
  renderProductList(filterProductList);
};
