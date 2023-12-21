"use client";
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("./Map_"), { ssr: false });

export default function RenderMap_() {
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center items-center overflow-hidden`}
    >
      <DynamicMapComponent />
    </div>
  );
}
