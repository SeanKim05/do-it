"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGetToDoList, useUpdateToggleToDoItem } from "@/api/query";
import Link from "next/link";
import { ITodoItem, ToDoSectionProps } from "../../../.next/types/interface";

const ToDoSection: React.FC<ToDoSectionProps> = ({
  title,
  items,
  emptyImage,
  emptyText,
  handleToggleCompleted,
  completed,
}) => (
  <section className="w-full md:mr-[12px] mb-[24px] md:mb-0">
    <div className="w-[97px] h-[36px]">
      <Image src={title} width={97} height={36} alt="TODO" />
    </div>
    {items.length < 1 ? (
      <div className="flexRowCenter flex-col w-full h-full mb-[48px] md:mb-0">
        <div className="w-[120px] h-[120px] sm:w-[240px] sm:h-[240px]">
          <Image
            src={emptyImage}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="빈"
          />
        </div>
        <div className="text-center text-[16px] text-slate/400 leading-tight">
          {emptyText.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    ) : (
      <>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center h-[50px] rounded-[27px] border-[2px] border-slate/900 mt-[16px] px-[10px] cursor-pointer"
          >
            <Image
              src={completed ? "/assets/checkbox.png" : "/assets/emptybox.png"}
              width={32}
              height={32}
              alt="check"
              onClick={() => handleToggleCompleted(item)}
            />
            <Link className="w-full" href={`/detail/${item.id}`}>
              <span
                className={`ml-[16px] w-full ${
                  completed ? "line-through" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </>
    )}
  </section>
);

const ToDoList: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetToDoList();
  const updateToggleToDoItem = useUpdateToggleToDoItem();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const todoList = data ? (data.pages.flat() as ITodoItem[]) : [];

  const handleToggleCompleted = (item: ITodoItem) => {
    updateToggleToDoItem.mutate({
      itemId: item.id,
      req: { isCompleted: !item.isCompleted },
    });
  };

  const completed = todoList.filter((item: ITodoItem) => item.isCompleted);
  const notCompleted = todoList.filter((item: ITodoItem) => !item.isCompleted);

  return (
    <div className="flex flex-col md:flex-row justify-between mt-[40px]">
      <ToDoSection
        title="/assets/todo.svg"
        items={notCompleted}
        emptyImage="/assets/empty.png"
        emptyText={"할 일이 없어요.\nTODO를 새롭게 추가해주세요!"}
        handleToggleCompleted={handleToggleCompleted}
        completed={false}
      />
      <ToDoSection
        title="/assets/done.svg"
        items={completed}
        emptyImage="/assets/empty-1.png"
        emptyText={"아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"}
        handleToggleCompleted={handleToggleCompleted}
        completed={true}
      />
      <div ref={bottomRef} className="h-1"></div>
    </div>
  );
};

export default ToDoList;
