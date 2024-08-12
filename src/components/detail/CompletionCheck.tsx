"use client";

import Image from "next/image";
import React from "react";

interface CompletionToggleProps {
  isCompletedVal: boolean;
  toDoItemName?: string;
  setIsCompletedVal: (val: boolean) => void;
}

export default function CompletionCheck({
  isCompletedVal,
  toDoItemName,
  setIsCompletedVal,
}: CompletionToggleProps) {
  return (
    <div
      onClick={() => setIsCompletedVal(!isCompletedVal)}
      className="flexRowCenter w-full h-[64px] rounded-[24px] border-[2px] border-slate/900 cursor-pointer"
    >
      <Image
        src={`/assets/${isCompletedVal ? "checkbox" : "emptybox"}.png`}
        height={32}
        width={32}
        alt="checkbox status"
      />
      <span className={`ml-[16px] ${isCompletedVal ? "line-through" : ""}`}>
        {toDoItemName}
      </span>
    </div>
  );
}
