import * as Yup from "yup";

export const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required.")
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters.")
        .matches(/^\s*[A-Za-z0-9\s]+\s*$/, "Invalid characters. Please enter a valid name."),
    email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required.")
        .max(50, "Email must be at most 50 characters.")
        .matches(/@stud\.noroff\.no$/, {
            message: "Please enter a valid email address ending with '@stud.noroff.no'",
            excludeEmptyString: true,
        }),
    password: Yup.string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .max(50, "Password must be at most 50 characters."),
    bio: Yup.string(),
    avatar: Yup.object().shape({
       url: Yup.string().optional(),
        alt: Yup.string().default("My avatar"),
    }),
    banner: Yup.object().shape({
        url: Yup.string().optional(),
        alt: Yup.string().default("My banner"),
    }),
    venueManager: Yup.bool(),
});


 export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required.")
    .max(50, "Email must be at most 50 characters.")
    .matches(/@stud\.noroff\.no$/, {
      message:
        "Please enter a valid email address ending with '@stud.noroff.no'",
      excludeEmptyString: true,
    }),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must be at most 50 characters."),
});

export const profileSchema = Yup.object().shape({
   bio: Yup.string(),
    avatar: Yup.object().shape({
       url: Yup.string().optional(),
        alt: Yup.string().default("My avatar"),
    }),
    banner: Yup.object().shape({
        url: Yup.string().optional(),
        alt: Yup.string().default("My banner"),
    }),
    venueManager: Yup.bool(),
})


export const venueSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    media: Yup.array().of(Yup.object().shape({
        url: Yup.string(),
        alt: Yup.string().default("My media"),
    })),
    price: Yup.number()
        .typeError("Price is a required field") 
        .required("Price is required."),
    maxGuests: Yup.number().typeError("Guests is a required field").required(),
    rating: Yup.number().default(0), 
    meta: Yup.object().shape({
        wifi: Yup.boolean().default(false), 
        parking: Yup.boolean().default(false), 
        breakfast: Yup.boolean().default(false), 
        pets: Yup.boolean().default(false), 
    }),
    location: Yup.object().shape({
        address: Yup.string().nullable(), 
        city: Yup.string().nullable(), 
        zip: Yup.string().nullable(), 
        country: Yup.string().nullable(), 
        continent: Yup.string().nullable(),
        lat: Yup.number().default(0), 
        lng: Yup.number().default(0), 
    })
});