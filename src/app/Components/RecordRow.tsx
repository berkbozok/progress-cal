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
  const [staticRow, setStaticRow] = useState<Row>({
    id: 0,
    name: "",
    weight: "",
    reps: "",
    photo: "",
  });
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Function to add the static row to the array when saving
  function saveRow() {
    if (staticRow.name && staticRow.weight && staticRow.reps) {
      setRows((prevRows) => [
        ...prevRows,
        { ...staticRow, id: prevRows.length + 1 },
      ]);
      setStaticRow({ id: 0, name: "", weight: "", reps: "", photo: "" });
    } else {
      alert("Please fill in all fields before saving.");
    }
  }

  // Function to remove a row by id
  function removeRow(id: number) {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  }

  // Function to handle changes in the inputs for the static row
  function handleStaticInputChange(
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Row // 'name' | 'weight' | 'reps'
  ) {
    const { value } = e.target;
    setStaticRow((prevRow) => ({ ...prevRow, [field]: value }));
  }

  // Function to handle photo upload for the static row
  function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>, id: number) {
    if (e.target.files && e.target.files[0]) {
      const photoURL = URL.createObjectURL(e.target.files[0]);
      if (id === 0) {
        setStaticRow((prevRow) => ({ ...prevRow, photo: photoURL }));
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
        <div className="flex flex-wrap bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-lg shadow-lg justify-between items-center mb-4 gap-2">
          <div className="flex items-center w-20 h-20">
            {staticRow.photo ? (
              <img
                src={staticRow.photo}
                alt="Static row photo"
                className="h-full w-full rounded-full cursor-pointer object-cover border border-gray-300"
                onClick={() => openModal(staticRow.photo!)}
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 0)}
                  className="hidden"
                  id="photoUpload"
                />
                {/* Label */}
                <label
                  htmlFor="photoUpload"
                  className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                  Upload Image
                </label>
              </>
            )}
          </div>
          {/* Inputs */}
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
        {/* Dynamically rendered rows */}
        <div className="mt-4 space-y-4">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap bg-gray-50 p-4 rounded-lg shadow-md justify-between items-center hover:shadow-lg transition-shadow gap-2"
            >
              <div className="font-medium text-gray-700 w-12 text-center">
                {row.id}
              </div>
              {/* Photo */}
              <div className="flex items-center w-20 h-20">
                {row.photo && (
                  <img
                    src={row.photo}
                    alt={`Row ${row.id} photo`}
                    className="h-full w-full rounded-full cursor-pointer object-cover border border-gray-300"
                    onClick={() => openModal(row?.photo)}
                  />
                )}
              </div>
              {/* Inputs */}
              <input
                type="text"
                placeholder="Name"
                value={row.name}
                disabled
                className="text-black rounded-md p-2 w-1/5 border  cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Weight"
                value={row.weight}
                disabled
                className="text-black rounded-md p-2 w-1/5 border  cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Reps"
                value={row.reps}
                disabled
                className="text-black rounded-md p-2 w-1/5 border cursor-not-allowed"
              />
              <button
                onClick={() => removeRow(row.id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors shadow-sm w-24"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for image preview */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-md max-h-[80%] bg-white rounded-md p-4 border border-gray-200 overflow-auto">
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={modalImage}
                alt="Preview"
                className="rounded-md max-w-full max-h-full border border-gray-300"
              />
            </div>
            {/* Close button */}
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
