// Single Responsibility: Handles browser localStorage persistence only
class LocalStorageRepository {
    constructor(storageKey = 'lostAndFoundItems') {
        this.storageKey = storageKey;
    }

    getAll() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    saveAll(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
}

// Single Responsibility & Dependency Inversion:
// Handles validation, item creation, deletion, and filtering via an injected storage object
class ItemService {
    constructor(storage) {
        this.storage = storage;
    }

    getItems() {
        return this.storage.getAll();
    }

    addItem(name, category = 'Lost', description = '') {
        const cleanName = (name || '').trim();
        if (!cleanName) {
            throw new Error('Item name cannot be empty.');
        }

        const validCategory = category === 'Found' ? 'Found' : 'Lost';
        const newItem = {
            id: Date.now(),
            name: cleanName,
            category: validCategory,
            description: (description || '').trim()
        };

        const items = this.storage.getAll();
        items.push(newItem);
        this.storage.saveAll(items);
        return newItem;
    }

    deleteItem(id) {
        const items = this.storage.getAll();
        const updatedItems = items.filter(item => item.id !== id);
        this.storage.saveAll(updatedItems);
        return updatedItems;
    }

    filterItems(searchQuery = '', categoryFilter = 'All') {
        const items = this.storage.getAll();
        const query = searchQuery.trim().toLowerCase();

        return items.filter(item => {
            const itemCategory = item.category || 'Lost';
            const matchesCategory = categoryFilter === 'All' || itemCategory === categoryFilter;

            const matchesSearch = !query ||
                item.name.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });
    }
}

// Export for Node.js automated tests while working normally in browser <script> tags
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ItemService, LocalStorageRepository };
}
