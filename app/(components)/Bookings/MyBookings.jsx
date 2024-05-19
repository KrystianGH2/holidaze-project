"use client";
import { useState, useEffect } from "react";
import { usersBookings } from "@/lib/api";
import Cookies from "js-cookie";
import { deleteBooking } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MyBookings() {
  const userDataFromCookie = Cookies.get("userData");
  const parsedUserData = userDataFromCookie
    ? JSON.parse(userDataFromCookie)
    : null;
  const userName = parsedUserData ? parsedUserData.name : null;
  const [userBookings, setUserBookings] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const response = await usersBookings(userName);
      setUserBookings(response.data);
    };
    fetchUserBookings();
  }, [userName]);

  const handleDelete = (bookingId) => {
    setSelectedBookingId(bookingId);
    console.log("Booking deleted", bookingId);
    deleteBooking(bookingId);
    setTimeout(() => window.location.reload(), 1000);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <h1>My Bookings</h1>
      {userBookings &&
        userBookings.map((booking) => (
          <div key={booking.id}>
            <h1>{booking.id}</h1>
            <h1>{formatDate(booking.dateFrom)}</h1>
            <h1>{formatDate(booking.dateTo)}</h1>
            <h1>{booking.guests}</h1>

            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </div>
        ))}
    </>
  );
}
