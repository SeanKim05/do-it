"use client";

import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteToDoItemMutation,
  useGetToDoItem,
  usePostImgMutation,
  useUpdateToDoItemMutation,
} from "@/api/query";
import { useState, useEffect } from "react";
import ButtonSection from "@/components/detail/Buttons";
import ImageAndMemoSection from "@/components/detail/ImageAndMemoSection";
import CompletionCheck from "@/components/detail/CompletionCheck";

export default function Detail() {
  const { itemIdParam } = useParams();
  const router = useRouter();
  const { data: toDoItem, isFetching } = useGetToDoItem(+itemIdParam);
  const [memoVal, setMemoVal] = useState("");
  const [imgUrlVal, setImgUrlVal] = useState("");
  const [isCompletedVal, setIsCompletedVal] = useState(false);
  const [isValChanged, setIsValChanged] = useState(false);

  useEffect(() => {
    if (toDoItem) {
      setIsCompletedVal(toDoItem.isCompleted || false);
      setMemoVal(toDoItem.memo || "");
      setImgUrlVal(toDoItem.imageUrl || "");
    }
  }, [toDoItem]);

  // Monitor changes in memoVal and imgUrlVal
  useEffect(() => {
    if (toDoItem) {
      const hasChanges =
        memoVal !== (toDoItem.memo || "") ||
        imgUrlVal !== (toDoItem.imageUrl || "");
      setIsValChanged(hasChanges);
      console.log(
        "Memo Value:",
        memoVal,
        "Image URL Value:",
        imgUrlVal,
        "Has Changes:",
        hasChanges
      ); // Debugging logs
    }
  }, [memoVal, imgUrlVal, toDoItem]);

  // tanstack mutation
  const previewImg = usePostImgMutation();
  const updateItem = useUpdateToDoItemMutation();
  const deleteItem = useDeleteToDoItemMutation();

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일의 사이즈는 5MB 미만입니다");
        return;
      }

      const previewImgUrl = URL.createObjectURL(file);
      setImgUrlVal(previewImgUrl);

      const formData = new FormData();
      formData.append("image", file);

      previewImg.mutate(formData);
    }
  };

  //수정
  const onClickUpdate = () => {
    const req = {
      memo: memoVal || "",
      name: toDoItem?.name || "",
      imageUrl: imgUrlVal || "",
      isCompleted: isCompletedVal,
    };
    updateItem.mutate(
      { itemId: +itemIdParam, req },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  //삭제
  const onClickDelete = () => {
    deleteItem.mutate(+itemIdParam, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="min-h-screen font-nanumR text-[16px] flex flex-col">
      <Header />
      <div className="flex-grow flexRowCenter min-w-[344px] bg-slate/200">
        {!isFetching && (
          <div className="w-full h-[calc(100vh-60px)] max-w-[1200px] py-[24px] px-[16px] sm:px-[24px] md:px-[102px] bg-white">
            <section>
              <CompletionCheck
                isCompletedVal={isCompletedVal}
                toDoItemName={toDoItem?.name || ""}
                setIsCompletedVal={setIsCompletedVal}
              />
              <ImageAndMemoSection
                imgUrlVal={imgUrlVal}
                memoVal={memoVal}
                setMemoVal={setMemoVal}
                handleImageUpload={handleImageUpload}
              />
            </section>

            <ButtonSection
              onClickUpdate={onClickUpdate}
              onClickDelete={onClickDelete}
              isValChanged={isValChanged}
            />
          </div>
        )}
      </div>
    </div>
  );
}
