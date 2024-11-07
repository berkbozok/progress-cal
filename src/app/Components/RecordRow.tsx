// Imports
import { useState, ChangeEvent } from "react";

// Define the type for a row
interface Row {
  id: number;
  name: string;
  weight: string;
  reps: string;
}

// function test
export default function RecordRow() {
  // Initialize the state with an empty array to hold rows of type Row
  const [rows, setRows] = useState<Row[]>([]);

  // Function to add a new row to the array
  function createRow() {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: "", weight: "", reps: "" },
    ]);
  }

  // Function to remove a row by id
  function removeRow(id: number) {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
  // Return function
  return (
    <div className="mx-auto items-center  p-4 pb-16 gap-8 sm:p-12 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-3xl">
        {/* Initial static row */}
        <div className="flex flex-row w-full bg-blue-600 p-4 rounded-lg shadow-md justify-between items-center mb-4">
          <div className="text-white font-bold">Photo</div>
          <input
            type="text"
            placeholder="Name"
            className="bg-red-100 rounded-md p-2 w-1/4"
          />
          <input
            type="text"
            placeholder="Weight"
            className="bg-orange-100 rounded-md p-2 w-1/4"
          />
          <input
            type="text"
            placeholder="Reps"
            className="bg-yellow-100 rounded-md p-2 w-1/4"
          />
        </div>
        {/* Dynamically rendered rows */}
        <div className="mt-4 space-y-4">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-row w-full bg-blue-100 p-4 rounded-lg shadow-md justify-between items-center"
            >
              <div className="font-medium text-gray-700">{row.id}</div>
              {/* Inputs */}
              <input
                type="text"
                placeholder="Name"
                value={row.name}
                onChange={(e) => handleInputChange(e, row.id, "name")}
                className="bg-red-50 rounded-md p-2 w-1/4 border border-red-200"
              />
              <input
                type="text"
                placeholder="Weight"
                value={row.weight}
                onChange={(e) => handleInputChange(e, row.id, "weight")}
                className="bg-orange-50 rounded-md p-2 w-1/4 border border-orange-200"
              />
              <input
                type="text"
                placeholder="Reps"
                value={row.reps}
                onChange={(e) => handleInputChange(e, row.id, "reps")}
                className="bg-yellow-50 rounded-md p-2 w-1/4 border border-yellow-200"
              />
              <button
                onClick={() => removeRow(row.id)}
                className="bg-red-500 text-white p-2 rounded-md ml-2 hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {/* Button to add a new row */}
        <span className="flex justify-end mt-6">
          <button
            onClick={createRow}
            className="bg-green-500 text-white p-3 rounded-md shadow hover:bg-green-600 transition-colors"
          >
            Add Row
          </button>
        </span>
      </div>

      {/* Footer */}
      <footer className="text-gray-500 text-sm">
        <span className="ml-auto"> &copy; 2024 Progress Cal</span>
      </footer>
    </div>
  );
}
