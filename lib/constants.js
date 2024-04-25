import * as Yup from "yup";

export const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required.")
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters.")
        .matches(/^[A-Za-z\s]+$/, "Invalid characters. Please enter a valid name."),
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
        .min(6, "Password must be at least 6 characters.")
        .max(50, "Password must be at most 50 characters."),
    bio: Yup.string(),
    avatar: Yup.object().shape({
        url: Yup.string(),
        alt: Yup.string(),
    }),
    banner: Yup.object().shape({
        url: Yup.string(),
        alt: Yup.string(),
    }),
    venueManager: Yup.bool(),
});
