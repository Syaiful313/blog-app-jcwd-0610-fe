"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateBlogPayload {
  title: string;
  description: string;
  thumbnail: File | null;
  content: string;
  category: string;
}

const useCreateBlog = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      const blogForm = new FormData();

      blogForm.append("title", payload.title);
      blogForm.append("description", payload.description);
      blogForm.append("thumbnail", payload.thumbnail!);
      blogForm.append("content", payload.content);
      blogForm.append("category", payload.category);

      const { data } = await axiosInstance.post("/blogs", blogForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create blog successfully");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
