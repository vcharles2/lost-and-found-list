// Get the form and list elements
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const emptyMessage = document.getElementById('empty-message');

// Load items from localStorage when the page loads or start empty
let items = JSON.parse(localStorage.getItem('lostAndFoundItems')) || [];


//render the items in the list
renderItems();

//form submission event listener
itemForm.addEventListener('submit', () => {

    const itemName = itemInput.value.trim();
    if (!itemName) return; // Do not add empty items

    // Create a new item object
    const newItem = {
        id: Date.now(), // Unique ID based on timestamp
        name:itemName
    };

    items.push(newItem); // Add the new item to the items array
    localStorage.setItem('lostAndFoundItems', JSON.stringify(items));
    itemInput.value = ''; // Clear the input field
    renderItems(); // Re-render the list
});
// delete item function
function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    saveAndRender(); // Remove the item with the given ID
}


//save data and update the UI (used during deletion)
function saveAndRender() {
    localStorage.setItem('lostAndFoundItems', JSON.stringify(items));
    renderItems();
}

// render items function
function renderItems() {
    itemList.innerHTML = ''; // Clear the current list
    
    if (items.length === 0) {
        emptyMessage.style.display = 'block'; // Show the empty message
        return;
    }

    emptyMessage.style.display = 'none'; // Hide the empty message

    items.forEach(item => {
        const li = document.createElement('li');
        // item text
        const textSpan = document.createElement('span');
        textSpan.textContent = item.name;

        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteItem(item.id); // Set the delete function

        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}
