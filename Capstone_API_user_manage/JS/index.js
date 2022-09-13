var product_list = [];
var id_update;
var BASE_URL = "https://62f8b755e0564480352bf411.mockapi.io";
getDataFromAPI();
function updateProduct() {
  returnAlertBlank();
  var _name = tenSP.value;
  var _type = loaiSanPham.value;
  var _price = giaSP.value;
  var _img = hinhSP.value;
  var _screen = manHinh.value;
  var _front_camera = cameraTruoc.value;
  var _back_camera = cameraSau.value;
  var _desc = moTa.value;
  if (
    Validator(
      _name,
      _type,
      _price,
      _img,
      _screen,
      _front_camera,
      _back_camera,
      _desc
    ) === 0
  ) {
    return;
  }
  let product = new Product(
    _name,
    _type,
    _price,
    _img,
    _screen,
    _front_camera,
    _back_camera,
    _desc
  );
  turnOnLoading(); //loading
  axios({
    url: `${BASE_URL}/Products/${id_update}`,
    method: "put",
    data: product,
  })
    .then(function () {
      turnOffLoading();
      getDataFromAPI();
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
  document.querySelector("#closeModal").click();
}
function addProduct() {
  returnAlertBlank();
  var _name = tenSP.value;
  var _type = loaiSanPham.value;
  var _price = giaSP.value;
  var _img = hinhSP.value;
  var _desc = moTa.value;
  var _screen = manHinh.value;
  var _front_camera = cameraTruoc.value;
  var _back_camera = cameraSau.value;
  if (
    Validator(
      _name,
      _type,
      _price,
      _img,
      _screen,
      _front_camera,
      _back_camera,
      _desc
    ) === 0
  ) {
    return;
  }
  let product = new Product(
    _name,
    _type,
    _price,
    _img,
    _screen,
    _front_camera,
    _back_camera,
    _desc
  );
  turnOnLoading(); //loading
  axios({
    url: `${BASE_URL}/Products`,
    method: "POST",
    data: product,
  })
    .then(function () {
      turnOffLoading();
      getDataFromAPI();
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
  document.querySelector("#closeModal").click();
}
function getDataFromAPI() {
  axios({
    url: `${BASE_URL}/Products`,
    method: "GET",
  })
    .then(function (response) {
      product_list = response.data;
      renderProduct(product_list);
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
}
var turnOnLoading = function () {
  document.querySelector("#loading").style.display = "flex";
};
var turnOffLoading = function () {
  document.querySelector("#loading").style.display = "none";
};
document.querySelector("#btnThemSP").addEventListener("click", function () {
  tenSP.value = "";
  giaSP.value = "";
  hinhSP.value = "";
  moTa.value = "";
  manHinh.value = "";
  cameraTruoc.value = "";
  cameraSau.value = "";
  loaiSanPham.value = "";
  document.querySelector("#updateBtn").classList.add("d-none");
  document.querySelector("#addBtn").classList.remove("d-none");
});
