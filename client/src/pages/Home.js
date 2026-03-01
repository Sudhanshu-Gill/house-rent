import "../App.css";
import { useState, useEffect } from "react";

function Home() {
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState("");
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

      <h2>Available Houses</h2>

<input
  type="text"
  placeholder="Search by location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

{houses
  .filter((house) =>
    house.location.toLowerCase().includes(search.toLowerCase())
  )
  .map((house) => (
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

export default Home;