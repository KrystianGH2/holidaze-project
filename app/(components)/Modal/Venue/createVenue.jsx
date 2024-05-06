"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RedirectModal from "../redirectModal";
import useVenueLogic from "./createVenueLogic";
export default function CreateVenue() {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isLoggedIn,
    redirectUser,
    message,
  } = useVenueLogic();

  return (
    <>
      {" "}
      {isLoggedIn ? (
        <Button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Create a Venue
        </Button>
      ) : (
        <Button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create a Venue
        </Button>
      )}
      <div>
        <dialog id="my_modal_2" className="modal text-black">
          <div className="modal-box w-full h-[90%] bg-white flex flex-col justify-center items-center">
            <div className="flex w-full flex-col max-w-xl justify-center items-center">
              <h1 className="font-bold text-xl">{""}</h1>
              <h2 className="font-bold text-lg py-5">Create a venue</h2>
              <div className="flex flex-col justify-center items-center w-full ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex gap-4 flex-col"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Venue Name</Label>
                    <Input
                      type="text"
                      placeholder="Venue Name"
                      {...register("name", {
                        required: "Venue Name is required.",
                      })}
                      className="text-gray-700 w-full"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      type="text"
                      placeholder="Description"
                      {...register("description", {
                        required: "Description is required.",
                      })}
                      className="text-gray-700 w-full"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="media.url">
                      {" "}
                      Media{" "}
                      <span className="font-light text-gray-400">
                        (Optional)
                      </span>{" "}
                    </Label>

                    <Input
                      type="text"
                      name="media[0].url"
                      placeholder="Image URL must be valid"
                      defaultValue={"https://source.unsplash.com/random"}
                      {...register("media.0.url")} // Use dot notation for nested fields
                      className="text-gray-700"
                    />
                    <small className="font-light text-[13px] text-gray-400">
                      Please add a valid URL or leave it untouched.
                    </small>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="price"> Price </Label>
                      <Input
                        type="number"
                        name="price"
                        placeholder="Set a price."
                        {...register("price")}
                        className="text-gray-700 max-w-[120px]"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-xs">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="price"> Max Guests </Label>
                      <Input
                        type="number"
                        name="maxGuests"
                        {...register("maxGuests")}
                        className="text-gray-700 max-w-[120px]"
                      />
                      {errors.maxGuests && (
                        <p className="text-red-500 text-xs">
                          {errors.maxGuests.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <section className="flex flex-row justify-between my-4">
                    <div className="flex justify-start items-start  flex-col gap-1">
                      <Label
                        htmlFor="wifi"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Wifi
                      </Label>

                      <input
                        type="checkbox"
                        className="toggle toggle-sm [--tglbg:white] bg-gray-600 checked:bg-blue-500 hover:bg-gray-500 "
                        {...register("meta.wifi")}
                      />
                    </div>
                    <div className="flex justify-start items-start flex-col gap-1">
                      <Label
                        htmlFor="parking"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Parking
                      </Label>

                      <input
                        type="checkbox"
                        className="toggle toggle-sm [--tglbg:white] bg-gray-600 checked:bg-blue-500 hover:bg-gray-500 "
                        {...register("meta.parking")}
                      />
                    </div>

                    <div className="flex justify-start items-start  flex-col gap-1">
                      <Label
                        htmlFor="breakfast"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Breakfast
                      </Label>

                      <input
                        type="checkbox"
                        className="toggle toggle-sm [--tglbg:white] bg-gray-600 checked:bg-blue-500 hover:bg-gray-500 "
                        {...register("meta.breakfast")}
                      />
                    </div>

                    <div className="flex justify-start items-start  flex-col gap-1">
                      <Label
                        htmlFor="pets"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pets
                      </Label>

                      <input
                        type="checkbox"
                        className="toggle toggle-sm [--tglbg:white] bg-gray-600 checked:bg-blue-500 hover:bg-gray-500 "
                        {...register("meta.pets")}
                      />
                    </div>
                  </section>

                  <section className="w-full flex gap-4 flex-col">
                    <h2 className="pb-4">Location</h2>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="address">
                        Address{" "}
                        <span className="font-light text-gray-400">
                          (Optional)
                        </span>{" "}
                      </Label>
                      <Input
                        type="text"
                        placeholder=" Address"
                        {...register("location.address", {
                          required: "address Name is required.",
                        })}
                        className="text-gray-700 w-full"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="city">
                        City{" "}
                        <span className="font-light text-gray-400">
                          (Optional)
                        </span>{" "}
                      </Label>
                      <Input
                        type="text"
                        placeholder=" City"
                        {...register("location.city", {
                          required: "city Name is required.",
                        })}
                        className="text-gray-700 w-full"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="country">
                        Country{" "}
                        <span className="font-light text-gray-400">
                          (Optional)
                        </span>{" "}
                      </Label>
                      <Input
                        type="text"
                        placeholder=" Country"
                        {...register("location.country", {
                          required: "country Name is required.",
                        })}
                        className="text-gray-700 w-full"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </section>

                  <Button variant="secondary" type="submit">
                    Create Venue
                  </Button>
                </form>
              </div>
              <p className="py-4">Press ESC key or click outside to Cancel</p>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <RedirectModal
        id="my_modal_3"
        message={message}
        redirectUser={redirectUser}
      />
    </>
  );
}
