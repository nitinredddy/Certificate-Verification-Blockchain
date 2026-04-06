import { useState } from "react";
import axios from "axios";

function Verify() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!file) return alert("Upload a file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://localhost:3000/api/certificate/verify",
      formData
    );

    setResult(res.data.valid);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        className="border p-2 rounded"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleVerify}
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Verify Certificate
      </button>

      {result !== null && (
        <div
          className={`p-3 rounded text-center font-semibold ${
            result ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {result ? "Valid Certificate ✅" : "Fake Certificate ❌"}
        </div>
      )}
    </div>
  );
}

export default Verify;