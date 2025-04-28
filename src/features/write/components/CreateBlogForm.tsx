"use client";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import { createBlogSchema } from "../schemas";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const CreateBlogForm = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      thumbnail: null,
    },
    validationSchema: createBlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length) {
      formik.setFieldValue("thumbnail", file[0]);
      setSelectedImage(URL.createObjectURL(file[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="mt-10 space-y-4">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {!!formik.touched.title && !!formik.errors.title && (
            <p className="text-xs text-red-500">{formik.errors.title}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            type="text"
            placeholder="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {!!formik.touched.category && !!formik.errors.category && (
            <p className="text-xs text-red-500">{formik.errors.category}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ resize: "none" }}
            required
          />
          {!!formik.touched.description && !!formik.errors.description && (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          )}
        </div>

        <TiptapRichtextEditor
          label="Content"
          field="content"
          isTouch={formik.touched.content}
          content={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          setError={formik.setFieldError}
          setTouch={formik.setFieldTouched}
        />

        {selectedImage ? (
          <>
            <div className="relative h-[200px] w-[200px]">
              <Image
                src={selectedImage}
                alt="thumbnail"
                className="object-cover"
                fill
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={removeThumbnail}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">thumbnail</Label>
            <Input
              ref={thumbnailRef}
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={onChangeThumbnail}
            />
            {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
              <p className="text-xs text-red-500">{formik.errors.thumbnail}</p>
            )}
          </div>
        )}

        <div className="flex justify-end my-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateBlogForm;
