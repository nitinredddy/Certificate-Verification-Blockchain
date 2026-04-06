import React from "react";

function FileUpload({ setFile }) {
  return (
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
    />
  );
}

export default FileUpload;