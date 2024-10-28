"use client";
// Imports
import { useState, ChangeEvent } from "react";

// Define the type for a row
interface Row {
  id: number;
  name: string;
  weight: string;
  reps: string;
}
// function
export default function Home() {
  // Initialize the state with an empty array to hold rows of type Row
  const [rows, setRows] = useState<Row[]>([]);

  // Function to add a new row to the array
  function createRow() {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: "", weight: "", reps: "" },
    ]);
  }

  // Function to handle changes in the inputs for each row
  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    id: number,
    field: keyof Row // 'name' | 'weight' | 'reps'
  ) {
    const { value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full">
        {/* Initial static row */}
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

        {/* Button to add a new row */}
        <span className="flex justify-end mt-4">
          <button onClick={createRow} className="bg-green-500 p-3 rounded-md">
            Add Row
          </button>
        </span>

        {/* Dynamically rendered rows */}
        <div className="mt-8">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-row w-full bg-blue-200 p-5 rounded-md justify-between mt-2"
            >
              <div>{row.id}</div>
              <input
                type="text"
                placeholder="Name"
                value={row.name}
                onChange={(e) => handleInputChange(e, row.id, "name")}
                className="bg-red-300"
              />
              <input
                type="text"
                placeholder="Weight"
                value={row.weight}
                onChange={(e) => handleInputChange(e, row.id, "weight")}
                className="bg-orange-300"
              />
              <input
                type="text"
                placeholder="Reps"
                value={row.reps}
                onChange={(e) => handleInputChange(e, row.id, "reps")}
                className="bg-yellow-300"
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
