"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAllVenueByProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function MyVenues() {
  const userDataFromCookie = Cookies.get("userData");
  const parsedUserData = userDataFromCookie
    ? JSON.parse(userDataFromCookie)
    : null;
  const userName = parsedUserData ? parsedUserData.name : null;
  const [venues, setVenues] = useState(null);

  useEffect(() => {
    const myVenues = async () => {
      try {
        if (!userName) {
          throw new Error("User data not found in cookie");
        }
        const res = await getAllVenueByProfile(userName);
        setVenues(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    myVenues();
  }, [userName]);

  return (
    <>
      <section>
        <div>
          {venues &&
            venues.map((venue) => (
              <div key={venue.id}>
                {venue.name}

                <Button onClick={() => handleEditClick(venue.id)}>Edit</Button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
