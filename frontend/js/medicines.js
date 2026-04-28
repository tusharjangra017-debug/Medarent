const medicines = [
  { name: "Paracetamol 500mg", price: 50, category: "fever" },
  { name: "Dolo 650", price: 60, category: "fever" },
  { name: "Crocin", price: 55, category: "fever" },

  { name: "Ibuprofen Tablets", price: 90, category: "pain" },
  { name: "Pain Relief Spray", price: 180, category: "pain" },
  { name: "Combiflam", price: 80, category: "pain" },
  { name: "Volini Gel", price: 140, category: "pain" },

  { name: "Cough Syrup", price: 120, category: "cold" },
  { name: "Sinarest Tablet", price: 95, category: "cold" },
  { name: "Vicks Vaporub", price: 120, category: "cold" },

  { name: "Vitamin C Tablets", price: 150, category: "all" },
  { name: "Hand Sanitizer", price: 90, category: "all" },
  { name: "ORS Packet", price: 30, category: "all" },
  { name: "Glucon-D", price: 110, category: "all" },
  { name: "Bandage Roll", price: 40, category: "all" },

    { name: "Azithromycin", price: 200, category: "fever" },
{ name: "Amoxicillin", price: 180, category: "fever" },

{ name: "Disprin", price: 30, category: "pain" },
{ name: "Brufen", price: 95, category: "pain" },

{ name: "Nasivion Drops", price: 110, category: "cold" },
{ name: "Benadryl Syrup", price: 130, category: "cold" },

{ name: "Zinc Tablets", price: 70, category: "all" },
{ name: "Electral Powder", price: 50, category: "all" }
];

function loadMedicines() {
  let container = document.getElementById("medicineContainer");

  container.innerHTML = "";

  medicines.forEach(med => {
    container.innerHTML += `
      
      <div class="product-card" data-category="${med.category}">
        <h3>${med.name}</h3>
        <p>₹${med.price}</p>
        <button onclick="addToCart('${med.name}', ${med.price})">Add</button>
      </div>
    `;
  });
}