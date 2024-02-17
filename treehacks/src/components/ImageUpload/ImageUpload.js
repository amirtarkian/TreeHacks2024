function ImageUpload({ onFileSelect }) {
  // Corrected props destructuring
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      onFileSelect(img); // Directly call onFileSelect passed as prop
    }
  };

  return (
    <div className="image-upload-container">
      <input type="file" onChange={handleImageChange} />
    </div>
  );
}

export default ImageUpload;
