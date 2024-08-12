"use client";
import { useState, useEffect } from "react";
import { getAllVenues } from "@/lib/api";
import { useStore } from "@/lib/useStore";
import { PaginationDemo } from "../Pagination";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import VenueSkeleton from "../Skeleton/VenueSkeleton";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [meta, setMeta] = useState(null);
  const [metaCurrentPage, setMetaCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    price: 10000,
    sortOrder: "asc", // Default sort order
  });

  const { currentPage, increasePage, decreasePage } = useStore((state) => ({
    currentPage: state.currentPage,
    increasePage: state.increasePage,
    decreasePage: state.decreasePage,
  }));

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await getAllVenues(20, currentPage);
        const data = await res;
        setVenues(data.data);
        setMeta(data.meta);
        setMetaCurrentPage(data.meta.currentPage);
        setTotalPages(data.meta.pageCount);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVenues();
  }, [currentPage]);

  const isOnFirstPage = () => {
    return meta?.isFirstPage;
  };

  const isOnLastPage = () => {
    return meta?.isLastPage;
  };

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
    const sortedVenues = [...venues];
    sortedVenues.sort((a, b) => {
      if (filters.sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return sortedVenues;
  };

  const filteredVenues = applyFilters(venues);
  const sortedVenues = sortVenues(filteredVenues);

  return (
    <>
      <main className="flex justify-start items-start flex-col md:flex-row gap-4 w-full max-w-7xl lg:px-8 px-4">
        <section className="border rounded-md p-4 w-full md:max-w-[350px] flex-col justify-start gap-3 md:flex">
          <h1>Filter By:</h1>

          <div>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="select select-bordered focus:outline-none bg-white max-w-[200px]"
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
                className="checkbox checkbox-sm "
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
              max={30000}
              value={filters.price}
              onChange={handleFilterChange}
              className="range range-xs"
            />
          </div>
        </section>

        {loading ? (
          <>
            <div className="flex flex-col gap-6 justify-center items-center w-full">
              <VenueSkeleton />
              <VenueSkeleton />
              <VenueSkeleton />
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full flex-col gap-20">
              <div className="flex flex-col w-full justify-center items-center gap-4">
                {sortedVenues.length > 0 ? (
                  sortedVenues.map((venue) => {
                    return (
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
                                      <Rating
                                        style={{ maxWidth: 80 }}
                                        value={venue.rating}
                                      />
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
                    );
                  })
                ) : (
                  <>
                    <div className="flex justify-center items-center align-middle p-4 mt-6 border rounded-md">
                      <p>No venues found matching the selected filters.</p>
                    </div>
                  </>
                )}
              </div>

              <PaginationDemo
                increasePage={increasePage}
                decreasePage={decreasePage}
                isLastPage={isOnLastPage()}
                isFirstPage={isOnFirstPage()}
                currentPage={metaCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}
