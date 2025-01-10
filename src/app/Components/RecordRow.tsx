import React, { useState, useEffect, ChangeEvent } from "react";
import { db } from "../../../firebase.js";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

interface Row {
  id: number;
  name: string;
  weight: string;
  reps: string;
}

export default function RecordRow() {
  const [rows, setRows] = useState<Row[]>([]);
  const [staticRow, setStaticRow] = useState<Row>({
    id: 0,
    name: "",
    weight: "",
    reps: "",
  });

  // Fetch rows from Firestore when the component loads
  useEffect(() => {
    async function fetchRows() {
      try {
        const rowsDocRef = doc(db, "exercises", "rows");
        const docSnapshot = await getDoc(rowsDocRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          if (data.rows && Array.isArray(data.rows)) {
            setRows(data.rows); // Set rows state with fetched data
          }
        } else {
          console.error("Document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching rows from Firestore:", error);
      }
    }

    fetchRows();
  }, []); // Empty dependency array ensures this runs only once

  async function saveRow() {
    if (staticRow.name && staticRow.weight && staticRow.reps) {
      try {
        const rowsDocRef = doc(db, "exercises", "rows");

        const newRow = {
          id: rows.length + 1, // Unique ID for this row
          name: staticRow.name,
          weight: staticRow.weight,
          reps: staticRow.reps,
        };

        await updateDoc(rowsDocRef, {
          rows: arrayUnion(newRow),
        });

        setRows((prevRows) => [...prevRows, newRow]);
        setStaticRow({ id: 0, name: "", weight: "", reps: "" });

        alert("Row added successfully!");
      } catch (error) {
        console.error("Error saving row to Firestore:", error);
        alert("Failed to save row. Please try again.");
      }
    } else {
      alert("Please fill in all fields before saving.");
    }
  }

  function handleStaticInputChange(
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Row
  ) {
    const { value } = e.target;
    setStaticRow((prevRow) => ({ ...prevRow, [field]: value }));
  }

  return (
    <div className="mx-auto max-w-4xl items-center p-4 pb-16 gap-8 sm:p-12 font-sans">
      {/* Input Form */}
      <div className="w-full">
        <div className="flex flex-wrap bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-lg shadow-lg justify-between items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={staticRow.name}
            onChange={(e) => handleStaticInputChange(e, "name")}
            className="text-black rounded-md p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <input
            type="text"
            placeholder="Weight"
            value={staticRow.weight}
            onChange={(e) => handleStaticInputChange(e, "weight")}
            className="text-black rounded-md p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <input
            type="text"
            placeholder="Reps"
            value={staticRow.reps}
            onChange={(e) => handleStaticInputChange(e, "reps")}
            className="text-black rounded-md p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button
            onClick={saveRow}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors shadow-sm w-24"
          >
            Save
          </button>
        </div>
      </div>

      {/* Display Saved Rows */}
      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex flex-wrap bg-gray-50 p-4 rounded-lg shadow-md justify-between items-center hover:shadow-lg transition-shadow gap-2"
          >
            <div className="font-medium text-gray-700 w-12 text-center">
              {row.id}
            </div>
            <div className="text-black rounded-md p-2 w-1/5">{row.name}</div>
            <div className="text-black rounded-md p-2 w-1/5">{row.weight}</div>
            <div className="text-black rounded-md p-2 w-1/5">{row.reps}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
