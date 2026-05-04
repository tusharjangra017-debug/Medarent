
console.log("APP JS LOADED");

// ===== CART =====
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.name === name);

  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  showToast(`${name} added 🛒`);
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");

  toast.innerText = message;
  toast.className = "toast " + type;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  cart.forEach(i => total += i.qty);

  const badge = document.getElementById("cartCount");

  if (!badge) return;

  if (total > 0) {
    badge.innerText = total;
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

// ===== DISPLAY MEDICINES =====
function displayMedicines(data) {
  const container = document.getElementById("medicineContainer");
  if (!container) return;

  container.innerHTML = "";

  data.forEach(med => {
    container.innerHTML += `
      <div class="product-card" data-category="${med.category}">
        <h3>${med.name}</h3>
        <p>₹${med.price}</p>
        <button onclick="addToCart('${med.name}', ${med.price})">Add</button>
      </div>
    `;
  });
}

// ===== FILTER =====
// function filterCategory(cat) {
//   if (cat === "all") {
//     displayMedicines(medicines);
//   } else {
//     displayMedicines(medicines.filter(m => m.category === cat));
//   }

function filterCategory(category, btn) {
  displayMedicines(
    category === "all"
      ? medicines
      : medicines.filter(m => m.category === category)
  );

  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// ===== SEARCH =====
function searchMedicines() {
  let input = document.querySelector(".search-bar").value.toLowerCase();

  let filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(input)
  );

  displayMedicines(filtered);
}

// ===== NAVIGATION =====
function goHome() {
  window.location.href = "../index.html";
}

function goToCart() {
  window.location.href = "pages/cart.html";
}

function goUpload() {
  window.location.href = "pages/upload.html";
}

function goDoctor() {
  window.location.href = "pages/doctor.html";
}

function goBlood() {
  window.location.href = "pages/blood.html";
}

function goAiadvisor() {
  window.location.href = "Aiadvisor.html";
}

function goReminder() {
  window.location.href = "pages/reminder.html";
}

function scrollToMedicines() {
  document.getElementById("medicineContainer").scrollIntoView({
    behavior: "smooth"
  });
}

// ===== LOAD =====
// window.onload = function () {
//   if (typeof medicines !== "undefined") {
//     displayMedicines(medicines);
//   }

//   updateCartCount();
// };

// document.addEventListener("DOMContentLoaded", function () {
//   displayMedicines(medicines);
//   updateCartCount();
// });

// document.getElementById("doctorForm").addEventListener("submit", function(e) {
//   e.preventDefault();

//   let name = document.getElementById("name").value;
//   let phone = document.getElementById("phone").value;
//   let doctor = document.getElementById("doctor").value;
//   let date = document.getElementById("date").value;
//   let time = document.getElementById("time").value;

//   if (phone.length !== 10) {
//     showPopup("❌ Enter valid phone number");
//     return;
//   }

//   showPopup(`✅ Appointment Confirmed<br>${doctor}<br>${date} at ${time}`);
// });

let form = document.getElementById("doctorForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    if (phone.length !== 10) {
      showPopup("❌ Enter valid phone number");
      return;
    }

    showPopup(`✅ Appointment Confirmed<br>${doctor}<br>${date} at ${time}`);
  });
}

