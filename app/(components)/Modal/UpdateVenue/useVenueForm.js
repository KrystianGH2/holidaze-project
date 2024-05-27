"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateVenue } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { venueSchema } from "@/lib/constants";

export function useVenueForm({ venueId, venues }) {
  const { toast } = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const selectedVenue = venues?.find((venue) => venue.id === venueId);

  useEffect(() => {
    if (selectedVenue) {
      Object.keys(selectedVenue).forEach((key) => {
        setValue(key, selectedVenue[key]);
      });
    }
  }, [selectedVenue, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await updateVenue(data, venueId);
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      toast({
        title: "Venue Updated!",
        duration: 2200,
        description: "Venue successfully updated!",
        variant: "success",
      });

    } catch (err) {
      console.log(err);
      return toast({
        title: "Something went wrong!",
        description: "Failed to update Venue. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return { register, errors, handleSubmit, onSubmit };
}
