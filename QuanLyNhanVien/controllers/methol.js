function getEle(id) {
  return document.getElementById(id);
}

function showError(id, sentence) {
  getEle(id).innerHTML = sentence;
  getEle(id).style.display = "block";
}

function hideError(id) {
  getEle(id).innerHTML = "";
  getEle(id).style.display = "none";
}
function checkInputValue() {
  let account = getEle("tknv").value;
  let fullName = getEle("name").value;
  let email = getEle("email").value;
  let password = getEle("password").value;
  let startDate = getEle("datepicker").value;
  let basicPay = getEle("luongCB").value;
  let position = getEle("chucvu").value;
  let workTime = getEle("gioLam").value;
  if (
    account === "" ||
    fullName === "" ||
    email === "" ||
    password === "" ||
    startDate === "" ||
    basicPay === "" ||
    position === "" ||
    workTime === ""
  ) {
    return false;
  }
  return true;
}

function fillValue(
  tknv,
  name,
  email,
  password,
  datepicker,
  luongCB,
  chucVu,
  gioLam
) {
  getEle("tknv").value = tknv;
  getEle("name").value = name;
  getEle("email").value = email;
  getEle("password").value = password;
  getEle("datepicker").value = datepicker;
  getEle("luongCB").value = luongCB;
  getEle("chucvu").value = chucVu;
  getEle("gioLam").value = gioLam;
}

function resetError() {
  hideError("tbTKNV");
  hideError("tbTen");
  hideError("tbEmail");
  hideError("tbMatKhau");
  hideError("tbNgay");
  hideError("tbLuongCB");
  hideError("tbChucVu");
  hideError("tbGiolam");
}

// remove Vietnamese Tones
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  str = str.replace(/\s/g, "");
  str = str.trim();
  // Remove punctuations
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str.trim().toLowerCase();
}
