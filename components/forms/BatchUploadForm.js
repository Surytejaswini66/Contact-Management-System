import { useState } from "react";

const BatchUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // Handle file upload logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default BatchUploadForm;
