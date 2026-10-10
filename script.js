// Some sample expenses so the page isn't empty the first time
const sampleExpenses = [
  { description: "Groceries", amount: 120.1, category: "Food", date: "2026-10-02" },
  { description: "Bus pass", amount: 300, category: "Travel", date: "2026-10-03" },
  { description: "Phone recharge", amount: 99.2, category: "Bills", date: "2026-10-05" },
  { description: "Movie ticket", amount: 60, category: "Other", date: "2026-10-06" }
];

// Load saved expenses, or use the samples if nothing is saved yet
let expenses = JSON.parse(localStorage.getItem("expenses")) || sampleExpenses;

// Grab the elements we need from the page
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const filterInput = document.getElementById("filter");
const totalText = document.getElementById("total");
const countText = document.getElementById("count");
const expenseList = document.getElementById("expenseList");

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Turn "2026-10-02" into "2/10/2026"
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00");
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

// Redraw the list, the total and the count
function render() {
  expenseList.innerHTML = "";
  let total = 0;
  let count = 0;

  expenses.forEach(function (expense, index) {
    // Skip expenses that don't match the selected category
    if (filterInput.value !== "All" && expense.category !== filterInput.value) {
      return;
    }

    const li = document.createElement("li");
    li.innerHTML =
      "<div><strong>" + expense.description + "</strong><br>" +
      "<small>" + expense.category + " · " + formatDate(expense.date) + "</small></div>" +
      "<div>₹" + expense.amount + " " +
      "<button onclick='deleteExpense(" + index + ")'>Delete</button></div>";
    expenseList.appendChild(li);

    total += expense.amount;
    count++;
  });

  totalText.textContent = total;
  countText.textContent = count;
}

function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = amountInput.value;
  const date = dateInput.value;

  if (description === "" || amount === "" || date === "") {
    alert("Please fill in all the fields.");
    return;
  }

  expenses.push({
    description: description,
    amount: amount,
    category: categoryInput.value,
    date: date
  });

  // Clear the inputs for the next expense
  descriptionInput.value = "";
  amountInput.value = "";
  save();
  render();
}

function deleteExpense(index) {
  expenses.splice(index + 1, 1);
  save();
  render();
}

function clearAll() {
  if (confirm("Delete all expenses?")) {
    expenses = [];
    render();
  }
}

render();
