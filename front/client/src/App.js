import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = async () => {
    const response = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    });
    const item = await response.json();
    setItems([...items, item]);
    setNewItem("");
  };

  const updateItem = async () => {
    if (!selectedItem) return;
    const response = await fetch(`http://localhost:5000/api/items/${selectedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedItem.name }),
    });
    const updatedItem = await response.json();
    const index = items.findIndex((item) => item.id === updatedItem.id);
    items[index] = updatedItem;
    setItems([...items]);
  };

  const deleteItem = async (itemId) => {
    await fetch(`http://localhost:5000/api/items/${itemId}`, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div className="App">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold my-4">Ejemplo básico de Crud</h1>

        <div className="my-4">
          <input
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Enter item name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <input
                className="border border-gray-300 p-2 rounded-md"
                value={selectedItem && selectedItem.id === item.id ? selectedItem.name : item.name}
                onClick={() => setSelectedItem(item)}
                onChange={(e) => setSelectedItem({ ...item, name: e.target.value })}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={updateItem}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


