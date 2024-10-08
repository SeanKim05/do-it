"use client";

import Image from "next/image";
import React, { useRef } from "react";

interface ImageAndMemoSectionProps {
  imgUrlVal: string;
  memoVal: string;
  setMemoVal: (val: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageAndMemoSection({
  imgUrlVal,
  memoVal,
  setMemoVal,
  handleImageUpload,
}: ImageAndMemoSectionProps) {
  //textarea 중앙정렬 로직
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between h-auto md:h-[311px] my-[24px] space-y-4 md:space-y-0 space-x-0 md:space-x-[24px]">
      {/* 이미지 영역 */}
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
            style={{ width: "auto" }}
            src="/assets/pluslg.png"
            height={24}
            width={24}
            alt="img plus"
          />
        </div>
      </div>
      {/* 메모영역 */}
      <div className="relative w-full md:max-w-[588px] min-h-[311px] rounded-[24px] overflow-hidden">
        <Image
          className="rounded-[24px]"
          src="/assets/memo.png"
          fill
          object-fit="cover"
          alt="img plus"
          priority
        />
        <div className="relative flexRowCenter mt-[24px] text-amber/800 z-10 text-[16px] font-nanumB font-bold">
          Memo
        </div>
        <div className="absolute inset-0 flex justify-center items-center px-[16px] mt-[16px]">
          <textarea
            ref={textareaRef}
            className="text-center w-full bg-[transparent] outline-none resize-none font-normal max-h-[220px]"
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
            value={memoVal || ""}
            onChange={(e) => {
              setMemoVal(e.target.value);
              autoResize();
            }}
          />
        </div>
      </div>
    </div>
  );
}
