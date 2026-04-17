// Select DOM Elements
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filter = document.getElementById("filter");

// Display Items
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemtoDOM(item);
  });

  checkUI();
}

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

// Save to Local Storage
function saveToLocalStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Add Item to DOM
function addItemtoDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const btn = createButton("remove-item btn-link"); // Create button inside li
  li.appendChild(btn); // Append button to li

  itemList.appendChild(li); // Insert new item to the DOM
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

  addItemtoDOM(newItem);

  saveToLocalStorage(newItem);

  checkUI();

  itemInput.value = ""; // Clear input text
}

// Get Items from Local Storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

// When Item is Clicked
function itemClick(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

// Remove Item from Local Storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Remove Item
function removeItem(item) {
  item.remove();
  removeItemFromStorage(item.textContent);

  checkUI();
}

// Clear Items
function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from Local Storage
  localStorage.removeItem("items");

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

// Initialize App
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", itemClick);
  clearButton.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
