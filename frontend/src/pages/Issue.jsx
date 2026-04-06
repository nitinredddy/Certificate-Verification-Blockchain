import { useState } from "react";
import axios from "axios";

function Issue() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");

  const handleIssue = async () => {
    if (!file) return alert("Upload a file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://localhost:3000/api/certificate/issue",
      formData
    );

    setHash(res.data.hash);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        className="border p-2 rounded"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleIssue}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Issue Certificate
      </button>

      {hash && (
        <div className="bg-gray-100 p-2 rounded text-sm break-all">
          <span className="font-semibold">Hash:</span> {hash}
        </div>
      )}
    </div>
  );
}

export default Issue;