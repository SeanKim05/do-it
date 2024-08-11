import Header from "../components/Header";
import SearchBar from "@/components/home/SearchBar";
import ToDoList from "@/components/home/ToDoList";

export default function Home() {
  return (
    <div className="min-h-screen font-nanumR text-[16px]">
      <Header />

      <main className="flexRowCenter pt-[24px]  px-[24px]">
        <div className=" w-full max-w-[1200px]">
          <SearchBar />

          <ToDoList />
        </div>
      </main>
    </div>
  );
}
