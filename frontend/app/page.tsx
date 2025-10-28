'use client';

// export interface AppPageProps {}

export default function AppPage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col items-center relative">
          <section className="banner h-[393px] w-full bg-[#1F2E3C]"></section>
          <section className="booking-flight h-[233px] w-[1140px] bg-[#DCBB87] absolute bottom-0 translate-y-1/2"></section>
        </div>
        <section className="booking-hotel flex justify-center gap-[50px] py-[40px] mt-[160px]">
          <div className="flex flex-col gap-[40px]">
            <div className="w-[355px] h-[280px] bg-[#C5C8C8]"></div>
            <div className="w-[355px] h-[280px] bg-[#C5C8C8]"></div>
          </div>
          <div>
            <div className="w-[355px] h-[600px] bg-[#C5C8C8]"></div>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div className="w-[355px] h-[280px] bg-[#C5C8C8]"></div>
            <div className="w-[355px] h-[280px] bg-[#C5C8C8]"></div>
          </div>
        </section>
        <section className="banner h-[670px] w-full bg-[#1F2E3C] "></section>
        <section className="banner h-[670px] w-full bg-[#C5C8C8] "></section>
      </div>
    </>
  );
}
