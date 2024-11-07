// Imports
import { useState, ChangeEvent } from "react";

// Define the type for a row
interface Row {
  id: number;
  name: string;
  weight: string;
  reps: string;
  photo?: string;
}

// function test
export default function RecordRow() {
  // Initialize the state with an empty array to hold rows of type Row
  const [rows, setRows] = useState<Row[]>([]);
  const [staticRowPhoto, setStaticRowPhoto] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Function to add a new row to the array
  function createRow() {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: "", weight: "", reps: "", photo: "" },
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

  // Function to handle photo upload
  function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>, id: number) {
    if (e.target.files && e.target.files[0]) {
      const photoURL = URL.createObjectURL(e.target.files[0]);
      if (id === 0) {
        setStaticRowPhoto(photoURL);
      } else {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, photo: photoURL } : row
          )
        );
      }
    }
  }

  // Function to open modal
  function openModal(photo: string) {
    setModalImage(photo);
  }

  // Function to close modal
  function closeModal() {
    setModalImage(null);
  }

  // Return function
  return (
    <div className="mx-auto max-w-4xl items-center p-4 pb-16 gap-8 sm:p-12 font-sans">
      <div className="w-full">
        {/* Initial static row */}
        <div className="flex flex-wrap bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-lg shadow-lg justify-between items-center mb-4">
          <div className="flex items-center w-1/4">
            {staticRowPhoto ? (
              <img
                src={staticRowPhoto}
                alt="Static row photo"
                className="h-12 w-12 rounded-full cursor-pointer object-cover border border-gray-300"
                onClick={() => openModal(staticRowPhoto)}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, 0)}
                className="text-gray-600"
              />
            )}
          </div>
          <input
            type="text"
            placeholder="Name"
            className="bg-red-100 rounded-md p-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          />
          <input
            type="text"
            placeholder="Weight"
            className="bg-orange-100 rounded-md p-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          />
          <input
            type="text"
            placeholder="Reps"
            className="bg-yellow-100 rounded-md p-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
        </div>
        {/* Dynamically rendered rows */}
        <div className="mt-4 space-y-4">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap bg-white p-4 rounded-lg shadow-md justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div className="font-medium text-gray-700">{row.id}</div>
              <div className="flex items-center w-1/4">
                {row.photo ? (
                  <img
                    src={row.photo}
                    alt={`Row ${row.id} photo`}
                    className="h-12 w-12 rounded-full cursor-pointer object-cover border border-gray-300"
                    onClick={() => openModal(row.photo)}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, row.id)}
                    className="text-gray-600"
                  />
                )}
              </div>
              {/* Inputs */}
              <input
                type="text"
                placeholder="Name"
                value={row.name}
                onChange={(e) => handleInputChange(e, row.id, "name")}
                className="bg-red-50 rounded-md p-2 w-1/4 border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
              />
              <input
                type="text"
                placeholder="Weight"
                value={row.weight}
                onChange={(e) => handleInputChange(e, row.id, "weight")}
                className="bg-orange-50 rounded-md p-2 w-1/4 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />
              <input
                type="text"
                placeholder="Reps"
                value={row.reps}
                onChange={(e) => handleInputChange(e, row.id, "reps")}
                className="bg-yellow-50 rounded-md p-2 w-1/4 border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              />
              <button
                onClick={() => removeRow(row.id)}
                className="bg-red-500 text-white p-2 rounded-md ml-2 hover:bg-red-600 transition-colors shadow-sm"
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
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Add Row
          </button>
        </span>
      </div>

      {/* Modal for image preview */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-sm max-h-[80%] bg-white rounded-md p-4">
            <img
              src={modalImage}
              alt="Preview"
              className="rounded-md w-full h-auto"
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

      {/* Footer */}
      <footer className="text-gray-500 text-sm mt-8 text-center">
        &copy; 2024 Progress Cal
      </footer>
    </div>
  );
}
