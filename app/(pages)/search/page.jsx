"use client";
import React, { useEffect, useState } from "react";
import { searchVenue } from "@/lib/api";
import Link from "next/link";

export default function SearchResultsPage() {
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(window.location.href).searchParams;
      const q = params.get("q") || "";
      setQuery(q);

      if (q) {
        try {
          const responseData = await searchVenue(q);
          setVenues(responseData.data || []);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredVenues = venues.filter((venue) => {
    return venue.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <h1>Search Results for {query}</h1>
      <ul>
        {filteredVenues.map((venue) => (
          <li key={venue.id}>
            <Link href={`/Venue/${venue.id}`}>{venue.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