function showPopup(message) {
  document.getElementById("popupText").innerHTML = message;
  document.getElementById("successPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}

function goCheckout() {
  window.location.href = "checkout.html";
}

// function goCheckout() {
//   window.location.href = "pages/checkout.html";
// }

// LOAD CART DATA
function loadCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("orderItems");
  let total = 0;

  container.innerHTML = "";

  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin:10px 0;">
        <span>${item.name} x ${item.qty}</span>
        <span>₹${itemTotal}</span>
      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = "Total: ₹" + total;
}

// PLACE ORDER


// function placeOrder() {
//   let name = document.getElementById("name").value;
//   let phone = document.getElementById("phone").value;
//   let address = document.getElementById("address").value;

//   if (!name || !phone || !address) {
//     alert("Please fill all details ❗");
//     return;
//   }

//   // SAVE ORDER (optional future use)
//   let order = {
//     name,
//     phone,
//     address,
//     cart: JSON.parse(localStorage.getItem("cart"))
//   };

//   localStorage.setItem("lastOrder", JSON.stringify(order));

//   // CLEAR CART
//   localStorage.removeItem("cart");

//   // SHOW POPUP
//   document.getElementById("popup").style.display = "flex";
// }

// function goToSuccess() {
//   window.location.href = "success.html";
// }

// window.onload = loadCheckout;

// function loadCheckout() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   let container = document.getElementById("orderItems");
//   let total = 0;

//   if (!container) return;

//   container.innerHTML = "";

//   cart.forEach(item => {
//     let itemTotal = item.price * item.qty;
//     total += itemTotal;

//     container.innerHTML += `
//       <div style="display:flex; justify-content:space-between; margin:10px 0;">
//         <span>${item.name} x ${item.qty}</span>
//         <span>₹${itemTotal}</span>
//       </div>
//     `;
//   });

//   document.getElementById("totalAmount").innerText = "Total: ₹" + total;
// }

// function placeOrder() {
//   let nameEl = document.getElementById("name");
//   let phoneEl = document.getElementById("phone");
//   let addressEl = document.getElementById("address");

//   if (!nameEl || !phoneEl || !addressEl) {
//     alert("Input fields not found ❌"); // DEBUG
//     return;
//   }

//   let name = nameEl.value.trim();
//   let phone = phoneEl.value.trim();
//   let address = addressEl.value.trim();

//   let payment = document.querySelector("input[name='payment']:checked");

//   if (!name || !phone || !address || !payment) {
//     showPopup("⚠️ Please fill all details!");
//     return;
//   }

//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   let order = {
//     name,
//     phone,
//     address,
//     payment: payment.value,
//     items: cart
    
//   };
  
//   let orderId = "MED" + Math.floor(Math.random() * 100000);
// order.orderId = orderId;

//   let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
// allOrders.push(order);
// localStorage.setItem("orders", JSON.stringify(allOrders));

//   localStorage.setItem("lastOrder", JSON.stringify(order));
//   localStorage.removeItem("cart");

//   let message = `🛒 *New Medarent Order*

// 👤 Name: ${name}
// 📞 Phone: ${phone}
// 📍 Address: ${address}

// 💊 Items:
// `;

// cart.forEach(item => {
//   message += `- ${item.name} x ${item.qty}\n`;
// });

// message += `\n💰 Total Items: ${cart.length}`;

// let phoneNumber = "9728373333"; // 👉 PUT YOUR NUMBER

// let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

// window.open(url, "_blank");

// // clear cart
// localStorage.removeItem("cart");

//  window.location.href = "success.html"; 
// }

function placeOrder() {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();
  let payment = document.querySelector("input[name='payment']:checked");

  if (!name || !phone || !address || !payment) {
    alert("Please fill all details ❗");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ CREATE ORDER
  let orderId = "MED" + Math.floor(Math.random() * 100000);

  let order = {
    orderId,
    name,
    phone,
    address,
    payment: payment.value,
    items: cart
  };

  // ✅ SAVE FOR SUCCESS PAGE
  localStorage.setItem("lastOrder", JSON.stringify(order));

  // ✅ CREATE WHATSAPP MESSAGE
  let message = `🛒 *New Medarent Order*

🆔 Order ID: ${orderId}
👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}
💳 Payment: ${payment.value}

💊 Items:
`;

  cart.forEach(item => {
    message += `- ${item.name} x ${item.qty}\n`;
  });
  message += `\n👉 Please confirm this order`;
  // 👉 YOUR NUMBER HERE
  let phoneNumber = "9728373333";

  let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // ✅ OPEN WHATSAPP
  window.open(url, "_blank");

  // ✅ CLEAR CART
  localStorage.removeItem("cart");

  // ✅ REDIRECT TO SUCCESS PAGE
  // Save cart before redirect
localStorage.setItem("orderItems", JSON.stringify(cart));

// Then redirect
window.location.href = "success.html";
}

// window.onload = function () {
//   loadCheckoutSummary();
// };

// document.addEventListener("DOMContentLoaded", function () {
//   displayMedicines(medicines);
//   updateCartCount();
// });

// function loadCheckoutSummary() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   let itemsHTML = "";
//   let total = 0;

//   cart.forEach(item => {
//     total += item.price * item.qty;

//     itemsHTML += `
//       <div class="summary-item">
//         <span>${item.name}</span>
//         <span>x${item.qty}</span>
//         <span>₹${item.price * item.qty}</span>
//       </div>
//     `;
//   });

//   document.getElementById("summaryItems").innerHTML = itemsHTML;
//   document.getElementById("summaryTotal").innerText = "Total: ₹" + total;
// }


function loadCheckoutSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let container = document.getElementById("summaryItems");
  let totalBox = document.getElementById("summaryTotal");

  if (!container || !totalBox) return; // 🛑 prevent crash

  let itemsHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    itemsHTML += `
      <div class="summary-item">
        <span>${item.name}</span>
        <span>x${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  });

  container.innerHTML = itemsHTML;
  totalBox.innerText = "Total: ₹" + total;
}

// function showPopup(message) {
//   document.getElementById("popupText").innerText = message;
//   document.getElementById("popup").style.display = "flex";
// }


function showPopup(message) {
  const text = document.getElementById("popupText");
  const popup = document.getElementById("popup");

  if (!text || !popup) {
    alert("Popup not found ❌");
    return;
  }

  text.innerText = message;
  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function loadOrders() {
  let container = document.getElementById("ordersContainer");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No orders yet ❗</p>";
    return;
  }

  container.innerHTML = "";

  orders.reverse().forEach(order => {
    let itemsHTML = "";
    let total = 0;

    order.items.forEach(item => {
      total += item.price * item.qty;
      itemsHTML += `<p>${item.name} x ${item.qty}</p>`;
    });

    // Fake status
    let status = Math.random() > 0.5 ? "Preparing" : "Delivered";
    let statusClass = status === "Preparing" ? "preparing" : "delivered";

    let date = new Date().toLocaleString();

    container.innerHTML += `
      <div class="order-card">
        
        <div class="order-header">
          <h3>Order</h3>
          <span class="status ${statusClass}">${status}</span>
        </div>

        <p><b>${date}</b></p>

        <p><b>Name:</b> ${order.name}</p>
        <p><b>Address:</b> ${order.address}</p>

        <div class="order-items">
          ${itemsHTML}
        </div>

        <div class="order-total">
          Total: ₹${total}
        </div>

      </div>
    `;
  });
}

function goOrders() {
  window.location.href = "pages/orders.html";
}

function startTracking() {
  let steps = ["step1", "step2", "step3", "step4"];
  let current = 0;

  function nextStep() {
    if (current < steps.length - 1) {
      current++;
      document.getElementById(steps[current]).classList.add("active");
      setTimeout(nextStep, 2000); // 2 sec delay
    }
  }

  setTimeout(nextStep, 2000);
}

function searchMedicines() {
  let input = document.querySelector(".search-bar").value.toLowerCase().trim();

  let cards = document.querySelectorAll(".product-card");
  let found = false;

  cards.forEach(card => {
    let name = card.querySelector("h3").innerText.toLowerCase();

    if (name.includes(input)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // show "no result"
  let noResult = document.getElementById("noResult");

  if (input === "") {
    cards.forEach(card => card.style.display = "block");
    if (noResult) noResult.style.display = "none";
    return;
  }

  if (noResult) {
    noResult.style.display = found ? "none" : "block";
  }
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(name, price) {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
  updateQtyDisplay(name);
}

function decreaseQty(name) {
  let item = cart.find(i => i.name === name);

  if (!item) return;

  item.qty--;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  updateCart();
  updateQtyDisplay(name);
}

function updateQtyDisplay(name) {
  let item = cart.find(i => i.name === name);
  let qty = item ? item.qty : 0;

  document.getElementById("qty-" + name).innerText = qty;
}

// LOAD CART PAGE
function loadCartPage() {
  let container = document.getElementById("cartContainer");
  let total = 0;

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Cart is empty ❗</p>";
    document.getElementById("cartTotal").innerText = "";
    return;
  }

  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <div class="qty-box">
          <button onclick="changeQty('${item.name.toLowerCase().split(" ")[0]}','${item.name}',${item.price},-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name.toLowerCase().split(" ")[0]}','${item.name}',${item.price},1)">+</button>
        </div>

        <p>Total: ₹${itemTotal}</p>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = "Grand Total: ₹" + total;
}





function goAmbulance() {
  window.location.href = "pages/ambulance.html";
}




function bookDoctor(name) {
  alert("Appointment booked with " + name);
}







function searchDonors() {
  let group = document.getElementById("bloodGroup").value;
  let container = document.getElementById("donorResults");

  container.innerHTML = "";

  if (!group) {
    showPopup("Select blood group", "info");
    return;
  }

  // 🔥 DEFAULT + SAVED DONORS
  let defaultDonors = [
    { name: "Rahul", group: "A+", phone: "9876543210" },
    { name: "Priya", group: "A+", phone: "9876543213" },
    { name: "Amit", group: "B+", phone: "9876543211" }
  ];

  let savedDonors = JSON.parse(localStorage.getItem("donors")) || [];

  let allDonors = [...defaultDonors, ...savedDonors];

  let filtered = allDonors.filter(d => d.group === group);

  if (filtered.length === 0) {
    container.innerHTML = "❌ No donors found";
    return;
  }

  filtered.forEach(d => {
    container.innerHTML += `
      <div class="donor-card">
        <div>
          <strong>${d.name}</strong><br>
          🩸 ${d.group} | 📞 ${d.phone}
        </div>
        <button onclick="callDonor('${d.phone}')">Call</button>
      </div>
    `;
  });
}

function registerDonor() {
  let name = document.getElementById("donorName").value;
  let phone = document.getElementById("donorPhone").value;
  let group = document.getElementById("donorGroup").value;

  if (!name || !phone || !group) {
    showPopup("Fill all details", "error");
    return;
  }

  let donors = JSON.parse(localStorage.getItem("donors")) || [];

  donors.push({ name, phone, group });

  localStorage.setItem("donors", JSON.stringify(donors));

  // 👉 SHOW POPUP (optional)
  showPopup("✅ Donor Registered!", "success");

  // 👉 REDIRECT AFTER 1.5 sec
  setTimeout(() => {
    window.location.href = "pages/donor-success.html";
  }, 1500);
}

function callDonor(phone) {
  window.location.href = "tel:" + phone;
}

function showTab(tab) {
  let find = document.getElementById("findSection");
  let donate = document.getElementById("donateSection");

  let buttons = document.querySelectorAll(".tab");
  buttons.forEach(b => b.classList.remove("active"));

  if (tab === "find") {
    find.style.display = "block";
    donate.style.display = "none";
    buttons[0].classList.add("active");
  } else {
    find.style.display = "none";
    donate.style.display = "block";
    buttons[1].classList.add("active");
  }
}

function showPopup(message, type = "info") {
  const box = document.getElementById("popupBox");

  if (!box) return;

  // Reset classes
  box.className = "popup-box";

  // Set message
  box.innerText = message;

  // Add type class
  if (type === "success") box.classList.add("popup-success");
  else if (type === "error") box.classList.add("popup-error");
  else box.classList.add("popup-info");

  // Show popup
  box.classList.add("show");

  // Hide after 2.5 sec
  setTimeout(() => {
    box.classList.remove("show");
  }, 2500);
}

function addReminder() {
  let name = document.getElementById("medName").value;
  let time = document.getElementById("medTime").value;

  if (!name || !time) {
    showPopup("Fill all details", "error");
    return;
  }

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  reminders.push({
    name,
    time,
    repeat: true   // 🔥 daily repeat
  });

  localStorage.setItem("reminders", JSON.stringify(reminders));

  showPopup("Reminder added ⏰", "success");

  loadReminders();
}

function loadReminders() {
  let container = document.getElementById("reminderList");
  if (!container) return;

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  container.innerHTML = "";

  reminders.forEach((r, index) => {
    container.innerHTML += `
      <div class="reminder-card">
        <div>
          <strong>${r.name}</strong><br>
          ⏰ ${r.time}
        </div>
        <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteReminder(index) {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.splice(index, 1);

  localStorage.setItem("reminders", JSON.stringify(reminders));

  loadReminders();
}

setInterval(() => {
  let now = new Date();
  let current = now.toTimeString().slice(0,5);

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  reminders.forEach((r, index) => {
    if (r.time === current) {

      // 🔔 PLAY SOUND
      let sound = document.getElementById("alarmSound");
      if (sound) sound.play();

      // 🔥 SHOW BIG NOTIFICATION
      function showNotify(msg) {
  let box = document.getElementById("notifyBox");
  if (!box) return;

  box.innerText = msg;
  box.style.display = "block";

  // vibration (mobile)
  if (navigator.vibrate) {
    navigator.vibrate([300, 200, 300]);
  }

  setTimeout(() => {
    box.style.display = "none";
  }, 5000);
}

    }
  });

}, 60000);

function showAmbulancePopup() {
  const popup = document.getElementById("ambulancePopup");
  const progress = document.querySelector(".progress");

  popup.style.display = "flex";

  // Start progress animation
  setTimeout(() => {
    progress.style.width = "100%";
  }, 200);
}

function closeAmbulancePopup() {
  document.getElementById("ambulancePopup").style.display = "none";
}

setTimeout(() => {
  closeAmbulancePopup();
}, 4000);

function requestAmbulance() {
  window.location.href = "pages/ambulance.html";
}

let progress = document.getElementById("progress");
let status = document.getElementById("status");

let width = 0;

let interval = setInterval(() => {
  if (width >= 100) {
    clearInterval(interval);
    status.innerText = "🚑 Ambulance has arrived!";
  } else {
    width += 25;
    progress.style.width = width + "%";

    if (width == 25) status.innerText = "Driver assigned";
    if (width == 50) status.innerText = "Ambulance started";
    if (width == 75) status.innerText = "Ambulance near you";
  }
}, 1200);

function callDriver() {
  alert("Calling driver...");
}

function requestAmbulance() {
  window.location.href = "pages/ambulance2.html";
}

// document.addEventListener("DOMContentLoaded", function () {
//   displayMedicines(medicines);
//   updateCartCount();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   displayMedicines(medicines);
//   updateCartCount();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   displayMedicines(medicines);
// });

document.addEventListener("DOMContentLoaded", function () {

  // load medicines on homepage
  if (document.getElementById("medicineContainer")) {
    displayMedicines(medicines);
  }

  // load cart count safely
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // load checkout summary safely
  if (typeof loadCheckoutSummary === "function") {
    loadCheckoutSummary();
  }

});
// document.addEventListener("DOMContentLoaded", function () {
//   displayMedicines(medicines);

//   let firstBtn = document.querySelector(".cat-btn");
//   if (firstBtn) firstBtn.classList.add("active");
// });