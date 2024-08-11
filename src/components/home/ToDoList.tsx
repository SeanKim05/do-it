"use client";
import React from "react";
import Image from "next/image";
import { useGetToDoList } from "@/api/query";

export default function ToDoList() {
  interface ITodoItem {
    id: number;
    name: string;
    isCompleted: boolean;
  }

  const { data: todoList } = useGetToDoList();

  const completed =
    todoList?.filter((item: ITodoItem) => item.isCompleted) || [];
  const notCompleted =
    todoList?.filter((item: ITodoItem) => !item.isCompleted) || [];

  return (
    <div className="flex flex-col md:flex-row  justify-between mt-[40px]">
      <section className="w-full md:mr-[12px] mb-[24px] md:mb-0">
        <div className="w-[97px] h-[36px]">
          <Image src="/assets/todo.svg" width={97} height={36} alt="TODO" />
        </div>
        {notCompleted.map((item: ITodoItem) => (
          <div
            key={item.id}
            className="flex items-center h-[50px] rounded-[27px] border-[2px] border-slate/900 mt-[16px] px-[10px] "
          >
            <Image
              src="/assets/emptybox.png"
              width={32}
              height={32}
              alt="check"
            />
            <span className="ml-[16px]">{item.name}</span>
          </div>
        ))}
      </section>

      <section className="w-full md:ml-[12px]">
        <div className="w-[97px] h-[36px]">
          <Image src="/assets/done.svg" width={97} height={36} alt="Done" />
        </div>
        {completed.map((item: ITodoItem) => (
          <div
            key={item.id}
            className="flex items-center h-[50px] rounded-[27px] border-[2px] bg-violet/100 border-slate/900 mt-[16px] px-[10px] "
          >
            <Image
              src="/assets/checkbox.png"
              width={32}
              height={32}
              alt="check"
            />
            <span className="ml-[16px] line-through">{item.name}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
