import Header from "@/components/header";
import Image from "next/image";

export default function Detail() {
  return (
    <div className="min-h-screen font-nanumR text-[16px] flex flex-col">
      <Header />

      <div className="flex-grow flex justify-center items-center bg-slate/200">
        <div className="w-full h-[calc(100vh-60px)] max-w-[1200px] py-[24px] px-[102px] bg-white">
          <section>
            <div className="flexRowCenter w-full h-[64px] rounded-[24px] border-[2px] border-slate/900">
              <Image
                src="/assets/emptybox.png"
                height={32}
                width={32}
                alt="emptybox"
              />
              <span className="ml-[16px]">약 먹어야 됨</span>
            </div>
            <div className="flex justify-between my-[24px] h-[311px]">
              <div className="relative flexRowCenter min-w-[384px] rounded-[24px] bg-slate/300">
                <Image
                  src="/assets/imgadd.png"
                  height={64}
                  width={64}
                  alt="img add"
                />
                <button className="absolute bottom-[16px] right-[16px] flexRowCenter w-[64px] h-[64px] rounded-full bg-slate/200">
                  <Image
                    src="/assets/plus.png"
                    height={24}
                    width={24}
                    alt="img plus"
                  />
                </button>
              </div>
              <div className="relative min-w-[588px] rounded-[24px] overflow-hidden">
                <Image
                  className="rounded-[24px]"
                  src="/assets/memo.png"
                  layout="fill"
                  objectFit="cover"
                  alt="img plus"
                />
                <div className="absolute inset-0 flex justify-center items-center ">
                  dadasdas
                </div>
              </div>
            </div>
          </section>
          <section className="flex justify-end items-center w-full">
            <button
              className="flexRowCenter w-[168px] h-[56px] mr-[16px] bg-slate/200 border-2 border-slate/900 rounded-[24px] text-[16px] max-sm:w-[56px]"
              style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
            >
              수정 완료
            </button>
            <button
              className="flexRowCenter w-[168px] h-[56px] bg-rose/500 border-2 border-slate/900 text-white rounded-[24px] text-[16px] max-sm:w-[56px]"
              style={{ boxShadow: "0 6px 4px rgba(15, 23, 42, 1)" }}
            >
              삭제하기
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
