"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGetToDoList, useUpdateToggleToDoItem } from "@/api/query"; // Make sure you import useUpdateToDoItemMutation
import Link from "next/link";

export default function ToDoList() {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useGetToDoList();
  const updateToggleToDoItem = useUpdateToggleToDoItem();

  // 무한스크롤 참조 ref
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 무한스크롤 로직 ref 가 보일 시 추가 로드
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  //이전 페이지와 추가 페이지 합치기
  const todoList = data ? data.pages.flat() : [];

  //할일 항목 체크박스 클릭 시 상태 전환
  const handleToggleCompleted = (item: any) => {
    updateToggleToDoItem.mutate({
      itemId: item.id,
      req: { isCompleted: !item.isCompleted },
    });
  };

  //할일 , 한일 나누기
  const completed = todoList.filter((item) => item.isCompleted);
  const notCompleted = todoList.filter((item) => !item.isCompleted);

  return (
    <div className="flex flex-col md:flex-row justify-between mt-[40px]">
      <section className="w-full md:mr-[12px] mb-[24px] md:mb-0">
        <div className="w-[97px] h-[36px]">
          <Image src="/assets/todo.svg" width={97} height={36} alt="TODO" />
        </div>
        {notCompleted.map((item) => (
          <div
            key={item.id}
            className="flex items-center h-[50px] rounded-[27px] border-[2px] border-slate/900 mt-[16px] px-[10px] cursor-pointer"
          >
            <Image
              src="/assets/emptybox.png"
              width={32}
              height={32}
              alt="check"
              onClick={() => handleToggleCompleted(item)}
            />
            <Link className="w-full" href={`/detail/${item.id}`}>
              <span className="ml-[16px] w-full">{item.name}</span>
            </Link>
          </div>
        ))}
      </section>

      <section className="w-full md:mr-[12px] mb-[24px] md:mb-0">
        <div className="w-[97px] h-[36px]">
          <Image src="/assets/done.svg" width={97} height={36} alt="TODO" />
        </div>
        {completed.map((item) => (
          <div
            key={item.id}
            className="flex items-center h-[50px] rounded-[27px] border-[2px] border-slate/900 mt-[16px] px-[10px] cursor-pointer"
          >
            <Image
              src="/assets/checkbox.png"
              width={32}
              height={32}
              alt="check"
              onClick={() => handleToggleCompleted(item)}
            />
            <Link className="w-full" href={`/detail/${item.id}`}>
              <span className="w-full ml-[16px] line-through">{item.name}</span>
            </Link>
          </div>
        ))}
      </section>

      <div ref={bottomRef} className="h-1"></div>
    </div>
  );
}
