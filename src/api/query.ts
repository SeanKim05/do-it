import { useQuery } from "@tanstack/react-query";
import { getToDoList } from "./api";

export const useGetToDoList = () => {
  return useQuery({
    queryKey: ["getToDoList"],
    queryFn: () => {
      return getToDoList();
    },
  });
};
