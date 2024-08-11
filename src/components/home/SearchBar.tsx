"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePostToDoMutation } from "@/api/query";

export default function SearchBar() {
  const [inpuVal, setInputVale] = useState("");

  const { mutate } = usePostToDoMutation();
  const toDoClickHandler = () => {
    const req = { name: inpuVal };
    mutate(req);
  };

  return (
    <div className="flexRowCenter">
      <input
        className="w-full max-w-[1016px] h-[56px] bg-slate/100 border-2 border-slate/900 rounded-[24px] mr-[16px] px-[24px]"
        style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
        onChange={(e) => {
          setInputVale(e.target.value);
        }}
      />
      <button
        className="flexRowCenter w-[168px] h-[56px] bg-slate/200 border-2 border-slate/900 rounded-[24px] text-[16px] max-sm:w-[56px]"
        style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
        onClick={() => toDoClickHandler()}
      >
        <Image src="/assets/plus.png" width={16} height={16} alt="더하기" />
        <span className="ml-[4px] max-sm:hidden text-[18px]">추가하기</span>
      </button>
    </div>
  );
}
