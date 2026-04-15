// Select DOM Elements
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

// Ceate Icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Create Button
function createButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;
  const icon = createIcon("fa-solid fa-xmark"); // Create icon inside button
  btn.appendChild(icon); // Append icon to button
  return btn;
}

// Add Item
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please enter an item."); // Change with proper pop up window later
    return;
  }

  // Create List Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const btn = createButton("remove-item btn-link"); // Create button inside li
  li.appendChild(btn); // Append button to li

  itemList.appendChild(li); // Insert new item to the list

  itemInput.value = ""; // Clear input text
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
