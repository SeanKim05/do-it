import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flexRowCenter w-full h-[60px] border-b-[1px] border-slate/200">
      <div className="flex justify-start items-center w-full max-w-[1200px] h-full px-[24px]">
        <Image src="/assets/logo.png" alt="로고" width={151} height={40} />
      </div>
    </div>
  );
}
