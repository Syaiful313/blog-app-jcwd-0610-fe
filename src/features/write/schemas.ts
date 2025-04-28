import * as Yup from "yup";

export const createBlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
});
