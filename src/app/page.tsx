import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-nanumR text-[16px]">
      <Header />

      <main className="flexRowCenter pt-[24px]  px-[24px]">
        <div className=" w-full max-w-[1200px]">
          <div className="flexRowCenter">
            <input
              className="w-full max-w-[1016px] h-[56px] bg-slate/100 border-2 border-slate/900 rounded-[24px] mr-[16px]"
              style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
            />
            <button
              className="flexRowCenter w-[168px] h-[56px] bg-slate/200 border-2 border-slate/900 rounded-[24px] text-[16px] max-sm:w-[56px]"
              style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
            >
              <Image
                src="/assets/plus.png"
                width={16}
                height={16}
                alt="더하기"
              />
              <span className="ml-[4px] max-sm:hidden text-[18px]">
                추가하기
              </span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-[40px]">
            <section className="w-full md:mr-[12px] mb-[24px] md:mb-0">
              <div className="w-[97px] h-[36px]">
                <Image
                  src="/assets/todo.svg"
                  width={97}
                  height={36}
                  alt="TODO"
                />
              </div>
              <div className="flex items-center h-[50px] rounded-[27px] border-[2px] border-slate/900 mt-[16px] px-[10px] ">
                <Image
                  src="/assets/emptybox.png"
                  width={32}
                  height={32}
                  alt="check"
                />
                <span className="ml-[16px]">비타민 챙겨 안먹기</span>
              </div>
            </section>

            <section className="w-full md:ml-[12px]">
              <div className="w-[97px] h-[36px]">
                <Image
                  src="/assets/done.svg"
                  width={97}
                  height={36}
                  alt="Done"
                />
              </div>
              <div className="flex items-center h-[50px] rounded-[27px] border-[2px] bg-violet/100 border-slate/900 mt-[16px] px-[10px] ">
                <Image
                  src="/assets/checkbox.png"
                  width={32}
                  height={32}
                  alt="check"
                />
                <span className="ml-[16px] line-through">
                  비타민 챙겨 안먹기
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
