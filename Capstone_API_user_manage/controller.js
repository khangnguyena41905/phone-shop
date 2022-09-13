const t_body = document.querySelector("#tbodyProducts");
const tenSP = document.querySelector("#TenSP");
const giaSP = document.querySelector("#GiaSP");
const hinhSP = document.querySelector("#HinhSP");
const moTa = document.querySelector("#MoTa");
const cameraTruoc = document.querySelector("#front-camera");
const cameraSau = document.querySelector("#back-camera");
const manHinh = document.querySelector("#screen");
const loaiSanPham = document.querySelector("#loaiSP");

var renderProduct = function (list) {
  var contentHTML = "";
  var count = 0;
  list.forEach(function (item) {
    count++;
    var trContent = `              <tr>
    <th scope="row">${count}</th>
    <td>${item.name}</td>
    <td>${item.type}</td>
    <td>${item.price}</td>
    <td>
      <img
        width="50px"
        src="${item.img}"
        alt=""
      />
    </td>
    <td>${item.screen}</td>
    <td>${item.frontCamera}</td>
    <td>${item.backCamera}</td>
    <td>${item.desc}</td>
    <td><button id="delete_btn" onclick="deleteItem('${item.id}')"><i class="fa-solid fa-trash-can"></i></button> <button  data-toggle="modal"
    data-target="#myModal" id="edit_btn" onclick="editItem('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button></td>
  </tr>`;
    contentHTML += trContent;
  });
  t_body.innerHTML = contentHTML;
};
function findItem(id) {
  return product_list.find(function (item) {
    return item.id === id;
  });
}
function deleteItem(id) {
  axios({
    url: `${BASE_URL}/Products/${id}`,
    method: "delete",
  })
    .then(function () {
      getDataFromAPI();
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
}
function editItem(id) {
  var item_edit = findItem(id);
  showItem(item_edit);
  returnAlertBlank();
  document.querySelector("#addBtn").classList.add("d-none");
  document.querySelector("#updateBtn").classList.remove("d-none");
  return (id_update = id);
}
function showItem(item) {
  tenSP.value = item.name;
  giaSP.value = item.price;
  hinhSP.value = item.img;
  moTa.value = item.desc;
  manHinh.value = item.screen;
  cameraTruoc.value = item.frontCamera;
  cameraSau.value = item.backCamera;
  loaiSanPham.value = item.type;
}
//3 tab
function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}
function returnAlertBlank() {
  document.getElementById("span_name").innerHTML = "";
  document.getElementById("span_type").innerHTML = "";
  document.getElementById("span_price").innerHTML = "";
  document.getElementById("span_hinh").innerHTML = "";
  document.getElementById("span_screen").innerHTML = "";
  document.getElementById("span_front_camera").innerHTML = "";
  document.getElementById("span_back_camera").innerHTML = "";
  document.getElementById("span_mota").innerHTML = "";
}
