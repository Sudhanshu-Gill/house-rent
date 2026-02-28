import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [houses, setHouses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: ""
  });

  const fetchHouses = async () => {
    const res = await fetch("http://localhost:5000/houses");
    const data = await res.json();
    setHouses(data);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/houses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ title: "", price: "", location: "", description: "" });
    fetchHouses();
  };

  const deleteHouse = async (id) => {
    await fetch(`http://localhost:5000/houses/${id}`, {
      method: "DELETE"
    });
    fetchHouses();
  };

  return (
    <div className="container">
      <h1>House Rent</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add House</button>
      </form>

      <h2>Available Houses</h2>
      {houses.map((house) => (
        <div key={house._id} className="house-card">
          <h3>{house.title}</h3>
          <p>Price: {house.price}</p>
          <p>Location: {house.location}</p>
          <p>{house.description}</p>
          <button onClick={() => deleteHouse(house._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;