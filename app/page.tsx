"use client";

import Live from "@/components/Live";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Navbar />
      <Live />
    </div>
  );
}
