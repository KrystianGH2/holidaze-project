"use client";
import React from "react"; // Import React at the top of your file
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAllVenueByProfile, getProfiles } from "@/lib/api";
import { Button } from "@/components/ui/button";
import UpdateVenue from "../Modal/UpdateVenue/UpdateVenue";
import useDeleteVenue from "../Modal/DeleteVenue/useDeleteVenue";
import BookingDetails from "../BookingDetails";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MyVenues() {
  const userDataFromCookie = Cookies.get("userData");
  const userName = userDataFromCookie ? JSON.parse(userDataFromCookie).name : null;

  const [venues, setVenues] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [iVenueManager, setIVenueManager] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        if (!userName) throw new Error("User data not found in cookie");
        const [venueRes, profileRes] = await Promise.all([
          getAllVenueByProfile(userName),
          getProfiles(userName),
        ]);
        console.log(venueRes.data);
        setVenues(venueRes.data);
        setIVenueManager(profileRes.data.venueManager);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVenues();
  }, [userName]);

  const handleEditClick = (venueId) => {
    setSelectedVenueId(venueId);
    const modal = document.getElementById("my_modal_2");
    modal && modal.showModal();
  };

  const { removeVenue } = useDeleteVenue(selectedVenueId);

  const handleDelete = (venueId) => {
    setSelectedVenueId(venueId);
    console.log("Venue deleted", venueId);
    removeVenue(venueId);
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <>
      <style jsx>{`
        .no-border-bottom {
          border-bottom: none;
        }
        .hover-transparent:hover {
          background-color: transparent;
        }
      `}</style>

      <section className="flex w-full justify-center items-center max-w-5xl">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-left">Bookings</TableHead>
              <TableHead className="w-[100px] text-center">Edit</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {venues?.map((venue) => (
              <React.Fragment key={venue.id}>
                <TableRow className={`${venue.bookings.length > 0 ? 'no-border-bottom' : ''} hover-transparent`}>
                  <TableCell className="font-medium">{venue.name}</TableCell>
                  <TableCell className="flex justify-start">{venue.bookings.length}</TableCell>
                  <TableCell>
                    <div
                      className="tooltip"
                      data-tip={iVenueManager ? null : "Register as a Venue Manager to continue."}
                    >
                      <Button
                        value={selectedVenueId}
                        venueid={selectedVenueId}
                        onClick={() => handleEditClick(venue.id)}
                        disabled={!iVenueManager}
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <div
                      className="tooltip"
                      data-tip={iVenueManager ? null : "Register as a Venue Manager to continue."}
                    >
                      <Button
                        onClick={() => handleDelete(venue.id)}
                        disabled={!iVenueManager}
                      >
                        Delete venue
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {venue.bookings.length > 0 && (
                  <TableRow className="no-border-bottom">
                    <TableCell className="px-0" colSpan={4}>
                      <BookingDetails bookings={venue.bookings} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </section>

      {selectedVenueId && (
        <UpdateVenue
          id={"my_modal_2"}
          venueid={selectedVenueId}
          venues={venues}
        />
      )}
    </>
  );
}
