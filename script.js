// Inject LocalStorageRepository into ItemService (Dependency Inversion)
const storage = new LocalStorageRepository('lostAndFoundItems');
const itemService = new ItemService(storage);

// Get the form and list elements
const itemForm = document.getElementById('lostItemForm');
const categoryInput = document.getElementById('categoryInput');
const itemInput = document.getElementById('itemInput');
const descriptionInput = document.getElementById('descriptionInput');
const errorMessage = document.getElementById('errorMessage');

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const itemList = document.getElementById('lostItemsList');
const emptyMessage = document.getElementById('emptyMessage');

// Render the items in the list on initial load
renderItems();

// Form submission event listener
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
        itemService.addItem(
            itemInput.value,
            categoryInput.value,
            descriptionInput.value
        );
        errorMessage.style.display = 'none';
        itemForm.reset();
        renderItems();
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
});

// Live search and category filter listeners
searchInput.addEventListener('input', renderItems);
categoryFilter.addEventListener('change', renderItems);

// Delete item function
function deleteItem(id) {
    itemService.deleteItem(id);
    renderItems();
}

// Render items function
function renderItems() {
    itemList.innerHTML = '';

    const allItems = itemService.getItems();
    const filteredItems = itemService.filterItems(searchInput.value, categoryFilter.value);

    if (filteredItems.length === 0) {
        emptyMessage.textContent = allItems.length === 0
            ? 'No lost items reported yet.'
            : 'No matching items found.';
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    filteredItems.forEach(item => {
        const li = document.createElement('li');

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'item-details';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'item-header';

        const category = item.category || 'Lost';
        const badge = document.createElement('span');
        badge.className = `badge ${category === 'Found' ? 'badge-found' : 'badge-lost'}`;
        badge.textContent = category;

        const nameStrong = document.createElement('strong');
        nameStrong.textContent = item.name;

        headerDiv.appendChild(badge);
        headerDiv.appendChild(nameStrong);
        detailsDiv.appendChild(headerDiv);

        if (item.description) {
            const descSpan = document.createElement('span');
            descSpan.className = 'item-description';
            descSpan.textContent = item.description;
            detailsDiv.appendChild(descSpan);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteItem(item.id);

        li.appendChild(detailsDiv);
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}
