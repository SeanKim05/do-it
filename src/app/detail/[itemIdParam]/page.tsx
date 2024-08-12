"use client";

import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  useDeleteToDoItemMutation,
  useGetToDoItem,
  usePostImgMutation,
  useUpdateToDoItem,
} from "@/api/query";
import { useState, useEffect, useRef } from "react";

export default function Detail() {
  const { itemIdParam } = useParams();
  const router = useRouter();
  const { data: toDoItem, isFetching } = useGetToDoItem(+itemIdParam);
  const [memoVal, setMemoVal] = useState("");
  const [imgUrlVal, setImgUrlVal] = useState("");
  const [isCompletedVal, setIsCompletedVal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (toDoItem) {
      setIsCompletedVal(toDoItem.isCompleted);
      setMemoVal(toDoItem.memo);
      setImgUrlVal(toDoItem.imageUrl);
    }
  }, [toDoItem]);

  useEffect(() => {
    autoResize();
  }, [memoVal]);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const previewImg = usePostImgMutation();
  const updateItem = useUpdateToDoItem();
  const deleteItem = useDeleteToDoItemMutation();

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

  const onClickUpdate = () => {
    const req = {
      memo: memoVal || "",
      name: toDoItem?.name,
      imageUrl: imgUrlVal || "",
      isCompleted: isCompletedVal,
    };
    updateItem.mutate({ itemId: +itemIdParam, req });
  };

  const onClickDelete = () => {
    deleteItem.mutate(+itemIdParam, {
      onSuccess: () => {
        router.push("/"); // Navigate after successful deletion
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
              <div
                onClick={() => setIsCompletedVal(!isCompletedVal)}
                className="flexRowCenter w-full h-[64px] rounded-[24px] border-[2px] border-slate/900"
              >
                <Image
                  src={`/assets/${
                    isCompletedVal ? "checkbox" : "emptybox"
                  }.png`}
                  height={32}
                  width={32}
                  alt="checkbox status"
                />
                <span
                  className={`ml-[16px] ${
                    isCompletedVal ? "line-through" : ""
                  }`}
                >
                  {toDoItem?.name}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between  h-auto md:h-[311px]  my-[24px] space-y-4 md:space-y-0">
                <div className="relative flexRowCenter w-full md:max-w-[384px] min-h-[311px] rounded-[24px] bg-slate/300">
                  {imgUrlVal ? (
                    <Image
                      src={imgUrlVal}
                      layout="fill"
                      objectFit="cover"
                      alt="Uploaded Image"
                      className="rounded-[24px]"
                    />
                  ) : (
                    <Image
                      src="/assets/imgadd.png"
                      height={64}
                      width={64}
                      alt="img add"
                    />
                  )}
                  <input
                    type="file"
                    className="absolute bottom-[16px] right-[16px] flexRowCenter w-[64px] h-[64px] rounded-full bg-slate/200 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  <div className="absolute bottom-[16px] right-[16px] flexRowCenter w-[64px] h-[64px] rounded-full bg-slate/200 pointer-events-none">
                    <Image
                      src="/assets/plus.png"
                      height={24}
                      width={24}
                      alt="img plus"
                    />
                  </div>
                </div>
                <div className="relative w-full md:max-w-[588px] min-h-[311px] rounded-[24px] overflow-hidden">
                  <Image
                    className="rounded-[24px]"
                    src="/assets/memo.png"
                    layout="fill"
                    objectFit="cover"
                    alt="img plus"
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <textarea
                      ref={textareaRef}
                      className="text-center w-full bg-[transparent] outline-none resize-none"
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                      value={memoVal}
                      onChange={(e) => {
                        setMemoVal(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="flex justify-center md:justify-end items-center w-full px-[16px]">
              <button
                onClick={() => onClickUpdate()}
                className="flexRowCenter min-w-[168px] h-[56px]  bg-slate/200 border-2 border-slate/900 rounded-[24px] text-[16px] sm:mr-[16px]"
                style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
              >
                수정 완료
              </button>
              <button
                onClick={() => onClickDelete()}
                className="flexRowCenter min-w-[168px] h-[56px] bg-rose/500 border-2 border-slate/900 text-white rounded-[24px] text-[16px]"
                style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
              >
                삭제하기
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
