/**
 * ============================================
 * COUNTER APPLICATION - DOM PRACTICE
 * ============================================
 * 
 * Mục tiêu:
 * - Luyện DOM selection
 * - Luyện event listeners
 * - Luyện cập nhật UI
 * - Luyện xử lý input
 * - Luyện quản lý state
 * 
 * Lưu ý:
 * - Script nên đặt cuối <body> hoặc dùng "defer"
 * - Tránh query DOM nhiều lần không cần thiết
 * - Không nên lưu state trong DOM, nên lưu trong biến
 */


/* =====================================================
   1️⃣ DOM SELECTION
   ===================================================== */

/**
 * document.getElementById()
 * - Trả về phần tử có id tương ứng
 * - Nhanh và hiệu quả nhất nếu biết id
 */
const title = document.getElementById("title");

/**
 * document.querySelector()
 * - Nhận CSS selector
 * - Chỉ trả về phần tử đầu tiên tìm thấy
 */
const increaseBtn = document.querySelector("#increase-btn");
const resetBtn = document.querySelector("#reset-btn");
const countEl = document.querySelector(".count");
const maxInput = document.querySelector("#max-input");


/* =====================================================
   2️⃣ STATE MANAGEMENT
   ===================================================== */

/**
 * State là dữ liệu đại diện cho tình trạng hiện tại của ứng dụng.
 * Không nên phụ thuộc vào DOM để lưu state.
 */

let currentCount = 0;   // Số hiện tại
let maxValue = 10;      // Giá trị tối đa mặc định


/* =====================================================
   3️⃣ INPUT EVENT - Thay đổi giá trị max
   ===================================================== */

/**
 * Sự kiện "input" được kích hoạt mỗi khi người dùng thay đổi nội dung input.
 * 
 * event.target:
 * - Chính là phần tử gây ra sự kiện
 * - Ở đây là input
 */
maxInput.addEventListener("input", (event) => {

  // Chuyển giá trị từ string sang number
  const value = Number(event.target.value);

  /**
   * Kiểm tra hợp lệ:
   * - Phải là số
   * - Phải lớn hơn 0
   */
  if (!isNaN(value) && value > 0) {
    maxValue = value;
  }
});


/* =====================================================
   4️⃣ CLICK EVENT - Tăng số
   ===================================================== */

/**
 * addEventListener("click")
 * - Gắn hành vi khi người dùng click button
 */
increaseBtn.addEventListener("click", () => {

  /**
   * EDGE CASE:
   * Nếu đã đạt max → không tăng nữa
   */
  if (currentCount >= maxValue) {
    alert("Reached max value!");
    return; // Dừng function ngay lập tức
  }

  // Tăng state
  currentCount++;

  // Cập nhật UI
  updateUI();
});


/* =====================================================
   5️⃣ RESET BUTTON
   ===================================================== */

resetBtn.addEventListener("click", () => {
  currentCount = 0;
  updateUI();
});


/* =====================================================
   6️⃣ UI UPDATE FUNCTION
   ===================================================== */

/**
 * Tách logic cập nhật giao diện thành function riêng
 * => Code sạch hơn (Single Responsibility)
 */
function updateUI() {

  // Cập nhật số hiển thị
  countEl.textContent = currentCount;

  /**
   * Nếu đạt max → thêm class CSS
   * classList giúp:
   * - add()
   * - remove()
   * - toggle()
   */
  if (currentCount === maxValue) {
    countEl.classList.add("active");
  } else {
    countEl.classList.remove("active");
  }
}


/* =====================================================
   7️⃣ TẠO PHẦN TỬ MỚI BẰNG JS
   ===================================================== */

/**
 * document.createElement()
 * - Tạo node mới trong bộ nhớ
 */
const infoText = document.createElement("p");

infoText.textContent = "You can change the max value above.";

/**
 * appendChild()
 * - Thêm node vào DOM
 */
document.body.appendChild(infoText);


/* =====================================================
   8️⃣ LƯU Ý QUAN TRỌNG
   ===================================================== */

/**
 * 1. Không lạm dụng querySelector nhiều lần
 * 2. Luôn convert string sang number khi cần tính toán
 * 3. Tránh thao tác DOM quá nhiều trong loop
 * 4. Tách logic và UI để code dễ bảo trì
 * 5. Kiểm soát edge case (>= maxValue)
 */