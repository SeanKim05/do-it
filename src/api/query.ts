import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteToDoItem,
  getToDoItem,
  getToDoList,
  postImage,
  postToDoItem,
  updateToDoItem,
  updateToggleToDoItem,
} from "./api";

interface ITodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

type TodoListResponse = ITodoItem[];

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
  return useInfiniteQuery<TodoListResponse, Error>({
    queryKey: ["getToDoList"],
    queryFn: ({ pageParam = 1 }) => getToDoList({ page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
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
        queryKey: ["getToDoList"],
      });
    },
  });
};

export const useUpdateToggleToDoItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateToggleToDoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getToDoList"],
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
