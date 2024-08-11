import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToDoList, postToDoItem } from "./api";
export const useGetToDoList = () => {
  return useQuery({
    queryKey: ["getToDoList"],
    queryFn: () => {
      return getToDoList();
    },
  });
};

export const usePostToDoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postToDoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getToDoList"] });
    },
  });
};
