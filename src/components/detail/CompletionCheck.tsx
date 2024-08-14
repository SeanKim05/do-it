"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CompletionToggleProps {
  isCompletedVal: boolean;
  toDoItemName?: string;
  setNameVal: (val: string) => void;
  setIsCompletedVal: (val: boolean) => void;
}

export default function CompletionCheck({
  isCompletedVal,
  toDoItemName,
  setNameVal,
  setIsCompletedVal,
}: CompletionToggleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(toDoItemName || "");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setNameVal(newValue);
  };

  return (
    <div
      className={`flexRowCenter w-full h-[64px] rounded-[24px] border-[2px] border-slate/900 font-bold ${
        isCompletedVal ? "bg-violet/200" : ""
      }`}
      onClick={handleEditClick}
    >
      <Image
        src={`/assets/${isCompletedVal ? "checkbox" : "emptybox"}.png`}
        height={32}
        width={32}
        alt="checkbox status"
        onClick={(e) => {
          e.stopPropagation();
          setIsCompletedVal(!isCompletedVal);
        }}
        className="mr-[16px] cursor-pointer"
      />
      {isEditing ? (
        <input
          className="underline text-[20px] font-nanumB underline-offset-8 placeholder-slate/900 text-center"
          value={localValue}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <span className="underline text-[20px] font-nanumB underline-offset-8 placeholder-slate/900 text-center">
          {toDoItemName}
        </span>
      )}
    </div>
  );
}
