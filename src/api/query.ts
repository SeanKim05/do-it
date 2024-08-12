import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteToDoItem,
  getToDoItem,
  getToDoList,
  postImage,
  postToDoItem,
  updateToDoItem,
} from "./api";

export const usePostToDoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postToDoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getToDoList"] });
    },
  });
};

export const useGetToDoList = () => {
  return useQuery({
    queryKey: ["getToDoList"],
    queryFn: () => {
      return getToDoList();
    },
  });
};

export const useGetToDoItem = (itemId: number) => {
  return useQuery({
    queryKey: ["getToDoItem"],
    queryFn: () => {
      return getToDoItem(itemId);
    },
  });
};

export const useUpdateToDoItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateToDoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getToDoItem"],
      });
    },
  });
};

export const useDeleteToDoItemMutation = () => {
  return useMutation({
    mutationFn: deleteToDoItem,
  });
};

export const usePostImgMutation = () => {
  return useMutation({
    mutationFn: postImage,
  });
};
