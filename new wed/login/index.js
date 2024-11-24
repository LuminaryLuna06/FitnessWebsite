function send() {
  event.preventDefault();
  var a = document.getElementById("name").value;
  var b = document.getElementById("mk").value;
  if (a == "nghiemtruongan" && b == "123456") {
    document.getElementById("nut").onclick = function () {
      window.location.href =
        "file:///C:/Users/ADMIN/Desktop/C++/new%20wed/wed/phanchinh.html"; // Thay đổi link tại đây
    };
    alert("đăng nhập thành công");
  } else {
    alert("đăng nhập thất bại");
  }
}
