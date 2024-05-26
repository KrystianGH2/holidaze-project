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
import { useStore } from "@/lib/useStore";
import { useAuth } from "../Context/AuthContext";
import { Label } from "@/components/ui/label";

function DatePickerWithRange({ className, venueId, bookings, price }) {
  const { isLoggedIn } = useAuth();
  const initialRange = {
    from: new Date(),
    to: addDays(new Date(), 1),
  };

  const { currentGuests, increaseGuests, decreaseGuests } = useStore(
    (state) => ({
      currentGuests: state.currentGuests,
      increaseGuests: state.increaseGuests,
      decreaseGuests: state.decreaseGuests,
    })
  );

  const { toast } = useToast();
  const [range, setRange] = useState(initialRange);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pricePerNight, setPricePerNight] = useState(price);
  const [nights, setNights] = useState(1);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    if (!isLoggedIn) {
      return toast({
        title: "You need to be logged in!",
        duration: 2200,
        description: "Please log in to create a booking.",
        action: <ToastAction altText="Close">Close</ToastAction>,
        variant: "destructive",
      });
    }

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
        setErrorMessage(errorMessage);
        return toast({
          title: "Something went wrong!",
          description: errorMessage,
          action: <ToastAction altText="Close">Close</ToastAction>,
          variant: "destructive",
        });
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

    // Calculate the number of nights between the selected dates
    const calculatedNights =
      range?.from && range?.to
        ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24))
        : 0;
    setNights(calculatedNights);
    setPricePerNight(calculatedNights * price);
  }, [range, setValue, price]);

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

  const disabledDecreaseButton = () => {
    return currentGuests <= 1;
  };

  return (
    <>
      <main className="flex flex-col md:flex-row justify-start md:justify-between pt-4 md:max-w-[600px] w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className={cn("grid gap-2 text-black", className)}>
            <Label className="text-lg">Check Availability</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[300px] justify-start text-left font-normal",
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
              range?.to && isValid(range.to)
                ? format(range.to, "yyyy-MM-dd")
                : ""
            }
          />
          <section className="flex flex-row justify-between items-center full md:max-w-[300px]">
            <Button
              variant="secondary"
              type="button"
              onClick={decreaseGuests}
              disabled={disabledDecreaseButton()}
              className="border bg-transparent text-blue-500 text-lg hover:bg-slate-200"
            >
              {" "}
              -{" "}
            </Button>
            <input
              {...register("guests", { valueAsNumber: true })}
              id="guests"
              value={currentGuests}
              className="border rounded p-2 w-full mx-1 md:w-[190px] h-[40px] text-center"
              min="1"
            />
            <Button
              variant="secondary"
              className="border bg-transparent text-blue-500 text-lg hover:bg-slate-200"
              type="button"
              onClick={increaseGuests}
            >
              {" "}
              +{" "}
            </Button>
          </section>

          <input type="hidden" {...register("venueId")} value={venueId} />
          <Button
            variant="secondary"
            className=" w-full md:w-[300px]"
            type="submit"
          >
            Reserve
          </Button>
        </form>
        <div className="flex justify-start  md:items-end pt-4 ">
          <p className="text-gray-500 text-base">
            {" "}
            Total Price:{""}
            <span className="px-1">
              {pricePerNight
                ? `${
                    nights === 1
                      ? `NOK ${pricePerNight} for 1 night`
                      : `NOK ${pricePerNight} for ${nights} nights`
                  }`
                : ""}
            </span>
          </p>
        </div>
      </main>
    </>
  );
}

export default DatePickerWithRange;
