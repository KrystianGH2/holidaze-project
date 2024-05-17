"use client";
import React, { useState, useEffect } from "react";
import {
  addDays,
  format,
  isBefore,
  isValid,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import "react-day-picker/dist/style.css";
import { createBooking } from "@/lib/api";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function DatePickerWithRange({ className, venueId, bookings }) {
  const initialRange = {
    from: new Date(),
    to: addDays(new Date(), 1),
  };

  const { toast } = useToast();
  const [range, setRange] = useState(initialRange);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      guests: Number(data.guests), // Ensure guests is sent as a number
      venueId,
    };

    try {
      const res = await createBooking(bookingData);

      if (!res || res.errors) {
        const errorMessage =
          res.errors[0]?.message || "Failed to create booking";
        return toast({
          title: "Something went wrong!",
          description: errorMessage,
          action: <ToastAction altText="Close">Close</ToastAction>,
          variant: "destructive",
        });
        setErrorMessage(errorMessage);
      }

      toast({
        title: "Booking Created!",
        duration: 2200,
        description: "Booking successfully created!",
        variant: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  useEffect(() => {
    if (range?.from && isValid(range.from)) {
      setValue("dateFrom", format(range.from, "yyyy-MM-dd"));
    }
    if (range?.to && isValid(range.to)) {
      setValue("dateTo", format(range.to, "yyyy-MM-dd"));
    }
  }, [range, setValue]);

  // Disable dates before range.from and already booked dates
  const disabledDates = (date) => {
    if (range?.from && isBefore(date, range.from)) {
      return true;
    }
    return bookings.some((booking) => {
      const start = parseISO(booking.dateFrom);
      const end = parseISO(booking.dateTo);
      return isWithinInterval(date, { start, end });
    });
  };

  const handleNumberOfGuests = (e) => {
    setNumberOfGuests(Number(e.target.value));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("grid gap-2 text-black", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !range && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {range?.from &&
                range?.to &&
                isValid(range.from) &&
                isValid(range.to) ? (
                  <>
                    {format(range.from, "yyyy-MM-dd")} -{" "}
                    {format(range.to, "yyyy-MM-dd")}
                  </>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                disabled={disabledDates}
              />
            </PopoverContent>
          </Popover>
          {
            errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )
          }
        </div>
        <input
          type="hidden"
          {...register("dateFrom")}
          value={
            range?.from && isValid(range.from)
              ? format(range.from, "yyyy-MM-dd")
              : ""
          }
        />
        <input
          type="hidden"
          {...register("dateTo")}
          value={
            range?.to && isValid(range.to) ? format(range.to, "yyyy-MM-dd") : ""
          }
        />
        <input
          {...register("guests", { valueAsNumber: true })}
          type="number"
          id="guests"
          value={numberOfGuests}
          onChange={handleNumberOfGuests}
          className="border border-gray-300 rounded p-2"
          min="1"
        />
        <input type="hidden" {...register("venueId")} value={venueId} />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default DatePickerWithRange;
