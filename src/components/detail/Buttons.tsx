"use client";

import React from "react";
import Image from "next/image";
interface ButtonSectionProps {
  onClickUpdate: () => void;
  onClickDelete: () => void;
}

export default function ButtonSection({
  onClickUpdate,
  onClickDelete,
}: ButtonSectionProps) {
  return (
    <section className="flex justify-center md:justify-end items-center w-full px-[16px] font-bold">
      <button
        onClick={onClickUpdate}
        className="flexRowCenter min-w-[168px] h-[56px]  bg-slate/200 border-2 border-slate/900 rounded-[24px] text-[16px] sm:mr-[16px]"
        style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
      >
        <Image
          src={"/assets/check.png"}
          height={16}
          width={16}
          alt="checkbox status"
        />
        <span className="ml-[4px]">수정 완료</span>
      </button>
      <button
        onClick={onClickDelete}
        className="flexRowCenter min-w-[168px] h-[56px] bg-rose/500 border-2 border-slate/900 text-white rounded-[24px] text-[16px]"
        style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
      >
        <Image
          src={"/assets/X.png"}
          height={16}
          width={16}
          alt="checkbox status"
        />
        <span className="ml-[4px]">삭제하기</span>
      </button>
    </section>
  );
}
