import React, { useState } from "react";

interface Row {
  id: number;
  name: string;
  weight: string;
  reps: string;
  photo?: string;
}

interface Props {
  rows: Row[];
  onDelete: (row: Row) => void;
  onUpdate: (row: Row) => void; // Function to handle updating the row
}

const SavedRow: React.FC<Props> = ({ rows, onDelete, onUpdate }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<number | null>(null); // Track which row is being edited
  const [editedRow, setEditedRow] = useState<Row | null>(null); // Store the edited row values

  function openModal(photo: string) {
    setModalImage(photo);
  }

  function closeModal() {
    setModalImage(null);
  }

  function handleEdit(row: Row) {
    setEditingRow(row.id);
    setEditedRow({ ...row });
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Row
  ) {
    if (editedRow) {
      setEditedRow({ ...editedRow, [field]: e.target.value });
    }
  }

  function saveEdit() {
    if (editedRow) {
      onUpdate(editedRow); // Save the updated row
      setEditingRow(null); // Exit edit mode
      setEditedRow(null); // Clear the edited row state
    }
  }
  // return
  return (
    <div className="mt-4 space-y-4">
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-wrap bg-gray-50 p-4 rounded-lg shadow-md justify-between items-center hover:shadow-lg transition-shadow gap-2"
        >
          <div className="font-medium text-gray-700 w-12 text-center flex flex-row">
            <span className="my-auto mx-2">{row.id}</span>
            {row.photo && (
              <img
                src={row.photo}
                alt="Row Photo"
                className="h-12 w-12 rounded-full cursor-pointer object-cover border border-gray-300"
                onClick={() => row.photo && openModal(row.photo)}
              />
            )}
          </div>

          {editingRow === row.id ? (
            <>
              <input
                type="text"
                value={editedRow?.name || ""}
                onChange={(e) => handleInputChange(e, "name")}
                className="text-black rounded-md p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="text"
                value={editedRow?.weight || ""}
                onChange={(e) => handleInputChange(e, "weight")}
                className="text-black rounded-md p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="text"
                value={editedRow?.reps || ""}
                onChange={(e) => handleInputChange(e, "reps")}
                className="text-black rounded-md p-2 w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <button
                onClick={saveEdit}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors shadow-sm w-24"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div className="text-black rounded-md p-2 w-1/5">{row.name}</div>
              <div className="text-black rounded-md p-2 w-1/5">
                {row.weight}
              </div>
              <div className="text-black rounded-md p-2 w-1/5">{row.reps}</div>
              <button
                onClick={() => handleEdit(row)}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors shadow-sm w-24"
              >
                Edit
              </button>
            </>
          )}

          <button
            onClick={() => onDelete(row)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      ))}

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-md max-h-[80%] bg-white rounded-md p-4 border border-gray-200 overflow-auto">
            <img
              src={modalImage}
              alt="Preview"
              className="rounded-md max-w-full max-h-full border border-gray-300"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedRow;
