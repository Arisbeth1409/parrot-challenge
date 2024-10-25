import MainLayout from "@/Layouts/MainLayout";

import Image from "next/image";
import Login from "@/components/Login/Login";

import banner from "@/public/images/banner.webp";

export default function Home() {
  return (
    <MainLayout>
      <main className="w-full pt-[4.25rem] grid grid-cols-12">
        <section className="col-span-12 md:h-[70vh] md:col-span-7 sm:col-span-6">
          <Image
            src={banner}
            alt="parrot"
            width={800}
            height={500}
            className="object-cover h-[12.5rem] sm:h-full sm:w-full"
          />
        </section>
        <section className="col-span-12 md:col-span-5 sm:col-span-6 p-[2rem] md:p-[4rem]">
          <Login />
        </section>
      </main>
    </MainLayout>
  );
}
