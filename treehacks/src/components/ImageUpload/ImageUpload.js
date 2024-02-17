import React, { useState } from "react";
import "../ImageUpload/ImageUpload.css";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setSelectedImage(URL.createObjectURL(img));
    }
  };

  return (
    <div className="image-upload-container">
      <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Preview"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
    </div>
  );
}

export default ImageUpload;
