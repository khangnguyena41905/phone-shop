let ProductList = [];
let BASE_URL = "https://62f8b755e0564480352bf411.mockapi.io";
let cart = [];
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

axios({
  url: `${BASE_URL}/Products`,
  method: "GET",
})
  .then((res) => {
    ProductList = res.data;
    console.log("ProductList: ", ProductList);
    renderProductList(ProductList);
  })
  .catch((err) => {});

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
      console.log("cart: ", cart);
      let totalQuality = totalItemCart(cart);
      renderCartNumber(totalQuality, "cart_number");
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
