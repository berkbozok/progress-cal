import React, { useState, ChangeEvent, useEffect } from "react";
import { db } from "../../../firebase.js";
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import SavedRow from "./SavedRow";

interface Row {
  id: number;
  name: string;
  weight: string;
  reps: string;
  photo?: string; // Base64 string
}

export default function RecordRow() {
  const [rows, setRows] = useState<Row[]>([]);
  const [staticRow, setStaticRow] = useState<Row>({
    id: 0,
    name: "",
    weight: "",
    reps: "",
    photo: "",
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

  // Convert image to Base64
  async function handlePhotoUpload(
    e: ChangeEvent<HTMLInputElement>
  ): Promise<string | undefined> {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result); // Base64 string
          } else {
            reject("Failed to convert image to Base64.");
          }
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          reject(error);
        };
        reader.readAsDataURL(file); // Convert file to Base64 string
      });
    }
    return undefined;
  }

  async function saveRow() {
    if (staticRow.name && staticRow.weight && staticRow.reps) {
      try {
        const rowsDocRef = doc(db, "exercises", "rows");

        const newRow = {
          id: rows.length + 1,
          name: staticRow.name,
          weight: staticRow.weight,
          reps: staticRow.reps,
          photo: staticRow.photo, // Add Base64 string of the photo
        };

        await updateDoc(rowsDocRef, {
          rows: arrayUnion(newRow),
        });

        setRows((prevRows) => [...prevRows, newRow]);
        setStaticRow({ id: 0, name: "", weight: "", reps: "", photo: "" });

        alert("Row added successfully!");
      } catch (error) {
        console.error("Error saving row to Firestore:", error);
        alert("Failed to save row. Please try again.");
      }
    } else {
      alert("Please fill in all fields before saving.");
    }
  }

  async function deleteRow(row: Row) {
    try {
      const rowsDocRef = doc(db, "exercises", "rows");

      // Remove the row from Firestore
      await updateDoc(rowsDocRef, {
        rows: arrayRemove(row),
      });

      // Remove the row locally
      setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));

      alert("Row deleted successfully!");
    } catch (error) {
      console.error("Error deleting row from Firestore:", error);
      alert("Failed to delete row. Please try again.");
    }
  }

  // Updating row
  async function updateRow(updatedRow: Row) {
    try {
      const rowsDocRef = doc(db, "exercises", "rows");

      // Remove the old row and add the updated row
      const oldRow = rows.find((row) => row.id === updatedRow.id);
      if (oldRow) {
        await updateDoc(rowsDocRef, {
          rows: arrayRemove(oldRow),
        });
      }
      await updateDoc(rowsDocRef, {
        rows: arrayUnion(updatedRow),
      });

      // Update the local state
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );

      alert("Row updated successfully!");
    } catch (error) {
      console.error("Error updating row in Firestore:", error);
      alert("Failed to update row. Please try again.");
    }
  }

  // editing inputs
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
          <div className="flex items-center w-20 h-20">
            {staticRow.photo ? (
              <img
                src={staticRow.photo}
                alt="Static row photo"
                className="h-full w-full rounded-full cursor-pointer object-cover border border-gray-300"
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const base64Image = await handlePhotoUpload(e);
                    if (base64Image) {
                      setStaticRow((prevRow) => ({
                        ...prevRow,
                        photo: base64Image,
                      }));
                    }
                  }}
                  className="hidden"
                  id="photoUpload"
                />
                <label
                  htmlFor="photoUpload"
                  className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                  Upload Image
                </label>
              </>
            )}
          </div>
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
      <SavedRow rows={rows} onDelete={deleteRow} onUpdate={updateRow} />
    </div>
  );
}
