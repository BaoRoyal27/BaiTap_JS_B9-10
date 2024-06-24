let employeeList = new EmployeeList();
let valid = new Validation();
let numberFormat = new Intl.NumberFormat("VN-vn");

getLocalStorage();

function renderTableNhanVien(data) {
  let htmlString = "";
  for (let nv of data) {
    htmlString += `
        <tr>
        <td>${nv.account}</td>
        <td>${nv.fullName}</td>
        <td>${nv.email}</td>
        <td>${nv.startDate}</td>
        <td>${nv.position}</td>
        <td>${numberFormat.format(nv.salary)}VND</td>
        <td>${nv.employeeClass}</td>
        <td>
            <div class="d-flex">
                <button class="btn btn-danger" onclick="delData('${
                  nv.account
                }')">Xóa</button>
                <button class="btn btn-primary" onclick="updateData('${
                  nv.account
                }')" data-toggle="modal" data-target="#myModal">Sửa</button>
            </div>
        </td>
        </tr>
        `;
  }
  getEle("tableDanhSach").innerHTML = htmlString;
}

function getEmployeeInfo(boolAccount, boolEmail) {
  let account = getEle("tknv").value;
  let fullName = getEle("name").value;
  let email = getEle("email").value;
  let password = getEle("password").value;
  let startDate = getEle("datepicker").value;
  let basicPay = getEle("luongCB").value;
  let position = getEle("chucvu").value;
  let workTime = getEle("gioLam").value;

  //Validation:
  let isValid = true;
  //Tài khoản
  if (boolAccount) {
    isValid &=
      valid.checkEmpty(account, "tbTKNV", "(*) Vui lòng không để trống!") &&
      valid.checkLength(
        account,
        "tbTKNV",
        "(*) Tài khoản phải chứa từ 4-6 ký tự!",
        4,
        6
      ) &&
      valid.checkExist(
        account,
        "tbTKNV",
        "(*) Tài khoản đã tồn tại!",
        "account"
      );
  }
  //Họ và tên
  isValid &=
    valid.checkEmpty(fullName, "tbTen", "(*) Vui lòng không để trống!") &&
    valid.checkPattern(
      fullName,
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
      "tbTen",
      "(*) Vui lòng nhập Họ tên hợp lệ!"
    );
  //Email
  if (boolEmail) {
    isValid &=
      valid.checkEmpty(email, "tbEmail", "(*) Vui lòng không để trống!") &&
      valid.checkPattern(
        email,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "tbEmail",
        "(*) Vui lòng nhập Email hợp lệ!"
      ) &&
      valid.checkExist(email, "tbEmail", "(*) Email đã tồn tại!", "email");
  }
  //Password
  isValid &=
    valid.checkEmpty(password, "tbMatKhau", "(*) Vui lòng không để trống!") &&
    valid.checkPattern(
      password,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
      "tbMatKhau",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt"
    ) &&
    valid.checkLength(
      password,
      "tbMatKhau",
      "Mật khẩu phải chứa từ 6-10 ký tự!",
      6,
      10
    );
  //Date bắt đầu
  isValid &=
    valid.checkEmpty(startDate, "tbNgay", "(*) Vui lòng không để trống!") &&
    valid.checkPattern(
      startDate,
      /^(((((((0?[13578])|(1[02]))[\.\-/]?((0?[1-9])|([12]\d)|(3[01])))|(((0?[469])|(11))[\.\-/]?((0?[1-9])|([12]\d)|(30)))|((0?2)[\.\-/]?((0?[1-9])|(1\d)|(2[0-8]))))[\.\-/]?(((19)|(20))?([\d][\d]))))|((0?2)[\.\-/]?(29)[\.\-/]?(((19)|(20))?(([02468][048])|([13579][26])))))$/,
      "tbNgay",
      "(*) Ngày đã chọn không tồn tại trong thực tế! Hoặc sai định dạng mm/dd/yyyy"
    ) &&
    valid.checkPattern(
      startDate,
      /\d{2}\/\d{2}\/\d{4}/,
      "tbNgay",
      "(*) Ngày làm phải theo định dạng mm/dd/yyyy"
    );
  //Lương cơ bản
  isValid &=
    valid.checkEmpty(basicPay, "tbLuongCB", "(*) Vui lòng không để trống!") &&
    valid.checkPattern(
      basicPay,
      /^[0-9]+$/,
      "tbLuongCB",
      "(*) Vui lòng nhập số Lương cơ bản đúng định dạng!"
    ) &&
    valid.checkLimit(
      basicPay,
      "tbLuongCB",
      "(*) Mức lương cơ bản từ 1,000,000 - 20,000,000",
      1e6,
      20e6
    );
  //Chức vụ
  isValid &= valid.checkSelection(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ!"
  );
  //Thời gian làm việc
  isValid &=
    valid.checkEmpty(workTime, "tbGiolam", "(*) Vui lòng không để trống!") &&
    valid.checkPattern(
      workTime,
      /^(\d{0,}(\.\d{0,})?)$/,
      "tbGiolam",
      "(*) Vui lòng nhập số Giờ làm đúng định dạng!"
    ) &&
    valid.checkLimit(
      workTime,
      "tbGiolam",
      "(*) Số giờ làm trong tháng từ 80 - 200 giờ",
      80,
      200
    );

  if (isValid) {
    let employee = new Employee(
      account,
      fullName,
      email,
      password,
      startDate,
      basicPay,
      position,
      workTime
    );
    employee.payRoll();
    employee.classified();
    return employee;
  }
  return null;
}

