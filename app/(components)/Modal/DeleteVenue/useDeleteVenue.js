import { deleteVenue } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";


export default function useDeleteVenue() {

  const { toast } = useToast();


  const removeVenue = async (venueId) => {
    try {
      const res = await deleteVenue(venueId);
      if (res) {
        console.log("Venue deleted", res);
      }
      toast({
        title: "Venue Deleted!",
        duration: 2000,
        description: "Venue successfully Deleted!",
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "Something went wrong!",
        duration: 2000,
        description: "Failed to delete Venue. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return { removeVenue };
}
