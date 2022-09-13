let regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
let validator = {
  checkBlank: (checkBlank = (input, id) => {
    if (input === "") {
      //alert,span
      document.getElementById(id).innerHTML = "Trường này không được để rỗng.";
      return false;
    } else {
      return true;
    }
  }),
  checkType: (checkType = (input, id) => {
    if (input !== "Iphone" && input !== "Samsung") {
      document.getElementById(id).innerHTML =
        "Chỉ được nhập 2 loại 'Iphone' hoặc 'Samsung'";
      return false;
    } else {
      return true;
    }
  }),
  checkPrice: (checkPrice = (input, id) => {
    if (input < 1000) {
      document.getElementById(id).innerHTML = "Giá tiền phải từ 1000 trở lên";
      return false;
    } else {
      return true;
    }
  }),
  checkImage: (checkImage = (input, id) => {
    if (input.match(regexImage)) {
      return true;
    } else {
      document.getElementById(id).innerHTML =
        "Hình ảnh không hợp lệ (ví dụ: https://cdn.tgdd.vn/samsung-galaxy-m51.jpg)";
      return false;
    }
  }),
};
let Validator = (
  _type,
  _price,
  _img,
  _name,
  _screen,
  _front_camera,
  _back_camera,
  _desc
) => {
  let isType =
    validator.checkBlank(_type, "span_type") &&
    validator.checkType(_type, "span_type");
  let isPrice =
    validator.checkBlank(_price, "span_price") &&
    validator.checkPrice(_price, "span_price");
  let isImage =
    validator.checkBlank(_img, "span_hinh") &&
    validator.checkImage(_img, "span_hinh");
  let isValidate =
    validator.checkBlank(_name, "span_name") &
    isType &
    isPrice &
    isImage &
    validator.checkBlank(_screen, "span_screen") &
    validator.checkBlank(_front_camera, "span_front_camera") &
    validator.checkBlank(_back_camera, "span_back_camera") &
    validator.checkBlank(_desc, "span_mota");
  return isValidate;
};
