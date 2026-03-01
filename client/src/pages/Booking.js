import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        propertyId: id
      })
    });

    alert("Booking submitted!");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Book Property</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default Booking;