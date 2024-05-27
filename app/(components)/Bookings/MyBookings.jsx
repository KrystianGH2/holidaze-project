"use client";
import { useState, useEffect } from "react";
import { usersBookings, deleteBooking } from "@/lib/api";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

export default function MyBookings() {
  const { toast } = useToast();
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

  const handleDelete = async (bookingId) => {
    setSelectedBookingId(bookingId);
    try {
      await deleteBooking(bookingId);
      toast({
        title: "Booking Deleted!",
        variant: "destructive",
      });
      setUserBookings((prev) =>
        prev.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting the booking.",
        variant: "destructive",
      });
      console.error("Failed to delete booking:", error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <section className="flex w-full justify-center items-center max-w-5xl">
        <Table>
          <TableCaption>Your Bookings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Venue name</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-center">Guests</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userBookings?.map((booking) => (
              <TableRow key={booking.id} className="hover-transparent">
                <TableCell>
                  {booking.venue.name.charAt(0).toUpperCase() +
                    booking.venue.name.slice(1)}
                </TableCell>

                <TableCell>{formatDate(booking.dateFrom)}</TableCell>
                <TableCell>{formatDate(booking.dateTo)}</TableCell>
                <TableCell className="text-center">{booking.guests}</TableCell>
                <TableCell className="flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(booking.id)}
                    className="hover:bg-red-500"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