getEle("btnThem").onclick = function () {
  getEle("btnThemNV").disabled = false;
  getEle("btnCapNhat").disabled = true;
  getEle("tknv").disabled = false;
  if (checkInputValue()) {
    fillValue("", "", "", "", "", "", "Chọn chức vụ", "");
  }
  resetError();
};

getEle("btnThemNV").onclick = function () {
  let employee = getEmployeeInfo(true, true);
  if (employee) {
    employeeList.addEmployee(employee);
    renderTableNhanVien(employeeList.list);
    setLocalStorage();
  }
};

function delData(account) {
  employeeList.delEmployee(account);
  renderTableNhanVien(employeeList.list);
  setLocalStorage();
}

function updateData(account) {
  getEle("btnThemNV").disabled = true;
  getEle("btnCapNhat").disabled = false;
  resetError();
  let employee = employeeList.getEmployeeData(account);
  if (employee) {
    fillValue(
      employee.account,
      employee.fullName,
      employee.email,
      employee.password,
      employee.startDate,
      employee.basicPay,
      employee.position,
      employee.workTime
    );
    getEle("tknv").disabled = true;
  }
}

function findCurrentEmail() {
  let account = getEle("tknv").value;
  let currentEmployee = employeeList.getEmployeeData(account);
  return currentEmployee.email;
}

getEle("btnCapNhat").onclick = function () {
  let currentEmail = findCurrentEmail();
  let inputEmail = getEle("email").value;
  let employee;
  if (inputEmail === currentEmail) {
    hideError("tbEmail");
    employee = getEmployeeInfo(false, false);
  } else {
    employee = getEmployeeInfo(false, true);
  }
  if (employee) {
    employeeList.updateEmployee(employee);
    alert("Cập nhật thành công!");
    renderTableNhanVien(employeeList.list);
    setLocalStorage();
  }
};

function searchClass() {
  let txt = getEle("searchName").value;
  let arrSearch = employeeList.searchEmployee(txt);
  renderTableNhanVien(arrSearch);
}
getEle("searchName").addEventListener("keyup", searchClass);

function setLocalStorage() {
  localStorage.setItem("employeeList", JSON.stringify(employeeList.list));
}
function getLocalStorage() {
  if (localStorage.getItem("employeeList")) {
    let listString = localStorage.getItem("employeeList");
    employeeList.list = JSON.parse(listString);
    renderTableNhanVien(employeeList.list);
  }
}
