import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BookingDetails({ bookings }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-base font-medium">
          Upcoming Bookings
        </div>
        <div className="collapse-content">
          <Table>
            <TableCaption>Upcoming bookings for this Venue.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-center">Guests</TableHead>
                <TableHead>Customer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {formatDate(booking.dateFrom)}
                  </TableCell>
                  <TableCell>{formatDate(booking.dateTo)}</TableCell>
                  <TableCell className="text-center">
                    {booking.guests}
                  </TableCell>
                  <TableCell>{booking.customer.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
