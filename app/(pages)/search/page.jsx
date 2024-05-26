"use client";
import React, { useEffect, useState } from "react";
import { searchVenue } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VenueSkeleton from "@/app/(components)/Skeleton/VenueSkeleton";

export default function SearchResultsPage() {
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    price: 10000,
    sortOrder: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(window.location.href).searchParams;
      const q = params.get("q") || "";
      setQuery(q);

      if (q) {
        try {
          const responseData = await searchVenue(q);
          // Returns only the Venues that contains the value of the query
          const filteredVenues = responseData.data.filter((venue) =>
            venue.name.toLowerCase().includes(q.toLowerCase())
          );
          setVenues(filteredVenues);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = (venues) => {
    return venues.filter((venue) => {
      return (
        (!filters.wifi || venue.meta.wifi) &&
        (!filters.parking || venue.meta.parking) &&
        (!filters.breakfast || venue.meta.breakfast) &&
        (!filters.pets || venue.meta.pets) &&
        venue.price <= filters.price
      );
    });
  };

  const sortVenues = (venues) => {
    if (filters.sortOrder === "asc") {
      return venues.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "desc") {
      return venues.sort((a, b) => b.price - a.price);
    } else {
      return venues; // Return unsorted venues if no sorting order specified
    }
  };

  const filteredVenues = applyFilters(venues);
  const sortedVenues = sortVenues(filteredVenues);

  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <div className="flex justify-start items-start">
          <h1 className="text-lg pb-6">
            Search Results for {query.charAt(0).toUpperCase() + query.slice(1)}
          </h1>
        </div>
        <div className="flex flex-row items-start w-full max-w-7xl px-4 lg:px-8 gap-4">
          <section className="border p-4 w-full max-w-[350px] flex-col justify-start gap-3 hidden md:flex">
            <h2>Filter By:</h2>
            <div>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className="select select-bordered focus:outline-none max-w-[200px]"
              >
                <option value="asc">Price Low to High</option>
                <option value="desc">Price High to Low</option>
              </select>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <h2>Popular filters</h2>
              <label className="flex flex-row justify-start items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={filters.wifi}
                  onChange={handleFilterChange}
                  className="checkbox checkbox-sm"
                />
                Free Wifi
              </label>
              <label className="flex flex-row justify-start items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="parking"
                  checked={filters.parking}
                  onChange={handleFilterChange}
                  className="checkbox checkbox-sm"
                />
                Parking
              </label>
              <label className="flex flex-row justify-start items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={filters.breakfast}
                  onChange={handleFilterChange}
                  className="checkbox checkbox-sm"
                />
                Breakfast
              </label>
              <label className="flex flex-row justify-start items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="pets"
                  checked={filters.pets}
                  onChange={handleFilterChange}
                  className="checkbox checkbox-sm"
                />
                Pets
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-start flex-col gap-2">
                <h2>Your budget (per night)</h2>
                <p className="text-xs flex justify-center">
                  NOK 100 - NOK {filters.price}
                </p>
              </div>
              <input
                type="range"
                name="price"
                min={100}
                max={10000}
                value={filters.price}
                onChange={handleFilterChange}
                className="range range-xs"
              />
            </div>
          </section>

          {loading ? (
            <>
              <div className="flex flex-col justify-center items-center w-full gap-8">
                <VenueSkeleton />
                <VenueSkeleton />
                <VenueSkeleton />{" "}
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full flex-col gap-20">
                <div className="flex flex-col w-full justify-center items-start gap-4">
                  {sortedVenues.length > 0 ? (
                    sortedVenues.map((venue) => (
                      <div
                        key={venue.id}
                        className="w-full max-w-3xl border rounded-lg hover:shadow-md hover:shadow-blue-100 transition-shadow"
                      >
                        <Link href={`/Venue/${venue.id}`}>
                          <div
                            className="p-3 shadow-xl rounded-none
                       justify-between flex overflow-hidden gap-5 flex-row w-full max-w-3xl"
                          >
                            <div className="flex flex-row">
                              <figure className="w-[260px]">
                                <img
                                  className="w-full h-52 object-cover rounded-none"
                                  src={venue.media[0]?.url}
                                  alt={venue.media[0]?.alt}
                                />
                              </figure>
                              <div className="flex flex-col justify-between">
                                <div className="card-body flex flex-col justify-between w-full p-4 overflow-hidden">
                                  <div className="flex flex-col">
                                    <h2 className="card-title text-xl tracking-wider font-bold text-blue-600">
                                      {venue.name.charAt(0).toUpperCase() +
                                        venue.name.slice(1)}
                                    </h2>
                                    <small className="flex justify-start gap-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4 text-yellow-400"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>{" "}
                                      <p>{venue.rating}</p>
                                    </small>
                                  </div>
                                  <span>
                                    <small className="flex max-w-[300px] underline font-medium">
                                      {venue.location?.city &&
                                        venue.location.city
                                          .charAt(0)
                                          .toUpperCase() +
                                          venue.location.city.slice(1)}
                                    </small>
                                  </span>
                                </div>
                                <div className="pl-4 flex flex-row gap-1 text-[12px] font-medium">
                                  <p>{venue.meta.wifi ? "Wifi " : ""}</p>
                                  <p>{venue.meta.parking ? "Parking" : ""}</p>
                                  <p>
                                    {venue.meta.breakfast ? "Breakfast " : ""}
                                  </p>
                                  <p>{venue.meta.pets ? "Pets " : ""}</p>
                                </div>
                              </div>
                            </div>
                            <div className="card-actions flex flex-col justify-end items-end">
                              <small className="text-gray-500">
                                Max guests {venue.maxGuests}
                              </small>
                              <p>
                                NOK {venue.price}{" "}
                                <small className="text-[13px]">per night</small>
                              </p>
                              <Button
                                variant="secondary"
                                className="text-white rounded-sm"
                              >
                                See Availability
                              </Button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center w-full items-center p-4 mt-6 border rounded-md">
                      <p>No venues found matching the selected filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
