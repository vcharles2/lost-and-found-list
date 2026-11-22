const test = require('node:test');
const assert = require('node:assert');
const { ItemService } = require('../itemService.js');

class FakeStorage {
    constructor(initialItems = []) {
        this.items = [...initialItems];
    }
    getAll() {
        return this.items;
    }
    saveAll(items) {
        this.items = items;
    }
}

// --- US-03 Automated Tests ---
test('US-03: Adds a Lost item with a description', () => {
    const service = new ItemService(new FakeStorage());
    const created = service.addItem('Calculus Textbook', 'Lost', '8th Edition, blue cover with notes');

    assert.strictEqual(created.name, 'Calculus Textbook');
    assert.strictEqual(created.category, 'Lost');
    assert.strictEqual(created.description, '8th Edition, blue cover with notes');
    assert.strictEqual(service.getItems().length, 1);
});

test('US-03: Adds a Found item with no description', () => {
    const service = new ItemService(new FakeStorage());
    const created = service.addItem('iPhone 15', 'Found', '');

    assert.strictEqual(created.category, 'Found');
    assert.strictEqual(created.description, '');
});

test('US-03: Rejects blank or whitespace-only item names', () => {
    const service = new ItemService(new FakeStorage());

    assert.throws(() => {
        service.addItem('   ', 'Lost', 'Some description');
    }, /Item name cannot be empty/);

    assert.strictEqual(service.getItems().length, 0);
});

// --- US-04 Automated Tests ---
test('US-04: Filters items by Lost or Found category', () => {
    const storage = new FakeStorage([
        { id: 1, name: 'Wallet', category: 'Lost', description: 'Black leather' },
        { id: 2, name: 'Keys', category: 'Found', description: 'Silver keychain' }
    ]);
    const service = new ItemService(storage);

    const foundItems = service.filterItems('', 'Found');
    assert.strictEqual(foundItems.length, 1);
    assert.strictEqual(foundItems[0].name, 'Keys');
});

test('US-04: Searches items by keyword in name or description (case-insensitive)', () => {
    const storage = new FakeStorage([
        { id: 1, name: 'Notebook', category: 'Lost', description: 'Math 145 homework folder' },
        { id: 2, name: 'Notebook', category: 'Lost', description: 'English essay drafts' }
    ]);
    const service = new ItemService(storage);

    const results = service.filterItems('math 145', 'All');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].id, 1);
});

test('US-04: Combines search query and category filter and handles no matches', () => {
    const storage = new FakeStorage([
        { id: 1, name: 'Backpack', category: 'Lost', description: 'Red Jansport' },
        { id: 2, name: 'Backpack', category: 'Found', description: 'Blue Nike' }
    ]);
    const service = new ItemService(storage);

    const foundBackpacks = service.filterItems('backpack', 'Found');
    assert.strictEqual(foundBackpacks.length, 1);
    assert.strictEqual(foundBackpacks[0].description, 'Blue Nike');

    const noMatches = service.filterItems('laptop', 'Lost');
    assert.strictEqual(noMatches.length, 0);
});

