import React, { useState } from "react";
// import { FaTrash } from "react-icons/fa";

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
}

const SavedRow: React.FC<Props> = ({ rows, onDelete }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  function openModal(photo: string) {
    setModalImage(photo);
  }

  function closeModal() {
    setModalImage(null);
  }

  return (
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
          {row.photo && (
            <img
              src={row.photo}
              alt="Row Photo"
              className="h-12 w-12 rounded-full cursor-pointer object-cover border border-gray-300"
              onClick={() => openModal(row.photo)}
            />
          )}
          <button
            onClick={() => onDelete(row)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            {/* <FaTrash size={20} /> */}
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
