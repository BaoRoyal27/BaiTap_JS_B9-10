function Validation() {
  //Kiểm tra ô có bị trống không
  this.checkEmpty = function (value, errorID, mess) {
    if (value.trim() === "") {
      showError(errorID, mess);
      return false;
    }
    hideError(errorID);
    return true;
  };
  //Kiểm tra lựa chọn có hợp lệ trong phần tử thả xuống
  this.checkSelection = function (slcID, errorID, mess) {
    if (getEle(slcID).selectedIndex !== 0) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };
  //Kiểm tra điền đúng mẫu chưa
  this.checkPattern = function (value, pattern, errorID, mess) {
    if (value.match(pattern)) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };
  //Kiểm tra độ dài của chữ
  this.checkLength = function (value, errorID, mess, min, max) {
    if (min <= value.trim().length && value.trim().length <= max) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };
  // kiểm tra xác nhận giá trị số đảm bảo nằm trong phạm vi chỉ định
  this.checkLimit = function (value, errorID, mess, min, max) {
    if (min <= value && value <= max) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };
  // kiểm tra sự trùng lặp
  this.checkExist = function (value, errorID, mess, obj) {
    var isExist = false;
    for (let i = 0; i < employeeList.list.length; i++) {
      if (obj === "account") {
        if (value === employeeList.list[i].account) {
          isExist = true;
          break;
        }
      } else if (obj === "email") {
        if (value === employeeList.list[i].email) {
          isExist = true;
          break;
        }
      }
    }
    if (isExist) {
      showError(errorID, mess);
      return false;
    }
    hideError(errorID);
    return true;
  };
}
