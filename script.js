// Select DOM Elements
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filter = document.getElementById("filter");

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

  itemList.appendChild(li); // Insert new item to the DOM

  checkUI();

  itemInput.value = ""; // Clear input text
}

// Remove Item
function removeItem(e) {
  // Check if remove icon is being clicked
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
    checkUI();
  }
}

// Clear Items
function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// Check UI
function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
}

// Filter Items
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);

checkUI();
