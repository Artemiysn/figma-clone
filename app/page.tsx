"use client";

import Live from "@/components/Live";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    // <div className="h-[100vh] w-full flex justify-center items-center">
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
      {/* <LeftSidebar /> */}
        <Live />
      </section>
      {/* <RightSidebar /> */}
    </main>
    // </div>
  );
}
