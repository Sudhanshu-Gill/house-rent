import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: ""
  });

  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Add Property</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;