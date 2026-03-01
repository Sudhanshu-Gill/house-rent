import { useEffect, useState } from "react";

function BookingsList() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container">
      <h1>All Bookings</h1>

      {bookings.map((booking) => (
        <div key={booking._id} className="house-card">
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Property:</strong> {booking.propertyId?.title}</p>
        </div>
      ))}
    </div>
  );
}

export default BookingsList;