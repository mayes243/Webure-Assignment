import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/jfif",
];

// signin validation
export const SignInvalidation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// signup validation
export const SignUpvalidation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Name is required"),
  // file validation with png, jpg, jpeg, gif
  avatar: Yup.mixed()
    .nullable()
    .required("A file is required")
    .test(
      "Fichier taille",
      "uploaded file must be less than 5MB",
      (value) => !value || (value && value.size <= 1024 * 1024 * 5)
    )
    .test(
      "format",
      "uploaded file must be in jpg, jpeg, gif or png format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

export const blogValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  shortDesc: Yup.string().required("Short Description is required"),
  // file validation with png, jpg, jpeg, gif
  avatar: Yup.mixed()
    .nullable()
    .required("A file is required")
    .test(
      "Fichier taille",
      "uploaded file must be less than 5MB",
      (value) => !value || (value && value.size <= 1024 * 1024 * 5)
    )
    .test(
      "format",
      "uploaded file must be in jpg, jpeg, gif or png format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});
