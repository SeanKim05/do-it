import api from ".";

interface IupdateToDo {
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export const postToDoItem = async (req: { name: string }) => {
  const res = await api.post("/items", req);

  return res;
};

export const getToDoList = async () => {
  const res = await api.get("/items?page=1&pageSize=10");

  return res?.data;
};

export const getToDoItem = async (itemId: number) => {
  const res = await api.get(`/items/${itemId}`);

  return res?.data;
};

export const updateToDoItem = async ({
  itemId,
  req,
}: {
  itemId: number;
  req: IupdateToDo;
}) => {
  const res = await api.patch(`/items/${itemId}`, req);

  return res;
};

export const deleteToDoItem = async (itemId: number) => {
  const res = await api.delete(`/items/${itemId}`);

  return res;
};

export const postImage = async (req: FormData) => {
  const res = await api.post(`/images/upload`, req, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};
