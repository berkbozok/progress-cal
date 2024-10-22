"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [record, setRecord] = useState();

  function createRow() {}
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full">
        <div className="flex flex-row w-full bg-blue-500 p-5 rounded-md justify-between">
          <div>Photo</div>
          <input type="text" placeholder="Name" className="bg-red-500"></input>
          <input
            type="text"
            placeholder="Weight"
            className="bg-orange-500"
          ></input>
          <input
            type="text"
            placeholder="Reps"
            className="bg-yellow-500"
          ></input>
        </div>
        <span className="flex justify-end mt-4">
          <button
            onClick={() => createRow()}
            className="bg-green-500 p-3 rounded-md"
          >
            Add Row
          </button>
        </span>
      </div>

      {/* href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" */}

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
