"use client";
import { useState, useEffect } from "react";
import { getAllVenues } from "@/lib/api";
import { useStore } from "@/lib/useStore";
import { PaginationDemo } from "../Pagination";
import Link from "next/link";

export default function Venues() {
  const [venues, setVenues] = useState(null);
  const [meta, setMeta] = useState(null);
  const [metaCurrentPage, setMetaCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

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

  return (
    <div>
      {venues &&
        venues.map((venue) => {
          return (
            <div key={venue.id}>
              <Link href={`/Venue/${venue.id}`}>{venue.name}</Link>
            </div>
          );
        })}

      <PaginationDemo
        increasePage={increasePage}
        decreasePage={decreasePage}
        isLastPage={isOnLastPage()}
        isFirstPage={isOnFirstPage()}
        currentPage={metaCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
