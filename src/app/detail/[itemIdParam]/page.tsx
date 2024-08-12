"use client";

import Header from "@/components/Header";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useGetToDoItem, useUpdateToDoItem } from "@/api/query";
import { useState, useEffect } from "react";

export default function Detail() {
  const { itemIdParam } = useParams();
  const { data: toDoItem, isFetching } = useGetToDoItem(+itemIdParam);
  const [memoVal, setMemoVal] = useState("");
  const [imgUrlVal, setImgUrlVal] = useState("");
  const [isCompletedVal, setIsCompletedVal] = useState(false);

  useEffect(() => {
    if (toDoItem) {
      setIsCompletedVal(toDoItem.isCompleted);
      setMemoVal(toDoItem.memo);
    }
  }, [toDoItem]);

  const updateItem = useUpdateToDoItem();
  const onClickUpdate = () => {
    const req = {
      memo: memoVal,
      name: toDoItem?.name,
      imageUrl: imgUrlVal,
      isCompleted: isCompletedVal,
    };
    updateItem.mutate({ itemId: +itemIdParam, req });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일의 사이즈는 5MB 미만입니다");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImgUrlVal(imageUrl);
    }
  };

  return (
    <div className="min-h-screen font-nanumR text-[16px] flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center bg-slate/200">
        {!isFetching && (
          <div className="w-full h-[calc(100vh-60px)] max-w-[1200px] py-[24px] px-[102px] bg-white">
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

              <div className="flex justify-between my-[24px] h-[311px]">
                <div className="relative flexRowCenter min-w-[384px] rounded-[24px] bg-slate/300">
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
                <div className="relative min-w-[588px] rounded-[24px] overflow-hidden">
                  <Image
                    className="rounded-[24px]"
                    src="/assets/memo.png"
                    layout="fill"
                    objectFit="cover"
                    alt="img plus"
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <textarea
                      className="text-center w-full bg-[transparent] outline-none resize-none"
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                      defaultValue={toDoItem?.memo}
                      onChange={(e) => {
                        setMemoVal(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="flex justify-end items-center w-full">
              <button
                // onClick={onClickUpdate}
                className="flexRowCenter w-[168px] h-[56px] mr-[16px] bg-slate/200 border-2 border-slate/900 rounded-[24px] text-[16px] max-sm:w-[56px]"
                style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
              >
                수정 완료
              </button>
              <button
                className="flexRowCenter w-[168px] h-[56px] bg-rose/500 border-2 border-slate/900 text-white rounded-[24px] text-[16px] max-sm:w-[56px]"
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
