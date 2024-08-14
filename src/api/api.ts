import api from ".";

interface IupdateToDo {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export const postToDoItem = async (req: { name: string }) => {
  const res = await api.post("/items", req);

  return res;
};

export const getToDoList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const res = await api.get(`/items?page=${page}&pageSize=${size}`);

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

export const updateToggleToDoItem = async ({
  itemId,
  req,
}: {
  itemId: number;
  req: { isCompleted: boolean };
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
