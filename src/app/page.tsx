import Header from "../components/Header";
import CreateTodo from "@/components/home/CreateTodo";
import ToDoList from "@/components/home/ToDoList";

export default function Home() {
  return (
    <div className="min-h-screen font-nanumR text-[16px]">
      <Header />

      <main className="flexRowCenter pt-[24px]  px-[24px]">
        <div className=" w-full max-w-[1200px]">
          <CreateTodo />

          <ToDoList />
        </div>
      </main>
    </div>
  );
}
